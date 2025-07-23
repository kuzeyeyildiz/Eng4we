import React, { useState } from "react";
import {
  ChevronRight,
  CheckCircle2,
  Clock,
  Circle,
  BookOpen,
  Headphones,
  Video,
  FileText,
  Play,
} from "lucide-react";

const LessonsPage = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(
    new Set(["1-1-1", "1-1-2", "1-2-1"])
  );
  const [inProgressLessons, setInProgressLessons] = useState(
    new Set(["1-2-2"])
  );

  const curriculum = [
    {
      id: 1,
      title: "Introduction to English Language",
      units: [
        {
          title: "Alphabet & Numbers",
          lessons: [
            {
              id: "1-1-1",
              title: "Alphabet A-M",
              objective: "Recognize, pronounce, write letters A-M",
              activities: [
                "Alphabet song",
                "flashcards",
                "tracing letters",
                "letter-sound matching",
                "oral quiz",
              ],
              interactive: ["flashcards", "audio", "quiz"],
            },
            {
              id: "1-1-2",
              title: "Alphabet N-Z",
              objective: "Recognize, pronounce, write letters N-Z",
              activities: ["Repeat Lesson 1 activities for N-Z"],
              interactive: ["flashcards", "audio", "quiz"],
            },
            {
              id: "1-1-3",
              title: "Numbers 1-20",
              objective: "Recognize, say, write numbers 1-20",
              activities: [
                "Counting songs",
                "flashcards",
                "counting objects",
                "number writing worksheets",
                "number bingo",
              ],
              interactive: ["audio", "flashcards", "quiz"],
            },
          ],
        },
        {
          title: "Basic Words & Greetings",
          lessons: [
            {
              id: "1-2-1",
              title: "Greetings & Farewells",
              objective: "Use Hello, Goodbye, How are you?",
              activities: ["Role-plays", "dialogues", "greeting matching"],
              interactive: ["audio", "video", "flashcards"],
            },
            {
              id: "1-2-2",
              title: "Polite Expressions",
              objective: "Use please, thank you, sorry, excuse me",
              activities: [
                "Flashcards",
                "polite request role-plays",
                "writing polite sentences",
              ],
              interactive: ["flashcards", "audio", "exercises"],
            },
            {
              id: "1-2-3",
              title: "Essential Vocabulary",
              objective: "Yes, no, okay, help, stop",
              activities: [
                "Flashcard games",
                "matching",
                "simple conversation",
              ],
              interactive: ["flashcards", "audio", "quiz"],
            },
            {
              id: "1-2-4",
              title: "Simple Questions & Answers",
              objective: 'Respond to "What\'s your name?", "How are you?"',
              activities: [
                "Pair interviews",
                "fill-in-the-blank",
                "listening practice",
              ],
              interactive: ["audio", "exercises", "quiz"],
            },
            {
              id: "1-2-5",
              title: "Review & Practice Test",
              objective: "Review all basic greetings and expressions",
              activities: ["Comprehensive review", "practice test"],
              interactive: ["quiz", "exercises"],
            },
          ],
        },
        {
          title: "Everyday Phrases",
          lessons: [
            {
              id: "1-3-1",
              title: "Common Expressions",
              objective: "I don't understand, Please repeat",
              activities: ["Phrase practice", "listening exercises"],
              interactive: ["audio", "flashcards"],
            },
            {
              id: "1-3-2",
              title: "Expressing Needs & Wants",
              objective: "I want..., I need...",
              activities: ["Role-play scenarios", "vocabulary building"],
              interactive: ["video", "exercises"],
            },
            {
              id: "1-3-3",
              title: "Giving Simple Instructions",
              objective: "Open your book, Sit down",
              activities: ["Command practice", "listening activities"],
              interactive: ["audio", "video"],
            },
            {
              id: "1-3-4",
              title: "Likes & Dislikes",
              objective: "I like..., I don't like...",
              activities: ["Preference surveys", "conversation practice"],
              interactive: ["flashcards", "exercises"],
            },
            {
              id: "1-3-5",
              title: "Unit Review & Practice",
              objective: "Review everyday phrases",
              activities: ["Comprehensive practice"],
              interactive: ["quiz", "exercises"],
            },
          ],
        },
        {
          title: "Introducing Yourself",
          lessons: [
            {
              id: "1-4-1",
              title: "Saying Your Name",
              objective: "My name is...",
              activities: ["Introduction practice"],
              interactive: ["audio", "exercises"],
            },
            {
              id: "1-4-2",
              title: "Sharing Personal Info",
              objective: "age, nationality, location",
              activities: ["Information exchange"],
              interactive: ["flashcards", "video"],
            },
            {
              id: "1-4-3",
              title: 'Using "I am" and "You are"',
              objective: "Basic sentence structure",
              activities: ["Grammar practice"],
              interactive: ["exercises", "quiz"],
            },
            {
              id: "1-4-4",
              title: "Asking Simple Questions",
              objective: "How old are you?, Where are you from?",
              activities: ["Question formation"],
              interactive: ["audio", "exercises"],
            },
            {
              id: "1-4-5",
              title: "Unit Review & Test",
              objective: "Complete introduction skills",
              activities: ["Final assessment"],
              interactive: ["quiz", "exercises"],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Family and Friends",
      units: [
        {
          title: "Family Vocabulary",
          lessons: [
            {
              id: "2-1-1",
              title: "Immediate Family",
              objective: "Learn mother, father, sister, brother",
              activities: ["Family tree creation"],
              interactive: ["flashcards", "audio"],
            },
            {
              id: "2-1-2",
              title: "Extended Family",
              objective: "Learn grandparents, aunts, uncles, cousins",
              activities: ["Extended family vocabulary"],
              interactive: ["flashcards", "quiz"],
            },
            {
              id: "2-1-3",
              title: "Family Relationships",
              objective: "Describe family connections",
              activities: ["Relationship mapping"],
              interactive: ["exercises", "video"],
            },
            {
              id: "2-1-4",
              title: "Possessive Pronouns",
              objective: "My, your, his, her family",
              activities: ["Grammar exercises"],
              interactive: ["exercises", "quiz"],
            },
            {
              id: "2-1-5",
              title: "Review & Test",
              objective: "Family vocabulary mastery",
              activities: ["Unit assessment"],
              interactive: ["quiz", "exercises"],
            },
          ],
        },
        {
          title: "Describing People",
          lessons: [
            {
              id: "2-2-1",
              title: "Physical Appearance",
              objective: "Describe how people look",
              activities: ["Description practice"],
              interactive: ["flashcards", "video"],
            },
            {
              id: "2-2-2",
              title: "Personality Adjectives",
              objective: "Nice, funny, kind, smart",
              activities: ["Personality vocabulary"],
              interactive: ["flashcards", "exercises"],
            },
            {
              id: "2-2-3",
              title: '"To be" Verbs',
              objective: "He is, She is, They are",
              activities: ["Grammar practice"],
              interactive: ["exercises", "quiz"],
            },
            {
              id: "2-2-4",
              title: "Simple Descriptions",
              objective: "Combine appearance and personality",
              activities: ["Description exercises"],
              interactive: ["video", "exercises"],
            },
            {
              id: "2-2-5",
              title: "Review & Test",
              objective: "People description skills",
              activities: ["Unit assessment"],
              interactive: ["quiz", "exercises"],
            },
          ],
        },
        {
          title: "Friends and Socializing",
          lessons: [
            {
              id: "2-3-1",
              title: "Friendship Vocabulary",
              objective: "Friend, best friend, classmate",
              activities: ["Social vocabulary"],
              interactive: ["flashcards", "audio"],
            },
            {
              id: "2-3-2",
              title: "Making Invitations",
              objective: "Do you want to...?",
              activities: ["Invitation practice"],
              interactive: ["video", "exercises"],
            },
            {
              id: "2-3-3",
              title: "Accepting/Declining Invitations",
              objective: "Yes, I'd love to / Sorry, I can't",
              activities: ["Response practice"],
              interactive: ["audio", "exercises"],
            },
            {
              id: "2-3-4",
              title: "Expressing Feelings",
              objective: "Happy, sad, excited, tired",
              activities: ["Emotion vocabulary"],
              interactive: ["flashcards", "video"],
            },
            {
              id: "2-3-5",
              title: "Review & Test",
              objective: "Social interaction skills",
              activities: ["Unit assessment"],
              interactive: ["quiz", "exercises"],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Daily Life and Routines",
      units: [
        {
          title: "Daily Activities",
          lessons: [
            {
              id: "3-1-1",
              title: "Common Verbs",
              objective: "eat, sleep, play, study",
              activities: ["Action vocabulary"],
              interactive: ["flashcards", "video"],
            },
            {
              id: "3-1-2",
              title: "Telling Time",
              objective: "What time is it?",
              activities: ["Clock reading"],
              interactive: ["exercises", "audio"],
            },
            {
              id: "3-1-3",
              title: "Daily Schedule Vocabulary",
              objective: "Morning, afternoon, evening",
              activities: ["Time expressions"],
              interactive: ["flashcards", "exercises"],
            },
            {
              id: "3-1-4",
              title: "Frequency Adverbs",
              objective: "always, sometimes, never",
              activities: ["Frequency practice"],
              interactive: ["exercises", "quiz"],
            },
            {
              id: "3-1-5",
              title: "Review & Test",
              objective: "Daily activities mastery",
              activities: ["Unit assessment"],
              interactive: ["quiz", "exercises"],
            },
          ],
        },
        {
          title: "School and Work",
          lessons: [
            {
              id: "3-2-1",
              title: "School Subjects & Places",
              objective: "Math, English, library, classroom",
              activities: ["School vocabulary"],
              interactive: ["flashcards", "audio"],
            },
            {
              id: "3-2-2",
              title: "Classroom Objects",
              objective: "Book, pen, desk, board",
              activities: ["Object identification"],
              interactive: ["flashcards", "video"],
            },
            {
              id: "3-2-3",
              title: "Simple School Instructions",
              objective: "Open your book, Listen carefully",
              activities: ["Instruction practice"],
              interactive: ["audio", "exercises"],
            },
            {
              id: "3-2-4",
              title: "Talking About Work",
              objective: "I am a student/teacher",
              activities: ["Job vocabulary"],
              interactive: ["flashcards", "exercises"],
            },
            {
              id: "3-2-5",
              title: "Review & Test",
              objective: "School and work vocabulary",
              activities: ["Unit assessment"],
              interactive: ["quiz", "exercises"],
            },
          ],
        },
      ],
    },
    {
      id: 4,
      title: "Food and Drink",
      units: [
        {
          title: "Food Vocabulary",
          lessons: [
            {
              id: "4-1-1",
              title: "Fruits & Vegetables",
              objective: "Apple, banana, carrot, tomato",
              activities: ["Food identification"],
              interactive: ["flashcards", "audio"],
            },
            {
              id: "4-1-2",
              title: "Meat, Dairy, Grains",
              objective: "Chicken, milk, bread, rice",
              activities: ["Food categories"],
              interactive: ["flashcards", "video"],
            },
            {
              id: "4-1-3",
              title: "Drinks & Snacks",
              objective: "Water, coffee, cookies, chips",
              activities: ["Beverage and snack vocabulary"],
              interactive: ["flashcards", "exercises"],
            },
            {
              id: "4-1-4",
              title: "Expressing Preferences",
              objective: "I like/don't like...",
              activities: ["Preference expressions"],
              interactive: ["exercises", "audio"],
            },
            {
              id: "4-1-5",
              title: "Review & Test",
              objective: "Food vocabulary mastery",
              activities: ["Unit assessment"],
              interactive: ["quiz", "exercises"],
            },
          ],
        },
        {
          title: "Eating Out",
          lessons: [
            {
              id: "4-2-1",
              title: "Ordering Food",
              objective: "I would like..., Can I have...?",
              activities: ["Restaurant role-play"],
              interactive: ["video", "exercises"],
            },
            {
              id: "4-2-2",
              title: "Asking Prices",
              objective: "How much is...?",
              activities: ["Price inquiries"],
              interactive: ["audio", "exercises"],
            },
            {
              id: "4-2-3",
              title: "Polite Requests",
              objective: "Could you please...?",
              activities: ["Polite language practice"],
              interactive: ["exercises", "video"],
            },
            {
              id: "4-2-4",
              title: "Paying the Bill",
              objective: "The check, please",
              activities: ["Payment vocabulary"],
              interactive: ["flashcards", "exercises"],
            },
            {
              id: "4-2-5",
              title: "Review & Test",
              objective: "Restaurant interaction skills",
              activities: ["Unit assessment"],
              interactive: ["quiz", "exercises"],
            },
          ],
        },
      ],
    },
    {
      id: 5,
      title: "Around the House",
      units: [
        {
          title: "Rooms and Furniture",
          lessons: [
            {
              id: "5-1-1",
              title: "Rooms in a House",
              objective: "Kitchen, bedroom, bathroom, living room",
              activities: ["House vocabulary"],
              interactive: ["flashcards", "video"],
            },
            {
              id: "5-1-2",
              title: "Furniture Vocabulary",
              objective: "Bed, table, chair, sofa",
              activities: ["Furniture identification"],
              interactive: ["flashcards", "audio"],
            },
            {
              id: "5-1-3",
              title: "Household Objects",
              objective: "TV, refrigerator, lamp, mirror",
              activities: ["Object vocabulary"],
              interactive: ["flashcards", "exercises"],
            },
            {
              id: "5-1-4",
              title: "Prepositions of Place",
              objective: "In, on, under, next to",
              activities: ["Location practice"],
              interactive: ["exercises", "video"],
            },
            {
              id: "5-1-5",
              title: "Review & Test",
              objective: "House vocabulary mastery",
              activities: ["Unit assessment"],
              interactive: ["quiz", "exercises"],
            },
          ],
        },
        {
          title: "Household Chores",
          lessons: [
            {
              id: "5-2-1",
              title: "Common Chores",
              objective: "Clean, wash, cook, vacuum",
              activities: ["Chore vocabulary"],
              interactive: ["flashcards", "video"],
            },
            {
              id: "5-2-2",
              title: "Talking About Routines",
              objective: "I usually..., Every day I...",
              activities: ["Routine expressions"],
              interactive: ["exercises", "audio"],
            },
            {
              id: "5-2-3",
              title: 'Using "Can" for Ability',
              objective: "I can cook, I can't drive",
              activities: ["Ability expressions"],
              interactive: ["exercises", "quiz"],
            },
            {
              id: "5-2-4",
              title: "Asking for Help",
              objective: "Can you help me?",
              activities: ["Help requests"],
              interactive: ["video", "exercises"],
            },
            {
              id: "5-2-5",
              title: "Review & Test",
              objective: "Household skills vocabulary",
              activities: ["Unit assessment"],
              interactive: ["quiz", "exercises"],
            },
          ],
        },
      ],
    },
    {
      id: 6,
      title: "Shopping and Money",
      units: [
        {
          title: "Shopping Vocabulary",
          lessons: [
            {
              id: "6-1-1",
              title: "Types of Shops",
              objective: "Store, market, pharmacy, bank",
              activities: ["Shop identification"],
              interactive: ["flashcards", "audio"],
            },
            {
              id: "6-1-2",
              title: "Items to Buy",
              objective: "Clothes, food, medicine, books",
              activities: ["Shopping vocabulary"],
              interactive: ["flashcards", "video"],
            },
            {
              id: "6-1-3",
              title: "Asking Prices",
              objective: "How much does this cost?",
              activities: ["Price inquiries"],
              interactive: ["exercises", "audio"],
            },
            {
              id: "6-1-4",
              title: "Making Purchases",
              objective: "I'll take this, I'll buy that",
              activities: ["Purchase expressions"],
              interactive: ["video", "exercises"],
            },
            {
              id: "6-1-5",
              title: "Review & Test",
              objective: "Shopping vocabulary mastery",
              activities: ["Unit assessment"],
              interactive: ["quiz", "exercises"],
            },
          ],
        },
        {
          title: "Money and Numbers",
          lessons: [
            {
              id: "6-2-1",
              title: "Currency and Coins",
              objective: "Dollar, cent, bill, coin",
              activities: ["Money vocabulary"],
              interactive: ["flashcards", "exercises"],
            },
            {
              id: "6-2-2",
              title: "Talking About Cost",
              objective: "It costs..., It's expensive/cheap",
              activities: ["Cost expressions"],
              interactive: ["audio", "exercises"],
            },
            {
              id: "6-2-3",
              title: "Asking for Discounts",
              objective: "Is there a discount?",
              activities: ["Discount vocabulary"],
              interactive: ["video", "exercises"],
            },
            {
              id: "6-2-4",
              title: "Paying with Cash or Card",
              objective: "Cash or card?",
              activities: ["Payment methods"],
              interactive: ["flashcards", "exercises"],
            },
            {
              id: "6-2-5",
              title: "Review & Test",
              objective: "Money vocabulary mastery",
              activities: ["Unit assessment"],
              interactive: ["quiz", "exercises"],
            },
          ],
        },
      ],
    },
    {
      id: 7,
      title: "Travel and Directions",
      units: [
        {
          title: "Places in Town",
          lessons: [
            {
              id: "7-1-1",
              title: "Common Places",
              objective: "Hospital, school, park, restaurant",
              activities: ["Place vocabulary"],
              interactive: ["flashcards", "audio"],
            },
            {
              id: "7-1-2",
              title: "Transportation Vocabulary",
              objective: "Bus, car, train, taxi",
              activities: ["Transport identification"],
              interactive: ["flashcards", "video"],
            },
            {
              id: "7-1-3",
              title: "Asking for Directions",
              objective: "Where is...? How do I get to...?",
              activities: ["Direction questions"],
              interactive: ["exercises", "audio"],
            },
            {
              id: "7-1-4",
              title: "Giving Simple Directions",
              objective: "Turn left, go straight, turn right",
              activities: ["Direction giving"],
              interactive: ["video", "exercises"],
            },
            {
              id: "7-1-5",
              title: "Review & Test",
              objective: "Places and directions mastery",
              activities: ["Unit assessment"],
              interactive: ["quiz", "exercises"],
            },
          ],
        },
        {
          title: "Travel Vocabulary",
          lessons: [
            {
              id: "7-2-1",
              title: "Booking Tickets",
              objective: "I need a ticket to...",
              activities: ["Booking practice"],
              interactive: ["video", "exercises"],
            },
            {
              id: "7-2-2",
              title: "At the Airport/Train Station",
              objective: "Gate, platform, departure, arrival",
              activities: ["Travel vocabulary"],
              interactive: ["flashcards", "audio"],
            },
            {
              id: "7-2-3",
              title: "Travel Essentials",
              objective: "Passport, luggage, ticket, map",
              activities: ["Essential items"],
              interactive: ["flashcards", "exercises"],
            },
            {
              id: "7-2-4",
              title: "Talking About Plans",
              objective: "I'm going to..., I will visit...",
              activities: ["Future plans"],
              interactive: ["exercises", "video"],
            },
            {
              id: "7-2-5",
              title: "Review & Test",
              objective: "Travel vocabulary mastery",
              activities: ["Unit assessment"],
              interactive: ["quiz", "exercises"],
            },
          ],
        },
      ],
    },
    {
      id: 8,
      title: "Weather and Seasons",
      units: [
        {
          title: "Weather Vocabulary",
          lessons: [
            {
              id: "8-1-1",
              title: "Basic Weather Terms",
              objective: "Sunny, rainy, cloudy, windy",
              activities: ["Weather vocabulary"],
              interactive: ["flashcards", "audio"],
            },
            {
              id: "8-1-2",
              title: "Talking About Temperature",
              objective: "Hot, cold, warm, cool",
              activities: ["Temperature expressions"],
              interactive: ["flashcards", "video"],
            },
            {
              id: "8-1-3",
              title: "Seasons of the Year",
              objective: "Spring, summer, fall, winter",
              activities: ["Season vocabulary"],
              interactive: ["flashcards", "exercises"],
            },
            {
              id: "8-1-4",
              title: "Expressing Preferences",
              objective: "I like sunny weather",
              activities: ["Weather preferences"],
              interactive: ["exercises", "audio"],
            },
            {
              id: "8-1-5",
              title: "Review & Test",
              objective: "Weather vocabulary mastery",
              activities: ["Unit assessment"],
              interactive: ["quiz", "exercises"],
            },
          ],
        },
        {
          title: "Simple Future Tense",
          lessons: [
            {
              id: "8-2-1",
              title: "Talking About Plans",
              objective: "I am going to...",
              activities: ["Future plans"],
              interactive: ["exercises", "video"],
            },
            {
              id: "8-2-2",
              title: 'Using "Will" for Future',
              objective: "It will rain tomorrow",
              activities: ["Will + verb practice"],
              interactive: ["exercises", "quiz"],
            },
            {
              id: "8-2-3",
              title: "Making Predictions",
              objective: "I think it will be sunny",
              activities: ["Prediction practice"],
              interactive: ["audio", "exercises"],
            },
            {
              id: "8-2-4",
              title: "Invitations and Arrangements",
              objective: "Let's meet tomorrow",
              activities: ["Future arrangements"],
              interactive: ["video", "exercises"],
            },
            {
              id: "8-2-5",
              title: "Review & Test",
              objective: "Future tense mastery",
              activities: ["Unit assessment"],
              interactive: ["quiz", "exercises"],
            },
          ],
        },
      ],
    },
  ];

  const getCompletionStatus = (lessonId) => {
    if (completedLessons.has(lessonId)) return "completed";
    if (inProgressLessons.has(lessonId)) return "in-progress";
    return "not-started";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-orange-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-300" />;
    }
  };

  const getInteractiveIcon = (type) => {
    switch (type) {
      case "flashcards":
        return <BookOpen className="w-3 h-3" />;
      case "audio":
        return <Headphones className="w-3 h-3" />;
      case "video":
        return <Video className="w-3 h-3" />;
      case "exercises":
        return <FileText className="w-3 h-3" />;
      case "quiz":
        return <Play className="w-3 h-3" />;
      default:
        return <Play className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            A0 English Curriculum
          </h1>
          <p className="text-gray-600">
            Complete Beginner Level - Interactive Learning Path
          </p>
        </div>

        {/* Modules */}
        <div className="space-y-6">
          {curriculum.map((module) => (
            <div
              key={module.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              {/* Module Header */}
              <div className="bg-gray-900 text-white p-4">
                <h2 className="text-xl font-semibold">
                  Module {module.id}: {module.title}
                </h2>
              </div>

              {/* Units */}
              <div className="p-4">
                {module.units.map((unit, unitIndex) => (
                  <div key={unitIndex} className="mb-6 last:mb-0">
                    <h3 className="text-lg font-medium text-gray-800 mb-3 pb-2 border-b border-gray-200">
                      {unit.title}
                    </h3>

                    {/* Lessons */}
                    <div className="space-y-2">
                      {unit.lessons.map((lesson) => {
                        const status = getCompletionStatus(lesson.id);
                        return (
                          <div
                            key={lesson.id}
                            onClick={() => setSelectedLesson(lesson)}
                            className="flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 rounded-lg cursor-pointer border border-transparent hover:border-blue-200 transition-all"
                          >
                            <div className="flex items-center space-x-3">
                              {getStatusIcon(status)}
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {lesson.title}
                                </h4>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                                    Complete Beginner
                                  </span>
                                  <div className="flex space-x-1">
                                    {lesson.interactive
                                      .slice(0, 3)
                                      .map((type, i) => (
                                        <div
                                          key={i}
                                          className="bg-blue-100 text-blue-600 p-1 rounded"
                                        >
                                          {getInteractiveIcon(type)}
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Lesson Modal */}
        {selectedLesson && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded mb-2 inline-block">
                      Complete Beginner
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedLesson.title}
                    </h2>
                    <p className="text-gray-600">{selectedLesson.objective}</p>
                  </div>
                  <button
                    onClick={() => setSelectedLesson(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Interactive Content
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLesson.interactive.map((type, i) => (
                      <button
                        key={i}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                      >
                        {getInteractiveIcon(type)}
                        <span className="capitalize">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Learning Activities
                  </h3>
                  <ul className="space-y-1">
                    {selectedLesson.activities.map((activity, i) => (
                      <li key={i} className="text-gray-700 text-sm">
                        • {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Start Learning
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Continue Learning →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonsPage;
