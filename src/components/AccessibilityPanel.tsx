/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Contrast, Type, Info, HelpCircle } from 'lucide-react';

interface AccessibilityPanelProps {
  onHighContrastToggle: (active: boolean) => void;
  isHighContrast: boolean;
  onTextSizeChange: (size: 'normal' | 'large' | 'extra') => void;
  textSize: 'normal' | 'large' | 'extra';
}

export default function AccessibilityPanel({
  onHighContrastToggle,
  isHighContrast,
  onTextSizeChange,
  textSize
}: AccessibilityPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showShortcutModal, setShowShortcutModal] = useState(false);

  // Keyboard navigation shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ALT + C: Contrast Toggle
      if (e.altKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        onHighContrastToggle(!isHighContrast);
        announceToScreenReader(`Modo de alto contraste ${!isHighContrast ? 'ativado' : 'desativado'}`);
      }
      // ALT + T: Toggle Panel Open
      if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      // ALT + A: Font enlargement
      if (e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if (textSize === 'normal') {
          onTextSizeChange('large');
          announceToScreenReader('Tamanho do texto aumentado para grande');
        } else if (textSize === 'large') {
          onTextSizeChange('extra');
          announceToScreenReader('Tamanho do texto aumentado para extra grande');
        } else {
          onTextSizeChange('normal');
          announceToScreenReader('Tamanho do texto retornado ao normal');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHighContrast, textSize, onHighContrastToggle, onTextSizeChange]);

  const announceToScreenReader = (message: string) => {
    const announcer = document.getElementById('sr-announcer');
    if (announcer) {
      announcer.textContent = message;
    }
  };

  return (
    <>
      {/* Off-screen Live region for announcements */}
      <div
        id="sr-announcer"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      ></div>

      {/* Skip to Main Content Link for WCAG Keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-duall-gold focus:text-duall-dark focus:px-4 focus:py-2 focus:rounded-md focus:font-bold focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-400"
      >
        Pular para o conteúdo principal
      </a>

      {/* Floating Accessibility Trigger */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
        {isOpen && (
          <div
            className={`p-4 rounded-xl shadow-2xl border ${
              isHighContrast 
                ? 'bg-black text-white border-white' 
                : 'bg-white text-duall-dark border-slate-100'
            } w-72 mb-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5`}
            role="status"
            aria-label="Acessibilidade"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-display font-semibold text-sm">Painel de Acessibilidade</h3>
              <button
                onClick={() => setIsOpen(false)}
                className={`text-xs px-2 py-1 rounded cursor-pointer ${
                  isHighContrast ? 'bg-white text-black' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                aria-label="Fechar painel acessível"
              >
                Voltar
              </button>
            </div>

            <div className="space-y-4">
              {/* Contrast switch */}
              <div>
                <label className="text-xs font-medium block mb-2">Contraste de Tela</label>
                <button
                  onClick={() => {
                    onHighContrastToggle(!isHighContrast);
                    announceToScreenReader(`Alto contraste ${!isHighContrast ? 'ativado' : 'desativado'}`);
                  }}
                  className={`w-full py-2 px-3 rounded-lg flex items-center justify-between text-xs font-bold border transition ${
                    isHighContrast 
                      ? 'bg-white text-black border-white hover:bg-slate-100' 
                      : 'bg-[#355979] text-white border-transparent hover:bg-opacity-95'
                  }`}
                  aria-pressed={isHighContrast}
                >
                  <span className="flex items-center gap-1.5">
                    <Contrast size={14} />
                    {isHighContrast ? 'Desativar Alto Contraste' : 'Ativar Alto Contraste'}
                  </span>
                  <span className="text-[10px] opacity-75">Alt + C</span>
                </button>
              </div>

              {/* Font Sizing Buttons */}
              <div>
                <label className="text-xs font-medium block mb-1.5">Ampliação de Fonte</label>
                <div className="grid grid-cols-3 gap-1">
                  {(['normal', 'large', 'extra'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        onTextSizeChange(size);
                        announceToScreenReader(`Tamanho de texto definido como ${size}`);
                      }}
                      className={`py-1.5 text-xs rounded border transition font-medium ${
                        textSize === size
                          ? isHighContrast
                            ? 'bg-white text-black border-white'
                            : 'bg-duall-gold text-duall-dark border-duall-gold'
                          : isHighContrast
                          ? 'bg-black text-white border-slate-500 hover:border-white'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                      aria-label={`Alterar fonte para tamanho ${size}`}
                    >
                      {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                    </button>
                  ))}
                </div>
                <div className="text-[10px] mt-1 text-slate-500 flex justify-between">
                  <span>Atalho para ciclo de fontes</span>
                  <span className="font-mono">Alt + A</span>
                </div>
              </div>

              {/* Helpful Tips */}
              <div className="border-t pt-2 mt-2 border-slate-200/50">
                <button
                  onClick={() => setShowShortcutModal(true)}
                  className="w-full flex items-center justify-between text-xs text-slate-500 hover:text-duall-blue outline-none"
                >
                  <span className="flex items-center gap-1.5">
                    <HelpCircle size={13} />
                    Teclas de Atalho de Navegação
                  </span>
                  <span>Opções</span>
                </button>
              </div>

              <div className="text-[10px] text-slate-400 mt-2 leading-tight flex items-start gap-1">
                <Info size={11} className="shrink-0 mt-0.5" />
                <span>Otimizado em conformidade com as diretrizes do WCAG 2.1 Nível AA.</span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 p-3.5 rounded-full shadow-xl font-bold text-sm bg-duall-dark text-white border hover:bg-slate-800 transition transform hover:scale-105 active:scale-95 ${
            isHighContrast ? 'border-white bg-[#000]' : 'border-[#355979]'
          }`}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="Opções de Acessibilidade visual"
        >
          <Type size={18} />
          {isOpen ? 'Fechar Opções' : 'Acessibilidade'}
        </button>
      </div>

      {/* Shortcuts modal dialog */}
      {showShortcutModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          role="dialog"
          aria-labelledby="modal-shortcut-title"
          aria-modal="true"
        >
          <div className={`p-6 rounded-2xl max-w-sm w-full shadow-2xl border ${
            isHighContrast ? 'bg-black text-white border-white' : 'bg-white text-[#1e293b] border-slate-100'
          }`}>
            <h4 id="modal-shortcut-title" className="font-display font-semibold text-lg mb-4 text-duall-blue">
              Atalhos de Teclado (WCAG)
            </h4>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span>Alternar alto contraste</span>
                <kbd className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600 font-mono border">Alt + C</kbd>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Ampliar/Ciclar fontes</span>
                <kbd className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600 font-mono border">Alt + A</kbd>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Abrir/Fechar painel</span>
                <kbd className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600 font-mono border">Alt + T</kbd>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Ir para Conteúdo</span>
                <kbd className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600 font-mono border">Tab + Enter</kbd>
              </div>
            </div>
            <button
              onClick={() => setShowShortcutModal(false)}
              className="w-full py-2 bg-duall-blue hover:bg-opacity-95 text-white font-semibold rounded-lg text-sm transition"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
}
