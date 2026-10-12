import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { WHATSAPP_PHONE } from '../utils/whatsapp';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const heroImage = '/src/assets/images/hero_fashion_prata_1791524937102.jpg';

  const handleWhatsAppConsult = () => {
    const text = encodeURIComponent(
      'Olá, equipa Vendas da Prata! Gostaria de consultar o catálogo exclusivo e tirar dúvidas sobre as peças de vestuário e acessórios.'
    );
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-neutral-950 border-b border-neutral-800/80">
      {/* Subtle radial ambient light */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-slate-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 md:space-y-8 z-10">
            {/* Quiet metadata kicker */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-400 font-medium tracking-widest uppercase flex-wrap">
              <span>Coleção 2026</span>
              <span aria-hidden="true">·</span>
              <span>Vestuário & Acessórios</span>
              <span aria-hidden="true">·</span>
              <span>Luanda, Angola</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-cinzel text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.18] text-balance">
              A Elegância do Vestuário com o Brilho da{' '}
              <span className="silver-text-gradient">Prata Autêntica</span>
            </h1>

            {/* Editorial Body */}
            <p className="text-sm sm:text-base lg:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed">
              Curadoria de alta costura, cortes impecáveis e acessórios exclusivos da marca Vendas da Prata.
              Escolha suas peças exclusivas e receba diretamente em sua morada com entrega rápida
              e atendimento humanizado no WhatsApp.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-slate-100 hover:bg-white text-neutral-950 font-semibold text-xs sm:text-sm rounded-lg transition-all shadow-lg hover:shadow-slate-200/10 active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <span>Ver Catálogo em Destaque</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppConsult}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-slate-200 hover:text-white font-medium text-xs sm:text-sm rounded-lg border border-neutral-700/80 transition-all active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Atendimento WhatsApp (+244)</span>
              </button>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-4 sm:pt-6 border-t border-neutral-800/80 grid grid-cols-3 gap-2 sm:gap-4 text-[10px] sm:text-xs text-neutral-400">
              <div className="space-y-0.5 sm:space-y-1">
                <span className="block font-semibold text-slate-200 truncate">Qualidade Exclusiva</span>
                <span className="text-[10px] sm:text-[11px] text-neutral-500 truncate block">Com garantia</span>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="block font-semibold text-slate-200 truncate">Envio Todo País</span>
                <span className="text-[10px] sm:text-[11px] text-neutral-500 truncate block">18 províncias</span>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="block font-semibold text-slate-200 truncate">Multicaixa & TPA</span>
                <span className="text-[10px] sm:text-[11px] text-neutral-500 truncate block">100% seguro</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Campaign Image */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/40 bg-neutral-900 shadow-2xl group">
              <img
                src={heroImage}
                alt="Campanha Editorial Vendas da Prata"
                className="w-full h-[280px] xs:h-[340px] sm:h-[440px] lg:h-[520px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Quiet editorial photo caption overlay */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium block">
                    Editorial Vendas da Prata
                  </span>
                  <span className="font-cinzel text-xs sm:text-sm font-bold text-slate-100">
                    Edição Noir & Platina
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-slate-200 text-neutral-950">
                  Novidades
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
