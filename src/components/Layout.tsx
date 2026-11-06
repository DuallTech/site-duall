import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import FooterSection from '../sections/FooterSection';
import HeaderSection from '../sections/HeaderSection';
import AccessibilityPanel from './AccessibilityPanel';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function Layout() {
  const { pathname } = useLocation();
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'extra'>('normal');

  useEffect(() => {
    document.documentElement.style.fontSize = textSize === 'large' ? '18px' : textSize === 'extra' ? '20px' : '16px';
  }, [textSize]);

  useEffect(() => {
    document.body.classList.toggle('high-contrast', isHighContrast);
  }, [isHighContrast]);

  return (
    <div className={`min-h-screen font-sans ${isHighContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`}>
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-white px-4 py-2 font-semibold text-slate-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Ir para o conteúdo
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <ScrollManager />
      <AccessibilityPanel
        onHighContrastToggle={setIsHighContrast}
        isHighContrast={isHighContrast}
        onTextSizeChange={setTextSize}
        textSize={textSize}
      />
      <HeaderSection isHighContrast={isHighContrast} />
      <main id="main-content" key={pathname} className="page-in">
        <Outlet />
      </main>
      <FooterSection isHighContrast={isHighContrast} />
      <FloatingWhatsAppButton />
    </div>
  );
}
