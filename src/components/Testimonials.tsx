import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Dra. Elsa Domingos',
      localizacao: 'Luanda, Miramar',
      peca: 'Vestido Curto Frente Única com Babados (Peça Única)',
      comentario:
        'O caimento do vestido é simplesmente perfeito, o tom de azul é maravilhoso e os babados dão um movimento muito elegante. Por ser peça única, sinto-me com um look exclusivo. O atendimento pelo WhatsApp foi impecável!',
      estrelas: 5,
      data: 'Março 2026',
    },
    {
      name: 'Teresa Manuel',
      localizacao: 'Luanda, Talatona',
      peca: 'Vestido Curto Listrado Transpassado (Peça Única)',
      comentario:
        'A qualidade do tecido de viscose é muito fresca e o detalhe transpassado na cintura veste muito bem no corpo. Comprei pela manhã e à tarde já estava na minha morada. Super recomendo a Vendas da Prata!',
      estrelas: 5,
      data: 'Abril 2026',
    },
    {
      name: 'Madalena Sebastião',
      localizacao: 'Benguela, Centro',
      peca: 'Vestido Skater Listrado com Patches (Peça Única)',
      comentario:
        'Comprei de Benguela e confesso que tinha receio de comprar online, mas a equipe mandou vídeo da peça no WhatsApp e enviaram por transportadora com todo o cuidado. A peça é linda, cheia de estilo e com acabamento impecável.',
      estrelas: 5,
      data: 'Fevereiro 2026',
    },
  ];

  return (
    <section id="avaliacoes" className="py-12 sm:py-16 md:py-24 bg-neutral-900/40 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-slate-400 uppercase">
            Experiência dos Clientes
          </span>
          <h2 className="font-cinzel text-xl sm:text-3xl md:text-4xl font-bold text-white">
            Quem Compra, Recomenda
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Mais de 1.200 clientes atendidos com elegância e pontualidade em Angola.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-neutral-950/70 border border-neutral-800 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                {/* Stars and verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-slate-300">
                    {Array.from({ length: rev.estrelas }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-slate-300 text-slate-300" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle className="w-3 h-3" />
                    <span>Compra Verificada</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{rev.comentario}"
                </p>
              </div>

              {/* Author info */}
              <div className="pt-4 border-t border-neutral-800/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{rev.name}</h4>
                    <p className="text-[11px] text-neutral-400">{rev.localizacao}</p>
                  </div>
                  <span className="text-[10px] text-neutral-500">{rev.data}</span>
                </div>
                <div className="mt-1.5 text-[11px] text-slate-400 font-medium">
                  {rev.peca}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
