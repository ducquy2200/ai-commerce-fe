import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Package } from 'lucide-react';
import type { Product } from '../../types';
import { Button } from '../common/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  
  // Determine image source
  const imageUrl = product.image_base64 
    ? `data:image/jpeg;base64,${product.image_base64}`
    : product.image_url;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 h-full flex flex-col"
    >
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 relative">
        {imageUrl && !imageError ? (
          <img 
            src={imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <Package className="w-16 h-16 text-gray-400" />
          </div>
        )}
        {product.similarity_score && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            {Math.round(product.similarity_score * 100)}% match
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="text-xs text-gray-500 mb-1">{product.brand || 'Generic'}</div>
        <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2 flex-1">{product.description}</p>
        
        <div className="mt-2 flex items-center gap-2 text-xs">
          {product.color && (
            <span className="px-2 py-1 bg-gray-100 rounded-full">{product.color}</span>
          )}
          {product.category && (
            <span className="px-2 py-1 bg-gray-100 rounded-full">{product.category}</span>
          )}
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            product.in_stock 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.in_stock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <Button 
            variant="primary" 
            size="sm" 
            className="flex-1"
            icon={<ShoppingCart className="w-4 h-4" />}
            disabled={!product.in_stock}
          >
            Add to Cart
          </Button>
          <Button variant="ghost" size="sm">
            <Star className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};