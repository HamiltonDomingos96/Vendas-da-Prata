import React, { useState } from 'react';
import { X, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';
import { Product } from '../types';
import { formatKz } from '../utils/formatters';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(
    product.tamanhos_disponiveis[0] || 'Único'
  );
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 text-neutral-400 hover:text-white bg-neutral-950/80 hover:bg-neutral-950 rounded-full transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Column */}
        <div className="md:w-1/2 relative bg-neutral-950 h-56 xs:h-64 sm:h-80 md:h-auto min-h-[220px] md:min-h-[420px] shrink-0">
          <img
            src={product.imagem_url}
            alt={product.nome}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3 bg-amber-400 text-neutral-950 font-extrabold text-[10px] sm:text-xs px-2.5 py-1 rounded shadow-md tracking-wider uppercase">
            Peça Única
          </div>
          <div className="absolute bottom-3 left-3 bg-neutral-950/80 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-medium text-slate-300 border border-neutral-800">
            {product.categoria === 'vestuario' ? 'Vestuário Feminino' : 'Acessório Exclusivo'}
          </div>
        </div>

        {/* Details Column */}
        <div className="md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-4 sm:space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest">
              <span>{product.categoria === 'vestuario' ? 'Vestuário' : 'Acessórios'}</span>
              <span>·</span>
              <span>Ref: {product.id}</span>
            </div>

            <h2 className="font-cinzel text-lg sm:text-xl md:text-2xl font-bold text-white">
              {product.nome}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-0.5">
              <span className="text-xl sm:text-2xl font-bold text-slate-100 font-mono tabular-nums">
                {formatKz(product.preco_promocional ?? product.preco)}
              </span>
              {product.preco_promocional && (
                <span className="text-xs sm:text-sm text-neutral-500 line-through font-mono tabular-nums">
                  {formatKz(product.preco)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-1">
              {product.descricao}
            </p>

            {/* Material */}
            {product.material && (
              <div className="p-2.5 sm:p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/80 text-[11px] sm:text-xs text-neutral-300">
                <span className="font-semibold text-slate-200">Composição & Material: </span>
                {product.material}
              </div>
            )}

            {/* Size Selector */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400 font-medium text-[11px]">Selecione o Tamanho:</span>
                <span className="text-slate-300 font-semibold text-[11px]">{selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {product.tamanhos_disponiveis.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[34px] h-8 px-2.5 text-xs font-semibold rounded-lg border transition-colors flex items-center justify-center cursor-pointer ${
                      selectedSize === size
                        ? 'bg-slate-200 text-neutral-950 border-slate-200'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Guarantees & Action */}
          <div className="space-y-3 pt-3 border-t border-neutral-800">
            <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-[11px] text-neutral-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <span>Garantia de Qualidade</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <span>Entrega em Angola</span>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full min-h-[44px] py-3 px-6 rounded-lg font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 hover:bg-white text-neutral-950 shadow-lg'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Adicionado! Fechando...</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Adicionar ao Carrinho</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
