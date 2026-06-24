/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Sparkles, Building2, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactFormProps {
  isHighContrast: boolean;
}

export default function ContactForm({ isHighContrast }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    city: '',
    buildingType: 'residencial_vertical',
    area: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const buildingTypes = [
    { id: 'residencial_vertical', name: 'Residencial Vertical (Torre)' },
    { id: 'comercial_corporativo', name: 'Comercial & Corporativo' },
    { id: 'industrial_galpao', name: 'Industrial & Logística' },
    { id: 'residencial_horizontal', name: 'Residencial Horizontal' }
  ];

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const currentThemeClasses = {
    card: isHighContrast 
      ? 'bg-black border-2 border-white text-white' 
      : 'bg-slate-900/60 backdrop-blur-md border border-slate-800 text-white',
    input: isHighContrast 
      ? 'bg-black border border-white text-white focus:outline-none focus:border-yellow-405 placeholder-slate-400' 
      : 'bg-slate-950/65 border border-slate-800 text-white focus:outline-none focus:border-[#315676] focus:ring-1 focus:ring-[#315676]/35 placeholder-slate-500',
    label: 'block text-xs font-bold uppercase tracking-wider font-mono text-slate-300 mb-1.5',
    button: isHighContrast 
      ? 'bg-white text-black hover:bg-slate-200' 
      : 'bg-[#315676] text-white hover:bg-[#254261] shadow-lg shadow-blue-950/10'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.whatsapp.trim()) {
      setErrorMsg('Por favor, preencha os campos obrigatórios (Nome, E-mail e WhatsApp).');
      return;
    }

    setIsLoading(true);

    // Simulate server request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const getSuccessWhatsAppLink = () => {
    const number = "5511945406289";
    const selectedBuildingTypeName = buildingTypes.find(b => b.id === formData.buildingType)?.name || 'Empreendimento';
    const areaString = formData.area ? ` de cerca de ${formData.area}m²` : '';
    const cityString = formData.city ? ` localizada na cidade de ${formData.city}` : '';
    const details = formData.message ? `\n\nDetalhes sobre a obra: "${formData.message}"` : '';

    const text = encodeURIComponent(
      `Olá Duall Engenharia! Meu nome é ${formData.name}. Enviei um contato pelo site para solicitar orçamento de projetos de instalações para uma obra do tipo ${selectedBuildingTypeName}${areaString}${cityString}.${details}\n\nGostaria de agendar uma reunião técnica com um engenheiro coordenador.`
    );
    return `https://wa.me/${number}?text=${text}`;
  };

  return (
    <div className={`p-6 md:p-8 rounded-3xl shadow-xl ${currentThemeClasses.card}`}>
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit} 
            className="space-y-4"
          >
            <div>
              <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#315676] font-mono mb-1">
                <Sparkles size={11} /> Atendimento Premium
              </span>
              <h3 className="text-lg font-display font-extrabold tracking-tight">Fale com Nossos Especialistas</h3>
              <p className="text-slate-400 text-xs mt-1">Preencha os dados abaixo e entraremos em contato prontamente.</p>
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={currentThemeClasses.label}>Nome Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all ${currentThemeClasses.input}`}
                />
              </div>

              <div>
                <label className={currentThemeClasses.label}>E-mail Corporativo *</label>
                <input
                  type="email"
                  required
                  placeholder="exemplo@empresa.com.br"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all ${currentThemeClasses.input}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={currentThemeClasses.label}>WhatsApp / Telefone *</label>
                <input
                  type="tel"
                  required
                  placeholder="(11) 99999-9999"
                  value={formData.whatsapp}
                  onChange={(e) => updateField('whatsapp', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all ${currentThemeClasses.input}`}
                />
              </div>

              <div>
                <label className={currentThemeClasses.label}>Cidade / UF</label>
                <input
                  type="text"
                  placeholder="São Paulo - SP"
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all ${currentThemeClasses.input}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={currentThemeClasses.label}>Tipo de Obra</label>
                <select
                  value={formData.buildingType}
                  onChange={(e) => updateField('buildingType', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all appearance-none cursor-pointer ${currentThemeClasses.input}`}
                >
                  {buildingTypes.map(b => (
                    <option key={b.id} value={b.id} className="bg-slate-900 text-white">
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={currentThemeClasses.label}>Área Estimada (m²)</label>
                <input
                  type="number"
                  placeholder="Ex: 5000"
                  value={formData.area}
                  onChange={(e) => updateField('area', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all ${currentThemeClasses.input}`}
                />
              </div>
            </div>

            <div>
              <label className={currentThemeClasses.label}>Fale sobre as suas necessidades de projetos</label>
              <textarea
                rows={3}
                placeholder="Descreva brevemente o escopo necessário (Elétrico, Hidráulico, Incêndio, Ar condicionado)."
                value={formData.message}
                onChange={(e) => updateField('message', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all resize-none ${currentThemeClasses.input}`}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-6 rounded-xl font-bold font-sans text-sm transition-all flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50 cursor-pointer ${currentThemeClasses.button}`}
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-t-transparent border-slate-950 animate-spin rounded-full" />
                  Carregando...
                </>
              ) : (
                <>
                  Solicitar Contato Técnico <Send size={15} />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-8 text-center space-y-6"
          >
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-display font-extrabold text-white">Mensagem Enviada!</h3>
              <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
                Prezado <strong>{formData.name}</strong>, seus dados técnicos foram recebidos por nosso time de engenharia.
              </p>
              <p className="text-slate-400 text-xs max-w-xs mx-auto">
                Para acelerar seu atendimento e agendar sua consulta técnica imediata, clique no botão abaixo para nos enviar as informações diretamente no WhatsApp.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <a
                href={getSuccessWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/15"
              >
                <Phone size={16} /> Falar com engenheiro no WhatsApp
              </a>

              <button
                onClick={() => setIsSubmitted(false)}
                className="text-slate-400 hover:text-white text-xs underline font-semibold transition"
              >
                Enviar Outra Solicitação
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
