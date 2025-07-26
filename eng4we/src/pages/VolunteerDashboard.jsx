import React, { useState, useEffect, createContext, useContext } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
import {
  User,
  Edit3,
  LogOut,
  Plus,
  Check,
  X,
  Upload,
  MessageCircle,
  Eye,
  Calendar,
  Clock,
  Trash2,
  Download,
  Search,
  Filter,
  Send,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

// Initialize Firebase services
const auth = getAuth();
const db = getFirestore();

// Curriculum data structure based on your provided curriculum
const CURRICULUM_DATA = {
  A0: {
    modules: [
      {
        id: "mod1",
        name: "English Sounds, Alphabet & Greetings",
        units: [
          {
            id: "unit1",
            name: "Alphabet & Numbers",
            lessons: ["Alphabet A–M", "Alphabet N–Z", "Numbers 1–20"],
          },
          {
            id: "unit2",
            name: "Greetings & Essential Phrases",
            lessons: [
              "Greetings & Farewells",
              "Polite Expressions",
              "Key Phrases",
            ],
          },
        ],
      },
      {
        id: "mod2",
        name: "Introducing Yourself & Others",
        units: [
          {
            id: "unit1",
            name: "Personal Info",
            lessons: [
              "My Name / Where I'm From",
              "Age / Nationality / Occupation",
              "Simple Questions",
            ],
          },
        ],
      },
      {
        id: "mod3",
        name: "Everyday Phrases & Survival English",
        units: [
          {
            id: "unit1",
            name: "Classroom and Public Phrases",
            lessons: [
              "I don't understand / Please repeat",
              "I need / I want",
              "Giving Simple Instructions",
            ],
          },
        ],
      },
      {
        id: "mod4",
        name: "Family, Friends & Descriptions",
        units: [
          {
            id: "unit1",
            name: "Family Vocabulary",
            lessons: ["Immediate Family", "This is my mother"],
          },
          {
            id: "unit2",
            name: "Describing People",
            lessons: ["Appearance", "Personality"],
          },
        ],
      },
      {
        id: "mod5",
        name: "Daily Life & Routines",
        units: [
          {
            id: "unit1",
            name: "Common Verbs & Time",
            lessons: ["Daily Actions", "Time & Days"],
          },
        ],
      },
    ],
  },
  A1: {
    modules: [
      {
        id: "mod1",
        name: "Daily Life & Routines",
        units: [
          {
            id: "unit1",
            name: "Talking About Your Day",
            lessons: [
              "Daily Activities",
              "Time Expressions",
              "Talking About School & Home",
            ],
          },
          {
            id: "unit2",
            name: "The Clock & Scheduling",
            lessons: [
              "Telling the Time",
              "Asking What time do you",
              "Expressing Frequency",
            ],
          },
          {
            id: "unit3",
            name: "Daily Habits and Routines",
            lessons: [
              "Present Simple (affirmative)",
              "Present Simple (negative)",
              "Short answers and Yes/No Questions",
            ],
          },
          {
            id: "unit4",
            name: "Weekends and Free Time",
            lessons: [
              "Weekend Activities",
              "Talking About Hobbies",
              "Likes/Dislikes",
            ],
          },
        ],
      },
      {
        id: "mod2",
        name: "Food and Meals",
        units: [
          {
            id: "unit1",
            name: "Food Vocabulary",
            lessons: [
              "Fruits & Vegetables",
              "Drinks & Snacks",
              "Meals of the Day",
            ],
          },
          {
            id: "unit2",
            name: "In the Kitchen",
            lessons: [
              "Common kitchen verbs",
              "Cooking utensils and appliances",
            ],
          },
          {
            id: "unit3",
            name: "Preferences & Ordering",
            lessons: ["I'd like / Can I have", "At a restaurant/café"],
          },
          {
            id: "unit4",
            name: "Countable/Uncountable Nouns",
            lessons: ["Some / Any / A lot of", "Quantifiers & Containers"],
          },
        ],
      },
      {
        id: "mod3",
        name: "Describing People & Things",
        units: [
          {
            id: "unit1",
            name: "Physical Appearance",
            lessons: [
              "Height, hair, eyes, clothes",
              "He has / She is structures",
            ],
          },
          {
            id: "unit2",
            name: "Personality Traits",
            lessons: [
              "Adjectives for personality",
              "Talking about friends and family",
            ],
          },
          {
            id: "unit3",
            name: "Comparing People and Things",
            lessons: ["-er adjectives + than", "Irregular comparatives"],
          },
          {
            id: "unit4",
            name: "Talking About Objects",
            lessons: ["Everyday items", "Describing size, color, material"],
          },
        ],
      },
    ],
  },
  A2: {
    modules: [
      {
        id: "mod1",
        name: "Talking About the Future and Opinions",
        units: [
          {
            id: "unit1",
            name: "Talking About the Future",
            lessons: [
              "Be going to for plans",
              "Will for predictions",
              "Future time expressions",
            ],
          },
          {
            id: "unit2",
            name: "Making Arrangements",
            lessons: [
              "Invitations and polite refusals",
              "Suggesting time and place",
              "Finalizing plans",
            ],
          },
          {
            id: "unit3",
            name: "Giving Opinions",
            lessons: [
              "Expressing opinions",
              "Agreeing/disagreeing politely",
              "Backing opinions with reasons",
            ],
          },
          {
            id: "unit4",
            name: "Preferences and Comparisons",
            lessons: [
              "Prefer, would rather",
              "Comparative adjectives",
              "Explaining preferences",
            ],
          },
        ],
      },
      {
        id: "mod2",
        name: "Past Experiences and Storytelling",
        units: [
          {
            id: "unit1",
            name: "Past Tense Forms",
            lessons: [
              "Regular/irregular verb review",
              "Past Simple negatives and questions",
              "Time expressions",
            ],
          },
          {
            id: "unit2",
            name: "Personal Experiences",
            lessons: [
              "Have you ever intro",
              "Describing emotional reactions",
              "Asking follow-up questions",
            ],
          },
          {
            id: "unit3",
            name: "Telling Stories",
            lessons: [
              "Sequencing events",
              "Linking words",
              "Writing short personal narratives",
            ],
          },
          {
            id: "unit4",
            name: "Travel and Cultural Memories",
            lessons: [
              "Talking about past trips",
              "Describing what you saw/did/ate",
              "Cultural comparisons",
            ],
          },
        ],
      },
    ],
  },
};

const CONTENT_TYPES = [
  "Video",
  "Quiz",
  "Flashcards",
  "Document",
  "Audio",
  "Interactive Exercise",
  "Worksheet",
  "Presentation",
];

// Context for global state management
const AppContext = createContext();

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

// Toast notification component
const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
      type === "success"
        ? "bg-green-500 text-white"
        : type === "error"
        ? "bg-red-500 text-white"
        : "bg-blue-500 text-white"
    } transform transition-all duration-300 animate-pulse`}
  >
    <div className="flex items-center justify-between">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        <X size={16} />
      </button>
    </div>
  </div>
);

// Profile Modal Component
const ProfileModal = ({ isOpen, onClose, volunteer, onSave }) => {
  const [formData, setFormData] = useState({
    name: volunteer?.name || "",
    avatar: volunteer?.avatar || "",
  });

  useEffect(() => {
    if (volunteer) {
      setFormData({
        name: volunteer.name || "",
        avatar: volunteer.avatar || "",
      });
    }
  }, [volunteer]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avatar URL
            </label>
            <input
              type="text"
              value={formData.avatar}
              onChange={(e) =>
                setFormData({ ...formData, avatar: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Task Modal Component
const TaskModal = ({ isOpen, onClose, task, onSave, isEditing }) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    dueDate: task?.dueDate || "",
    status: task?.status || "pending",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        dueDate: task.dueDate,
        status: task.status,
      });
    } else {
      setFormData({
        title: "",
        dueDate: "",
        status: "pending",
      });
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (formData.title.trim()) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isEditing ? "Edit Task" : "Add New Task"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter task description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isEditing ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Content Upload Modal Component
const ContentUploadModal = ({ isOpen, onClose, onUpload }) => {
  const { showToast, volunteer } = useAppContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lessonLevel: "A0",
    module: "",
    unit: "",
    lesson: "",
    contentType: "Document",
    file: null,
    externalUrl: "",
  });
  const [uploading, setUploading] = useState(false);

  const selectedModule = CURRICULUM_DATA[formData.lessonLevel]?.modules.find(
    (m) => m.id === formData.module
  );
  const selectedUnit = selectedModule?.units.find(
    (u) => u.id === formData.unit
  );

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      lessonLevel: "A0",
      module: "",
      unit: "",
      lesson: "",
      contentType: "Document",
      file: null,
      externalUrl: "",
    });
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast("Please enter a title", "error");
      return;
    }
    if (!formData.module || !formData.unit) {
      showToast("Please select module and unit", "error");
      return;
    }
    if (!formData.file && !formData.externalUrl.trim()) {
      showToast("Please upload a file or provide an external URL", "error");
      return;
    }

    setUploading(true);

    try {
      // Create lesson data structure compatible with user dashboard
      const lessonData = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        level: formData.lessonLevel,
        module: formData.module,
        unit: formData.unit,
        lesson: formData.lesson,
        type: [formData.contentType.toLowerCase()],
        contentType: formData.contentType,
        xpReward: 50, // Default XP reward

        // URL handling based on content type
        videoUrl:
          formData.contentType === "Video" ? formData.externalUrl : null,
        audioUrl:
          formData.contentType === "Audio" ? formData.externalUrl : null,
        documentUrl:
          formData.contentType === "Document" ? formData.externalUrl : null,

        // Add flashcards for flashcard content type
        flashcards:
          formData.contentType === "Flashcards"
            ? [
                { front: "Sample Question", back: "Sample Answer" },
                { front: "Hello", back: "Hola" },
              ]
            : null,

        // Metadata
        uploaderId: volunteer?.id || "volunteer1",
        uploaderName: volunteer?.name || "Unknown Volunteer",
        uploadedAt: new Date().toISOString(),
        approved: true, // Auto-approve for now

        // Curriculum structure
        moduleName: selectedModule?.name,
        unitName: selectedUnit?.name,
      };

      // Save to Firestore
      await setDoc(doc(db, "lessons", lessonData.id), lessonData);

      // Also call the parent callback for local state management
      onUpload(lessonData);

      showToast("Content uploaded and available to students!", "success");
    } catch (error) {
      console.error("Error uploading content:", error);
      showToast("Error uploading content. Please try again.", "error");
    } finally {
      setUploading(false);
      resetForm();
      onClose();
    }
  };

  const handleLevelChange = (level) => {
    setFormData({
      ...formData,
      lessonLevel: level,
      module: "",
      unit: "",
      lesson: "",
    });
  };

  const handleModuleChange = (moduleId) => {
    setFormData({
      ...formData,
      module: moduleId,
      unit: "",
      lesson: "",
    });
  };

  const handleUnitChange = (unitId) => {
    setFormData({
      ...formData,
      unit: unitId,
      lesson: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Upload Curriculum Content
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter content title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <select
                value={formData.contentType}
                onChange={(e) =>
                  setFormData({ ...formData, contentType: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {CONTENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="Describe the content and learning objectives"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level *
              </label>
              <select
                value={formData.lessonLevel}
                onChange={(e) => handleLevelChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="A0">A0 - Absolute Beginner</option>
                <option value="A1">A1 - Beginner</option>
                <option value="A2">A2 - Elementary</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Module *
              </label>
              <select
                value={formData.module}
                onChange={(e) => handleModuleChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Module</option>
                {CURRICULUM_DATA[formData.lessonLevel]?.modules.map(
                  (module) => (
                    <option key={module.id} value={module.id}>
                      {module.name}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit *
              </label>
              <select
                value={formData.unit}
                onChange={(e) => handleUnitChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={!formData.module}
              >
                <option value="">Select Unit</option>
                {selectedModule?.units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedUnit && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson (Optional)
              </label>
              <select
                value={formData.lesson}
                onChange={(e) =>
                  setFormData({ ...formData, lesson: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Lesson (Optional)</option>
                {selectedUnit.lessons.map((lesson, index) => (
                  <option key={index} value={lesson}>
                    {lesson}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, file: e.target.files[0] })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                accept=".pdf,.doc,.docx,.mp4,.jpg,.jpeg,.png,.gif,.json"
              />
              <p className="text-sm text-gray-500 mt-1">
                PDF, DOC, MP4, Images, JSON
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                External URL (Optional)
              </label>
              <input
                type="url"
                value={formData.externalUrl}
                onChange={(e) =>
                  setFormData({ ...formData, externalUrl: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/resource"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 flex items-center"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={16} className="mr-2" />
                  Upload Content
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Volunteer Profile Component
const VolunteerProfile = () => {
  const { volunteer, setVolunteer, showToast } = useAppContext();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleProfileSave = async (updatedData) => {
    try {
      if (volunteer?.id) {
        // Update profile in Firestore
        await setDoc(
          doc(db, "volunteers", volunteer.id),
          {
            ...volunteer,
            ...updatedData,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }

      setVolunteer({ ...volunteer, ...updatedData });
      showToast("Profile updated successfully!", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast("Error updating profile. Please try again.", "error");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showToast("Logged out successfully!", "success");
    } catch (error) {
      console.error("Logout error:", error);
      showToast("Error logging out", "error");
    }
  };

  if (!volunteer) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
              {volunteer.avatar ? (
                <img
                  src={volunteer.avatar}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                volunteer.name?.charAt(0)?.toUpperCase() || "V"
              )}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">
              {volunteer.name || "Loading..."}
            </h2>
            <p className="text-gray-600">Volunteer</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowProfileModal(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit Profile"
            >
              <Edit3 size={20} />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        volunteer={volunteer}
        onSave={handleProfileSave}
      />
    </>
  );
};

// Task Management Component
const TaskManagement = () => {
  const { tasks, setTasks, showToast } = useAppContext();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [sortBy, setSortBy] = useState("date");

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    showToast("Task added successfully!", "success");
  };

  const updateTask = (taskData) => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id ? { ...task, ...taskData } : task
      )
    );
    showToast("Task updated successfully!", "success");
    setEditingTask(null);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== taskId));
      showToast("Task deleted successfully!", "success");
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Task Management</h3>
          <div className="flex items-center space-x-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Sort by Date</option>
              <option value="status">Sort by Status</option>
            </select>
            <button
              onClick={() => setShowTaskModal(true)}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={16} className="mr-2" />
              Add Task
            </button>
          </div>
        </div>

        {totalTasks > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>
                {completedTasks} of {totalTasks} completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {sortedTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No tasks yet. Add your first task!
            </p>
          ) : (
            sortedTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
                  task.completed
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                } hover:shadow-md`}
              >
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                  >
                    {task.completed && <Check size={14} />}
                  </button>
                  <div
                    className={
                      task.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    <h4 className="font-medium">{task.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {task.dueDate || "No due date"}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          task.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : task.status === "in-progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingTask(task);
                      setShowTaskModal(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Task"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Task"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <TaskModal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setEditingTask(null);
        }}
        task={editingTask}
        onSave={editingTask ? updateTask : addTask}
        isEditing={!!editingTask}
      />
    </>
  );
};

