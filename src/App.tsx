/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductQuickView } from './components/ProductQuickView';
import { CartDrawer } from './components/CartDrawer';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { DesignSystemModal } from './components/DesignSystemModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Product, CartItem } from './types';
import produtosData from './data/produtos.json';
import { Sparkles, MessageCircle, Filter, BookOpen, LayoutGrid, Square } from 'lucide-react';
import { WHATSAPP_PHONE } from './utils/whatsapp';

export default function App() {
  const [products] = useState<Product[]>(produtosData as Product[]);
  const [activeCategory, setActiveCategory] = useState<'todos' | 'vestuario' | 'acessorios'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [columnsLayout, setColumnsLayout] = useState<2 | 3>(2);
  
  // Persistent shopping cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vendas_da_prata_carrinho');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('vendas_da_prata_carrinho', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const handleAddToCart = (product: Product, size: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.tamanho === size
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantidade += 1;
        return newCart;
      } else {
        return [...prevCart, { product, tamanho: size, quantidade: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId && item.tamanho === size) {
            const novaQtd = item.quantidade + delta;
            return novaQtd > 0 ? { ...item, quantidade: novaQtd } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.product.id === productId && item.tamanho === size))
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantidade, 0);

  // Filter products by category and search
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      activeCategory === 'todos' ? true : p.categoria === activeCategory;
    const matchesSearch =
      searchQuery.trim() === ''
        ? true
        : p.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.material && p.material.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-slate-300 selection:text-neutral-950 pb-16 md:pb-0">
      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Campaign */}
      <Hero onExploreClick={scrollToCatalog} />

      {/* Main Catalog Section */}
      <section id="catalogo" className="py-10 sm:py-16 md:py-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-neutral-800/80">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-400 font-medium tracking-widest uppercase mb-1">
              <span>Coleção em Destaque</span>
              <span aria-hidden="true">·</span>
              <span>Alta Qualidade & Elegância</span>
            </div>
            <h2 className="font-cinzel text-xl sm:text-3xl md:text-4xl font-bold text-white">
              Vitrine de Produtos Exclusivos
            </h2>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 flex-wrap">
            {/* View Mode Toggle: 2 em cada linha (Padrão) */}
            <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-lg p-1 text-neutral-400">
              <button
                onClick={() => setColumnsLayout(2)}
                className={`px-2.5 py-1 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
                  columnsLayout === 2
                    ? 'bg-slate-100 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Apresentar 2 produtos em cada linha"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>2 por Linha</span>
              </button>
              <button
                onClick={() => setColumnsLayout(3)}
                className={`hidden md:flex px-2.5 py-1 text-xs font-semibold rounded items-center gap-1.5 transition-colors cursor-pointer ${
                  columnsLayout === 3
                    ? 'bg-slate-100 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Apresentar 3 produtos por linha em ecrãs largos"
              >
                <span>3 por Linha</span>
              </button>
            </div>

            {/* Interactive Category Segmented Tabs */}
            <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveCategory('todos')}
                className={`px-3 sm:px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === 'todos'
                    ? 'bg-slate-100 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Todos ({products.length})
              </button>
              <button
                onClick={() => setActiveCategory('vestuario')}
                className={`px-3 sm:px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === 'vestuario'
                    ? 'bg-slate-100 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Vestuário ({products.filter((p) => p.categoria === 'vestuario').length})
              </button>
              <button
                onClick={() => setActiveCategory('acessorios')}
                className={`px-3 sm:px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === 'acessorios'
                    ? 'bg-slate-100 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Acessórios ({products.filter((p) => p.categoria === 'acessorios').length})
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid: 2 produtos em cada linha garantidos */}
        {filteredProducts.length > 0 ? (
          <div
            className={`grid gap-3 sm:gap-6 lg:gap-8 ${
              columnsLayout === 2
                ? 'grid-cols-2'
                : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center space-y-3 bg-neutral-900/40 rounded-2xl border border-neutral-800 p-6 max-w-xl mx-auto">
            <p className="text-neutral-300 text-sm font-medium">
              {activeCategory === 'acessorios'
                ? 'Novos acessórios serão adicionados em breve! Confira as peças exclusivas de vestuário disponíveis agora.'
                : 'Nenhuma peça encontrada para os filtros selecionados.'}
            </p>
            <button
              onClick={() => {
                setActiveCategory('todos');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-white text-neutral-950 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Ver Peças Disponíveis
            </button>
          </div>
        )}

        {/* Quick Consultation Banner */}
        <div className="mt-12 sm:mt-14 p-5 sm:p-8 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-cinzel text-base sm:text-xl font-bold text-white">
              Procurando uma peça específica ou sob medida?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Nosso time atende no WhatsApp com fotos exclusivas, medidas personalizadas e reservas.
            </p>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
              'Olá, equipa Vendas da Prata! Gostaria de consultar modelos especiais e tirar dúvidas sobre vestuário e acessórios.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-emerald-950/40 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar Especialista no WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Customer Testimonials */}
      <Testimonials />

      {/* Footer */}
      <Footer />

      {/* Desktop Floating WhatsApp Button (hidden on mobile where MobileBottomNav handles it) */}
      <a
        href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
          'Olá, equipe Vendas da Prata! Estou navegando na loja online e gostaria de falar com o atendimento.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 z-30 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-transform hover:scale-110 items-center justify-center border border-emerald-400/30"
        title="Falar no WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Mobile Bottom Navigation Bar (Thumb friendly, conversion-focused) */}
      <MobileBottomNav
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onScrollToCatalog={scrollToCatalog}
      />

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onContinueShopping={() => setIsCartOpen(false)}
      />

      {/* Design System & Code Guide Modal */}
      <DesignSystemModal
        isOpen={isDesignSystemOpen}
        onClose={() => setIsDesignSystemOpen(false)}
      />
    </div>
  );
}
