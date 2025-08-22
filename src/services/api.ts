import axios from 'axios';
import type { Product } from '../types';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ChatResponse {
  response: string;
  products?: Product[];
  session_id: string;
  timestamp: string;
  message_type: string;
}

export const chatAPI = {
  sendMessage: async (message: string, image?: string, sessionId?: string): Promise<ChatResponse> => {
    const response = await api.post<ChatResponse>('/chat', {
      message,
      image,
      session_id: sessionId,
    });
    return response.data;
  },

  createSession: async () => {
    const response = await api.post('/session/create');
    return response.data;
  },

  getHealth: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};