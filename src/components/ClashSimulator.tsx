/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import { IFCLoader } from 'web-ifc-three/IFCLoader';
import { IFCSPACE, IFCOPENINGELEMENT } from 'web-ifc';
import fixedIfcUrl  from '../assets/ifc/teste.ifc?url';
import { 
  Layers,
  RotateCw,
  Activity,
  FileCode,
  Grid,
  RefreshCw,
  FolderOpen,
  Compass,
  Filter,
  Ruler
} from 'lucide-react';

// Interfaces for metadata
interface BIMElementData {
  id: string; // ID inside ThreeJS map
  stepId: string; // Original STEP file `#ID` (e.g., #10329)
  name: string;
  className: string; // IFC Class (e.g., IFCWALL, IFCFLOWSEGMENT)
  system: 'estrutura' | 'eletrico' | 'hidraulico' | 'incendio' | 'mecanico';
  material: string;
  dimensions: string;
  lod: string;
  status: string;
  colorHex: number;
}

interface IFCFileMetadata {
  fileName: string;
  fileSize: string;
  schema: string;
  originatingSoftware: string;
  timestamp: string;
  totalLines: number;
  elementsCounts: {
    walls: number;
    columns: number;
    beams: number;
    slabs: number;
    pipes: number;
    ducts: number;
    cableTrays: number;
    doors: number;
    windows: number;
    other: number;
  };
}

type BIMSystem = BIMElementData['system'];

// Colors, opacity and render settings for each MEP discipline subset
const SYSTEM_COLORS: Record<BIMSystem, { color: number; opacity: number; transparent: boolean; depthWrite: boolean }> = {
  estrutura: { color: 0x94a3b8, opacity: 0.38, transparent: true,  depthWrite: false },
  eletrico:  { color: 0xfbbf24, opacity: 1.0,  transparent: false, depthWrite: true  },
  hidraulico:{ color: 0x60a5fa, opacity: 1.0,  transparent: false, depthWrite: true  },
  mecanico:  { color: 0x22d3ee, opacity: 1.0,  transparent: false, depthWrite: true  },
  incendio:  { color: 0xf87171, opacity: 1.0,  transparent: false, depthWrite: true  },
};

// IFC file URL for each discipline that has a dedicated file
// Atualmente usamos o mesmo arquivo base disponível em assets/ifc/teste.ifc.
const SYSTEM_IFC_URLS: Partial<Record<BIMSystem, string>> = {
  estrutura:  fixedIfcUrl,
  hidraulico: fixedIfcUrl,
};

const FIXED_IFC_FILE_NAME = 'teste.ifc';

const disposeObject3D = (object: THREE.Object3D) => {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry?.dispose();
      const material = child.material;
      if (Array.isArray(material)) {
        material.forEach((mat) => mat.dispose());
      } else {
        material?.dispose();
      }
    } else if (child instanceof THREE.LineSegments) {
      child.geometry?.dispose();
      const material = child.material;
      if (Array.isArray(material)) {
        material.forEach((mat) => mat.dispose());
      } else {
        material?.dispose();
      }
    }
  });
};

const getPercentile = (values: number[], percentile: number) => {
  if (values.length === 0) return 0;
  const index = Math.min(values.length - 1, Math.max(0, Math.floor((values.length - 1) * percentile)));
  return values[index];
};

const getRobustObjectBounds = (object: THREE.Object3D) => {
  const xs: number[] = [];
  const ys: number[] = [];
  const zs: number[] = [];
  const point = new THREE.Vector3();

  object.updateMatrixWorld(true);
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const position = child.geometry.getAttribute('position') as THREE.BufferAttribute | undefined;
    if (!position) return;

    const step = Math.max(1, Math.ceil(position.count / 18_000));
    for (let i = 0; i < position.count; i += step) {
      point.fromBufferAttribute(position, i).applyMatrix4(child.matrixWorld);
      xs.push(point.x);
      ys.push(point.y);
      zs.push(point.z);
    }
  });

  if (xs.length < 24) {
    return new THREE.Box3().setFromObject(object);
  }

  xs.sort((a, b) => a - b);
  ys.sort((a, b) => a - b);
  zs.sort((a, b) => a - b);

  const box = new THREE.Box3(
    new THREE.Vector3(getPercentile(xs, 0.04), getPercentile(ys, 0.02), getPercentile(zs, 0.04)),
    new THREE.Vector3(getPercentile(xs, 0.96), getPercentile(ys, 0.98), getPercentile(zs, 0.96))
  );

  if (box.isEmpty()) {
    return new THREE.Box3().setFromObject(object);
  }

  return box;
};

