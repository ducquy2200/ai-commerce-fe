export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category?: string;
  sub_category?: string;
  brand?: string;
  color?: string;
  gender?: string;
  image_url?: string;
  image_base64?: string;
  in_stock: boolean;
  similarity_score?: number;
  features?: string[];
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  products?: Product[];
  image?: string;
  messageType?: 'text' | 'product_recommendation' | 'image_search' | 'error';
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  sessionId: string | null;
}