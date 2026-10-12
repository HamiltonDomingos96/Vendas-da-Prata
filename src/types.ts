export interface Product {
  id: string;
  nome: string;
  categoria: 'vestuario' | 'acessorios';
  preco: number;
  preco_promocional?: number;
  imagem_url: string;
  descricao: string;
  tamanhos_disponiveis: string[];
  em_destaque?: boolean;
  novo?: boolean;
  material?: string;
  avaliacao?: number;
  total_avaliacoes?: number;
}

export interface CartItem {
  product: Product;
  tamanho: string;
  quantidade: number;
}

export interface CustomerOrder {
  nome: string;
  telefone: string;
  provincia: string;
  endereco: string;
  metodoPagamento: 'Multicaixa Express' | 'Transferência Bancária' | 'Pagamento na Entrega';
  observacoes: string;
}
