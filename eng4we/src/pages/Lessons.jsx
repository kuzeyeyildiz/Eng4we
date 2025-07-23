import React from "react";
import { BookOpen, CheckCircle, PlayCircle, ArrowRight } from "lucide-react";

const Lessons = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-8">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="flex items-center gap-3">
          <BookOpen className="text-blue-600 w-8 h-8" />
          <h1 className="text-2xl font-bold text-gray-800">
            📚 Introduction to Daily English
          </h1>
        </div>

        <p className="text-gray-600">
          Learn how to greet people, ask basic questions, and navigate simple
          daily interactions in English.
        </p>

        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          Level: Complete Beginner (A1)
        </span>

        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
            <PlayCircle className="text-indigo-500" />
            <p className="text-gray-700">
              🎧 Listening Practice: Introductions
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
            <PlayCircle className="text-green-500" />
            <p className="text-gray-700">🃏 Flashcards: Common Greetings</p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
            <PlayCircle className="text-pink-500" />
            <p className="text-gray-700">📺 Video: Meeting New People</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <CheckCircle className="w-5 h-5" />
            Completed
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2 transition">
            Continue Learning
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
