import React from 'react';
import { ShieldCheck, Truck, MessageCircle, RefreshCw } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Qualidade Exclusiva & Acabamento Premium',
      description:
        'Acessórios selecionados com durabilidade superior e peças de vestuário com alfaiataria fina e tecidos nobres da Vendas da Prata.',
    },
    {
      icon: Truck,
      title: 'Entrega Rápida em Angola',
      description:
        'Envio expresso para Luanda no mesmo dia ou dia seguinte, e despacho seguro para todas as 18 províncias com rastreio.',
    },
    {
      icon: RefreshCw,
      title: 'Troca Fácil & Sem Burocracia',
      description:
        'Caso precise ajustar o tamanho de uma roupa ou anel, nossa equipe realiza a troca com total agilidade e respeito ao cliente.',
    },
    {
      icon: MessageCircle,
      title: 'Atendimento VIP no WhatsApp',
      description:
        'Fale diretamente com nossa consultoria pelo (+244) 955 987 042. Enviamos vídeos detalhados das peças antes do envio.',
    },
  ];

  return (
    <section id="sobre" className="py-12 sm:py-16 md:py-24 bg-neutral-950 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-slate-400 uppercase">
            Compromisso Vendas da Prata
          </span>
          <h2 className="font-cinzel text-xl sm:text-3xl md:text-4xl font-bold text-white">
            Por Que Comprar Conosco?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            A união entre curadoria refinada de moda, joalharia autêntica e um serviço de entrega
            dedicado aos clientes mais exigentes.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-slate-400/40 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-slate-200">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-semibold text-base text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-800/60 flex items-center text-[11px] text-slate-400">
                  <span>Garantia Vendas da Prata</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
