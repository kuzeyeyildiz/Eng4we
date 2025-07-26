// =============================================================================
// FILE: src/components/common/Toast.jsx
// DESCRIPTION: Reusable Toast notification component for user feedback.
// =============================================================================
import React, { useEffect } from "react";
import { X } from "lucide-react"; // Using Lucide React for consistency

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  let bgColor = "bg-blue-primary";
  let textColor = "text-white";

  if (type === "success") {
    bgColor = "bg-green-success";
  } else if (type === "error") {
    bgColor = "bg-red-error";
  } else if (type === "warning") {
    bgColor = "bg-yellow-warning";
    textColor = "text-gray-900"; // For better contrast on yellow
  }

  return (
    <div
      className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${bgColor} ${textColor} transform transition-all duration-300 animate-pulse`}
      role="alert"
      aria-live="assertive" // Announce to screen readers
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full p-1"
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
