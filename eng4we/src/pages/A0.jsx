import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Upload,
  CheckCircle,
  Circle,
  Users,
  BookOpen,
  Video,
  Music,
  FileText,
  HelpCircle,
  ArrowRight,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
} from "lucide-react";

// Complete A0 English Curriculum Data Structure
const curriculumData = {
  modules: [
    {
      id: "module1",
      title: "Introduction to English Language",
      units: [
        {
          id: "unit1",
          title: "Alphabet & Numbers",
          lessons: [
            {
              id: "lesson1",
              title: "Alphabet A-M",
              objective: "Recognize, pronounce, write letters A-M",
              activities: [
                "Alphabet song",
                "flashcards",
                "tracing letters",
                "letter-sound matching",
                "oral quiz",
              ],
              level: "Complete Beginner",
            },
            {
              id: "lesson2",
              title: "Alphabet N-Z",
              objective: "Recognize, pronounce, write letters N-Z",
              activities: ["Repeat Lesson 1 activities for N-Z"],
              level: "Complete Beginner",
            },
            {
              id: "lesson3",
              title: "Numbers 1-20",
              objective: "Recognize, say, write numbers 1-20",
              activities: [
                "Counting songs",
                "flashcards",
                "counting objects",
                "number writing worksheets",
                "number bingo",
              ],
              level: "Complete Beginner",
            },
          ],
        },
        {
          id: "unit2",
          title: "Basic Words & Greetings",
          lessons: [
            {
              id: "lesson4",
              title: "Greetings & Farewells",
              objective: "Use Hello, Goodbye, How are you?",
              activities: ["Role-plays", "dialogues", "greeting matching"],
              level: "Complete Beginner",
            },
            {
              id: "lesson5",
              title: "Polite Expressions",
              objective: "Use please, thank you, sorry, excuse me",
              activities: [
                "Flashcards",
                "polite request role-plays",
                "writing polite sentences",
              ],
              level: "Complete Beginner",
            },
            {
              id: "lesson6",
              title: "Essential Vocabulary",
              objective: "Yes, no, okay, help, stop",
              activities: [
                "Flashcard games",
                "matching",
                "simple conversation",
              ],
              level: "Complete Beginner",
            },
            {
              id: "lesson7",
              title: "Simple Questions & Answers",
              objective: 'Respond to "What\'s your name?", "How are you?"',
              activities: [
                "Pair interviews",
                "fill-in-the-blank",
                "listening practice",
              ],
              level: "Complete Beginner",
            },
            {
              id: "lesson8",
              title: "Review & Practice Test",
              objective: "Review and practice unit concepts",
              activities: ["Comprehensive review", "practice test"],
              level: "Complete Beginner",
            },
          ],
        },
        {
          id: "unit3",
          title: "Everyday Phrases",
          lessons: [
            {
              id: "lesson9",
              title: "Common Expressions",
              objective: "I don't understand, Please repeat",
              activities: ["Expression practice", "role-plays"],
              level: "A0",
            },
            {
              id: "lesson10",
              title: "Expressing Needs & Wants",
              objective: "I want..., I need...",
              activities: ["Need/want expressions", "practical scenarios"],
              level: "A0",
            },
            {
              id: "lesson11",
              title: "Giving Simple Instructions",
              objective: "Open your book, Sit down",
              activities: ["Command practice", "instruction following"],
              level: "A0",
            },
            {
              id: "lesson12",
              title: "Likes & Dislikes",
              objective: "I like..., I don't like...",
              activities: ["Preference expressions", "opinion sharing"],
              level: "A0",
            },
            {
              id: "lesson13",
              title: "Unit Review & Practice",
              objective: "Review unit concepts",
              activities: ["Unit review", "practice exercises"],
              level: "A0",
            },
          ],
        },
        {
          id: "unit4",
          title: "Introducing Yourself",
          lessons: [
            {
              id: "lesson14",
              title: "Saying Your Name",
              objective: "My name is...",
              activities: ["Name introductions", "practice dialogues"],
              level: "A0",
            },
            {
              id: "lesson15",
              title: "Sharing Personal Info",
              objective: "Age, nationality, location",
              activities: [
                "Personal information sharing",
                "country vocabulary",
              ],
              level: "A0",
            },
            {
              id: "lesson16",
              title: 'Using "I am" and "You are"',
              objective: "Basic sentence structures",
              activities: ["Sentence construction", "grammar practice"],
              level: "A0",
            },
            {
              id: "lesson17",
              title: "Asking Simple Questions",
              objective: "How old are you?, Where are you from?",
              activities: ["Question formation", "interview practice"],
              level: "A0",
            },
            {
              id: "lesson18",
              title: "Unit Review & Test",
              objective: "Unit assessment",
              activities: ["Review", "formal test"],
              level: "A0",
            },
          ],
        },
      ],
    },
    {
      id: "module2",
      title: "Family and Friends",
      units: [
        {
          id: "unit5",
          title: "Family Vocabulary",
          lessons: [
            {
              id: "lesson19",
              title: "Immediate Family",
              objective: "Learn family member names",
              activities: ["Family tree", "vocabulary practice"],
              level: "A0",
            },
            {
              id: "lesson20",
              title: "Extended Family",
              objective: "Extended family vocabulary",
              activities: ["Family relationships", "vocabulary expansion"],
              level: "A0",
            },
            {
              id: "lesson21",
              title: "Family Relationships",
              objective: "Describe family connections",
              activities: ["Relationship descriptions", "family stories"],
              level: "A0",
            },
            {
              id: "lesson22",
              title: "Possessive Pronouns",
              objective: "My, your, his, her",
              activities: ["Possessive practice", "grammar exercises"],
              level: "A0",
            },
            {
              id: "lesson23",
              title: "Review & Test",
              objective: "Unit assessment",
              activities: ["Review", "test"],
              level: "A0",
            },
          ],
        },
        {
          id: "unit6",
          title: "Describing People",
          lessons: [
            {
              id: "lesson24",
              title: "Physical Appearance",
              objective: "Describe how people look",
              activities: ["Appearance vocabulary", "description practice"],
              level: "A0",
            },
            {
              id: "lesson25",
              title: "Personality Adjectives",
              objective: "Describe personality traits",
              activities: ["Adjective learning", "character descriptions"],
              level: "A0",
            },
            {
              id: "lesson26",
              title: '"To be" Verbs',
              objective: "Grammar: is, am, are",
              activities: ["Verb conjugation", "sentence building"],
              level: "A0",
            },
            {
              id: "lesson27",
              title: "Simple Descriptions",
              objective: "Complete person descriptions",
              activities: ["Full descriptions", "speaking practice"],
              level: "A0",
            },
            {
              id: "lesson28",
              title: "Review & Test",
              objective: "Unit assessment",
              activities: ["Review", "test"],
              level: "A0",
            },
          ],
        },
        {
          id: "unit7",
          title: "Friends and Socializing",
          lessons: [
            {
              id: "lesson29",
              title: "Friendship Vocabulary",
              objective: "Friend-related vocabulary",
              activities: ["Friendship words", "social expressions"],
              level: "A0",
            },
            {
              id: "lesson30",
              title: "Making Invitations",
              objective: "How to invite friends",
              activities: ["Invitation practice", "social scenarios"],
              level: "A0",
            },
            {
              id: "lesson31",
              title: "Accepting/Declining Invitations",
              objective: "Responding to invitations",
              activities: ["Response practice", "polite declining"],
              level: "A0",
            },
            {
              id: "lesson32",
              title: "Expressing Feelings",
              objective: "Emotion vocabulary and expressions",
              activities: ["Feeling words", "emotional expressions"],
              level: "A0",
            },
            {
              id: "lesson33",
              title: "Review & Test",
              objective: "Unit assessment",
              activities: ["Review", "test"],
              level: "A0",
            },
          ],
        },
      ],
    },
    {
      id: "module3",
      title: "Daily Life and Routines",
      units: [
        {
          id: "unit8",
          title: "Daily Activities",
          lessons: [
            {
              id: "lesson34",
              title: "Common Verbs",
              objective: "eat, sleep, play, study",
              activities: ["Action verbs", "daily routine vocabulary"],
              level: "A0",
            },
            {
              id: "lesson35",
              title: "Telling Time",
              objective: "Clock reading and time expressions",
              activities: ["Time vocabulary", "clock practice"],
              level: "A0",
            },
            {
              id: "lesson36",
              title: "Daily Schedule Vocabulary",
              objective: "Schedule-related words",
              activities: ["Schedule vocabulary", "routine descriptions"],
              level: "A0",
            },
            {
              id: "lesson37",
              title: "Frequency Adverbs",
              objective: "always, sometimes, never",
              activities: ["Frequency expressions", "routine frequency"],
              level: "A0",
            },
            {
              id: "lesson38",
              title: "Review & Test",
              objective: "Unit assessment",
              activities: ["Review", "test"],
              level: "A0",
            },
          ],
        },
        {
          id: "unit9",
          title: "School and Work",
          lessons: [
            {
              id: "lesson39",
              title: "School Subjects & Places",
              objective: "School vocabulary",
              activities: ["Subject names", "school locations"],
              level: "A0",
            },
            {
              id: "lesson40",
              title: "Classroom Objects",
              objective: "Classroom items",
              activities: ["Object identification", "classroom vocabulary"],
              level: "A0",
            },
            {
              id: "lesson41",
              title: "Simple School Instructions",
              objective: "Following classroom directions",
              activities: ["Instruction practice", "command following"],
              level: "A0",
            },
            {
              id: "lesson42",
              title: "Talking About Work",
              objective: "Basic work vocabulary",
              activities: ["Job vocabulary", "work discussions"],
              level: "A0",
            },
            {
              id: "lesson43",
              title: "Review & Test",
              objective: "Unit assessment",
              activities: ["Review", "test"],
              level: "A0",
            },
          ],
        },
      ],
    },
    {
      id: "module4",
      title: "Food and Drink",
      units: [
        {
          id: "unit10",
          title: "Food Vocabulary",
          lessons: [
            {
              id: "lesson44",
              title: "Fruits & Vegetables",
              objective: "Learn fruit and vegetable names",
              activities: ["Food identification", "healthy eating vocabulary"],
              level: "A0",
            },
            {
              id: "lesson45",
              title: "Meat, Dairy, Grains",
              objective: "Food group vocabulary",
              activities: ["Food categories", "nutrition vocabulary"],
              level: "A0",
            },
            {
              id: "lesson46",
              title: "Drinks & Snacks",
              objective: "Beverage and snack vocabulary",
              activities: ["Drink names", "snack vocabulary"],
              level: "A0",
            },
            {
              id: "lesson47",
              title: "Expressing Preferences",
              objective: "Food likes and dislikes",
              activities: ["Food preferences", "taste vocabulary"],
              level: "A0",
            },
            {
              id: "lesson48",
              title: "Review & Test",
              objective: "Unit assessment",
              activities: ["Review", "test"],
              level: "A0",
            },
          ],
        },
        {
          id: "unit11",
          title: "Eating Out",
          lessons: [
            {
              id: "lesson49",
              title: "Ordering Food",
              objective: "Restaurant ordering skills",
              activities: ["Menu reading", "ordering practice"],
              level: "A0",
            },
            {
              id: "lesson50",
              title: "Asking Prices",
              objective: "Price inquiry skills",
              activities: ["Price questions", "cost vocabulary"],
              level: "A0",
            },
            {
              id: "lesson51",
              title: "Polite Requests",
              objective: "Restaurant etiquette",
              activities: ["Polite language", "restaurant manners"],
              level: "A0",
            },
            {
              id: "lesson52",
              title: "Paying the Bill",
              objective: "Payment vocabulary and process",
              activities: ["Payment methods", "bill vocabulary"],
              level: "A0",
            },
            {
              id: "lesson53",
              title: "Review & Test",
              objective: "Unit assessment",
              activities: ["Review", "test"],
              level: "A0",
            },
          ],
        },
      ],
    },
    {
      id: "module5",
      title: "Around the House",
      units: [
        {
          id: "unit12",
          title: "Rooms and Furniture",
          lessons: [
            {
              id: "lesson54",
              title: "Rooms in a House",
              objective: "House room vocabulary",
              activities: ["Room identification", "house vocabulary"],
              level: "A0",
            },
            {
              id: "lesson55",
              title: "Furniture Vocabulary",
              objective: "Furniture names",
              activities: ["Furniture identification", "home items"],
              level: "A0",
            },
            {
              id: "lesson56",
              title: "Household Objects",
              objective: "Common household items",
              activities: ["Object naming", "household vocabulary"],
              level: "A0",
            },
            {
              id: "lesson57",
              title: "Prepositions of Place",
              objective: "in, on, under, next to",
              activities: ["Location practice", "preposition exercises"],
              level: "A0",
            },
            {
              id: "lesson58",
              title: "Review & Test",
              objective: "Unit assessment",
              activities: ["Review", "test"],
              level: "A0",
            },
          ],
        },
        {
          id: "unit13",
          title: "Household Chores",
          lessons: [
            {
              id: "lesson59",
              title: "Common Chores",
              objective: "Household task vocabulary",
              activities: ["Chore vocabulary", "task descriptions"],
              level: "A0",
            },
            {
              id: "lesson60",
              title: "Talking About Routines",
              objective: "Routine discussions",
              activities: ["Routine vocabulary", "daily tasks"],
              level: "A0",
            },
            {
              id: "lesson61",
              title: 'Using "Can" for Ability',
              objective: 'Modal verb "can"',
              activities: ["Ability expressions", "can/cannot practice"],
              level: "A0",
            },
            {
              id: "lesson62",
              title: "Asking for Help",
              objective: "Help-seeking language",
              activities: ["Request practice", "help vocabulary"],
              level: "A0",
            },
            {
              id: "lesson63",
              title: "Review & Test",
              objective: "Unit assessment",
              activities: ["Review", "test"],
              level: "A0",
            },
          ],
        },
      ],
    },
    {
      id: "module6",
      title: "Shopping and Money",
      units: [
        {
          id: "unit14",
          title: "Shopping Vocabulary",
          lessons: [
            {
              id: "lesson64",
              title: "Types of Shops",
              objective: "Shop and store names",
              activities: ["Store vocabulary", "shopping locations"],
              level: "A0",
            },
            {
              id: "lesson65",
              title: "Items to Buy",
              objective: "Shopping item vocabulary",
              activities: ["Product names", "shopping lists"],
              level: "A0",
            },
            {
              id: "lesson66",
              title: "Asking Prices",
              objective: "Price inquiry language",
              activities: ["Price questions", "cost discussions"],
              level: "A0",
            },
            {
              id: "lesson67",
              title: "Making Purchases",
              objective: "Buying process language",
              activities: ["Purchase dialogues", "transaction vocabulary"],
              level: "A0",
            },
            {
              id: "lesson68",
              title: "Review & Test",
              objective: "Unit assessment",
              activities: ["Review", "test"],
              level: "A0",
            },
          ],
        },
        {
          id: "unit15",
          title: "Money and Numbers",
          lessons: [
            {
              id: "lesson69",
              title: "Currency and Coins",
              objective: "Money vocabulary",
              activities: ["Currency names", "money identification"],
              level: "A0",
            },
            {
              id: "lesson70",
              title: "Talking About Cost",
              objective: "Cost-related language",
              activities: ["Price discussions", "cost vocabulary"],
              level: "A0",
            },
            {
              id: "lesson71",
              title: "Asking for Discounts",
              objective: "Discount request language",
              activities: ["Bargaining vocabulary", "discount requests"],
              level: "A0",
            },
            {
              id: "lesson72",
              title: "Paying with Cash or Card",
              objective: "Payment method vocabulary",
              activities: ["Payment options", "transaction language"],
              level: "A0",
            },
            {
              id: "lesson73",
              title: "Review & Test",
              objective: "Unit assessment",
              activities: ["Review", "test"],
              level: "A0",
            },
          ],
        },
      ],
    },
    {
      id: "module7",
      title: "Travel and Directions",
      units: [
        {
          id: "unit16",
          title: "Places in Town",
          lessons: [
            {
              id: "lesson74",
              title: "Common Places",
              objective: "Town location vocabulary",
              activities: ["Place names", "location vocabulary"],
              level: "A0",
            },
            {
              id: "lesson75",
              title: "Transportation Vocabulary",
              objective: "Transport methods",
              activities: ["Vehicle names", "transport vocabulary"],
              level: "A0",
            },
            {
              id: "lesson76",
              title: "Asking for Directions",
              objective: "Direction request language",
              activities: ["Direction questions", "navigation vocabulary"],
              level: "A0",
            },
            {
              id: "lesson77",
              title: "Giving Simple Directions",
              objective: "Direction-giving language",
              activities: ["Direction instructions", "navigation practice"],
              level: "A0",
            },
            {
              id: "lesson78",
              title: "Review & Test",
              objective: "Unit assessment",
              activities: ["Review", "test"],
              level: "A0",
            },
          ],
        },
        {
          id: "unit17",
          title: "Travel Vocabulary",
          lessons: [
            {
              id: "lesson79",
              title: "Booking Tickets",
              objective: "Ticket booking language",
              activities: ["Booking vocabulary", "reservation practice"],
              level: "A0",
            },
            {
              id: "lesson80",
              title: "At the Airport/Train Station",
              objective: "Transport hub vocabulary",
              activities: ["Station vocabulary", "travel procedures"],
              level: "A0",
            },
            {
              id: "lesson81",
              title: "Travel Essentials",
              objective: "Travel item vocabulary",
              activities: ["Packing vocabulary", "travel items"],
              level: "A0",
            },
            {
              id: "lesson82",
              title: "Talking About Plans",
              objective: "Travel plan language",
              activities: ["Plan discussions", "future expressions"],
              level: "A0",
            },
            {
              id: "lesson83",
              title: "Review & Test",
              objective: "Unit assessment",
              activities: ["Review", "test"],
              level: "A0",
            },
          ],
        },
      ],
    },
    {
      id: "module8",
      title: "Weather and Seasons",
      units: [
        {
          id: "unit18",
          title: "Weather Vocabulary",
          lessons: [
            {
              id: "lesson84",
              title: "Basic Weather Terms",
              objective: "Weather vocabulary",
              activities: ["Weather words", "weather descriptions"],
              level: "A0",
            },
            {
              id: "lesson85",
              title: "Talking About Temperature",
              objective: "Temperature language",
              activities: ["Temperature vocabulary", "weather discussions"],
              level: "A0",
            },
            {
              id: "lesson86",
              title: "Seasons of the Year",
              objective: "Season vocabulary",
              activities: ["Season names", "seasonal activities"],
              level: "A0",
            },
            {
              id: "lesson87",
              title: "Expressing Preferences",
              objective: "Weather preferences",
              activities: ["Weather preferences", "seasonal opinions"],
              level: "A0",
            },
            {
              id: "lesson88",
              title: "Review & Test",
              objective: "Unit assessment",
              activities: ["Review", "test"],
              level: "A0",
            },
          ],
        },
        {
          id: "unit19",
          title: "Simple Future Tense",
          lessons: [
            {
              id: "lesson89",
              title: "Talking About Plans",
              objective: "Future plan language",
              activities: ["Plan expressions", "future vocabulary"],
              level: "A0",
            },
            {
              id: "lesson90",
              title: 'Using "Will" for Future',
              objective: 'Future tense with "will"',
              activities: ["Will practice", "future expressions"],
              level: "A0",
            },
            {
              id: "lesson91",
              title: "Making Predictions",
              objective: "Prediction language",
              activities: ["Weather predictions", "future possibilities"],
              level: "A0",
            },
            {
              id: "lesson92",
              title: "Invitations and Arrangements",
              objective: "Future arrangement language",
              activities: ["Invitation language", "arrangement vocabulary"],
              level: "A0",
            },
            {
              id: "lesson93",
              title: "Review & Test",
              objective: "Unit assessment",
              activities: ["Review", "test"],
              level: "A0",
            },
          ],
        },
      ],
    },
  ],
};

