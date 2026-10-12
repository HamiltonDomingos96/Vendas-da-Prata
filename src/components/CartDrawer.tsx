import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, MapPin, CreditCard, User, Phone } from 'lucide-react';
import { CartItem, CustomerOrder } from '../types';
import { formatKz } from '../utils/formatters';
import { generateWhatsAppLink } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
  onContinueShopping: () => void;
}

const PROVINCIAS = [
  'Luanda',
  'Benguela',
  'Huíla (Lubango)',
  'Huambo',
  'Cabinda',
  'Cuanza Sul',
  'Cuanza Norte',
  'Namibe',
  'Uíge',
  'Malanje',
  'Zaire',
  'Lunda Norte',
  'Lunda Sul',
  'Moxico',
  'Bié',
  'Cuando Cubango',
  'Cunene',
  'Bengo',
];

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onContinueShopping,
}) => {
  const [customerOrder, setCustomerOrder] = useState<CustomerOrder>({
    nome: '',
    telefone: '',
    provincia: 'Luanda',
    endereco: '',
    metodoPagamento: 'Multicaixa Express',
    observacoes: '',
  });

  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [errorMsg, setErrorMsg] = useState('');
  const [touched, setTouched] = useState({ nome: false, telefone: false, endereco: false });

  if (!isOpen) return null;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantidade, 0);
  const totalAmount = items.reduce((sum, item) => {
    const preco = item.product.preco_promocional ?? item.product.preco;
    return sum + preco * item.quantidade;
  }, 0);

  const handleCheckoutWhatsApp = () => {
    const missing: string[] = [];
    if (!customerOrder.nome.trim()) missing.push('Nome Completo');
    if (!customerOrder.telefone.trim()) missing.push('Número de Telefone');
    if (!customerOrder.endereco.trim()) missing.push('Morada de Entrega');

    if (missing.length > 0) {
      setErrorMsg(`Por favor, forneça os dados obrigatórios: ${missing.join(', ')}.`);
      setTouched({ nome: true, telefone: true, endereco: true });
      return;
    }

    const waLink = generateWhatsAppLink(items, customerOrder);
    window.open(waLink, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-neutral-900 border-l border-neutral-800 flex flex-col shadow-2xl h-full">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950 shrink-0">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-slate-300" />
              <h2 className="font-cinzel text-sm sm:text-base font-bold text-white tracking-wide">
                {step === 'cart' ? 'Carrinho de Compras' : 'Dados de Entrega & WhatsApp'}
              </h2>
              {items.length > 0 && (
                <span className="text-xs bg-neutral-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                  {totalQuantity}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-800/80 border border-neutral-700 flex items-center justify-center text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base sm:text-lg font-semibold text-white">Seu carrinho está vazio</h3>
                  <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                    Descubra nossas peças exclusivas de vestuário e acessórios elegantes da Vendas da Prata.
                  </p>
                </div>
                <button
                  onClick={onContinueShopping}
                  className="px-6 py-3 bg-slate-100 hover:bg-white text-neutral-950 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Explorar Loja
                </button>
              </div>
            ) : step === 'cart' ? (
              /* Step 1: List Items */
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800">
                  <span>Itens Selecionados</span>
                  <button
                    onClick={onClearCart}
                    className="text-neutral-500 hover:text-red-400 transition-colors text-[11px] cursor-pointer"
                  >
                    Esvaziar carrinho
                  </button>
                </div>

                <div className="space-y-3">
                  {items.map((item) => {
                    const price = item.product.preco_promocional ?? item.product.preco;
                    return (
                      <div
                        key={`${item.product.id}-${item.tamanho}`}
                        className="flex gap-3 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80"
                      >
                        <img
                          src={item.product.imagem_url}
                          alt={item.product.nome}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg bg-neutral-900 shrink-0"
                        />

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                              {item.product.nome}
                            </h4>
                            <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-0.5">
                              <span>Tamanho: <strong className="text-slate-300">{item.tamanho}</strong></span>
                              <span>·</span>
                              <span className="font-mono text-slate-300">{formatKz(price)}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            {/* Quantity steppers (Comfortable mobile touch targets) */}
                            <div className="flex items-center border border-neutral-700 rounded-lg bg-neutral-900">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, item.tamanho, -1)
                                }
                                className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center text-neutral-300 hover:text-white"
                                aria-label="Diminuir"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2 text-xs font-semibold text-white tabular-nums">
                                {item.quantidade}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, item.tamanho, 1)
                                }
                                className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center text-neutral-300 hover:text-white"
                                aria-label="Aumentar"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.product.id, item.tamanho)}
                              className="text-neutral-500 hover:text-red-400 p-2"
                              title="Remover item"
                              aria-label="Remover"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Step 2: Checkout Form */
              <div className="space-y-4">
                <div className="p-3.5 bg-neutral-950/80 rounded-xl border border-neutral-800 text-xs text-neutral-300 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>Conclusão de Encomenda via WhatsApp</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Para concluir a sua encomenda, forneça o seu <strong>Nome</strong>, <strong>Número de Telefone</strong> e <strong>Morada</strong>. Esses dados serão enviados diretamente para a equipa da Vendas da Prata no WhatsApp.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-950/50 border border-red-700/80 text-red-200 text-xs flex items-start gap-2">
                    <span className="font-bold text-red-400">⚠️</span>
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="space-y-3.5">
                  {/* Nome Completo */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-200 mb-1">
                      Nome Completo do Cliente <span className="text-red-400">*</span>
                    </label>
                    <div
                      className={`flex items-center bg-neutral-950 border rounded-lg px-3 py-2.5 transition-colors ${
                        touched.nome && !customerOrder.nome.trim()
                          ? 'border-red-500 bg-red-950/10'
                          : 'border-neutral-800 focus-within:border-slate-300'
                      }`}
                    >
                      <User className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
                      <input
                        type="text"
                        placeholder="Nome completo"
                        value={customerOrder.nome}
                        onChange={(e) => {
                          setCustomerOrder({ ...customerOrder, nome: e.target.value });
                          if (errorMsg) setErrorMsg('');
                        }}
                        onBlur={() => setTouched((prev) => ({ ...prev, nome: true }))}
                        className="bg-transparent text-sm sm:text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
                      />
                    </div>
                    {touched.nome && !customerOrder.nome.trim() && (
                      <p className="text-[10px] text-red-400 mt-1">O seu nome é obrigatório para registar a encomenda.</p>
                    )}
                  </div>

                  {/* Número de Telefone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-200 mb-1">
                      Número de Telefone / WhatsApp <span className="text-red-400">*</span>
                    </label>
                    <div
                      className={`flex items-center bg-neutral-950 border rounded-lg px-3 py-2.5 transition-colors ${
                        touched.telefone && !customerOrder.telefone.trim()
                          ? 'border-red-500 bg-red-950/10'
                          : 'border-neutral-800 focus-within:border-slate-300'
                      }`}
                    >
                      <Phone className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
                      <input
                        type="tel"
                        placeholder="Número de telefone / WhatsApp"
                        value={customerOrder.telefone}
                        onChange={(e) => {
                          setCustomerOrder({ ...customerOrder, telefone: e.target.value });
                          if (errorMsg) setErrorMsg('');
                        }}
                        onBlur={() => setTouched((prev) => ({ ...prev, telefone: true }))}
                        className="bg-transparent text-sm sm:text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
                      />
                    </div>
                    {touched.telefone && !customerOrder.telefone.trim() && (
                      <p className="text-[10px] text-red-400 mt-1">O número de telefone é obrigatório para contacto.</p>
                    )}
                  </div>

                  {/* Morada Completa */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-200 mb-1">
                      Morada Completa de Entrega <span className="text-red-400">*</span>
                    </label>
                    <div
                      className={`flex items-center bg-neutral-950 border rounded-lg px-3 py-2.5 transition-colors ${
                        touched.endereco && !customerOrder.endereco.trim()
                          ? 'border-red-500 bg-red-950/10'
                          : 'border-neutral-800 focus-within:border-slate-300'
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
                      <input
                        type="text"
                        placeholder="Morada de entrega (bairro, rua, residência)"
                        value={customerOrder.endereco}
                        onChange={(e) => {
                          setCustomerOrder({ ...customerOrder, endereco: e.target.value });
                          if (errorMsg) setErrorMsg('');
                        }}
                        onBlur={() => setTouched((prev) => ({ ...prev, endereco: true }))}
                        className="bg-transparent text-sm sm:text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
                      />
                    </div>
                    {touched.endereco && !customerOrder.endereco.trim() && (
                      <p className="text-[10px] text-red-400 mt-1">A morada é obrigatória para entrega da encomenda.</p>
                    )}
                  </div>

                  {/* Província e Pagamento */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-200 mb-1">
                        Província de Entrega
                      </label>
                      <select
                        value={customerOrder.provincia}
                        onChange={(e) =>
                          setCustomerOrder({ ...customerOrder, provincia: e.target.value })
                        }
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-2.5 text-sm sm:text-xs text-white focus:outline-none focus:border-slate-300"
                      >
                        {PROVINCIAS.map((prov) => (
                          <option key={prov} value={prov} className="bg-neutral-900 text-white">
                            {prov}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-200 mb-1">
                        Método de Pagamento
                      </label>
                      <select
                        value={customerOrder.metodoPagamento}
                        onChange={(e) =>
                          setCustomerOrder({
                            ...customerOrder,
                            metodoPagamento: e.target.value as CustomerOrder['metodoPagamento'],
                          })
                        }
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-2.5 text-sm sm:text-xs text-white focus:outline-none focus:border-slate-300"
                      >
                        <option value="Multicaixa Express" className="bg-neutral-900 text-white">
                          Multicaixa Express
                        </option>
                        <option value="Transferência Bancária" className="bg-neutral-900 text-white">
                          Transferência Bancária
                        </option>
                        <option value="Pagamento na Entrega" className="bg-neutral-900 text-white">
                          Pagamento na Entrega
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Observações */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1">
                      Observações / Ponto de Referência Adicional (Opcional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Instruções para a entrega, horário preferencial, etc."
                      value={customerOrder.observacoes}
                      onChange={(e) =>
                        setCustomerOrder({ ...customerOrder, observacoes: e.target.value })
                      }
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm sm:text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  {/* Resumo visual dos dados a serem transmitidos */}
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/90 text-[11px] text-neutral-400 space-y-1">
                    <span className="font-semibold text-slate-300 block">
                      📲 Informações que serão enviadas para o WhatsApp:
                    </span>
                    <p>• <strong>Nome:</strong> {customerOrder.nome.trim() || 'Aguardando preenchimento...'}</p>
                    <p>• <strong>Telefone:</strong> {customerOrder.telefone.trim() || 'Aguardando preenchimento...'}</p>
                    <p>• <strong>Morada:</strong> {customerOrder.endereco.trim() ? `${customerOrder.endereco} (${customerOrder.provincia})` : 'Aguardando morada...'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer with Subtotal & Actions */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950 space-y-3 shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal ({totalQuantity} itens)</span>
                  <span className="font-mono text-slate-300">{formatKz(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Entrega</span>
                  <span className="text-emerald-400 font-medium">A confirmar no WhatsApp</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-1.5 border-t border-neutral-800">
                  <span>Total da Encomenda:</span>
                  <span className="font-mono text-base text-slate-100">{formatKz(totalAmount)}</span>
                </div>
              </div>

              {step === 'cart' ? (
                <div className="space-y-2">
                  <button
                    onClick={() => setStep('checkout')}
                    className="w-full min-h-[44px] py-3 px-4 bg-slate-100 hover:bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Fornecer Dados de Entrega (Nome, Telefone, Morada)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onContinueShopping}
                    className="w-full py-2 text-xs text-neutral-400 hover:text-white transition-colors text-center cursor-pointer"
                  >
                    Continuar a Escolher Peças
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={handleCheckoutWhatsApp}
                    className="w-full min-h-[46px] py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer shadow-emerald-900/30 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Concluir Encomenda no WhatsApp</span>
                  </button>

                  <button
                    onClick={() => setStep('cart')}
                    className="w-full py-2 text-xs text-neutral-400 hover:text-white transition-colors text-center cursor-pointer"
                  >
                    ← Voltar e Rever Itens do Carrinho
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