// Resources Component
const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");

  const mockResources = [
    {
      id: 1,
      title: "A0 Alphabet Practice Sheets",
      description:
        "Printable worksheets for letter recognition and writing practice",
      level: "A0",
      type: "Document",
      fileType: "PDF",
    },
    {
      id: 2,
      title: "Basic Greetings Flashcards",
      description: "Visual flashcards for common English greetings",
      level: "A0",
      type: "Flashcards",
      fileType: "PDF",
    },
    {
      id: 3,
      title: "Daily Routine Video Lesson",
      description: "Interactive video explaining daily activities",
      level: "A1",
      type: "Video",
      fileType: "MP4",
    },
  ];

  const filteredResources = mockResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel =
      filterLevel === "all" || resource.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Resources & Templates
      </h3>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Levels</option>
            <option value="A0">A0 - Absolute Beginner</option>
            <option value="A1">A1 - Beginner</option>
            <option value="A2">A2 - Elementary</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-gray-800">{resource.title}</h4>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  resource.level === "A0"
                    ? "bg-red-100 text-red-800"
                    : resource.level === "A1"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {resource.level}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{resource.fileType}</span>
              <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                <Download size={14} className="mr-1" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Content Upload Component
const ContentUpload = () => {
  const { showToast, uploadedContent, setUploadedContent } = useAppContext();
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleUpload = (uploadData) => {
    setUploadedContent([...uploadedContent, uploadData]);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Content Upload</h3>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Upload size={16} className="mr-2" />
            Upload Content
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uploadedContent.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No content uploaded yet. Start by uploading your first lesson!
            </div>
          ) : (
            uploadedContent.map((content) => (
              <div
                key={content.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{content.title}</h4>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      content.level === "A0"
                        ? "bg-red-100 text-red-800"
                        : content.level === "A1"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {content.level}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {content.description}
                </p>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>
                    <strong>Module:</strong> {content.moduleName}
                  </div>
                  <div>
                    <strong>Unit:</strong> {content.unitName}
                  </div>
                  <div>
                    <strong>Type:</strong> {content.contentType}
                  </div>
                  <div>
                    <strong>Uploaded:</strong>{" "}
                    {new Date(content.uploadedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ContentUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUpload}
      />
    </>
  );
};

// Messaging Component
const Messaging = () => {
  const { messages, setMessages, volunteer } = useAppContext();
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && volunteer) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: volunteer.name,
        timestamp: new Date().toISOString(),
        avatar: volunteer.avatar,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <MessageCircle className="mr-2" size={24} />
        Volunteer Chat
      </h3>

      <div className="h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 mb-4 space-y-3">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {message.avatar ? (
                  <img
                    src={message.avatar}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  message.sender?.charAt(0)?.toUpperCase() || "?"
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-sm">{message.sender}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{message.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={sendMessage} className="flex space-x-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

// View Toggle Component
const ViewToggle = () => {
  const { showToast } = useAppContext();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleViewSwitch = () => {
    setShowConfirmModal(true);
  };

  const confirmSwitch = () => {
    showToast("Switching to User View...", "success");
    setShowConfirmModal(false);
    // In a real app, this would redirect to /userView
    setTimeout(() => {
      showToast("Welcome to User View! (This is a demo)", "success");
    }, 1000);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Current View: Volunteer Dashboard
            </h3>
            <p className="text-sm text-gray-600">
              Switch to see how learners view your uploaded content
            </p>
          </div>
          <button
            onClick={handleViewSwitch}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            <Eye size={16} className="mr-2" />
            Switch to User View
          </button>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Switch to User View?
            </h3>
            <p className="text-gray-600 mb-6">
              You'll be redirected to the learner interface where students can
              access all uploaded content organized by curriculum levels.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmSwitch}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Switch Views
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Firebase Profile Management Hook
const useVolunteerProfile = () => {
  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // First, try to get existing profile from Firestore
          const volunteerDoc = await getDoc(doc(db, "volunteers", user.uid));

          if (volunteerDoc.exists()) {
            // Profile exists, use it
            const profileData = volunteerDoc.data();
            setVolunteer({
              id: user.uid,
              email: user.email,
              ...profileData,
            });
          } else {
            // No profile exists, create one with name from users collection or Firebase
            let userName = user.displayName;

            // If no displayName, try to get name from users collection (from signup)
            if (!userName) {
              try {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                  userName = userDoc.data().name;
                }
              } catch (userError) {
                console.log("No user document found, using email as fallback");
              }
            }

            // Fallback to email username if no name found
            if (!userName) {
              userName = user.email.split("@")[0];
            }

            // Create new volunteer profile
            const newVolunteerProfile = {
              id: user.uid,
              name: userName,
              email: user.email,
              avatar: user.photoURL || null,
              role: "volunteer",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            // Save to Firestore
            await setDoc(doc(db, "volunteers", user.uid), newVolunteerProfile);

            setVolunteer(newVolunteerProfile);
          }
        } catch (err) {
          console.error("Error loading/creating volunteer profile:", err);
          setError("Failed to load profile");

          // Fallback profile
          setVolunteer({
            id: user.uid,
            name: user.displayName || user.email.split("@")[0],
            email: user.email,
            avatar: user.photoURL || null,
            role: "volunteer",
          });
        }
      } else {
        setVolunteer(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { volunteer, setVolunteer, loading, error };
};

// Main App Component
const VolunteerDashboardApp = () => {
  const { volunteer, setVolunteer, loading, error } = useVolunteerProfile();

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Create A0 alphabet worksheets",
      dueDate: "2025-08-01",
      status: "in-progress",
      completed: false,
    },
    {
      id: 2,
      title: "Record pronunciation video for greetings",
      dueDate: "2025-07-30",
      status: "pending",
      completed: false,
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to the volunteer chat! Feel free to discuss lesson plans and share resources.",
      sender: "Admin",
      timestamp: new Date().toISOString(),
      avatar: null,
    },
  ]);

  const [uploadedContent, setUploadedContent] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const contextValue = {
    volunteer,
    setVolunteer,
    tasks,
    setTasks,
    messages,
    setMessages,
    uploadedContent,
    setUploadedContent,
    showToast,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!volunteer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <p className="text-gray-600 mb-4">
            Please log in to access the volunteer dashboard.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              English4We
            </h1>
            <p className="text-xl text-gray-600">Volunteer Dashboard</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <VolunteerProfile />
              <TaskManagement />
              <ContentUpload />
              <ViewToggle />
            </div>

            <div className="space-y-6">
              <Resources />
              <Messaging />
            </div>
          </div>
        </div>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </AppContext.Provider>
  );
};

export default VolunteerDashboardApp;
