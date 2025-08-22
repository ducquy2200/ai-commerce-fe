import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Image, X } from 'lucide-react';
import { Button } from '../common/Button';
import { useDropzone } from 'react-dropzone';

interface InputAreaProps {
  onSendMessage: (message: string, image?: string) => void;
  isDisabled?: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isDisabled }) => {
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        handleImageToBase64(acceptedFiles[0]);
      }
    },
    noClick: true,
    noKeyboard: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !imagePreview) return;

    const base64Image = imagePreview ? imagePreview.split(',')[1] : undefined;
    onSendMessage(message.trim(), base64Image);
    
    setMessage('');
    setImagePreview(null);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        {/* Image Preview */}
        <AnimatePresence>
          {imagePreview && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-3"
            >
              <div className="relative inline-block">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="h-20 rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div {...getRootProps()} className="relative">
          <input {...getInputProps()} />
          {isDragActive && (
            <div className="absolute inset-0 bg-primary-50 border-2 border-dashed border-primary-400 rounded-xl z-10 flex items-center justify-center">
              <p className="text-primary-600 font-medium">Drop image here...</p>
            </div>
          )}
          
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything or upload an image..."
                disabled={isDisabled}
                className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleImageToBase64(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
              >
                <Image className="w-5 h-5" />
              </button>
            </div>
            
            <Button
              type="submit"
              disabled={isDisabled || (!message.trim() && !imagePreview)}
              icon={<Send className="w-5 h-5" />}
            >
              Send
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};