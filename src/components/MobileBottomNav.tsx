import React from 'react';
import { Home, Shirt, ShoppingBag, MessageCircle, SlidersHorizontal } from 'lucide-react';
import { WHATSAPP_PHONE } from '../utils/whatsapp';

interface MobileBottomNavProps {
  cartCount: number;
  onOpenCart: () => void;
  activeCategory: 'todos' | 'vestuario' | 'acessorios';
  onSelectCategory: (category: 'todos' | 'vestuario' | 'acessorios') => void;
  onScrollToCatalog: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cartCount,
  onOpenCart,
  activeCategory,
  onSelectCategory,
  onScrollToCatalog,
}) => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Olá, equipa Vendas da Prata! Gostaria de tirar dúvidas sobre as peças de vestuário e acessórios.'
    );
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-lg border-t border-neutral-800/90 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Início / Catálogo */}
        <button
          onClick={() => {
            onSelectCategory('todos');
            onScrollToCatalog();
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors ${
            activeCategory === 'todos' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight">Catálogo</span>
        </button>

        {/* Vestuário */}
        <button
          onClick={() => {
            onSelectCategory('vestuario');
            onScrollToCatalog();
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors ${
            activeCategory === 'vestuario' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Shirt className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight">Roupas</span>
        </button>

        {/* Carrinho de Compras (com Badge) */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-slate-100 hover:text-white"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-slate-100 text-neutral-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight">Carrinho</span>
        </button>

        {/* WhatsApp Direto */}
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-tight">WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
