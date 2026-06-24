/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

import AccessibilityPanel from './components/AccessibilityPanel';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import ContactSection from './sections/ContactSection';
import DifferentialsSection from './sections/DifferentialsSection';
import FooterSection from './sections/FooterSection';
import HeaderSection from './sections/HeaderSection';
import HeroSection from './sections/HeroSection';
import PartnershipsSection from './sections/PartnershipsSection';
import PortfolioSection from './sections/PortfolioSection';
import SimulatorSection from './sections/SimulatorSection';
import SpecialitiesSection from './sections/SpecialitiesSection';
import TestimonialsSection from './sections/TestimonialsSection';

export default function App() {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'extra'>('normal');

  useEffect(() => {
    const root = document.documentElement;

    if (textSize === 'large') {
      root.style.fontSize = '18px';
      return;
    }

    if (textSize === 'extra') {
      root.style.fontSize = '20px';
      return;
    }

    root.style.fontSize = '16px';
  }, [textSize]);

  useEffect(() => {
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
      return;
    }

    document.body.classList.remove('high-contrast');
  }, [isHighContrast]);

  return (
    <div className={`min-h-screen font-sans ${isHighContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'}`}>
      <AccessibilityPanel
        onHighContrastToggle={setIsHighContrast}
        isHighContrast={isHighContrast}
        onTextSizeChange={setTextSize}
        textSize={textSize}
      />

      <HeaderSection isHighContrast={isHighContrast} />

      <main id="main-content" role="main">
        <HeroSection />
        <SpecialitiesSection />
        <SimulatorSection />
        <DifferentialsSection isHighContrast={isHighContrast} />
        <PortfolioSection />
        <PartnershipsSection />
        <TestimonialsSection />
        <ContactSection isHighContrast={isHighContrast} />
      </main>

      <FooterSection isHighContrast={isHighContrast} />
      <FloatingWhatsAppButton />
    </div>
  );
}
