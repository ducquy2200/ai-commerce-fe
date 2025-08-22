import React from 'react';
import { motion } from 'framer-motion';
import { Search, Camera, ShoppingBag, Sparkles } from 'lucide-react';

interface WelcomeMessageProps {
  onQuickAction: (message: string) => void;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onQuickAction }) => {
  const quickActions = [
    { icon: Search, text: 'Browse popular items', action: 'Show me popular products' },
    { icon: ShoppingBag, text: 'Sports & Fitness', action: 'I need sports clothing' },
    { icon: Sparkles, text: "Today's deals", action: 'What deals do you have?' },
    { icon: Camera, text: 'Search by image', action: 'How do I search with an image?' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">👋</span>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Welcome to AI Shopping Assistant
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        I'm CommerceAI, your personal shopping assistant. I can help you find products, 
        compare prices, and discover items from images.
      </p>

      <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
        {quickActions.map((action, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onQuickAction(action.action)}
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all text-left group"
          >
            <action.icon className="w-5 h-5 text-primary-600 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-700">{action.text}</span>
          </motion.button>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-8">
        💡 Tip: You can upload an image to find similar products!
      </p>
    </motion.div>
  );
};