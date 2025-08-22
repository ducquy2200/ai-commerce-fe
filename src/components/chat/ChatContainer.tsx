import React, { useState, useEffect, useRef } from 'react';
import { MessageList } from './MessageList';
import { InputArea } from './InputArea';
import { TypingIndicator } from './TypingIndicator';
import { WelcomeMessage } from './WelcomeMessage';
import { chatAPI } from '../../services/api';
import type { Message } from '../../types';
import { toast } from 'react-hot-toast';
import { useWebSocket } from '../../hooks/useWebSocket';

export const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isConnected } = useWebSocket('http://localhost:8000/ws', sessionId);

  useEffect(() => {
    // Create session on mount
    const initSession = async () => {
      try {
        const session = await chatAPI.createSession();
        setSessionId(session.session_id);
      } catch (error) {
        console.error('Failed to create session:', error);
        toast.error('Failed to connect to the chat service');
      }
    };
    initSession();
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text: string, image?: string) => {
    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      image,
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await chatAPI.sendMessage(text, image, sessionId || undefined);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        sender: 'bot',
        timestamp: new Date(response.timestamp),
        products: response.products,
        messageType: response.message_type as any,
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message. Please try again.');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        messageType: 'error',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (text: string) => {
    handleSendMessage(text);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">AI Shopping Assistant</h1>
              <p className="text-xs text-gray-500">
                {isConnected ? 'Online' : 'Connecting...'} • Powered by AI
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <span className="text-sm text-gray-600">{sessionId ? 'Active' : 'Initializing'}</span>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4">
          {messages.length === 0 ? (
            <WelcomeMessage onQuickAction={handleQuickAction} />
          ) : (
            <MessageList messages={messages} />
          )}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <InputArea onSendMessage={handleSendMessage} isDisabled={!sessionId || isTyping} />
    </div>
  );
};