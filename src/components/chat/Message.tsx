import React from 'react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Message as MessageType } from '../../types';
import { ProductCard } from '../product/ProductCard';
import { User, Bot } from 'lucide-react';

dayjs.extend(relativeTime);

interface MessageProps {
  message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} mb-4`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-primary-600' : 'bg-gray-200'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-gray-700" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1 max-w-[80%]`}>
        <div className={`flex items-center gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
          <span className="text-sm font-medium text-gray-700">
            {isUser ? 'You' : 'CommerceAI'}
          </span>
          <span className="text-xs text-gray-500">
            {dayjs(message.timestamp).fromNow()}
          </span>
        </div>

        <div className={`rounded-2xl px-4 py-2 ${
          isUser 
            ? 'bg-primary-600 text-white ml-auto' 
            : 'bg-gray-100 text-gray-900'
        }`}>
          {message.image && (
            <img 
              src={`data:image/png;base64,${message.image}`} 
              alt="Uploaded" 
              className="rounded-lg mb-2 max-w-[200px]"
            />
          )}
          <p className="whitespace-pre-wrap">{message.text}</p>
        </div>

        {/* Product Cards - Display outside the message bubble */}
        {message.products && message.products.length > 0 && !isUser && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {message.products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};