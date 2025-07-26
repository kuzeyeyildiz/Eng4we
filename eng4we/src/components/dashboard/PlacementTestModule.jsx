// =============================================================================
// FILE: src/components/dashboard/PlacementTestModule.jsx
// DESCRIPTION: Displays a module prompting the user to take the placement test.
// Conditionally rendered if the test hasn't been completed.
// =============================================================================
import React from "react";
import { useNavigate } from "react-router-dom";

const PlacementTestModule = () => {
  const navigate = useNavigate();

  const handleTakeTest = () => {
    navigate("/placement-test");
  };

  return (
    <div className="bg-blue-100 p-6 rounded-lg shadow-md flex flex-col justify-between items-start h-full">
      <h2 className="text-xl font-semibold text-blue-800 mb-3">
        Ready to find your level?
      </h2>
      <p className="text-gray-700 mb-4 flex-grow">
        Take our quick placement test to discover your current CEFR English
        level (A0, A1, or A2) and unlock your personalized curriculum.
      </p>
      <button
        onClick={handleTakeTest}
        className="bg-orange-accent hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-accent focus:ring-opacity-50"
      >
        Take the Placement Test
      </button>
    </div>
  );
};

export default PlacementTestModule;
