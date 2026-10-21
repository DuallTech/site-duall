import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * "Bairro Duall": volumes tridimensionais dos empreendimentos, com órbita lenta e entrada animada.
 * Carregado só no navegador, depois do texto do hero (o LCP continua sendo o H1).
 */

// Gerador pseudo-aleatório determinístico: a cena é sempre a mesma.
const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.className = 'h-full w-full';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0d1929, 16, 34);
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);

    scene.add(new THREE.HemisphereLight(0xcfe4ff, 0x0d1929, 1.6));
    const sun = new THREE.DirectionalLight(0xffffff, 1.8);
    sun.position.set(8, 14, 6);
    scene.add(sun);

    const disposables: Array<{ dispose: () => void }> = [];
    const rand = seeded(42);

    const faceMaterial = new THREE.MeshStandardMaterial({ color: 0x23405d, roughness: 0.55, metalness: 0.1 });
    const accentMaterial = new THREE.MeshStandardMaterial({ color: 0xeda700, roughness: 0.4, metalness: 0.2 });
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x7fb0dc, transparent: true, opacity: 0.55 });
    const accentEdge = new THREE.LineBasicMaterial({ color: 0xffd36b, transparent: true, opacity: 0.9 });
    disposables.push(faceMaterial, accentMaterial, edgeMaterial, accentEdge);

    const city = new THREE.Group();
    scene.add(city);

    const buildings: Array<{ group: THREE.Group; targetHeight: number; delay: number }> = [];
    const grid = 7;
    const gap = 1.7;

    for (let ix = 0; ix < grid; ix++) {
      for (let iz = 0; iz < grid; iz++) {
        if (rand() < 0.18) continue;
        const dist = Math.hypot(ix - grid / 2 + 0.5, iz - grid / 2 + 0.5);
        const w = 0.8 + rand() * 0.55;
        const d = 0.8 + rand() * 0.55;
        const h = Math.max(0.6, (5.4 - dist * 0.9) * (0.45 + rand() * 0.75));
        const accent = rand() > 0.9;

        const geometry = new THREE.BoxGeometry(w, 1, d);
        geometry.translate(0, 0.5, 0);
        const edges = new THREE.EdgesGeometry(geometry);
        disposables.push(geometry, edges);

        const group = new THREE.Group();
        group.add(new THREE.Mesh(geometry, accent ? accentMaterial : faceMaterial));
        group.add(new THREE.LineSegments(edges, accent ? accentEdge : edgeMaterial));
        group.position.set((ix - grid / 2 + 0.5) * gap, 0, (iz - grid / 2 + 0.5) * gap);
        group.scale.y = reducedMotion ? h : 0.001;
        city.add(group);
        buildings.push({ group, targetHeight: h, delay: dist * 0.12 + rand() * 0.3 });
      }
    }

    const baseGeometry = new THREE.PlaneGeometry(grid * gap + 4, grid * gap + 4, grid + 2, grid + 2);
    baseGeometry.rotateX(-Math.PI / 2);
    const baseGrid = new THREE.LineSegments(
      new THREE.WireframeGeometry(baseGeometry),
      new THREE.LineBasicMaterial({ color: 0x315676, transparent: true, opacity: 0.45 }),
    );
    disposables.push(baseGeometry, baseGrid.geometry, baseGrid.material as THREE.Material);
    scene.add(baseGrid);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reducedMotion) window.addEventListener('pointermove', onPointer, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(mount);

    const clock = new THREE.Clock();
    let frame = 0;
    let angle = Math.PI / 5;
    const radius = 19;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      const t = clock.getElapsedTime();

      angle += reducedMotion ? 0 : 0.0016;
      const px = pointer.x * 0.6;
      camera.position.set(Math.cos(angle) * radius + px, 11.5 - pointer.y * 0.8, Math.sin(angle) * radius);
      camera.lookAt(0, 1.6, 0);

      if (!reducedMotion) {
        for (const b of buildings) {
          const p = Math.min(Math.max((t - 0.4 - b.delay) / 1.4, 0), 1);
          const eased = 1 - Math.pow(1 - p, 3);
          b.group.scale.y = Math.max(0.001, b.targetHeight * eased);
        }
      }
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
}
