import React, { useState } from 'react';
import { X, Copy, Check, Palette, Type, Smartphone, Code2, Download, ExternalLink } from 'lucide-react';
import produtosData from '../data/produtos.json';

interface DesignSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignSystemModal: React.FC<DesignSystemModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'design' | 'html_code' | 'json_data'>('design');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  if (!isOpen) return null;

  const standaloneHtmlCode = `<!DOCTYPE html>
<html lang="pt" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vendas da Prata - Moda & Acessórios de Luxo</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts: Cinzel & Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            cinzel: ['Cinzel', 'serif'],
            sans: ['Plus Jakarta Sans', 'sans-serif'],
          },
          colors: {
            brand: {
              black: '#090A0C',
              surface: '#121417',
              border: '#272A30',
              silver: '#CBD5E1',
              platinum: '#F1F5F9',
            }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-brand-black text-neutral-100 font-sans antialiased min-h-screen flex flex-col">

  <!-- Promo Top Bar -->
  <div class="bg-neutral-900 border-b border-neutral-800 py-1.5 px-4 text-center text-xs text-neutral-300">
    Envio rápido para Luanda e Províncias · Pedidos e Atendimento VIP no WhatsApp (+244) 955 987 042
  </div>

  <!-- Header / Navbar -->
  <header class="sticky top-0 z-40 bg-brand-black/95 backdrop-blur-md border-b border-brand-border">
    <div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-6">
      <a href="#" class="flex items-center gap-3">
        <img src="https://www.dropbox.com/scl/fi/paxpvz6szzi59fxphlpdv/IMG-20261008-WA0097.jpg?rlkey=wjc1su05axc74x3uzhu68x2kb&st=mp4ndyde&raw=1" 
             alt="Vendas da Prata Logo" 
             class="w-10 h-10 rounded-full object-cover border border-slate-400"
             onerror="this.style.display='none'">
        <div class="flex flex-col">
          <span class="font-cinzel text-lg font-bold tracking-wider text-white uppercase">Vendas da Prata</span>
          <span class="text-[10px] tracking-widest text-slate-400 uppercase">Vestuário & Acessórios</span>
        </div>
      </a>
      <button onclick="toggleCart()" class="relative flex items-center gap-2 px-4 py-2 bg-slate-100 text-neutral-950 font-bold text-xs rounded-lg shadow">
        <span>Carrinho</span>
        <span id="cart-badge" class="bg-neutral-950 text-white text-[10px] px-1.5 py-0.5 rounded-full">0</span>
      </button>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-16 px-4 max-w-7xl mx-auto text-center space-y-6">
    <span class="text-xs uppercase tracking-widest text-slate-400 font-semibold">Coleção 2026 · Luanda, Angola</span>
    <h1 class="font-cinzel text-3xl sm:text-5xl font-extrabold text-white max-w-3xl mx-auto leading-tight">
      A Elegância do Vestuário com o Brilho da Prata Autêntica
    </h1>
    <p class="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
      Peças exclusivas de alta moda e acessórios com finalização direta via WhatsApp.
    </p>
    <a href="#produtos" class="inline-block px-8 py-3.5 bg-slate-100 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow">
      Explorar Catálogo
    </a>
  </section>

  <!-- Grade de Produtos -->
  <section id="produtos" class="py-12 px-4 max-w-7xl mx-auto">
    <h2 class="font-cinzel text-2xl font-bold text-white mb-8 text-center">Produtos em Destaque (2 por Linha)</h2>
    <div id="product-grid" class="grid grid-cols-2 gap-3 sm:gap-6"></div>
  </section>

  <!-- Modal Carrinho -->
  <div id="cart-drawer" class="fixed inset-0 z-50 bg-black/80 hidden items-center justify-end">
    <div class="bg-brand-surface w-full max-w-md h-full p-6 flex flex-col justify-between border-l border-brand-border">
      <div class="flex items-center justify-between pb-4 border-b border-neutral-800">
        <h3 class="font-cinzel text-lg font-bold text-white">Carrinho & Checkout WhatsApp</h3>
        <button onclick="toggleCart()" class="text-neutral-400 hover:text-white text-xl">✕</button>
      </div>
      <div id="cart-items" class="flex-1 overflow-y-auto py-4 space-y-3"></div>
      <div class="pt-4 border-t border-neutral-800 space-y-3">
        <div class="flex justify-between font-bold text-sm">
          <span>Total:</span>
          <span id="cart-total" class="text-white">0 Kz</span>
        </div>
        <input id="cust-nome" type="text" placeholder="Nome completo" class="w-full bg-neutral-900 border border-neutral-800 p-2.5 rounded text-xs text-white">
        <input id="cust-tel" type="tel" placeholder="Número de telefone / WhatsApp" class="w-full bg-neutral-900 border border-neutral-800 p-2.5 rounded text-xs text-white">
        <input id="cust-end" type="text" placeholder="Morada de entrega (bairro, rua, residência)" class="w-full bg-neutral-900 border border-neutral-800 p-2.5 rounded text-xs text-white">
        <button onclick="encomendarWhatsApp()" class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase rounded-lg">
          Encomendar Agora via WhatsApp
        </button>
      </div>
    </div>
  </div>

  <!-- JavaScript Vanilla do Carrinho & WhatsApp -->
  <script>
    const PRODUTOS = ${JSON.stringify(produtosData, null, 2)};
    let carrinho = [];

    function renderProdutos() {
      const grid = document.getElementById('product-grid');
      grid.innerHTML = PRODUTOS.map(p => \`
        <div class="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden p-4 flex flex-col justify-between">
          <img src="\${p.imagem_url}" alt="\${p.nome}" class="w-full h-56 object-cover rounded-lg mb-4">
          <div>
            <span class="text-[11px] text-slate-400 uppercase tracking-wider">\${p.categoria}</span>
            <h4 class="font-semibold text-sm text-white mt-1">\${p.nome}</h4>
            <p class="font-mono text-base font-bold text-slate-200 mt-2">\${p.preco_promocional || p.preco} Kz</p>
          </div>
          <button onclick="adicionarAoCarrinho('\${p.id}')" class="mt-4 w-full py-2.5 bg-neutral-800 hover:bg-slate-200 hover:text-black text-xs font-semibold rounded-lg transition-colors">
            Adicionar ao Carrinho
          </button>
        </div>
      \`).join('');
    }

    function adicionarAoCarrinho(id) {
      const prod = PRODUTOS.find(p => p.id === id);
      const existente = carrinho.find(item => item.id === id);
      if (existente) existente.qtd++;
      else carrinho.push({ id: prod.id, nome: prod.nome, preco: prod.preco_promocional || prod.preco, qtd: 1 });
      atualizarCarrinho();
      toggleCart(true);
    }

    function atualizarCarrinho() {
      const badge = document.getElementById('cart-badge');
      const itemsContainer = document.getElementById('cart-items');
      const totalEl = document.getElementById('cart-total');

      const totalItens = carrinho.reduce((s, i) => s + i.qtd, 0);
      const totalValor = carrinho.reduce((s, i) => s + i.preco * i.qtd, 0);

      badge.innerText = totalItens;
      totalEl.innerText = totalValor.toLocaleString('pt-AO') + ' Kz';

      if (carrinho.length === 0) {
        itemsContainer.innerHTML = '<p class="text-xs text-neutral-400 text-center py-8">Seu carrinho está vazio.</p>';
        return;
      }

      itemsContainer.innerHTML = carrinho.map((item, idx) => \`
        <div class="flex items-center justify-between p-2.5 bg-neutral-950 rounded-lg text-xs">
          <div>
            <strong class="text-white">\${item.nome}</strong>
            <p class="text-neutral-400">\${item.qtd}x \${item.preco.toLocaleString()} Kz</p>
          </div>
          <button onclick="removerItem(\${idx})" class="text-red-400 hover:underline">Remover</button>
        </div>
      \`).join('');
    }

    function removerItem(idx) {
      carrinho.splice(idx, 1);
      atualizarCarrinho();
    }

    function toggleCart(forceOpen) {
      const drawer = document.getElementById('cart-drawer');
      if (forceOpen) drawer.classList.remove('hidden'), drawer.classList.add('flex');
      else {
        drawer.classList.toggle('hidden');
        drawer.classList.toggle('flex');
      }
    }

    function encomendarWhatsApp() {
      if (carrinho.length === 0) return alert('Seu carrinho está vazio!');
      const nome = document.getElementById('cust-nome').value.trim();
      const tel = document.getElementById('cust-tel').value.trim();
      const end = document.getElementById('cust-end').value.trim();

      const erros = [];
      if (!nome) erros.push('Nome Completo');
      if (!tel) erros.push('Número de Telefone');
      if (!end) erros.push('Morada de Entrega');

      if (erros.length > 0) {
        alert('Atenção: É obrigatório fornecer os seguintes dados para concluir a sua encomenda:\\n• ' + erros.join('\\n• '));
        return;
      }

      const total = carrinho.reduce((s, i) => s + i.preco * i.qtd, 0);
      const lista = carrinho.map((i, idx) => \`\${idx + 1}. *\${i.nome}* x\${i.qtd} - \${(i.preco * i.qtd).toLocaleString('pt-AO')} Kz\`).join('\\n');
      
      const msg = \`🛍️ *NOVA ENCOMENDA - VENDAS DA PRATA* 🛍️\\n━━━━━━━━━━━━━━━━━━━━\\n👤 *DADOS DO CLIENTE & ENTREGA:*\\n• *Nome Completo:* \${nome}\\n• *Telefone:* \${tel}\\n• *Morada de Entrega:* \${end}\\n\\n📦 *PRODUTOS ENCOMENDADOS:*\\n\${lista}\\n\\n━━━━━━━━━━━━━━━━━━━━\\n💰 *TOTAL DA ENCOMENDA: \${total.toLocaleString('pt-AO')} Kz*\\n━━━━━━━━━━━━━━━━━━━━\\nOlá, equipa Vendas da Prata! Enviei os meus dados acima para concluir a minha encomenda. Aguardo confirmação para prosseguirmos com a entrega. 🤝\`;
      
      window.open(\`https://wa.me/244955987042?text=\${encodeURIComponent(msg)}\`, '_blank');
    }

    window.onload = renderProdutos;
  </script>
</body>
</html>`;

  const copyToClipboard = (text: string, type: 'code' | 'json') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-slate-200 shrink-0">
              <Palette className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="font-cinzel text-base sm:text-lg font-bold text-white truncate">
                Guia de Estilo, UI/UX & Código Fonte
              </h2>
              <p className="text-[11px] sm:text-xs text-neutral-400 truncate">
                Design System & Integração desenvolvida por H-Digital para Vendas da Prata.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Bar with touch scrolling */}
        <div className="flex items-center gap-2 px-4 sm:px-6 pt-3 sm:pt-4 border-b border-neutral-800 bg-neutral-950 overflow-x-auto">
          <button
            onClick={() => setActiveTab('design')}
            className={`pb-3 px-2 sm:px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'design'
                ? 'border-slate-300 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>1. Guia de Estilo & Cores</span>
          </button>
          <button
            onClick={() => setActiveTab('html_code')}
            className={`pb-3 px-2 sm:px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'html_code'
                ? 'border-slate-300 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>2. Código HTML5 + Tailwind + JS</span>
          </button>
          <button
            onClick={() => setActiveTab('json_data')}
            className={`pb-3 px-2 sm:px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'json_data'
                ? 'border-slate-300 text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <span>3. Estrutura JSON (Produtos)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs text-neutral-300">
          {activeTab === 'design' && (
            <div className="space-y-6 sm:space-y-8">
              {/* 1. Paleta de Cores */}
              <div>
                <h3 className="font-cinzel text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-3">
                  Paleta de Cores Recomendada (Design System "Vendas da Prata")
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                    <div className="h-10 sm:h-12 rounded bg-[#090A0C] border border-neutral-800 mb-2"></div>
                    <strong className="text-white block text-xs">Preto Ônix / Obsidian</strong>
                    <span className="text-[10px] sm:text-[11px] text-neutral-400">#090A0C · 60% Fundo</span>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                    <div className="h-10 sm:h-12 rounded bg-[#121417] border border-neutral-800 mb-2"></div>
                    <strong className="text-white block text-xs">Superfície Charcoal</strong>
                    <span className="text-[10px] sm:text-[11px] text-neutral-400">#121417 · 30% Cards</span>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                    <div className="h-10 sm:h-12 rounded bg-[#CBD5E1] mb-2"></div>
                    <strong className="text-white block text-xs">Prata Metálica Acetinada</strong>
                    <span className="text-[10px] sm:text-[11px] text-neutral-400">#CBD5E1 · 10% Acentos</span>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                    <div className="h-10 sm:h-12 rounded bg-[#059669] mb-2"></div>
                    <strong className="text-white block text-xs">Verde WhatsApp Direct</strong>
                    <span className="text-[10px] sm:text-[11px] text-neutral-400">#059669 · Conversão CTA</span>
                  </div>
                </div>
              </div>

              {/* 2. Tipografia */}
              <div>
                <h3 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider mb-3">
                  Tipografia Curada (Google Fonts)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">
                      Display / Títulos & Logotipo
                    </span>
                    <h4 className="font-cinzel text-xl font-bold text-white">Cinzel (Google Fonts)</h4>
                    <p className="text-[11px] text-neutral-400">
                      Traz a nobreza e a sofisticação da joalharia clássica europeia, perfeita para
                      a marca "Vendas da Prata".
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">
                      Corpo / UI & Checkout
                    </span>
                    <h4 className="font-sans text-xl font-semibold text-white">
                      Plus Jakarta Sans
                    </h4>
                    <p className="text-[11px] text-neutral-400">
                      Tipografia geométrica ultra legível em telas mobile, ideal para preços, botões
                      e formulários de compra rápida.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Estrutura Mobile-First & Conversão */}
              <div>
                <h3 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider mb-3">
                  Estratégia UX Mobile-First
                </h3>
                <ul className="space-y-2 list-disc list-inside text-neutral-300">
                  <li>
                    <strong>Fluxo em 1-Clique para WhatsApp:</strong> Não força cadastros longos ou
                    senhas esquecidas; converte direto pelo WhatsApp oficial <code>+244 955 987 042</code>.
                  </li>
                  <li>
                    <strong>Moeda e Formato Angolano:</strong> Valores expressos claramente em Kwanzas
                    (Kz) com suporte a pagamento Multicaixa Express e na entrega.
                  </li>
                  <li>
                    <strong>Resiliência Visual:</strong> Logo com fallback automático para monograma
                    refinado caso a conexão com a CDN externa oscile.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'html_code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Arquivo completo standalone pronto (HTML5 + Tailwind CDN + Vanilla JavaScript)
                </span>
                <button
                  onClick={() => copyToClipboard(standaloneHtmlCode, 'code')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copiado!' : 'Copiar Código HTML'}</span>
                </button>
              </div>

              <pre className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl overflow-x-auto text-[11px] font-mono text-slate-300 max-h-96 leading-relaxed">
                {standaloneHtmlCode}
              </pre>
            </div>
          )}

          {activeTab === 'json_data' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Arquivo <code>/src/data/produtos.json</code> com 6 produtos de vestuário e acessórios
                </span>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(produtosData, null, 2), 'json')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs transition-colors"
                >
                  {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedJson ? 'Copiado!' : 'Copiar JSON'}</span>
                </button>
              </div>

              <pre className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl overflow-x-auto text-[11px] font-mono text-slate-300 max-h-96 leading-relaxed">
                {JSON.stringify(produtosData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
