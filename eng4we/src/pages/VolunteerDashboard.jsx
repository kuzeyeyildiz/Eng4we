import React, { useState, useEffect, createContext, useContext } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  getFirestore,
  deleteDoc,
  query,
  where,
  orderBy,
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md mx-4 shadow-2xl">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Edit Profile</h2>

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

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors order-1 sm:order-2"
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md mx-4 shadow-2xl">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
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

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors order-1 sm:order-2"
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
      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
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

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors order-2 sm:order-1"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 flex items-center justify-center order-1 sm:order-2"
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

// Resource Upload Modal
const ResourceUploadModal = ({ isOpen, onClose, onUpload }) => {
  const { showToast, volunteer } = useAppContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "A0",
    type: "Document",
    file: null,
    externalUrl: "",
  });
  const [uploading, setUploading] = useState(false);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      level: "A0",
      type: "Document",
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
    if (!formData.file && !formData.externalUrl.trim()) {
      showToast("Please upload a file or provide an external URL", "error");
      return;
    }

    setUploading(true);

    try {
      const resourceData = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        level: formData.level,
        type: formData.type,
        fileType: formData.file ? formData.file.name.split('.').pop().toUpperCase() : "URL",
        url: formData.externalUrl,
        uploaderId: volunteer?.id || "volunteer1",
        uploaderName: volunteer?.name || "Unknown Volunteer",
        uploadedAt: new Date().toISOString(),
      };

      // Save to Firestore
      await setDoc(doc(db, "resources", resourceData.id), resourceData);

      onUpload(resourceData);
      showToast("Resource uploaded successfully!", "success");
    } catch (error) {
      console.error("Error uploading resource:", error);
      showToast("Error uploading resource. Please try again.", "error");
    } finally {
      setUploading(false);
      resetForm();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md mx-4 shadow-2xl">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
         Upload Resource
       </h2>
       <form onSubmit={handleSubmit} className="space-y-4">
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
             placeholder="Enter resource title"
             required
           />
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
             placeholder="Describe the resource"
           />
         </div>

         <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
               Level
             </label>
             <select
               value={formData.level}
               onChange={(e) =>
                 setFormData({ ...formData, level: e.target.value })
               }
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
             >
               <option value="A0">A0 - Absolute Beginner</option>
               <option value="A1">A1 - Beginner</option>
               <option value="A2">A2 - Elementary</option>
               <option value="all">All Levels</option>
             </select>
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
               Type
             </label>
             <select
               value={formData.type}
               onChange={(e) =>
                 setFormData({ ...formData, type: e.target.value })
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
             Upload File
           </label>
           <input
             type="file"
             onChange={(e) =>
               setFormData({ ...formData, file: e.target.files[0] })
             }
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
           />
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

         <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
           <button
             type="button"
             onClick={() => {
               resetForm();
               onClose();
             }}
             className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors order-2 sm:order-1"
             disabled={uploading}
           >
             Cancel
           </button>
           <button
             type="submit"
             disabled={uploading}
             className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 flex items-center justify-center order-1 sm:order-2"
           >
             {uploading ? (
               <>
                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                 Uploading...
               </>
             ) : (
               <>
                 <Upload size={16} className="mr-2" />
                 Upload Resource
               </>
             )}
           </button>
         </div>
       </form>
     </div>
   </div>
 );
};

// Message Edit Modal
const MessageEditModal = ({ isOpen, onClose, message, onSave }) => {
 const [editText, setEditText] = useState(message?.text || "");

 useEffect(() => {
   if (message) {
     setEditText(message.text);
   }
 }, [message]);

 if (!isOpen) return null;

 const handleSave = () => {
   if (editText.trim()) {
     onSave(editText.trim());
     onClose();
   }
 };

 return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
     <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md mx-4 shadow-2xl">
       <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Message</h2>
       
       <textarea
         value={editText}
         onChange={(e) => setEditText(e.target.value)}
         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
         rows="4"
         placeholder="Edit your message..."
       />

       <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-4">
         <button
           onClick={onClose}
           className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors order-2 sm:order-1"
         >
           Cancel
         </button>
         <button
           onClick={handleSave}
           className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors order-1 sm:order-2"
         >
           Save Changes
         </button>
       </div>
     </div>
   </div>
 );
};

