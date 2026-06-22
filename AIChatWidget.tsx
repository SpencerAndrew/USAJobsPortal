import React from 'react';

const AIChatWidget: React.FC = () => {
  return (
    <button className="fixed bottom-5 right-5 bg-black text-white py-3 px-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors flex items-center z-50">
      <span className="text-sm font-medium">Talk with Us</span>
    </button>
  );
};

export default AIChatWidget;
