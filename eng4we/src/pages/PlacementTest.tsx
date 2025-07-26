// components/PlacementTestModule.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const PlacementTestModule = () => {
  const navigate = useNavigate();

  const handleTakeTest = () => {
    navigate("/placement-test");
  };

  return (
    <div className="bg-blue-100 p-6 rounded-lg shadow-md flex flex-col justify-between items-start col-span-1 md:col-span-2">
      {" "}
      {/* Wider on desktop */}
      <h2 className="text-xl font-semibold text-blue-800 mb-3">
        Ready to find your level?
      </h2>
      <p className="text-gray-700 mb-4">
        Take our quick placement test to discover your current CEFR English
        level (A0, A1, or A2).
      </p>
      <button
        onClick={handleTakeTest}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
      >
        Take the Placement Test
      </button>
    </div>
  );
};

export default PlacementTestModule;
