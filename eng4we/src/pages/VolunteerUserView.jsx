import React, { createContext, useContext, useState, useEffect } from "react";

import {
  Play,
  Volume2,
  BookOpen,
  Video,
  FileText,
  CheckCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Star,
  Flame,
  Trophy,
  User,
  Home,
  BarChart3,
  LogOut,
  X,
  PlayCircle,
  Pause,
  SkipForward,
  SkipBack,
  Download,
  Target,
  Edit3,
  Save,
  Camera,
  Mail,
  Calendar,
  MapPin,
  Globe,
  Phone,
} from "lucide-react";

// Real Firebase imports
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

// Initialize Firebase services
const auth = getAuth();
const db = getFirestore();

// Subscribe to lessons collection realtime updates
export const subscribeToLessons = (callback) => {
  const lessonsCollection = collection(db, "lessons");

  const unsubscribe = onSnapshot(
    lessonsCollection,
    (snapshot) => {
      const lessons = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(lessons);
    },
    (error) => {
      console.error("Error fetching lessons:", error);
      callback([]);
    },
  );

  return unsubscribe;
};

// Subscribe to user progress realtime updates
export const subscribeToUserProgress = (uid, callback) => {
  if (!uid) return () => {};

  const progressCollection = collection(db, "users", uid, "progress");

  const unsubscribe = onSnapshot(
    progressCollection,
    (snapshot) => {
      const progressData = {};
      snapshot.docs.forEach((doc) => {
        progressData[doc.id] = doc.data();
      });
      callback(progressData);
    },
    (error) => {
      console.error("Error fetching user progress:", error);
      callback({});
    },
  );

  return unsubscribe;
};

// Subscribe to user profile realtime updates
export const subscribeToUserProfile = (uid, callback) => {
  if (!uid) return () => {};

  const userDoc = doc(db, "users", uid);

  const unsubscribe = onSnapshot(
    userDoc,
    (docSnapshot) => {
      if (docSnapshot.exists()) {
        callback(docSnapshot.data());
      } else {
        callback(null);
      }
    },
    (error) => {
      console.error("Error fetching user profile:", error);
      callback(null);
    },
  );

  return unsubscribe;
};

