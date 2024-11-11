// src/components/Modal.jsx
import React from 'react';

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg overflow-hidden shadow-lg p-4 w-full max-w-lg">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
        ✕
      </button>
      {children}
    </div>
  </div>
);

export default Modal;