// Volunteer Profile Component
const VolunteerProfile = () => {
 const { volunteer, setVolunteer, showToast, isUserView, setIsUserView } = useAppContext();
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

 const handleViewToggle = () => {
   if (isUserView) {
     setIsUserView(false);
     showToast("Switched to Volunteer Dashboard", "success");
   } else {
     // Redirect to user view
     window.location.href = "/volunteerUserView";
   }
 };

 if (!volunteer) {
   return (
     <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
       <div className="animate-pulse">
         <div className="flex items-center space-x-4">
           <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-full"></div>
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
     <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
       <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
         <div className="relative">
           <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-lg">
             {volunteer.avatar ? (
               <img
                 src={volunteer.avatar}
                 alt="Avatar"
                 className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
               />
             ) : (
               volunteer.name?.charAt(0)?.toUpperCase() || "V"
             )}
           </div>
         </div>
         <div className="flex-1 min-w-0">
           <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
             {volunteer.name || "Loading..."}
           </h2>
           <p className="text-sm sm:text-base text-gray-600">Volunteer</p>
         </div>
         <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
           {/* View Toggle Switch */}
           <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3 w-full sm:w-auto">
             <span className="text-sm text-gray-600 whitespace-nowrap">User View</span>
             <button
               onClick={handleViewToggle}
               className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                 isUserView ? 'bg-blue-600' : 'bg-gray-300'
               }`}
             >
               <span
                 className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                   isUserView ? 'translate-x-6' : 'translate-x-1'
                 }`}
               />
             </button>
           </div>
           <div className="flex space-x-2">
             <button
               onClick={() => setShowProfileModal(true)}
               className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
               title="Edit Profile"
             >
               <Edit3 size={18} />
             </button>
             <button
               onClick={handleLogout}
               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
               title="Logout"
             >
               <LogOut size={18} />
             </button>
           </div>
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
 const { tasks, setTasks, showToast, volunteer } = useAppContext();
 const [showTaskModal, setShowTaskModal] = useState(false);
 const [editingTask, setEditingTask] = useState(null);
 const [sortBy, setSortBy] = useState("date");
 const [loading, setLoading] = useState(true);

 // Load tasks from Firestore
 useEffect(() => {
   if (!volunteer?.id) return;

   const q = query(
     collection(db, "volunteerTasks"),
     where("volunteerId", "==", volunteer.id),
     orderBy("createdAt", "desc")
   );

   const unsubscribe = onSnapshot(q, (snapshot) => {
     const tasksData = snapshot.docs.map(doc => ({
       id: doc.id,
       ...doc.data()
     }));
     setTasks(tasksData);
     setLoading(false);
   });

   return () => unsubscribe();
 }, [volunteer?.id, setTasks]);

 const addTask = async (taskData) => {
   try {
     const newTask = {
       ...taskData,
       id: Date.now().toString(),
       volunteerId: volunteer.id,
       completed: false,
       createdAt: new Date().toISOString(),
     };
     
     await setDoc(doc(db, "volunteerTasks", newTask.id), newTask);
     showToast("Task added successfully!", "success");
   } catch (error) {
     console.error("Error adding task:", error);
     showToast("Error adding task. Please try again.", "error");
   }
 };

 const updateTask = async (taskData) => {
   try {
     const updatedTask = {
       ...editingTask,
       ...taskData,
       updatedAt: new Date().toISOString(),
     };
     
     await setDoc(doc(db, "volunteerTasks", editingTask.id), updatedTask);
     showToast("Task updated successfully!", "success");
     setEditingTask(null);
   } catch (error) {
     console.error("Error updating task:", error);
     showToast("Error updating task. Please try again.", "error");
   }
 };

 const toggleTaskCompletion = async (task) => {
   try {
     const updatedTask = {
       ...task,
       completed: !task.completed,
       updatedAt: new Date().toISOString(),
     };
     
     await setDoc(doc(db, "volunteerTasks", task.id), updatedTask);
   } catch (error) {
     console.error("Error updating task completion:", error);
     showToast("Error updating task. Please try again.", "error");
   }
 };

 const deleteTask = async (taskId) => {
   if (window.confirm("Are you sure you want to delete this task?")) {
     try {
       await deleteDoc(doc(db, "volunteerTasks", taskId));
       showToast("Task deleted successfully!", "success");
     } catch (error) {
       console.error("Error deleting task:", error);
       showToast("Error deleting task. Please try again.", "error");
     }
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

 if (loading) {
   return (
     <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
       <div className="animate-pulse">
         <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
         <div className="space-y-3">
           <div className="h-4 bg-gray-300 rounded"></div>
           <div className="h-4 bg-gray-300 rounded w-5/6"></div>
           <div className="h-4 bg-gray-300 rounded w-4/6"></div>
         </div>
       </div>
     </div>
   );
 }

 return (
   <>
     <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-3 sm:space-y-0">
         <h3 className="text-lg sm:text-xl font-bold text-gray-800">Task Management</h3>
         <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
           <select
             value={sortBy}
             onChange={(e) => setSortBy(e.target.value)}
             className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
           >
             <option value="date">Sort by Date</option>
             <option value="status">Sort by Status</option>
           </select>
           <button
             onClick={() => setShowTaskModal(true)}
             className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
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
               className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg transition-all ${
                 task.completed
                   ? "bg-green-50 border-green-200"
                   : "bg-gray-50 border-gray-200"
               } hover:shadow-md space-y-3 sm:space-y-0`}
             >
               <div className="flex items-start space-x-3 flex-1 min-w-0">
                 <button
                   onClick={() => toggleTaskCompletion(task)}
                   className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 mt-1 sm:mt-0 ${
                     task.completed
                       ? "bg-green-500 border-green-500 text-white"
                       : "border-gray-300 hover:border-green-400"
                   }`}
                 >
                   {task.completed && <Check size={14} />}
                 </button>
                 <div
                   className={`flex-1 min-w-0 ${
                     task.completed ? "line-through text-gray-500" : ""
                   }`}
                 >
                   <h4 className="font-medium text-sm sm:text-base truncate">{task.title}</h4>
                   <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-0">
                     <span className="flex items-center">
                       <Calendar size={12} className="mr-1" />
                       {task.dueDate || "No due date"}
                     </span>
                     <span
                       className={`px-2 py-1 rounded-full text-xs inline-block w-fit ${
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
               <div className="flex items-center space-x-2 justify-end sm:justify-start">
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
 const [resources, setResources] = useState([]);
 const [loading, setLoading] = useState(true);
 const [showUploadModal, setShowUploadModal] = useState(false);
 const { volunteer, showToast } = useAppContext();

 // Load resources from Firestore
 useEffect(() => {
   const unsubscribe = onSnapshot(collection(db, "resources"), (snapshot) => {
     const resourcesData = snapshot.docs.map(doc => ({
       id: doc.id,
       ...doc.data()
     }));
     setResources(resourcesData);
     setLoading(false);
   });

   return () => unsubscribe();
 }, []);

 const handleUpload = (resourceData) => {
   // Real-time listener will update the state automatically
   showToast("Resource uploaded successfully!", "success");
 };

 const deleteResource = async (resourceId) => {
   if (window.confirm("Are you sure you want to delete this resource?")) {
     try {
       await deleteDoc(doc(db, "resources", resourceId));
       showToast("Resource deleted successfully!", "success");
     } catch (error) {
       console.error("Error deleting resource:", error);
       showToast("Error deleting resource. Please try again.", "error");
     }
   }
 };

 const filteredResources = resources.filter((resource) => {
   const matchesSearch =
     resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     resource.description.toLowerCase().includes(searchTerm.toLowerCase());
   const matchesLevel =
     filterLevel === "all" || resource.level === filterLevel;
   return matchesSearch && matchesLevel;
 });

 if (loading) {
   return (
     <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
       <div className="animate-pulse">
         <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {[1,2,3].map(i => (
             <div key={i} className="border border-gray-200 rounded-lg p-4">
               <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
               <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
               <div className="h-3 bg-gray-300 rounded w-1/2"></div>
             </div>
           ))}
         </div>
       </div>
     </div>
   );
 }

 return (
   <>
     <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-3 sm:space-y-0">
         <h3 className="text-lg sm:text-xl font-bold text-gray-800">
           Resources & Templates
         </h3>
         <button
           onClick={() => setShowUploadModal(true)}
           className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors w-full sm:w-auto"
         >
           <Plus size={16} className="mr-2" />
           Add Resource
         </button>
       </div>

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
             className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
           >
             <option value="all">All Levels</option>
             <option value="A0">A0 - Absolute Beginner</option>
             <option value="A1">A1 - Beginner</option>
             <option value="A2">A2 - Elementary</option>
           </select>
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {filteredResources.length === 0 ? (
           <div className="col-span-full text-center py-8 text-gray-500">
             {searchTerm || filterLevel !== "all" ? "No resources match your search criteria." : "No resources uploaded yet. Start by uploading your first resource!"}
           </div>
         ) : (
           filteredResources.map((resource) => (
             <div
               key={resource.id}
               className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
             >
               <div className="flex items-start justify-between mb-2">
                 <h4 className="font-medium text-gray-800 text-sm sm:text-base truncate flex-1 mr-2">{resource.title}</h4>
                 <span
                   className={`px-2 py-1 text-xs rounded-full flex-shrink-0 ${
                     resource.level === "A0"
                       ? "bg-red-100 text-red-800"
                       : resource.level === "A1"
                       ? "bg-yellow-100 text-yellow-800"
                       : resource.level === "A2"
                       ? "bg-green-100 text-green-800"
                       : "bg-blue-100 text-blue-800"
                   }`}
                 >
                   {resource.level}
                 </span>
               </div>
               <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
               <div className="flex items-center justify-between">
                 <span className="text-xs text-gray-500">{resource.fileType}</span>
                 <div className="flex items-center space-x-2">
                   {resource.url && (
                     <a 
                       href={resource.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center text-blue-600 hover:text-blue-800 text-xs sm:text-sm"
                     >
                       <Download size={14} className="mr-1" />
                       Download
                     </a>
                   )}
                   {resource.uploaderId === volunteer?.id && (
                     <button
                       onClick={() => deleteResource(resource.id)}
                       className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                       title="Delete Resource"
                     >
                       <Trash2 size={14} />
                     </button>
                   )}
                 </div>
               </div>
               <div className="mt-2 pt-2 border-t border-gray-100">
                 <span
       

