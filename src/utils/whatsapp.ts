import { CartItem, CustomerOrder } from '../types';
import { formatKz } from './formatters';

export const WHATSAPP_PHONE = '244955987042';

export function buildWhatsAppMessage(items: CartItem[], order: CustomerOrder): string {
  const total = items.reduce((sum, item) => {
    const itemPreco = item.product.preco_promocional ?? item.product.preco;
    return sum + itemPreco * item.quantidade;
  }, 0);

  const dataHora = new Intl.DateTimeFormat('pt-AO', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date());

  const itensTexto = items
    .map((item, idx) => {
      const precoUnit = item.product.preco_promocional ?? item.product.preco;
      const subtotal = precoUnit * item.quantidade;
      return `${idx + 1}. *${item.product.nome}*\n   ▫️ Tamanho: ${item.tamanho} | Qtd: ${item.quantidade}\n   ▫️ Subtotal: ${formatKz(subtotal)}`;
    })
    .join('\n\n');

  const mensagem = `🛍️ *NOVA ENCOMENDA - VENDAS DA PRATA* 🛍️
━━━━━━━━━━━━━━━━━━━━
📅 Data: ${dataHora}

👤 *DADOS DO CLIENTE & ENTREGA:*
• *Nome Completo:* ${order.nome.trim()}
• *Número de Telefone:* ${order.telefone.trim()}
• *Morada de Entrega:* ${order.endereco.trim()} (${order.provincia})
• *Forma de Pagamento:* ${order.metodoPagamento}

📦 *PRODUTOS ENCOMENDADOS (${items.reduce((s, i) => s + i.quantidade, 0)} itens):*
${itensTexto}

━━━━━━━━━━━━━━━━━━━━
💰 *TOTAL DA ENCOMENDA: ${formatKz(total)}*
━━━━━━━━━━━━━━━━━━━━
${order.observacoes.trim() ? `📝 *Observações do Cliente:* ${order.observacoes.trim()}\n━━━━━━━━━━━━━━━━━━━━\n` : ''}
Olá, equipa Vendas da Prata! Enviei os meus dados acima para concluir a minha encomenda. Aguardo confirmação para prosseguirmos com a entrega. 🤝

_Loja Oficial Vendas da Prata | H-Digital_`;

  return mensagem;
}

export function generateWhatsAppLink(items: CartItem[], order: CustomerOrder): string {
  const mensagem = buildWhatsAppMessage(items, order);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(mensagem)}`;
}
