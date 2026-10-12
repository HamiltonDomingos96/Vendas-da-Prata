import React, { useState } from 'react';
import { ShoppingBag, Search, Sparkles, BookOpen, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenDesignSystem: () => void;
  activeCategory: string;
  onSelectCategory: (category: 'todos' | 'vestuario' | 'acessorios') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenDesignSystem,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [logoError, setLogoError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Direct Dropbox raw link with fallback
  const dropboxLogoUrl =
    'https://www.dropbox.com/scl/fi/paxpvz6szzi59fxphlpdv/IMG-20261008-WA0097.jpg?rlkey=wjc1su05axc74x3uzhu68x2kb&st=mp4ndyde&raw=1';

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 transition-all">
      {/* Top Notification Bar (Promotional restraint: 1 slim bar <= 36px) */}
      <div className="bg-neutral-900 border-b border-neutral-800/60 py-1.5 px-3 sm:px-4 text-center text-[11px] sm:text-xs text-neutral-300 flex items-center justify-center gap-1.5 sm:gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
        <span className="font-medium tracking-wide truncate max-w-full">
          <span className="hidden sm:inline">Envio rápido para Luanda e Províncias · </span>
          Pedidos & Atendimento VIP WhatsApp (+244) 955 987 042
        </span>
      </div>

      {/* Main Navigation: 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-8">
        {/* Zone 1: Brand & Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 min-w-0">
          <a href="#" className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-slate-400/30 bg-neutral-900 flex items-center justify-center shadow-inner group-hover:border-slate-300 transition-colors shrink-0">
              {!logoError ? (
                <img
                  src={dropboxLogoUrl}
                  alt="Vendas da Prata Logo"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-slate-200">
                  <span className="font-cinzel text-[10px] sm:text-xs font-bold tracking-widest text-slate-100">VP</span>
                </div>
              )}
            </div>

            <div className="flex flex-col min-w-0">
              <span className="font-cinzel text-sm sm:text-lg md:text-xl font-bold tracking-wider silver-text-gradient uppercase leading-tight truncate">
                Vendas da Prata
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-slate-400 uppercase font-sans truncate">
                Vestuário & Acessórios
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Navigation Links (Single-line, quiet typography) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <button
            onClick={() => onSelectCategory('todos')}
            className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeCategory === 'todos' ? 'text-white border-b-2 border-slate-300 pb-0.5' : ''
            }`}
          >
            Coleção Completa
          </button>
          <button
            onClick={() => onSelectCategory('vestuario')}
            className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeCategory === 'vestuario' ? 'text-white border-b-2 border-slate-300 pb-0.5' : ''
            }`}
          >
            Vestuário & Moda
          </button>
          <button
            onClick={() => onSelectCategory('acessorios')}
            className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeCategory === 'acessorios' ? 'text-white border-b-2 border-slate-300 pb-0.5' : ''
            }`}
          >
            Acessórios & Coleção
          </button>
          <a
            href="#sobre"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Por Que Nós
          </a>
          <a
            href="#avaliacoes"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Avaliações
          </a>
        </nav>

        {/* Zone 3: Actions (Search, Design System, Cart CTA) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Search Bar toggle / input */}
          <div className="relative hidden sm:block">
            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 focus-within:border-slate-500 transition-colors">
              <Search className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Buscar modelo ou peça..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-transparent text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none w-36 lg:w-48"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-neutral-500 hover:text-neutral-300 text-xs ml-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Design System & Style Guide Button */}
          <button
            onClick={onOpenDesignSystem}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors whitespace-nowrap"
            title="Ver Guia de Estilo UI/UX & Código Vanilla"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>Guia de Estilo</span>
          </button>

          {/* Shopping Bag Button with Counter */}
          <button
            onClick={onOpenCart}
            aria-label="Abrir carrinho de compras"
            className="relative flex items-center gap-2 px-3.5 py-2.5 bg-slate-100 hover:bg-white text-neutral-950 font-semibold text-xs rounded-lg transition-all shadow-md active:scale-95 whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Carrinho</span>
            {cartCount > 0 && (
              <span className="bg-neutral-950 text-slate-100 text-[10px] font-bold px-1.5 py-0.5 rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-2 pb-6 space-y-4">
          <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Buscar roupas e acessórios..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none w-full"
            />
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => {
                onSelectCategory('todos');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 px-3 rounded text-sm ${
                activeCategory === 'todos' ? 'bg-neutral-900 text-white font-semibold' : 'text-neutral-400'
              }`}
            >
              Coleção Completa
            </button>
            <button
              onClick={() => {
                onSelectCategory('vestuario');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 px-3 rounded text-sm ${
                activeCategory === 'vestuario' ? 'bg-neutral-900 text-white font-semibold' : 'text-neutral-400'
              }`}
            >
              Vestuário & Moda Feminina / Masculina
            </button>
            <button
              onClick={() => {
                onSelectCategory('acessorios');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 px-3 rounded text-sm ${
                activeCategory === 'acessorios' ? 'bg-neutral-900 text-white font-semibold' : 'text-neutral-400'
              }`}
            >
              Acessórios & Coleção Exclusiva
            </button>
            <a
              href="#sobre"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2 px-3 text-sm text-neutral-400 hover:text-white"
            >
              Por Que Comprar Conosco
            </a>
            <a
              href="#avaliacoes"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2 px-3 text-sm text-neutral-400 hover:text-white"
            >
              Depoimentos de Clientes
            </a>
            <button
              onClick={() => {
                onOpenDesignSystem();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 py-2 px-3 text-sm text-slate-300 hover:text-white border-t border-neutral-900 pt-3"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Ver Guia de Estilo & Código Fonte</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
