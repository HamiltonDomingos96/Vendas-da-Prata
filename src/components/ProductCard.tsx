import React, { useState } from 'react';
import { ShoppingBag, Eye, Check, Star } from 'lucide-react';
import { Product } from '../types';
import { formatKz } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.tamanhos_disponiveis[0] || 'Único');
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const discountPercent = product.preco_promocional
    ? Math.round(((product.preco - product.preco_promocional) / product.preco) * 100)
    : null;

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-neutral-900/60 border border-neutral-800/90 rounded-xl overflow-hidden hover:border-slate-400/40 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 cursor-pointer"
    >
      {/* Product Image Slot */}
      <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden bg-neutral-900">
        {!imgError ? (
          <img
            src={product.imagem_url}
            alt={product.nome}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-neutral-800 to-neutral-900 text-neutral-400">
            <span className="font-cinzel text-sm sm:text-lg font-bold text-slate-300">Vendas da Prata</span>
            <span className="text-[10px] sm:text-xs text-neutral-400 mt-1 line-clamp-1">{product.nome}</span>
          </div>
        )}

        {/* Promo / New Tag (Quiet single badge) */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 pointer-events-none">
          <span className="bg-amber-400 text-neutral-950 text-[9px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded shadow-sm tracking-wide">
            PEÇA ÚNICA
          </span>
          {product.preco_promocional && (
            <span className="bg-neutral-950/85 backdrop-blur-md text-slate-200 border border-slate-700/60 text-[9px] sm:text-[11px] font-semibold px-1.5 sm:px-2 py-0.5 rounded">
              -{discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-neutral-950/80 hover:bg-neutral-900 text-slate-300 hover:text-white rounded-lg border border-neutral-800 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity backdrop-blur-md"
          title="Ver detalhes da peça"
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-2.5 sm:p-4 md:p-5 flex flex-col flex-1 justify-between gap-2.5 sm:gap-4">
        <div className="space-y-1.5 sm:space-y-2">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-neutral-400">
            <span className="uppercase tracking-wider font-medium text-[9px] sm:text-[11px] text-slate-400 truncate">
              {product.categoria === 'vestuario' ? 'Vestuário' : 'Acessórios'}
            </span>
            {product.avaliacao && (
              <span className="flex items-center gap-0.5 sm:gap-1 text-slate-300 shrink-0">
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-slate-300 text-slate-300" />
                <span className="tabular-nums font-medium text-[10px] sm:text-[11px]">{product.avaliacao}</span>
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-semibold text-xs sm:text-sm md:text-base text-neutral-100 group-hover:text-white line-clamp-1 sm:line-clamp-2 leading-snug">
            {product.nome}
          </h3>

          {/* Material note */}
          {product.material && (
            <p className="text-[10px] sm:text-xs text-neutral-400 line-clamp-1">{product.material}</p>
          )}

          {/* Price display with Tabular Numerals */}
          <div className="flex items-baseline gap-1.5 sm:gap-2 pt-0.5">
            <span className="font-bold text-xs sm:text-base md:text-lg text-slate-100 font-mono tabular-nums">
              {formatKz(product.preco_promocional ?? product.preco)}
            </span>
            {product.preco_promocional && (
              <span className="text-[10px] sm:text-xs text-neutral-500 line-through font-mono tabular-nums truncate">
                {formatKz(product.preco)}
              </span>
            )}
          </div>
        </div>

        {/* Size Selection & Add to Cart */}
        <div className="space-y-2 sm:space-y-3 pt-1.5 sm:pt-2 border-t border-neutral-800/80" onClick={(e) => e.stopPropagation()}>
          {/* Sizes */}
          <div className="flex items-center justify-between text-xs gap-1">
            <span className="text-neutral-400 text-[10px] sm:text-[11px] shrink-0">Tam:</span>
            <div className="flex items-center gap-1 flex-wrap justify-end">
              {product.tamanhos_disponiveis.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[24px] sm:min-w-[28px] h-6 sm:h-7 px-1.5 sm:px-2 text-[10px] sm:text-[11px] font-semibold rounded border transition-colors flex items-center justify-center cursor-pointer ${
                    selectedSize === size
                      ? 'bg-slate-200 text-neutral-950 border-slate-200'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart CTA with minimum touch target */}
          <button
            onClick={handleAdd}
            className={`w-full min-h-[38px] sm:min-h-[44px] flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg font-semibold text-[11px] sm:text-xs transition-all cursor-pointer active:scale-95 whitespace-nowrap ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-800 hover:bg-slate-200 hover:text-neutral-950 text-slate-200 border border-neutral-700 hover:border-slate-300'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Adicionado!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Adicionar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