export default function ClashSimulator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Active loaded demo key or uploaded marker
  const [activeModelKey, setActiveModelKey] = useState<string>("");
  
  // Display IFC statistics currently active
  const [activeMetadata, setActiveMetadata] = useState<IFCFileMetadata | null>(null);
  const [parsedElementsList, setParsedElementsList] = useState<BIMElementData[]>([]);
  const [uploadedModel, setUploadedModel] = useState<{ name: string; icon: string; desc: string; stats: IFCFileMetadata } | null>(null);
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [parseProgress, setParseProgress] = useState<number>(0);

  // 3D Engine Variables
  const [selectedElement, setSelectedElement] = useState<BIMElementData | null>(null);
  const [hoveredElement, setHoveredElement] = useState<BIMElementData | null>(null);
  const [showAxes, setShowAxes] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [isXRayMode, setIsXRayMode] = useState<boolean>(false);
  const [isMeasuringMode, setIsMeasuringMode] = useState<boolean>(false);
  const [measurePoints, setMeasurePoints] = useState<THREE.Vector3[]>([]);
  const [measureDistance, setMeasureDistance] = useState<number | null>(null);
  const isAutoRotatingRef = useRef<boolean>(false);
  
  // Discipline Show/Hide
  const [visibleSystems, setVisibleSystems] = useState({
    estrutura: true,
    eletrico: true,
    hidraulico: true,
    incendio: true,
    mecanico: true,
  });

  // Highlight/Clash status
  const [activeClashIndex, setActiveClashIndex] = useState<number>(-1);
  const [clashList, setClashList] = useState<{ id: string; name: string; elementA: string; elementB: string; type: string; severity: 'high' | 'medium' }[]>([]);
  const [activeTab, setActiveTab ] = useState<'geral' | 'inspetor' | 'conflitos'>('geral');

  // Three.js References to dynamically mutate/update models
  const sceneRef = useRef<THREE.Scene | null>(null);
  const objectsGroupRef = useRef<THREE.Group | null>(null);
  const measuresGroupRef = useRef<THREE.Group | null>(null);
  const objectsMapRef = useRef<{ [key: string]: THREE.Object3D }>({});
  const controlsRef = useRef<OrbitControls | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const ifcLoaderRef = useRef<IFCLoader | null>(null);
  const activeIfcModelRef = useRef<THREE.Mesh | null>(null);
  const selectionMaterialRef = useRef<THREE.MeshLambertMaterial | null>(null);
  const selectedIfcRef = useRef<{ modelID: number; expressID: number } | null>(null);
  const modelBoundsRef = useRef<THREE.Box3 | null>(null);
  const modelFrameRef = useRef<THREE.Box3Helper | null>(null);
  const fixedIFCLoadedRef = useRef<boolean>(false);
  // Stores the additional IFC models loaded per MEP discipline (not the base structure model)
  const systemModelsRef    = useRef<Partial<Record<BIMSystem, THREE.Mesh>>>({});
  const systemMaterialsRef = useRef<Partial<Record<BIMSystem, THREE.MeshLambertMaterial>>>({});
  // Mirror of visibleSystems as a ref so async callbacks can read the latest value
  const visibleSystemsRef  = useRef<typeof visibleSystems>(visibleSystems);
  // Tracks which systems are currently fetching their IFC file
  const [loadingSystems, setLoadingSystems] = useState<Set<BIMSystem>>(new Set());

  // Keep visibleSystemsRef in sync with state
  useEffect(() => {
    visibleSystemsRef.current = visibleSystems;
  });

  // Sync Three.js model visibility whenever visibleSystems state changes
  useEffect(() => {
    // Structure model (base IFC loaded at startup)
    if (activeIfcModelRef.current) {
      activeIfcModelRef.current.visible = visibleSystems.estrutura;
    }
    // Additional MEP models
    (Object.keys(visibleSystems) as BIMSystem[]).forEach(sys => {
      const model = systemModelsRef.current[sys];
      if (model) model.visible = visibleSystems[sys];
    });
  }, [visibleSystems]);

  // Toggle a discipline on/off; lazy-loads its IFC file on first activation
  const toggleSystem = (system: BIMSystem) => {
    setVisibleSystems(prev => {
      const nowVisible = !prev[system];

      // Trigger lazy load on first activation (no Three.js side-effects here — useEffect handles visibility)
      if (nowVisible && system !== 'estrutura' && !systemModelsRef.current[system]) {
        const url = SYSTEM_IFC_URLS[system];
        if (url) setTimeout(() => loadSystemModel(system, url), 0);
      }

      return { ...prev, [system]: nowVisible };
    });
  };

  const getIfcTextValue = (value: any, fallback = ''): string => {
    if (!value) return fallback;
    if (typeof value === 'string') return value;
    if (typeof value.value === 'string') return value.value;
    if (typeof value.value === 'number') return String(value.value);
    return fallback;
  };

  const selectIfcIntersection = async (intersection: THREE.Intersection) => {
    const loader = ifcLoaderRef.current;
    const model = activeIfcModelRef.current;
    if (!loader || !model || intersection.faceIndex == null || !objectsGroupRef.current) return;

    const mesh = intersection.object as any;
    const modelID = typeof mesh.modelID === 'number' ? mesh.modelID : (model as any).modelID;
    if (typeof modelID !== 'number') return;

    const expressID = loader.ifcManager.getExpressId(mesh.geometry, intersection.faceIndex);
    if (expressID === undefined || expressID === null) return;

    const material = selectionMaterialRef.current ?? new THREE.MeshLambertMaterial({
      color: 0x1992bb,
      transparent: true,
      opacity: 0.85,
      depthTest: false,
      side: THREE.DoubleSide
    });
    selectionMaterialRef.current = material;
    loader.ifcManager.removeSubset(modelID, material, 'duall_selection');
    const selection = loader.ifcManager.createSubset({
      modelID,
      ids: [expressID],
      removePrevious: true,
      customID: 'duall_selection',
      material,
      scene: objectsGroupRef.current as any
    }) as THREE.Mesh;
    selection.name = 'duall_selected_ifc_item';
    selection.renderOrder = 10;

    const [props, className] = await Promise.all([
      loader.ifcManager.getItemProperties(modelID, expressID, false),
      Promise.resolve(loader.ifcManager.getIfcType(modelID, expressID))
    ]);
    const system = /WALL|BEAM|COLUMN|SLAB/i.test(String(className)) ? 'estrutura' :
      /PIPE|FLOWSEGMENT|FLOWFITTING/i.test(String(className)) ? 'hidraulico' :
      /DUCT|FLOWCONTROLLER|FLOWTERMINAL/i.test(String(className)) ? 'mecanico' :
      /FIRE|SPRINK|INCEND/i.test(`${className} ${getIfcTextValue(props?.Name)}`) ? 'incendio' :
      'eletrico';
    const element: BIMElementData = {
      id: `ifc_${expressID}`,
      stepId: `#${expressID}`,
      name: getIfcTextValue(props?.Name, `${className} #${expressID}`),
      className: String(className || 'IFCPRODUCT'),
      system,
      material: getIfcTextValue(props?.ObjectType, 'Elemento IFC'),
      dimensions: `Express ID ${expressID}`,
      lod: 'Propriedade IFC real',
      status: 'Selecionado',
      colorHex: 0x1992bb
    };

    selectedIfcRef.current = { modelID, expressID };
    selection.userData = element;
    objectsMapRef.current[element.id] = selection;
    setSelectedElement(element);
    setHoveredElement(element);
    setActiveTab('inspetor');
  };

  // Preset camera angle views
  const setCameraView = (type: 'iso' | 'superior' | 'frontal') => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    setIsAutoRotating(false);

    const box = modelBoundsRef.current;
    const center = new THREE.Vector3(0, 1.2, 0);
    const size = new THREE.Vector3(8, 4, 8);
    if (box && !box.isEmpty()) {
      box.getCenter(center);
      box.getSize(size);
    }
    const radius = Math.max(size.x, size.y, size.z, 4);

    if (type === 'iso') {
      controls.object.position.set(center.x + radius, center.y + radius * 0.7, center.z + radius);
    } else if (type === 'superior') {
      controls.object.position.set(center.x, center.y + radius * 1.6, center.z + 0.01);
    } else if (type === 'frontal') {
      controls.object.position.set(center.x, center.y + radius * 0.25, center.z + radius * 1.35);
    }
    controls.target.copy(center);
    controls.update();
  };

  const clearCurrentModel = () => {
    if (!objectsGroupRef.current) return;

    if (modelFrameRef.current && sceneRef.current) {
      sceneRef.current.remove(modelFrameRef.current);
      modelFrameRef.current.geometry.dispose();
      const frameMaterial = modelFrameRef.current.material;
      if (Array.isArray(frameMaterial)) {
        frameMaterial.forEach((mat) => mat.dispose());
      } else {
        frameMaterial.dispose();
      }
      modelFrameRef.current = null;
    }

    // Dispose per-discipline MEP model materials
    Object.values(systemMaterialsRef.current).forEach(mat => mat?.dispose());
    systemModelsRef.current = {};
    systemMaterialsRef.current = {};

    while (objectsGroupRef.current.children.length > 0) {
      const obj = objectsGroupRef.current.children[0];
      disposeObject3D(obj);
      objectsGroupRef.current.remove(obj);
    }

    if (activeIfcModelRef.current && ifcLoaderRef.current && sceneRef.current) {
      const modelID = (activeIfcModelRef.current as any).modelID;
      if (typeof modelID === 'number') {
        ifcLoaderRef.current.ifcManager.close(modelID, sceneRef.current);
      }
    }

    // Close additional MEP models
    Object.entries(systemModelsRef.current).forEach(([, mepModel]) => {
      if (!mepModel || !ifcLoaderRef.current || !sceneRef.current) return;
      const mepID = (mepModel as any).modelID;
      if (typeof mepID === 'number') {
        ifcLoaderRef.current.ifcManager.close(mepID, sceneRef.current);
      }
    });

    activeIfcModelRef.current = null;
    objectsMapRef.current = {};
    modelBoundsRef.current = null;
    setSelectedElement(null);
    setHoveredElement(null);
    setMeasurePoints([]);
    setParsedElementsList([]);
    setClashList([]);
    setActiveClashIndex(-1);
  };

  const fitCameraToLoadedModel = () => {
    const controls = controlsRef.current;
    const camera = controls?.object as THREE.PerspectiveCamera | undefined;
    const box = modelBoundsRef.current;
    if (!controls || !camera || !box || box.isEmpty()) return;

    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    const maxSize = Math.max(size.x, size.y, size.z, 1);
    const distance = (maxSize / (2 * Math.tan((camera.fov * Math.PI) / 360))) * 1.25;
    camera.near = Math.max(distance / 100, 0.01);
    camera.far = Math.max(distance * 100, 1000);
    camera.updateProjectionMatrix();
    camera.position.set(center.x + distance * 0.85, center.y + distance * 0.62, center.z + distance * 0.85);
    controls.target.copy(center);
    controls.minDistance = Math.max(maxSize * 0.02, 0.5);
    controls.maxDistance = Math.max(maxSize * 8, 25);
    controls.update();
  };

  // Lazy-load a dedicated IFC file for the given MEP discipline
  const loadSystemModel = async (system: BIMSystem, url: string) => {
    const loader = ifcLoaderRef.current;
    const group  = objectsGroupRef.current;
    if (!loader || !group) return;

    setLoadingSystems(prev => new Set([...prev, system]));
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const buffer = await response.arrayBuffer();

      const model = await loader.parse(buffer);

      // Override all materials with this system's colour
      const { color, opacity, transparent, depthWrite } = SYSTEM_COLORS[system];
      const mat = new THREE.MeshLambertMaterial({ color, transparent, opacity, depthWrite, side: THREE.DoubleSide });
      systemMaterialsRef.current[system] = mat;
      model.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) child.material = mat;
      });

      model.name = `duall_system_${system}`;
      group.add(model);
      systemModelsRef.current[system] = model as unknown as THREE.Mesh;
      // Sync visibility with whatever the user set while the file was loading
      (model as THREE.Object3D).visible = visibleSystemsRef.current[system];
    } catch (err) {
      console.error(`[MEP] failed to load ${system}:`, err);
    } finally {
      setLoadingSystems(prev => { const s = new Set([...prev]); s.delete(system); return s; });
    }
  };

  const loadFixedIFCBuffer = async (arrayBuffer: ArrayBuffer, fileName: string) => {
    if (!objectsGroupRef.current) return;

    setIsParsing(true);
    setParseProgress(5);

    try {
      clearCurrentModel();

      const headerBytes = new Uint8Array(arrayBuffer, 0, Math.min(arrayBuffer.byteLength, 2_000_000));
      const text = new TextDecoder('utf-8').decode(headerBytes);
      const sampleLines = text.split('\n').length;
      const estimatedLines = Math.round(sampleLines * (arrayBuffer.byteLength / Math.max(headerBytes.byteLength, 1)));
      const schemaMatch = text.match(/FILE_SCHEMA\s*\(\s*\('([^']+)'\)/i);
      const softwareMatch = text.match(/FILE_NAME\s*\(\s*'[^']*',\s*'[^']*',\s*\([^)]*\),\s*\([^)]*\),\s*'([^']*)',\s*'([^']*)'/i);

      const loader = ifcLoaderRef.current ?? new IFCLoader();
      if (!ifcLoaderRef.current) {
        loader.ifcManager.setupThreeMeshBVH(computeBoundsTree, disposeBoundsTree, acceleratedRaycast);
        await loader.ifcManager.setWasmPath('/ifc/');
        await loader.ifcManager.applyWebIfcConfig({
          USE_FAST_BOOLS: true,
          COORDINATE_TO_ORIGIN: true
        });
        loader.ifcManager.parser.setupOptionalCategories({
          [IFCSPACE]: false,
          [IFCOPENINGELEMENT]: false
        });
        ifcLoaderRef.current = loader;
      }

      loader.ifcManager.setOnProgress((event) => {
        const total = Math.max(event.total || arrayBuffer.byteLength, 1);
        const progress = Math.min(90, Math.max(10, Math.round((event.loaded / total) * 90)));
        setParseProgress(progress);
      });

      setParseProgress(25);
      const model = await loader.parse(arrayBuffer);
      setParseProgress(92);

      activeIfcModelRef.current = model as unknown as THREE.Mesh;
      model.name = 'duall_ifc_model';

      // Apply structure colour (grey semitransparent) to the base model
      const { color: sCol, opacity: sOp, transparent: sTrans, depthWrite: sDW } = SYSTEM_COLORS['estrutura'];
      const structureMat = new THREE.MeshLambertMaterial({ color: sCol, transparent: sTrans, opacity: sOp, depthWrite: sDW, side: THREE.DoubleSide });
      systemMaterialsRef.current['estrutura'] = structureMat;
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) child.material = structureMat;
      });

      objectsGroupRef.current.add(model);
      objectsMapRef.current.ifc_model = model;

      const modelBox = getRobustObjectBounds(objectsGroupRef.current);
      if (!modelBox.isEmpty()) {
        const center = new THREE.Vector3();
        const minY = modelBox.min.y;
        modelBox.getCenter(center);
        objectsGroupRef.current.position.set(-center.x, -minY, -center.z);
        objectsGroupRef.current.updateMatrixWorld(true);
        modelBoundsRef.current = getRobustObjectBounds(objectsGroupRef.current);
      }

      const modelID = (model as any).modelID ?? 0;
      const counts = {
        walls: 0,
        columns: 0,
        beams: 0,
        slabs: 0,
        pipes: 0,
        ducts: 0,
        cableTrays: 0,
        doors: 0,
        windows: 0,
        other: 0
      };

      const position = model.geometry.getAttribute('position') as THREE.BufferAttribute | undefined;
      const faceCount = model.geometry.getIndex()?.count ? Math.round((model.geometry.getIndex()?.count ?? 0) / 3) : 0;
      const summaryElement: BIMElementData = {
        id: 'ifc_model',
        stepId: `MODEL ${modelID}`,
        name: 'Modelo IFC carregado',
        className: 'IFCModel',
        system: 'eletrico',
        material: 'Materiais originais do IFC',
        dimensions: `${(position?.count ?? 0).toLocaleString('pt-BR')} vértices | ${faceCount.toLocaleString('pt-BR')} faces`,
        lod: 'IFCLoader / web-ifc-three',
        status: 'Importado',
        colorHex: 0xd97706
      };
      model.userData = summaryElement;

      const parsedStats: IFCFileMetadata = {
        fileName,
        fileSize: (arrayBuffer.byteLength / (1024 * 1024)).toFixed(2) + ' MB',
        schema: schemaMatch?.[1] || 'IFC',
        originatingSoftware: (softwareMatch?.[2] || softwareMatch?.[1] || 'Exportador IFC').replace(/\\/g, ''),
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        totalLines: estimatedLines,
        elementsCounts: counts
      };

      setUploadedModel({
        name: fileName.length > 20 ? fileName.substring(0, 18) + '...' : fileName,
        icon: 'IFC',
        desc: 'Modelo IFC carregado com IFCLoader.',
        stats: parsedStats
      });
      setActiveModelKey('uploaded');
      setActiveMetadata(parsedStats);
      setParsedElementsList([summaryElement]);
      setClashList([]);
      setActiveClashIndex(-1);
      setActiveTab('geral');
      fitCameraToLoadedModel();
      setParseProgress(100);
    } catch (err) {
      console.error(err);
      alert('Erro ao renderizar o IFC com o IFCLoader. Verifique o console para detalhes.');
      clearCurrentModel();
    } finally {
      setIsParsing(false);
    }
  };

  const loadFixedIFCFile = async () => {
    const response = await fetch(fixedIfcUrl);
    if (!response.ok) {
      throw new Error(`Não foi possível carregar o IFC fixo: ${response.status}`);
    }

    await loadFixedIFCBuffer(await response.arrayBuffer(), FIXED_IFC_FILE_NAME);
  };
  const resetIFCViewer = () => {
    clearCurrentModel();
    setActiveMetadata(null);
    setActiveModelKey('');
    setActiveTab('geral');
  };

  const isMeasuringModeRef = useRef<boolean>(false);
  useEffect(() => {
    isMeasuringModeRef.current = isMeasuringMode;
    if (!isMeasuringMode) {
      setMeasurePoints([]);
    }
  }, [isMeasuringMode]);

  useEffect(() => {
    isAutoRotatingRef.current = isAutoRotating;
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating;
      controlsRef.current.autoRotateSpeed = 0.8;
    }
  }, [isAutoRotating]);

  // Setup Three JS scene context once on layout mount
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 500;
    const height = 480;

    // 1. Create Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x060b18); // Elegant dark space bg

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(7, 6, 8);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.shadowMap.enabled = false;
    rendererRef.current = renderer;

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Prevents looking from exactly bottom
    controls.minDistance = 3.5;
    controls.maxDistance = 25;
    controls.target.set(0, 1.2, 0);
    controlsRef.current = controls;

    // 5. Light Systems
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.75);
    dirLight.position.set(7, 13, 8);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x1992bb, 0.5, 12);
    pointLight.position.set(0, 3, 0);
    scene.add(pointLight);

    // Grid System
    const gridHelper = new THREE.GridHelper(16, 16, 0x3b82f6, 0x1e293b);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // Colored XYZ Arrows
    const axesHelper = new THREE.AxesHelper(3.0);
    scene.add(axesHelper);

    // Main structural group for interactive items
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);
    objectsGroupRef.current = objectsGroup;

    // Measurement lines and coordinates indicators overlays
    const measuresGroup = new THREE.Group();
    scene.add(measuresGroup);
    measuresGroupRef.current = measuresGroup;

    // Setup Raycaster for clicks & hover interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: PointerEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Handle Measuring Mode clicks
      if (isMeasuringModeRef.current) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(objectsGroup.children, true);
        if (intersects.length > 0) {
          const point = intersects[0].point;
          setMeasurePoints(prev => {
            if (prev.length >= 2) return [point];
            return [...prev, point];
          });
        }
        return;
      }

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(objectsGroup.children, true);

      if (intersects.length > 0) {
        void selectIfcIntersection(intersects[0]);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(objectsGroup.children, true);

      if (intersects.length > 0) {
        const loader = ifcLoaderRef.current;
        const faceIndex = intersects[0].faceIndex;
        if (loader && faceIndex != null) {
          const object = intersects[0].object as any;
          const expressID = loader.ifcManager.getExpressId(object.geometry, faceIndex);
          if (expressID !== undefined && expressID !== null) {
            setHoveredElement({
              id: `ifc_${expressID}`,
              stepId: `#${expressID}`,
              name: object.userData?.name || 'Elemento IFC',
              className: object.userData?.className || 'IFCPRODUCT',
              system: object.userData?.system || 'eletrico',
              material: 'Passe o mouse / clique para inspecionar',
              dimensions: `Express ID ${expressID}`,
              lod: 'IFCLoader',
              status: 'Hover',
              colorHex: 0x1992bb
            });
            return;
          }
        }
        if (intersects[0].object.userData?.id) {
          setHoveredElement(intersects[0].object.userData as BIMElementData);
          return;
        }
      }
      setHoveredElement(null);
    };

    const canvasEl = canvasRef.current;
    canvasEl.addEventListener('pointerdown', handlePointerDown);
    canvasEl.addEventListener('pointermove', handlePointerMove);

    // Initial default build triggering (starts empty)
    resetIFCViewer();

    // 6. Animation render loop
    const clock = new THREE.Clock();
    let lastRenderTime = 0;
    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (elapsed - lastRenderTime < 1 / 30) {
        return;
      }
      lastRenderTime = elapsed;



      // Auto rotation mapping
      if (controlsRef.current && isAutoRotatingRef.current) {
        controlsRef.current.autoRotate = true;
        controlsRef.current.autoRotateSpeed = 0.8;
      } else if (controlsRef.current) {
        controlsRef.current.autoRotate = false;
      }

      // Render loops
      controlsRef.current?.update();
      renderer.render(scene, camera);
    };
    animate();

    // 7. Dynamic Window Resize observer bound with container widths
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Cleanups on unmount
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      canvasEl.removeEventListener('pointerdown', handlePointerDown);
      canvasEl.removeEventListener('pointermove', handlePointerMove);
      resizeObserver.disconnect();
      if (modelFrameRef.current && sceneRef.current) {
        sceneRef.current.remove(modelFrameRef.current);
        modelFrameRef.current.geometry.dispose();
        const frameMaterial = modelFrameRef.current.material;
        if (Array.isArray(frameMaterial)) {
          frameMaterial.forEach((mat) => mat.dispose());
        } else {
          frameMaterial.dispose();
        }
        modelFrameRef.current = null;
      }
      if (objectsGroupRef.current) {
        while (objectsGroupRef.current.children.length > 0) {
          const obj = objectsGroupRef.current.children[0];
          disposeObject3D(obj);
          objectsGroupRef.current.remove(obj);
        }
      }
      if (activeIfcModelRef.current && ifcLoaderRef.current) {
        const modelID = (activeIfcModelRef.current as any).modelID;
        if (typeof modelID === 'number') {
          ifcLoaderRef.current.ifcManager.close(modelID, scene);
        }
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (fixedIFCLoadedRef.current) return;
    fixedIFCLoadedRef.current = true;

    void loadFixedIFCFile().catch((err) => {
      console.error(err);
      alert('Não foi possível carregar automaticamente o arquivo IFC fixo em src/assets/ifc/teste.ifc.');
      fixedIFCLoadedRef.current = false;
    });
  }, []);

  // Update visual axis/grids toggles
  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.children.forEach(child => {
      if (child instanceof THREE.GridHelper) {
        child.visible = showGrid;
      }
      if (child instanceof THREE.AxesHelper) {
        child.visible = showAxes;
      }
    });
  }, [showGrid, showAxes]);

  // Trigger X-Ray / Ghost Mode — ghost the structure so MEP pipes are visible through it
  useEffect(() => {
    const mat = systemMaterialsRef.current['estrutura'];
    if (mat) {
      mat.transparent = true;
      mat.opacity   = isXRayMode ? 0.04 : SYSTEM_COLORS['estrutura'].opacity;
      mat.depthWrite = !isXRayMode;
      mat.needsUpdate = true;
    }
  }, [isXRayMode]);

  // Handle interactive measuring ruler coordinates and 3D wire draw indicators
  useEffect(() => {
    const group = measuresGroupRef.current;
    if (!group || !sceneRef.current) return;

    // Clear old visual markers
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
    }

    if (measurePoints.length === 0) {
      setMeasureDistance(null);
      return;
    }

    // Draw first point helper sphere
    const p1 = measurePoints[0];
    const sphereGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, depthTest: false });
    
    const sphere1 = new THREE.Mesh(sphereGeo, sphereMat);
    sphere1.position.copy(p1);
    sphere1.renderOrder = 999;
    group.add(sphere1);

    if (measurePoints.length === 2) {
      const p2 = measurePoints[1];

      // Draw second point sphere
      const sphere2 = new THREE.Mesh(sphereGeo, sphereMat);
      sphere2.position.copy(p2);
      sphere2.renderOrder = 999;
      group.add(sphere2);

      // Draw dashed measuring vector line between them
      const points = [p1, p2];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineDashedMaterial({
        color: 0xf59e0b,
        dashSize: 0.15,
        gapSize: 0.08,
        depthTest: false
      });
      const lines = new THREE.Line(lineGeo, lineMat);
      lines.computeLineDistances(); // Required for dashed line rendering
      lines.renderOrder = 998;
      group.add(lines);

      // Compute precise Euclidian distance
      const distance = p1.distanceTo(p2);
      setMeasureDistance(distance);
    } else {
      setMeasureDistance(null);
    }
  }, [measurePoints]);

  // Isolate dynamic element in viewport when clicking on tree list
  const focusOnElement = (element: BIMElementData) => {
    setSelectedElement(element);
    setActiveTab('inspetor');
    const obj3D = objectsMapRef.current[element.id];
    if (obj3D && controlsRef.current) {
      // Offset camera position gently towards object position
      const controls = controlsRef.current;
      const target = new THREE.Vector3();
      new THREE.Box3().setFromObject(obj3D).getCenter(target);
      controls.target.copy(target);
      controls.update();

      // Visual flash indicator
      let pulseCount = 0;
      const flashInterval = setInterval(() => {
        obj3D.visible = !obj3D.visible;
        pulseCount++;
        if (pulseCount >= 6) {
          clearInterval(flashInterval);
          obj3D.visible = true;
        }
      }, 150);
    }
  };

  // Switch to selected clash mesh intersection
  const focusOnClash = (idx: number) => {
    const clash = clashList[idx];
    if (!clash) return;
    setActiveClashIndex(idx);

    const elemA = parsedElementsList.find(e => e.id === clash.elementA);
    if (elemA) {
      focusOnElement(elemA);
    }
  };

  return (
    <div className="w-full bg-slate-950 rounded-3xl border border-slate-800/80 overflow-hidden shadow-2xl text-slate-100" id="ifc-navigator">
      
      {/* Upper header section */}
      <div className="p-6 border-b border-slate-900 bg-slate-950/40 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-[10px] uppercase tracking-widest font-mono font-bold text-duall-blue">
              Visualizador BIM .IFC Real
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-display font-extrabold tracking-tight mt-1 bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Navegador IFC Interativo
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5 max-w-xl">
            Visualização fixa do arquivo IFC de exemplo para inspecionar compatibilização MEP, decomposição de níveis e interferências físico-estruturais.
          </p>
        </div>

        {/* Demo switcher presets info */}
        <div className="flex flex-wrap items-center gap-1.55">
          {uploadedModel && (
            <button
              onClick={fitCameraToLoadedModel}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-sans font-semibold transition duration-150 cursor-pointer ${
                activeModelKey === 'uploaded'
                  ? 'bg-emerald-600 text-white border border-emerald-500 shadow-sm font-bold animate-pulse'
                  : 'bg-slate-900/40 hover:bg-slate-900 text-emerald-400 hover:text-emerald-300 border border-emerald-950'
              }`}
            >
              <span>{uploadedModel.icon}</span>
              <span>{uploadedModel.name}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Side Content - 3D Interactive Viewport & Interactive Tools (7 Cols) */}
        <div className="lg:col-span-12 flex flex-col border-b lg:border-b-0 border-slate-900/80 relative">
          
          {/* Main 3D Canvas wrapper */}
          <div 
            ref={containerRef} 
            className="w-full h-95 md:h-120 bg-[#060b18] relative overflow-hidden flex items-center justify-center"
          >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Empty state prompting file import inside the 3D workspace */}
            {!activeMetadata && !isParsing && (
              <div className="absolute inset-x-4 inset-y-4 bg-[#060b18]/95 z-20 flex flex-col items-center justify-center p-6 text-center select-none border-2 border-dashed border-duall-blue/30 rounded-2xl backdrop-blur-sm">
                <div className="p-4 bg-duall-blue/10 rounded-full border border-duall-blue/20 mb-3 animate-pulse">
                  <FileCode size={32} className="text-duall-blue" />
                </div>
                <h4 className="text-base font-display font-extrabold text-white tracking-wide">
                  Carregando arquivo IFC de exemplo
                </h4>
                <p className="text-xs text-slate-400 font-sans mt-1 max-w-sm leading-relaxed">
                  O modelo fixo em assets/ifc/teste.ifc será carregado automaticamente em modo performance.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-5">
                  <div className="px-5 py-2.5 bg-slate-900 text-slate-300 rounded-xl text-xs font-sans font-semibold shadow-lg inline-flex items-center gap-2 border border-slate-800">
                    <FolderOpen size={14} className="text-duall-blue" />
                    <span>assets/ifc/teste.ifc</span>
                  </div>
                </div>
                
                <span className="text-[9px] font-mono text-slate-500 mt-5 uppercase tracking-widest">
                  Processamento em tempo real com malhas reais do IFC
                </span>
              </div>
            )}

            {/* Parsing Overlay */}
            {isParsing && (
              <div className="absolute inset-0 bg-slate-950/95 z-25 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center select-none">
                <div className="p-4 bg-sky-500/10 rounded-full border border-sky-500/20 mb-4">
                  <RefreshCw size={28} className="text-duall-blue animate-spin" />
                </div>
                <h4 className="text-base font-display font-extrabold text-white tracking-wide">
                  Analisando Linhas do Arquivo IFC
                </h4>
                <p className="text-xs text-slate-400 font-sans mt-1 max-w-xs leading-relaxed">
                  Decodificando instâncias STEP, localizando entidades físico-estruturais e gerando visualização 3D otimizada...
                </p>
                
                {/* Visual Custom Progress Bar */}
                <div className="w-56 h-1.5 bg-slate-900 rounded-full overflow-hidden mt-5 border border-white/5">
                  <div 
                    className="h-full bg-linear-to-r from-[#315676] to-duall-blue transition-all duration-300"
                    style={{ width: `${parseProgress}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono font-bold text-sky-500 mt-2 tracking-widest">
                  {parseProgress}% PROCESSADO
                </span>
              </div>
            )}

            {/* Float visual settings toolbox overlay (Top left) */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              <div className="bg-slate-950/80 p-1.5 rounded-xl border border-white/5 backdrop-blur-md flex flex-col gap-1 shadow-xl">
                <button
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition duration-150 cursor-pointer ${
                    isAutoRotating 
                      ? 'bg-duall-blue text-white font-bold' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  title="Giro rotacional automático da câmera"
                >
                  <RotateCw size={13} className={isAutoRotating ? 'animate-spin' : ''} />
                  <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:inline">Girar Câmera</span>
                </button>

                <button
                  onClick={() => setShowAxes(!showAxes)}
                  className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition duration-200 cursor-pointer ${
                    showAxes 
                      ? 'bg-sky-500/15 text-duall-blue border border-sky-500/20' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  title="Exibir Linhas de Coordenadas Globais XYZ"
                >
                  <Compass size={13} />
                  <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:inline">Eixos XYZ</span>
                </button>

                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition duration-200 cursor-pointer ${
                    showGrid 
                      ? 'bg-sky-500/15 text-sky-400 border border-sky-500/20' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  title="Exibir malha do plano de chão (grid)"
                >
                  <Grid size={13} />
                  <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:inline">Grade Chão</span>
                </button>

                {/* Option B: X-Ray mode trigger */}
                <button
                  onClick={() => setIsXRayMode(!isXRayMode)}
                  className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition duration-200 cursor-pointer ${
                    isXRayMode 
                      ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  title="Raio-X (tornar estrutura invisível para focar no MEP)"
                >
                  <Layers size={13} />
                  <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:inline">Modo Raio-X</span>
                </button>

                {/* Option B: Ruler measurement trigger */}
                <button
                  onClick={() => {
                    setIsMeasuringMode(!isMeasuringMode);
                    if (isMeasuringMode) setMeasurePoints([]);
                  }}
                  className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition duration-200 cursor-pointer ${
                    isMeasuringMode 
                      ? 'bg-[#315676] text-white font-bold' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                  title="Ferramenta de medição 3D"
                >
                  <Ruler size={13} />
                  <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:inline">Régua / Medidor</span>
                </button>
              </div>
            </div>

            {/* Preset views control board overlay (Top right) */}
            <div className="absolute top-4 right-4 z-10 flex bg-slate-950/85 p-1 rounded-xl border border-white/5 backdrop-blur-md shadow-2xl">
              <button
                onClick={() => setCameraView('iso')}
                className="px-2.5 py-1.5 text-[9px] uppercase tracking-wider font-extrabold text-slate-300 hover:text-white transition rounded-lg hover:bg-white/5 cursor-pointer"
              >
                Perspectiva
              </button>
              <button
                onClick={() => setCameraView('superior')}
                className="px-2.5 py-1.5 text-[9px] uppercase tracking-wider font-extrabold text-slate-300 hover:text-white transition rounded-lg hover:bg-white/5 cursor-pointer"
              >
                Superior (Plant)
              </button>
              <button
                onClick={() => setCameraView('frontal')}
                className="px-2.5 py-1.5 text-[9px] uppercase tracking-wider font-extrabold text-slate-300 hover:text-white transition rounded-lg hover:bg-white/5 cursor-pointer"
              >
                Elevação (Frente)
              </button>
            </div>

            {/* Measuring Tool UI overlay */}
            {isMeasuringMode && (
              <div className="absolute top-16 right-4 z-10 p-3 bg-slate-950/95 border border-sky-500/25 backdrop-blur-md rounded-xl shadow-xl flex flex-col gap-1.5 max-w-[190px] text-xs font-sans text-slate-300 text-left">
                <div className="flex items-center gap-1.5 text-duall-blue font-extrabold">
                  <Ruler size={13} className="animate-pulse" />
                  <span>Régua Ativa (BIM)</span>
                </div>
                {measurePoints.length === 0 && (
                  <p className="text-[10px] text-slate-400 leading-relaxed">Clique em dois elementos no modelo 3D para medir a distância real.</p>
                )}
                {measurePoints.length === 1 && (
                  <p className="text-[10px] text-sky-400 leading-relaxed font-semibold">Ponto 1 definido. Clique em outro ponto para calcular.</p>
                )}
                {measurePoints.length === 2 && measureDistance !== null && (
                  <div className="space-y-1 mt-1 border-t border-slate-900 pt-1">
                    <span className="text-[8px] text-slate-500 uppercase font-mono block">Distância:</span>
                    <span className="text-sm font-mono font-bold text-emerald-400 block break-words bg-emerald-950/10 p-1.5 rounded">{measureDistance.toFixed(3)} m (metros)</span>
                  </div>
                )}
                <button
                  onClick={() => setMeasurePoints([])}
                  className="mt-0.5 w-full py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded text-[9px] font-sans font-bold cursor-pointer border border-slate-800 transition text-center"
                >
                  Resetar Pontos
                </button>
              </div>
            )}

            {/* Hover element name pill overlay */}
            {hoveredElement && (
              <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 bg-slate-950/85 backdrop-blur-md rounded-lg border border-white/10 text-[10px] font-mono font-bold text-slate-200 pointer-events-none shadow-lg">
                <span className="text-sky-400 ">{hoveredElement.stepId}</span> {hoveredElement.name}
              </div>
            )}

            {/* Model Info status badge */}
            <div className="absolute inset-x-4 bottom-4 z-10 flex justify-center pointer-events-none">
              <div className="bg-slate-950/95 px-4 py-3 rounded-2xl border border-slate-800/80 backdrop-blur-lg flex items-center justify-between shadow-2xl pointer-events-auto max-w-lg w-full select-none">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 bg-sky-500/10 rounded-xl text-sky-500 border border-sky-500/20 flex-shrink-0 animate-pulse">
                    <Activity size={15} />
                  </div>
                  <div className="text-left min-w-0">
                    <h5 className="text-[11px] font-bold text-white uppercase tracking-wider">Visualização Segura Duall</h5>
                    <p className="text-[10px] text-slate-400 truncate">Simulação e inspeção MEP oficial</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-[9px] font-mono font-black uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Ativo
                </div>
              </div>
            </div>

          </div>

          {/* Underlay Dashboard parameters controls board (Quick filtering) */}
          <div className="p-4 bg-slate-950/40 border-t border-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* 1. Discipline filters Checklist */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-slate-500 mr-1 flex items-center gap-1">
                <Filter size={11} /> Sistemas MEP:
              </span>
              {[
                { id: 'estrutura', label: 'Estrutura',   dotColor: 'bg-zinc-400',  hasFile: true  },
                { id: 'mecanico',  label: 'Climatização',dotColor: 'bg-cyan-400',  hasFile: true  },
                { id: 'eletrico',  label: 'Elétrica',    dotColor: 'bg-amber-400', hasFile: false },
                { id: 'hidraulico',label: 'Hidráulica',  dotColor: 'bg-blue-400',  hasFile: true  },
                { id: 'incendio',  label: 'Incêndio',    dotColor: 'bg-rose-400',  hasFile: false },
              ].map((item) => {
                const key      = item.id as BIMSystem;
                const isVisible = visibleSystems[key];
                const isLoading = loadingSystems.has(key);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleSystem(key)}
                    disabled={isLoading || !item.hasFile}
                    title={!item.hasFile ? 'Arquivo IFC não disponível' : undefined}
                    className={`px-3 py-1 rounded-full border text-[11px] font-sans flex items-center gap-1.5 transition duration-150 ${
                      !item.hasFile
                        ? 'opacity-35 cursor-not-allowed bg-slate-950/10 text-slate-600 border-slate-950/30'
                        : isLoading
                          ? 'cursor-wait bg-slate-800 text-slate-400 border-slate-700'
                          : isVisible
                            ? 'cursor-pointer bg-slate-900 text-slate-200 border-slate-700'
                            : 'cursor-pointer bg-slate-950/20 text-slate-500 border-slate-950/50 line-through'
                    }`}
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-2.5 w-2.5 text-slate-400" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                    ) : (
                      <span className={`h-1.5 w-1.5 rounded-full ${isVisible && item.hasFile ? item.dotColor : 'bg-slate-600'}`} />
                    )}
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


