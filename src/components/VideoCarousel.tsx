/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Info, Video, Check, ExternalLink } from 'lucide-react';
import { VIDEO_DIFFERENTIALS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface VideoCarouselProps {
  isHighContrast: boolean;
}

export default function VideoCarousel({ isHighContrast }: VideoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [activeHighlight, setActiveHighlight] = useState(0);

  const currentVideo = VIDEO_DIFFERENTIALS[activeIndex];

  // Map duration string "1:45" to total seconds
  const parseDurationToSeconds = (durationStr: string) => {
    const parts = durationStr.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  };

  const totalSeconds = parseDurationToSeconds(currentVideo.duration);

  // Playback timeline animation simulator
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setPlaybackTime(prev => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return 0;
          }
          const nextVal = prev + 1;
          
          // Determine which text highlight to show based on seconds
          if (nextVal < 15) {
            setActiveHighlight(0);
          } else if (nextVal >= 15 && nextVal < 45) {
            setActiveHighlight(1);
          } else {
            setActiveHighlight(2);
          }

          return nextVal;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalSeconds]);

  // Handle resetting state when switching differential
  const handleSwitchVideo = (newIndex: number) => {
    setIsPlaying(false);
    setPlaybackTime(0);
    setActiveHighlight(0);
    setActiveIndex(newIndex);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % VIDEO_DIFFERENTIALS.length;
    handleSwitchVideo(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + VIDEO_DIFFERENTIALS.length) % VIDEO_DIFFERENTIALS.length;
    handleSwitchVideo(prevIdx);
  };

  // Convert seconds to visual display format (e.g., 75 sec -> "1:15")
  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Generate premade whatsapp deep-link for specific differential
  const getWhatsAppMessageUrl = () => {
    const number = "5511945406289";
    const text = encodeURIComponent(
      `Olá Duall Engenharia! Vi a apresentação sobre "${currentVideo.title}" no site e gostaria de conversar com um engenheiro sobre como podemos aplicar essa tecnologia BIM no meu empreendimento.`
    );
    return `https://wa.me/${number}?text=${text}`;
  };

  return (
    <div className="space-y-8 select-none">
      
      {/* Top Select Tab Buttons */}
      <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-none pb-1 gap-2">
        {VIDEO_DIFFERENTIALS.map((video, idx) => (
          <button
            key={video.id}
            onClick={() => handleSwitchVideo(idx)}
            className={`whitespace-nowrap px-4 py-2.5 font-display text-sm font-semibold transition-all border-b-2 cursor-pointer ${
              idx === activeIndex
                ? 'border-duall-blue text-duall-blue font-bold scale-102'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {video.category}
          </button>
        ))}
      </div>

      {/* Main Grid: Video Player + Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Premium Interactive Media Player */}
        <div className="lg:col-span-7 bg-[#0b0f19] rounded-2xl overflow-hidden shadow-2xl relative border border-slate-800">
          
          {/* Header Bar */}
          <div className="bg-[#101726]/90 px-4 py-3 flex items-center justify-between border-b border-slate-800 text-xs">
            <span className="font-display font-medium text-slate-300 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
              <Video size={13} className="text-[#315676]" />
              Duall Media Player v4.0
            </span>
            <span className="text-slate-400 font-mono">
              RESOLUÇÃO: 1080P PRO
            </span>
          </div>

          {/* Core Player Stage with responsive sizing */}
          <div className="aspect-video relative overflow-hidden flex items-center justify-center bg-black group">
            
            {/* Background Thumbnail Image with overlay */}
            <img
              src={currentVideo.thumbnailUrl}
              alt={currentVideo.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isPlaying ? 'scale-105 filter brightness-30 blur-xs' : 'brightness-60 filter contrast-105'
              }`}
              referrerPolicy="no-referrer"
            />

            {/* Glowing Tech Mesh Overlay */}
            <div className="absolute inset-0 bg-[#0f172a]/20 mix-blend-overlay pointer-events-none" />

            {/* Simulated Live Animation elements whilst playing */}
            {isPlaying && (
              <div className="absolute inset-0 bg-transparent flex flex-col items-center justify-center pointer-events-none p-4 text-center">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-dashed border-duall-blue rounded-full animate-spin duration-10000 opacity-60" />
                  <div className="absolute inset-2 border border-sky-500/30 rounded-full animate-ping duration-3000" />
                  <div className="font-mono text-[10px] text-duall-blue opacity-90 relative mt-1 tracking-widest uppercase">
                    BIM_LOD_400
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-mono text-[#00b4d8] border border-cyan-500/20">
                  ESTUDO_A-{activeIndex + 1}
                </div>
              </div>
            )}

            {/* Floating text description overlay during playback */}
            <div className="absolute inset-x-0 bottom-14 px-4 py-2 bg-gradient-to-t from-black via-black/40 to-transparent text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeHighlight}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xs md:text-sm font-sans font-medium text-white max-w-md mx-auto line-clamp-1"
                >
                  {currentVideo.videoHighlights[activeHighlight]?.text}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Centered Large Play Button if idle */}
            {!isPlaying && (
              <button
                onClick={() => setIsPlaying(true)}
                className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center bg-[#315676] text-white hover:bg-[#254261] shadow-2xl transition cursor-pointer transform hover:scale-110 active:scale-95"
                aria-label="Reproduzir vídeo corporativo"
              >
                <Play size={24} className="ml-1" />
              </button>
            )}

          </div>

          {/* Custom Player Controls */}
          <div className="bg-[#101726] p-4 text-white border-t border-slate-800">
            {/* Timeline Progress Bar */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-mono text-slate-400">
                {formatSeconds(playbackTime)}
              </span>
              <div 
                className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = clickX / rect.width;
                  setPlaybackTime(Math.floor(ratio * totalSeconds));
                }}
              >
                <div 
                  className="h-full bg-[#315676] rounded-full relative transition-all duration-300"
                  style={{ width: `${(playbackTime / totalSeconds) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full border border-sky-500 shadow-sm" />
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {currentVideo.duration}
              </span>
            </div>

            {/* Playback Buttons list */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white cursor-pointer active:scale-95 transition"
                  aria-label={isPlaying ? 'Pausar' : 'Iniciar'}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </button>

                <div className="text-left font-display">
                  <h4 className="text-xs font-bold text-white line-clamp-1">{currentVideo.title}</h4>
                  <p className="text-[10px] text-slate-400">Diferenciais Duall Engenharia</p>
                </div>
              </div>

              {/* Selector buttons for Carousel */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded bg-slate-850 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer active:scale-95 transition"
                  aria-label="Vídeo anterior"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-[10px] text-slate-400 font-mono px-1">
                  {activeIndex + 1}/{VIDEO_DIFFERENTIALS.length}
                </span>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded bg-slate-850 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer active:scale-95 transition"
                  aria-label="Próximo vídeo"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Right Side: Highlights & Explainer card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-[#315676] uppercase tracking-wider">{currentVideo.category}</span>
              <h3 className="text-xl font-display font-bold text-slate-900 mt-1">
                {currentVideo.title}
              </h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                {currentVideo.description}
              </p>
            </div>

            {/* Video Interactive Markers */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-[#355979] tracking-wide uppercase">Destaques do Vídeo:</h4>
              <div className="space-y-2">
                {currentVideo.videoHighlights.map((highlight, index) => {
                  const isPast = playbackTime >= parseDurationToSeconds(highlight.time);
                  return (
                    <div
                      key={index}
                      onClick={() => setPlaybackTime(parseDurationToSeconds(highlight.time))}
                      className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                        activeHighlight === index
                          ? 'bg-slate-100 text-[#0f2d4a] border-[#315676]/30 font-medium font-semibold'
                          : isPast
                          ? 'bg-slate-50/70 text-slate-500 border-slate-100'
                          : 'bg-white text-slate-700 border-slate-100 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        activeHighlight === index
                          ? 'bg-[#315676] text-white'
                          : isPast
                          ? 'bg-slate-200 text-slate-600'
                          : 'bg-slate-100 text-slate-400'
                      }`}>
                        {isPast ? <Check size={11} strokeWidth={3} /> : <span className="font-mono text-[9px]">{highlight.time}</span>}
                      </div>
                      <div className="flex-1">
                        <span className="font-mono text-[10px] block opacity-75">{highlight.time}</span>
                        <p className="leading-tight mt-0.5">{highlight.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Call to talk about this solution */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Info size={16} className="text-slate-400 shrink-0" />
              <p className="text-xs text-slate-500 leading-tight">
                Simule esse desvio ou tecnologia de cálculo diretamente incorporados no projeto do seu empreendimento.
              </p>
            </div>
            <a
              href={getWhatsAppMessageUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 bg-duall-blue hover:bg-opacity-95 text-white shadow-md rounded-lg font-bold text-xs flex items-center gap-1.5 shrink-0 transition"
            >
              Falar com Autor <ExternalLink size={12} />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