const A0EnglishPlatform = () => {
  const [activeInterface, setActiveInterface] = useState("learner");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessonProgress, setLessonProgress] = useState({});
  const [lessonContent, setLessonContent] = useState({});
  const [editingLesson, setEditingLesson] = useState(null);
  const [uploadingContent, setUploadingContent] = useState({});
  const [currentModule, setCurrentModule] = useState(0);
  const [currentUnit, setCurrentUnit] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);

  // Initialize with first lesson
  useEffect(() => {
    if (selectedLesson === null && curriculumData.modules.length > 0) {
      const firstLesson = curriculumData.modules[0].units[0].lessons[0];
      setSelectedLesson(firstLesson);
    }
  }, [selectedLesson]);

  const toggleLessonCompletion = (lessonId) => {
    setLessonProgress((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  const getNextLesson = () => {
    const allLessons = [];
    curriculumData.modules.forEach((module) => {
      module.units.forEach((unit) => {
        unit.lessons.forEach((lesson) => {
          allLessons.push({
            ...lesson,
            module: module.title,
            unit: unit.title,
          });
        });
      });
    });

    const currentIndex = allLessons.findIndex(
      (lesson) => lesson.id === selectedLesson?.id
    );
    return currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;
  };

  const navigateToNextLesson = () => {
    const nextLesson = getNextLesson();
    if (nextLesson) {
      setSelectedLesson(nextLesson);
      // Mark current lesson as completed
      if (selectedLesson) {
        toggleLessonCompletion(selectedLesson.id);
      }
    }
  };

  const handleFileUpload = (lessonId, contentType, file) => {
    setUploadingContent((prev) => ({
      ...prev,
      [`${lessonId}-${contentType}`]: true,
    }));

    // Simulate file upload
    setTimeout(() => {
      setLessonContent((prev) => ({
        ...prev,
        [lessonId]: {
          ...prev[lessonId],
          [contentType]: {
            file: file,
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file),
          },
        },
      }));

      setUploadingContent((prev) => ({
        ...prev,
        [`${lessonId}-${contentType}`]: false,
      }));
    }, 2000);
  };

  const saveEditedLesson = (lessonId, updates) => {
    // In a real app, this would update the curriculum data
    setEditingLesson(null);
  };

  const ContentUploadSection = ({
    lessonId,
    contentType,
    icon: Icon,
    title,
  }) => {
    const content = lessonContent[lessonId]?.[contentType];
    const isUploading = uploadingContent[`${lessonId}-${contentType}`];

    return (
      <div className="bg-slate-50 p-4 rounded-lg border-2 border-dashed border-slate-300">
        <div className="flex items-center gap-2 mb-3">
          <Icon className="w-5 h-5 text-blue-600" />
          <h4 className="font-medium text-slate-700">{title}</h4>
        </div>

        {content ? (
          <div className="bg-white p-3 rounded border">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{content.name}</p>
                <p className="text-xs text-slate-500">
                  {(content.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={() => {
                  setLessonContent((prev) => ({
                    ...prev,
                    [lessonId]: {
                      ...prev[lessonId],
                      [contentType]: null,
                    },
                  }));
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <input
              type="file"
              id={`${lessonId}-${contentType}`}
              className="hidden"
              accept={
                contentType === "video"
                  ? "video/*"
                  : contentType === "audio"
                  ? "audio/*"
                  : contentType === "document"
                  ? ".pdf,.doc,.docx"
                  : "image/*"
              }
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleFileUpload(lessonId, contentType, file);
                }
              }}
            />
            <label
              htmlFor={`${lessonId}-${contentType}`}
              className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-slate-300 rounded cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-slate-600">Uploading...</span>
                </div>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-slate-400 mb-1" />
                  <span className="text-sm text-slate-600">
                    Click to upload
                  </span>
                </>
              )}
            </label>
          </div>
        )}
      </div>
    );
  };

  const QuizComponent = ({ questions = [] }) => {
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const defaultQuestions = [
      {
        id: 1,
        question: "What is the correct greeting?",
        options: ["Hello", "Goodbye", "Sleep", "Eat"],
        correct: 0,
      },
      {
        id: 2,
        question: "How do you say 'thank you'?",
        options: ["Please", "Sorry", "Thank you", "Hello"],
        correct: 2,
      },
    ];

    const quizQuestions = questions.length > 0 ? questions : defaultQuestions;

    return (
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Practice Quiz
        </h3>

        {quizQuestions.map((q, index) => (
          <div key={q.id} className="mb-6">
            <p className="font-medium text-slate-700 mb-3">
              {index + 1}. {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((option, optIndex) => (
                <label
                  key={optIndex}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={optIndex}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [q.id]: parseInt(e.target.value),
                      }))
                    }
                    className="text-blue-600"
                  />
                  <span
                    className={`${
                      showResults && optIndex === q.correct
                        ? "text-green-600 font-medium"
                        : showResults &&
                          answers[q.id] === optIndex &&
                          optIndex !== q.correct
                        ? "text-red-600"
                        : "text-slate-700"
                    }`}
                  >
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={() => setShowResults(!showResults)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showResults ? "Hide Results" : "Check Answers"}
        </button>
      </div>
    );
  };

  const FlashcardComponent = ({ cards = [] }) => {
    const [currentCard, setCurrentCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const defaultCards = [
      { front: "Hello", back: "A greeting used when meeting someone" },
      { front: "Thank you", back: "An expression of gratitude" },
      { front: "Please", back: "A polite word used when asking for something" },
    ];

    const flashcards = cards.length > 0 ? cards : defaultCards;

    return (
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Flashcards</h3>
          <span className="text-sm text-slate-600">
            {currentCard + 1} / {flashcards.length}
          </span>
        </div>

        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-lg min-h-40 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="text-center">
            <p className="text-xl font-medium">
              {isFlipped
                ? flashcards[currentCard].back
                : flashcards[currentCard].front}
            </p>
            <p className="text-sm opacity-75 mt-2">
              {isFlipped ? "Click to see word" : "Click to see meaning"}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => {
              setCurrentCard(Math.max(0, currentCard - 1));
              setIsFlipped(false);
            }}
            disabled={currentCard === 0}
            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 transition-colors"
          >
            Previous
          </button>

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Flip Card
          </button>

          <button
            onClick={() => {
              setCurrentCard(Math.min(flashcards.length - 1, currentCard + 1));
              setIsFlipped(false);
            }}
            disabled={currentCard === flashcards.length - 1}
            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const MediaPlayer = ({ content, type }) => {
    if (!content) return null;

    if (type === "video") {
      return (
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">
            Lesson Video
          </h3>
          <video
            controls
            className="w-full rounded-lg"
            style={{ maxHeight: "400px" }}
          >
            <source src={content.url} type={content.type} />
            Your browser does not support video playback.
          </video>
        </div>
      );
    }

    if (type === "audio") {
      return (
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">
            Audio Lesson
          </h3>
          <audio controls className="w-full">
            <source src={content.url} type={content.type} />
            Your browser does not support audio playback.
          </audio>
        </div>
      );
    }

    return null;
  };

  const CreatorInterface = () => {
    const allLessons = [];
    curriculumData.modules.forEach((module, mIndex) => {
      module.units.forEach((unit, uIndex) => {
        unit.lessons.forEach((lesson, lIndex) => {
          allLessons.push({
            ...lesson,
            moduleTitle: module.title,
            unitTitle: unit.title,
            moduleIndex: mIndex,
            unitIndex: uIndex,
            lessonIndex: lIndex,
          });
        });
      });
    });

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">
            Content Creator Dashboard
          </h2>
          <div className="text-sm text-slate-600">
            {allLessons.length} lessons across {curriculumData.modules.length}{" "}
            modules
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Curriculum Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-4">
                Curriculum Structure
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {curriculumData.modules.map((module, mIndex) => (
                  <div
                    key={module.id}
                    className="border-l-2 border-blue-200 pl-3"
                  >
                    <div className="font-medium text-slate-700 mb-2">
                      {module.title}
                    </div>
                    {module.units.map((unit, uIndex) => (
                      <div key={unit.id} className="ml-3 mb-2">
                        <div className="text-sm font-medium text-slate-600 mb-1">
                          {unit.title}
                        </div>
                        {unit.lessons.map((lesson, lIndex) => (
                          <button
                            key={lesson.id}
                            onClick={() =>
                              setSelectedLesson({
                                ...lesson,
                                moduleTitle: module.title,
                                unitTitle: unit.title,
                              })
                            }
                            className={`block w-full text-left text-xs p-2 rounded hover:bg-blue-50 transition-colors ${
                              selectedLesson?.id === lesson.id
                                ? "bg-blue-100 text-blue-700"
                                : "text-slate-600"
                            }`}
                          >
                            {lesson.title}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Management */}
          <div className="lg:col-span-2">
            {selectedLesson ? (
              <div className="space-y-6">
                {/* Lesson Info */}
                <div className="bg-white p-6 rounded-lg border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">
                        {selectedLesson.title}
                      </h3>
                      <p className="text-slate-600">
                        {selectedLesson.moduleTitle} →{" "}
                        {selectedLesson.unitTitle}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        Level: {selectedLesson.level}
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingLesson(selectedLesson.id)}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                  </div>

                  {editingLesson === selectedLesson.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Objective
                        </label>
                        <textarea
                          defaultValue={selectedLesson.objective}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Activities
                        </label>
                        <textarea
                          defaultValue={selectedLesson.activities.join(", ")}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows="2"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            saveEditedLesson(selectedLesson.id, {})
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={() => setEditingLesson(null)}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-slate-700 mb-3">
                        <strong>Objective:</strong> {selectedLesson.objective}
                      </p>
                      <p className="text-slate-700">
                        <strong>Activities:</strong>{" "}
                        {selectedLesson.activities.join(", ")}
                      </p>
                    </div>
                  )}
                </div>

                {/* Content Upload Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ContentUploadSection
                    lessonId={selectedLesson.id}
                    contentType="video"
                    icon={Video}
                    title="Video Content"
                  />
                  <ContentUploadSection
                    lessonId={selectedLesson.id}
                    contentType="audio"
                    icon={Music}
                    title="Audio Content"
                  />
                  <ContentUploadSection
                    lessonId={selectedLesson.id}
                    contentType="document"
                    icon={FileText}
                    title="Documents"
                  />
                  <ContentUploadSection
                    lessonId={selectedLesson.id}
                    contentType="images"
                    icon={FileText}
                    title="Images & Flashcards"
                  />
                </div>

                {/* Content Preview */}
                {lessonContent[selectedLesson.id] && (
                  <div className="bg-white p-6 rounded-lg border border-slate-200">
                    <h4 className="font-semibold text-slate-800 mb-4">
                      Content Preview
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {lessonContent[selectedLesson.id].video && (
                        <MediaPlayer
                          content={lessonContent[selectedLesson.id].video}
                          type="video"
                        />
                      )}
                      {lessonContent[selectedLesson.id].audio && (
                        <MediaPlayer
                          content={lessonContent[selectedLesson.id].audio}
                          type="audio"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-lg border border-slate-200 text-center">
                <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600">
                  Select a lesson to manage content
                </h3>
                <p className="text-slate-500">
                  Choose a lesson from the curriculum structure to upload and
                  manage content.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const LearnerInterface = () => {
    if (!selectedLesson) return null;

    const currentLessonContent = lessonContent[selectedLesson.id] || {};
    const isCompleted = lessonProgress[selectedLesson.id];
    const nextLesson = getNextLesson();

    return (
      <div className="space-y-6">
        {/* Lesson Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-500 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedLesson.level}
                </span>
                {isCompleted && (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">
                {selectedLesson.title}
              </h1>
              <p className="text-blue-100 mb-1">
                {selectedLesson.moduleTitle} → {selectedLesson.unitTitle}
              </p>
              <p className="text-lg text-blue-100">
                {selectedLesson.objective}
              </p>
            </div>
            <div className="text-right">
              <button
                onClick={() => toggleLessonCompletion(selectedLesson.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isCompleted
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-white text-blue-600 hover:bg-blue-50"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
                {isCompleted ? "Completed" : "Mark Complete"}
              </button>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Media Content */}
          <div className="space-y-6">
            {currentLessonContent.video && (
              <MediaPlayer content={currentLessonContent.video} type="video" />
            )}

            {currentLessonContent.audio && (
              <MediaPlayer content={currentLessonContent.audio} type="audio" />
            )}

            {!currentLessonContent.video && !currentLessonContent.audio && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg border-2 border-dashed border-blue-200 text-center">
                <Video className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">
                  Media Content Coming Soon
                </h3>
                <p className="text-slate-500">
                  Video and audio content will be available once uploaded by
                  content creators.
                </p>
              </div>
            )}
          </div>

          {/* Interactive Content */}
          <div className="space-y-6">
            <FlashcardComponent />
            <QuizComponent />
          </div>
        </div>

        {/* Lesson Activities */}
        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Lesson Activities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedLesson.activities.map((activity, index) => (
              <div
                key={index}
                className="bg-blue-50 p-4 rounded-lg border border-blue-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <span className="text-slate-700 font-medium">{activity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center bg-white p-6 rounded-lg border border-slate-200">
          <div className="text-slate-600">
            <p className="text-sm">Ready to move on?</p>
            {nextLesson && (
              <p className="font-medium">Next: {nextLesson.title}</p>
            )}
          </div>

          {nextLesson ? (
            <button
              onClick={navigateToNextLesson}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors transform hover:scale-105"
            >
              Continue Learning
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="bg-green-100 text-green-700 px-6 py-3 rounded-lg font-medium">
              🎉 Course Complete!
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            A0 English Learning Platform
          </h1>
          <p className="text-slate-600 text-lg">
            Complete English Curriculum for Absolute Beginners
          </p>
          <p className="text-sm text-slate-500 mt-2"></p>
        </div>

        {/* Role Selector */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveInterface("learner")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeInterface === "learner"
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : "bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Learner Interface
          </button>

          <button
            onClick={() => setActiveInterface("creator")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeInterface === "creator"
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : "bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <Users className="w-5 h-5" />
            Content Creator
          </button>
        </div>

        {/* Interface Content */}
        <div className="max-w-7xl mx-auto">
          {activeInterface === "learner" ? (
            <LearnerInterface />
          ) : (
            <CreatorInterface />
          )}
        </div>
      </div>
    </div>
  );
};

export default A0EnglishPlatform;