// Update progress data for a given lesson and user
export const updateProgress = async (uid, lessonId, progressData) => {
  if (!uid || !lessonId) return;

  const progressDoc = doc(db, "users", uid, "progress", lessonId);

  try {
    await setDoc(
      progressDoc,
      {
        ...progressData,
        updatedAt: new Date(),
      },
      { merge: true },
    );
  } catch (error) {
    console.error("Error updating progress:", error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (uid, profileData) => {
  if (!uid) return;

  const userDoc = doc(db, "users", uid);

  try {
    await updateDoc(userDoc, {
      ...profileData,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// Create or update user profile document
export const createOrUpdateUserProfile = async (user) => {
  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);

  try {
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        createdAt: new Date(),
        role: "user",
        bio: "",
        location: "",
        language: "English",
        phone: "",
        dateOfBirth: "",
        website: "",
        lastLoginAt: new Date(),
      });
      console.log("User profile created for:", user.uid);
    } else {
      // Update last login
      await updateDoc(userDocRef, {
        lastLoginAt: new Date(),
      });
      console.log("User profile updated for:", user.uid);
    }
  } catch (error) {
    console.error("Error creating/updating user profile:", error);
  }
};

// Subscribe to user stats (computed from progress data)
export const subscribeToUserStats = (userId, callback) => {
  if (!userId) return () => {};

  // We'll compute stats from progress data instead of storing separately
  return subscribeToUserProgress(userId, (progressData) => {
    const completedLessons = Object.values(progressData).filter(
      (p) => p && p.completed,
    ).length;

    const totalXP = Object.values(progressData)
      .filter((p) => p && p.completed)
      .reduce((sum, p) => sum + (p.xpEarned || 10), 0);

    // Calculate streak based on consecutive days (simplified version)
    const completedDates = Object.values(progressData)
      .filter((p) => p && p.completed && p.completedAt)
      .map((p) => new Date(p.completedAt).toDateString())
      .sort();

    const uniqueDates = [...new Set(completedDates)];
    let streak = 0;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (uniqueDates.includes(today) || uniqueDates.includes(yesterday)) {
      streak = 1;
      // Simple streak calculation - you can make this more sophisticated
      for (let i = uniqueDates.length - 2; i >= 0; i--) {
        const currentDate = new Date(uniqueDates[i + 1]);
        const prevDate = new Date(uniqueDates[i]);
        const diffTime = currentDate.getTime() - prevDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 1) {
          streak++;
        } else {
          break;
        }
      }
    }

    callback({
      totalXP,
      streak,
      completedLessons,
    });
  });
};

// App Context for state management
const AppContext = createContext();

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

// Profile Edit Modal Component
const ProfileEditModal = ({ isOpen, onClose, userProfile, onSave }) => {
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    location: "",
    language: "English",
    phone: "",
    dateOfBirth: "",
    website: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        displayName: userProfile.displayName || "",
        bio: userProfile.bio || "",
        location: userProfile.location || "",
        language: userProfile.language || "English",
        phone: userProfile.phone || "",
        dateOfBirth: userProfile.dateOfBirth || "",
        website: userProfile.website || "",
      });
    }
  }, [userProfile]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          <div className="space-y-6">
            {/* Profile Picture Section */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {formData.displayName?.charAt(0) ||
                  userProfile?.email?.charAt(0) ||
                  "U"}
              </div>
              <button className="flex items-center justify-center mx-auto px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Camera size={16} className="mr-2" />
                Change Photo
              </button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) =>
                    handleInputChange("displayName", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your display name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={userProfile?.email || ""}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Native Language
                </label>
                <select
                  value={formData.language}
                  onChange={(e) =>
                    handleInputChange("language", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Italian">Italian</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="Russian">Russian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Korean">Korean</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Turkish">Turkish</option>
                  <option value="Dutch">Dutch</option>
                  <option value="Swedish">Swedish</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://your-website.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save size={16} className="mr-2" />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const { user, userProfile, setShowProfileModal } = useAppContext();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">English4We</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Home size={18} />
              <span>Home</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <BarChart3 size={18} />
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-blue-600 font-medium"
            >
              <BookOpen size={18} />
              <span>Lessons</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Flame size={18} />
              <span>Streaks</span>
            </a>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {userProfile?.displayName?.charAt(0) ||
                  user?.displayName?.charAt(0) ||
                  user?.email?.charAt(0) ||
                  "U"}
              </div>
              <span className="hidden md:block">
                {userProfile?.displayName ||
                  user?.displayName ||
                  user?.email ||
                  "User"}
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                <button
                  onClick={() => {
                    setShowProfileModal(true);
                    setShowUserMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  <User size={16} className="inline mr-2" />
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} className="inline mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// XP and Streak Display Component
const XPStreakDisplay = () => {
  const { userStats, showStatsModal, setShowStatsModal, userProfile } =
    useAppContext();

  const currentLevel = Math.floor(userStats.totalXP / 100) + 1;
  const xpToNextLevel = 100 - (userStats.totalXP % 100);
  const levelProgress = userStats.totalXP % 100;

  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {userProfile?.displayName || "Learner"}!
            </h2>
            <p className="text-blue-100">
              You're doing great! Continue your streak.
            </p>
          </div>
          <div className="text-right">
            <button
              onClick={() => setShowStatsModal(true)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 transition-all rounded-lg p-3"
            >
              <Trophy size={32} className="text-yellow-300" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{userStats.totalXP}</div>
              <div className="text-sm text-blue-100">Total XP</div>
            </div>
            <div className="text-center">
              <div className="flex items-center text-2xl font-bold">
                <Flame className="mr-1 text-orange-300" size={24} />
                {userStats.streak}
              </div>
              <div className="text-sm text-blue-100">Day Streak</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-blue-100 mb-1">
              Level {currentLevel} Progress
            </div>
            <div className="w-32 bg-white bg-opacity-20 rounded-full h-2">
              <div
                className="bg-yellow-300 h-2 rounded-full transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              ></div>
            </div>
            <div className="text-xs text-blue-100 mt-1">
              {xpToNextLevel} XP to next level
            </div>
          </div>
        </div>
      </div>

      {/* Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Your Stats</h3>
              <button
                onClick={() => setShowStatsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Star className="text-yellow-500" size={24} />
                  <span className="font-medium">Total XP</span>
                </div>
                <span className="text-xl font-bold text-blue-600">
                  {userStats.totalXP}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Flame className="text-orange-500" size={24} />
                  <span className="font-medium">Current Streak</span>
                </div>
                <span className="text-xl font-bold text-orange-600">
                  {userStats.streak} days
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={24} />
                  <span className="font-medium">Lessons Completed</span>
                </div>
                <span className="text-xl font-bold text-green-600">
                  {userStats.completedLessons}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Target className="text-purple-500" size={24} />
                  <span className="font-medium">Current Level</span>
                </div>
                <span className="text-xl font-bold text-purple-600">
                  Level {currentLevel}
                </span>
              </div>

              {/* Profile Info in Stats */}
              {userProfile && (
                <>
                  {userProfile.location && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MapPin className="text-gray-500" size={24} />
                        <span className="font-medium">Location</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {userProfile.location}
                      </span>
                    </div>
                  )}

                  {userProfile.language && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Globe className="text-gray-500" size={24} />
                        <span className="font-medium">Native Language</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {userProfile.language}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Flashcard Component
const FlashcardViewer = ({ flashcards, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCards, setCompletedCards] = useState(new Set());

  const currentCard = flashcards[currentIndex];
  const isLastCard = currentIndex === flashcards.length - 1;
  const allCompleted = completedCards.size === flashcards.length;

  const handleNext = () => {
    setCompletedCards((prev) => new Set([...prev, currentIndex]));
    if (isLastCard && allCompleted) {
      onComplete();
    } else if (!isLastCard) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompletedCards(new Set());
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Card {currentIndex + 1} of {flashcards.length}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleReset}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Reset"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      <div className="relative h-64 mb-6">
        <div
          className={`absolute inset-0 w-full h-full cursor-pointer transition-transform duration-600 ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          {/* Front of card */}
          <div
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="text-center">
              <div className="mb-2">{currentCard.front}</div>
              <div className="text-sm opacity-75">Click to reveal</div>
            </div>
          </div>

          {/* Back of card */}
          <div
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="text-center">
              <div>{currentCard.back}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={20} className="mr-2" />
          Previous
        </button>

        <div className="flex space-x-2">
          {flashcards.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex
                  ? "bg-blue-500"
                  : completedCards.has(index)
                    ? "bg-green-500"
                    : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {isLastCard && allCompleted ? "Complete" : "Next"}
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

// Audio Player Component
const AudioPlayer = ({ audioUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= duration) {
            setIsPlaying(false);
            return 0;
          }
          setProgress((newTime / duration) * 100);
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  useEffect(() => {
    setDuration(180); // Will be replaced with actual audio duration
  }, [audioUrl]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h4 className="font-medium text-gray-800 mb-4">{title}</h4>

      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
        >
          {isPlaying ? <Pause size={24} /> : <PlayCircle size={24} />}
        </button>

        <div className="flex-1">
          <div className="w-full bg-gray-300 rounded-full h-2 mb-1">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
          <SkipBack size={20} />
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
          <SkipForward size={20} />
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
          <Download size={20} />
        </button>
      </div>
    </div>
  );
};

// Lesson Viewer Modal Component
const LessonViewer = ({ lesson, isOpen, onClose, onComplete }) => {
  const [activeTab, setActiveTab] = useState("video");
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const { user } = useAppContext();

  useEffect(() => {
    if (lesson && lesson.type) {
      if (lesson.type.includes("video")) {
        setActiveTab("video");
      } else if (lesson.type.includes("audio")) {
        setActiveTab("audio");
      } else if (lesson.flashcards) {
        setActiveTab("flashcards");
      } else if (lesson.type.includes("document")) {
        setActiveTab("document");
      }
    }
  }, [lesson]);

  if (!isOpen || !lesson) return null;

  const handleComplete = async () => {
    try {
      await updateProgress(user.uid, lesson.id, {
        completed: true,
        completedAt: new Date().toISOString(),
        xpEarned: lesson.xpReward || 10,
      });
      setLessonCompleted(true);
      onComplete(lesson.id, lesson.xpReward || 10);
    } catch (error) {
      console.error("Error completing lesson:", error);
    }
  };

  const handleFlashcardsComplete = () => {
    handleComplete();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{lesson.title}</h2>
            <p className="text-gray-600">{lesson.description}</p>
            {lesson.moduleName && (
              <div className="text-sm text-blue-600 mt-1">
                {lesson.moduleName} → {lesson.unitName}
                {lesson.lesson && ` → ${lesson.lesson}`}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Tabs */}
        <div className="flex border-b border-gray-200">
          {lesson.type && lesson.type.includes("video") && (
            <button
              onClick={() => setActiveTab("video")}
              className={`px-6 py-3 flex items-center space-x-2 transition-colors ${
                activeTab === "video"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Video size={20} />
              <span>Video</span>
            </button>
          )}
          {lesson.type && lesson.type.includes("audio") && (
            <button
              onClick={() => setActiveTab("audio")}
              className={`px-6 py-3 flex items-center space-x-2 transition-colors ${
                activeTab === "audio"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Volume2 size={20} />
              <span>Audio</span>
            </button>
          )}
          {lesson.flashcards && (
            <button
              onClick={() => setActiveTab("flashcards")}
              className={`px-6 py-3 flex items-center space-x-2 transition-colors ${
                activeTab === "flashcards"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <BookOpen size={20} />
              <span>Flashcards</span>
            </button>
          )}
          {lesson.type && lesson.type.includes("document") && (
            <button
              onClick={() => setActiveTab("document")}
              className={`px-6 py-3 flex items-center space-x-2 transition-colors ${
                activeTab === "document"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <FileText size={20} />
              <span>Document</span>
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          {activeTab === "video" && lesson.videoUrl && (
            <div className="aspect-video">
              <iframe
                src={lesson.videoUrl}
                className="w-full h-full rounded-lg"
                allowFullScreen
                title={lesson.title}
              ></iframe>
            </div>
          )}

          {activeTab === "audio" && lesson.audioUrl && (
            <AudioPlayer audioUrl={lesson.audioUrl} title={lesson.title} />
          )}

          {activeTab === "flashcards" && lesson.flashcards && (
            <FlashcardViewer
              flashcards={lesson.flashcards}
              onComplete={handleFlashcardsComplete}
            />
          )}

          {activeTab === "document" && lesson.documentUrl && (
            <div className="text-center">
              <div className="bg-gray-50 rounded-xl p-8 mb-4">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  {lesson.title} - Worksheet
                </h4>
                <p className="text-gray-600 mb-4">
                  Download the worksheet to practice offline
                </p>
                <a
                  href={lesson.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Download size={20} className="mr-2" />
                  Download PDF
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                lesson.level === "A0"
                  ? "bg-red-100 text-red-800"
                  : lesson.level === "A1"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
              }`}
            >
              {lesson.level}
            </span>
            <span className="text-sm text-gray-600">
              +{lesson.xpReward || 10} XP
            </span>
            {lesson.uploaderName && (
              <span className="text-xs text-gray-400">
                Created by {lesson.uploaderName}
              </span>
            )}
          </div>

          {!lessonCompleted ? (
            <button
              onClick={handleComplete}
              className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <CheckCircle size={20} className="mr-2" />
              Mark as Complete
            </button>
          ) : (
            <div className="flex items-center text-green-600">
              <CheckCircle size={20} className="mr-2" />
              Lesson Completed!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Lesson Card Component
const LessonCard = ({ lesson, progress, onViewLesson }) => {
  const isCompleted = progress?.completed || false;
  const isStarted = progress?.started || false;

  const getStatusColor = () => {
    if (isCompleted) return "text-green-600 bg-green-50";
    if (isStarted) return "text-yellow-600 bg-yellow-50";
    return "text-gray-600 bg-gray-50";
  };

  const getStatusText = () => {
    if (isCompleted) return "Completed";
    if (isStarted) return "In Progress";
    return "Not Started";
  };

  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle size={16} />;
    if (isStarted) return <Clock size={16} />;
    return <Clock size={16} />;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200">
      {lesson.moduleName && (
        <div className="text-xs text-gray-500 mb-2">
          {lesson.moduleName} → {lesson.unitName}
          {lesson.lesson && ` → ${lesson.lesson}`}
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            lesson.level === "A0"
              ? "bg-red-100 text-red-800"
              : lesson.level === "A1"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
          }`}
        >
          {lesson.level}
        </span>
        <div
          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor()}`}
        >
          {getStatusIcon()}
          <span>{getStatusText()}</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2">{lesson.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{lesson.description}</p>

      <div className="flex items-center space-x-3 mb-4">
        {lesson.type && lesson.type.includes("video") && (
          <div className="flex items-center space-x-1 text-blue-600">
            <Video size={16} />
            <span className="text-xs">Video</span>
          </div>
        )}
        {lesson.type && lesson.type.includes("audio") && (
          <div className="flex items-center space-x-1 text-green-600">
            <Volume2 size={16} />
            <span className="text-xs">Audio</span>
          </div>
        )}
        {lesson.flashcards && (
          <div className="flex items-center space-x-1 text-purple-600">
            <BookOpen size={16} />
            <span className="text-xs">Flashcards</span>
          </div>
        )}
        {lesson.type && lesson.type.includes("document") && (
          <div className="flex items-center space-x-1 text-orange-600">
            <FileText size={16} />
            <span className="text-xs">Document</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Star size={16} className="text-yellow-500" />
          <span>+{lesson.xpReward || 10} XP</span>
          {lesson.uploaderName && (
            <span className="text-xs text-gray-400">
              by {lesson.uploaderName}
            </span>
          )}
        </div>
        <button
          onClick={() => onViewLesson(lesson)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          View Lesson
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

// Continue Learning Button Component
const ContinueLearningButton = ({ lessons, userProgress, onViewLesson }) => {
  const nextLesson = lessons.find(
    (lesson) => !userProgress[lesson.id]?.completed,
  );

  if (!nextLesson) {
    return (
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white text-center mb-6">
        <Trophy size={48} className="mx-auto mb-4 text-yellow-300" />
        <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
        <p className="text-green-100">
          You've completed all available lessons!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold mb-2">Continue Learning</h2>
          <p className="text-blue-100 mb-3">Next: {nextLesson.title}</p>
          <button
            onClick={() => onViewLesson(nextLesson)}
            className="flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            Continue Learning
            <ArrowRight size={20} className="ml-2" />
          </button>
        </div>
        <div className="text-right">
          <Play size={48} className="text-white opacity-20" />
        </div>
      </div>
    </div>
  );
};

// Main App Component
const UserLessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showLessonViewer, setShowLessonViewer] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterModule, setFilterModule] = useState("all");
  const [userStats, setUserStats] = useState({
    totalXP: 0,
    streak: 0,
    completedLessons: 0,
  });

  const [user, setUser] = useState(null);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        createOrUpdateUserProfile(firebaseUser);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Subscribe to Firebase data
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribeLessons = subscribeToLessons((lessonsData) => {
      setLessons(lessonsData || []);
      setLoading(false);
    });

    const unsubscribeProgress = subscribeToUserProgress(
      user.uid,
      (progressData) => {
        setUserProgress(progressData || {});
      },
    );

    const unsubscribeProfile = subscribeToUserProfile(
      user.uid,
      (profileData) => {
        setUserProfile(profileData);
      },
    );

    const unsubscribeStats = subscribeToUserStats(user.uid, (statsData) => {
      setUserStats(statsData);
    });

    return () => {
      unsubscribeLessons();
      unsubscribeProgress();
      unsubscribeProfile();
      unsubscribeStats();
    };
  }, [user]);

  const handleViewLesson = (lesson) => {
    setSelectedLesson(lesson);
    setShowLessonViewer(true);

    // Mark lesson as started if not already
    if (
      user &&
      !userProgress[lesson.id]?.started &&
      !userProgress[lesson.id]?.completed
    ) {
      updateProgress(user.uid, lesson.id, {
        started: true,
        startedAt: new Date().toISOString(),
      });
    }
  };

  const handleLessonComplete = (lessonId, xpEarned) => {
    if (user) {
      updateProgress(user.uid, lessonId, {
        completed: true,
        completedAt: new Date().toISOString(),
        xpEarned,
      });
    }
    setShowLessonViewer(false);
  };

  const handleProfileSave = async (profileData) => {
    if (user) {
      await updateUserProfile(user.uid, profileData);
    }
  };

  // Enhanced filtering
  const filteredLessons = lessons.filter((lesson) => {
    const matchesLevel = filterLevel === "all" || lesson.level === filterLevel;
    const matchesModule =
      filterModule === "all" || lesson.module === filterModule;
    return matchesLevel && matchesModule;
  });

  // Get unique modules for the selected level
  const availableModules = lessons
    .filter((lesson) => filterLevel === "all" || lesson.level === filterLevel)
    .reduce((modules, lesson) => {
      if (
        lesson.moduleName &&
        lesson.module &&
        !modules.some((m) => m.id === lesson.module)
      ) {
        modules.push({ id: lesson.module, name: lesson.moduleName });
      }
      return modules;
    }, []);

  const contextValue = {
    user,
    userProfile,
    userStats,
    showStatsModal,
    setShowStatsModal,
    showProfileModal,
    setShowProfileModal,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your lessons...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={64} className="mx-auto mb-4 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Please Sign In
          </h2>
          <p className="text-gray-600">
            Sign in to access your lessons and track your progress.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <XPStreakDisplay />

          <ContinueLearningButton
            lessons={lessons}
            userProgress={userProgress}
            onViewLesson={handleViewLesson}
          />

          {/* Enhanced Filter Controls */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">All Lessons</h2>
            <div className="flex space-x-4">
              <select
                value={filterLevel}
                onChange={(e) => {
                  setFilterLevel(e.target.value);
                  setFilterModule("all");
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Levels</option>
                <option value="A0">A0 - Absolute Beginner</option>
                <option value="A1">A1 - Beginner</option>
                <option value="A2">A2 - Elementary</option>
              </select>

              <select
                value={filterModule}
                onChange={(e) => setFilterModule(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                disabled={availableModules.length === 0}
              >
                <option value="all">All Modules</option>
                {availableModules.map((module) => (
                  <option key={module.id} value={module.id}>
                    {module.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                progress={userProgress[lesson.id]}
                onViewLesson={handleViewLesson}
              />
            ))}
          </div>

          {filteredLessons.length === 0 && (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                No lessons found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filter settings or check back later for new
                content.
              </p>
            </div>
          )}
        </div>

        <LessonViewer
          lesson={selectedLesson}
          isOpen={showLessonViewer}
          onClose={() => setShowLessonViewer(false)}
          onComplete={handleLessonComplete}
        />

        <ProfileEditModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          userProfile={userProfile}
          onSave={handleProfileSave}
        />
      </div>
    </AppContext.Provider>
  );
};

export default UserLessonsPage;
