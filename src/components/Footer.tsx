import React from 'react';
import { MessageCircle, Instagram, Send, ShieldCheck, Heart } from 'lucide-react';
import { WHATSAPP_PHONE } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-cinzel text-xl font-bold tracking-wider silver-text-gradient uppercase">
                Vendas da Prata
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Moda contemporânea, vestuário de corte nobre e acessórios sofisticados da marca Vendas da Prata.
              Atendimento exclusivo e entregas rápidas em Luanda e em todas as províncias de Angola.
            </p>
            <div className="pt-2 text-[11px] text-neutral-500">
              WhatsApp Oficial: <strong className="text-slate-300">+244 955 987 042</strong>
            </div>
          </div>

          {/* Categorias & Links Rápidos */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-white uppercase tracking-wider font-cinzel">
              Coleções
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Vestuário Feminino & Masculino
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Correntes & Pulseiras Exclusivas
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Relógios & Óculos de Sol
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Alfaiataria & Vestidos de Gala
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Peças em Promoção
                </a>
              </li>
            </ul>
          </div>

          {/* Atendimento & Políticas */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-white uppercase tracking-wider font-cinzel">
              Atendimento ao Cliente
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Suporte Direto WhatsApp</span>
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Guia de Medidas & Tamanhos
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Política de Trocas e Devoluções
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Prazos e Regiões de Envio
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Garantia de Qualidade & Autenticidade
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociais & Pagamento */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-white uppercase tracking-wider font-cinzel">
              Conecte-se Conosco
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-neutral-800 transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-neutral-800 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-neutral-800 transition-colors"
                title="TikTok"
              >
                <span className="font-bold text-xs">TT</span>
              </a>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-medium">
                Métodos de Pagamento Aceitos
              </span>
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
                <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">
                  Multicaixa Express
                </span>
                <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">
                  Transferência BAI / BFA
                </span>
                <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">
                  Dinheiro na Entrega
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits: Respectful and clear attribution */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Vendas da Prata. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-1.5 text-neutral-400">
            <span>Desenvolvido e Estruturado por</span>
            <span className="text-slate-200 font-semibold px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
              H-Digital
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
