"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, GraduationCap, Target, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

const practiceSets = [
  {
    id: 1,
    title: "Reading Comprehension - Environmental Innovation",
    description: "Practice your reading comprehension skills with this passage about environmental innovation and community impact.",
    type: "Reading Comprehension",
    timeEstimate: "20 minutes",
    difficulty: "Intermediate",
    passage: `In the bustling city of Toronto, where skyscrapers pierce the clouds and streetcars weave through historic neighborhoods, Sarah Chen found herself at a crossroads. As a high school student passionate about environmental science, she had noticed the growing problem of plastic waste in her community. The local ravines, once pristine urban wilderness corridors, were increasingly dotted with discarded water bottles and food packaging.

Sarah remembered her grandmother's stories about growing up in rural China, where every resource was precious and nothing went to waste. These tales sparked an idea: what if she could combine traditional wisdom with modern innovation to address her community's waste problem?

With determination, Sarah started a school initiative called "GreenCycle." The project began small, with recycling bins in classrooms, but quickly evolved into something more ambitious. She organized workshops where seniors from various cultural backgrounds shared their knowledge about sustainable living with students. These sessions revealed fascinating parallels between different traditions and modern environmental practices.

The impact was remarkable. Within six months, the school's waste output decreased by 40%. More importantly, students began bringing these practices home, creating a ripple effect throughout the community. Local businesses took notice, and soon several shops near the school adopted more environmentally friendly packaging options.

Sarah's initiative demonstrated how young people could bridge generational and cultural gaps while addressing contemporary challenges. Her story became a testament to the power of combining diverse perspectives in problem-solving, proving that solutions to modern problems sometimes lie in the wisdom of the past.`,
    questions: [
      {
        type: "multiple-choice",
        question: "What was the primary motivation behind Sarah's initiative?",
        options: [
          "To improve her college application",
          "To address plastic waste in her community",
          "To learn about Chinese culture",
          "To meet new people at school"
        ],
        correct: 1
      },
      {
        type: "short-answer",
        question: "How did Sarah's grandmother's stories influence her environmental project?",
        maxWords: 100
      },
      {
        type: "paragraph",
        question: "Explain how Sarah's project bridged cultural and generational gaps in her community. Use specific examples from the text to support your answer.",
        expectedLength: 200
      }
    ]
  },
  {
    id: 2,
    title: "Scientific Analysis - Climate Change",
    description: "Test your ability to analyze scientific data and draw conclusions about climate patterns.",
    type: "Scientific Analysis",
    timeEstimate: "25 minutes",
    difficulty: "Advanced",
    passage: `Global temperature records from the past century show a clear warming trend, with the most dramatic changes occurring in the past three decades. Scientists have observed that the average global temperature has increased by approximately 1.1°C since the pre-industrial era, with two-thirds of this warming happening since 1975.

This warming trend correlates strongly with increasing atmospheric carbon dioxide levels, which have risen from 280 parts per million (ppm) in the pre-industrial era to over 410 ppm today. The rate of increase has accelerated, showing the highest growth in the past decade.

The impacts of this warming are evident in various Earth systems. Arctic sea ice extent has declined by about 13% per decade, mountain glaciers are retreating worldwide, and sea levels are rising at an accelerating rate of about 3.3 millimeters per year. Extreme weather events have become more frequent and intense, with heat waves, heavy precipitation, and coastal flooding showing clear upward trends.

Research indicates that these changes are primarily driven by human activities, particularly the burning of fossil fuels and deforestation. Natural factors such as volcanic activity and solar radiation variations have been thoroughly studied but cannot explain the observed warming pattern.`,
    questions: [
      {
        type: "multiple-choice",
        question: "What is the approximate rate of sea level rise according to the passage?",
        options: [
          "1.1 millimeters per year",
          "2.2 millimeters per year",
          "3.3 millimeters per year",
          "4.4 millimeters per year"
        ],
        correct: 2
      },
      {
        type: "short-answer",
        question: "Explain the relationship between CO2 levels and global temperature changes mentioned in the passage.",
        maxWords: 75
      },
      {
        type: "paragraph",
        question: "Analyze how the passage presents evidence for human-caused climate change. What specific data points and correlations are used to support this conclusion?",
        expectedLength: 150
      }
    ]
  }
];

export default function PracticePage() {
  const [selectedSet, setSelectedSet] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState<{
    correct: number;
    total: number;
    multipleChoiceScore: number;
    shortAnswerAttempted: number;
    paragraphAttempted: number;
  }>({
    correct: 0,
    total: 0,
    multipleChoiceScore: 0,
    shortAnswerAttempted: 0,
    paragraphAttempted: 0,
  });

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const currentSet = practiceSets.find(set => set.id === selectedSet);
    if (!currentSet) return;
    
    const wordCount = getWordCount(text);
    const question = currentSet.questions[currentQuestion];
    
    if (question.type === "short-answer") {
      if (wordCount <= question.maxWords) {
        setAnswers({ ...answers, [currentQuestion]: text });
      }
    } else {
      setAnswers({ ...answers, [currentQuestion]: text });
    }
  };

  const calculateScore = (currentSet: typeof practiceSets[0]) => {
    let correctAnswers = 0;
    let totalMultipleChoice = 0;
    let shortAnswerAttempted = 0;
    let paragraphAttempted = 0;

    currentSet.questions.forEach((question, index) => {
      if (question.type === "multiple-choice") {
        totalMultipleChoice++;
        if (parseInt(answers[index] || "-1") === question.correct) {
          correctAnswers++;
        }
      } else if (question.type === "short-answer" && answers[index]?.trim()) {
        shortAnswerAttempted++;
      } else if (question.type === "paragraph" && answers[index]?.trim()) {
        paragraphAttempted++;
      }
    });

    setScore({
      correct: correctAnswers,
      total: currentSet.questions.length,
      multipleChoiceScore: totalMultipleChoice > 0 ? (correctAnswers / totalMultipleChoice) * 100 : 0,
      shortAnswerAttempted,
      paragraphAttempted,
    });
    setShowResults(true);
  };

  const renderResults = (currentSet: typeof practiceSets[0]) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
          >
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </motion.div>

          <h2 className="text-2xl font-bold text-center mb-6">Practice Set Complete!</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Multiple Choice Questions</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span>Accuracy</span>
                  <span className="font-semibold">{score.multipleChoiceScore.toFixed(1)}%</span>
                </div>
                <Progress 
                  value={score.multipleChoiceScore} 
                  className="mt-2"
                />
              </div>
            </div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-semibold mb-2">Short Answers</h3>
              <p className="text-gray-600">
                {score.shortAnswerAttempted} question{score.shortAnswerAttempted !== 1 ? 's' : ''} attempted
              </p>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-semibold mb-2">Paragraph Responses</h3>
              <p className="text-gray-600">
                {score.paragraphAttempted} question{score.paragraphAttempted !== 1 ? 's' : ''} attempted
              </p>
            </motion.div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSelectedSet(null);
                setCurrentQuestion(0);
                setAnswers({});
                setShowResults(false);
              }}
            >
              Back to Practice Sets
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                setCurrentQuestion(0);
                setAnswers({});
                setShowResults(false);
              }}
            >
              Try Again
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  };

  if (!selectedSet) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Practice Sets</h1>
            <p className="text-gray-600 mt-2">Choose a practice set to begin</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {practiceSets.map((set, index) => (
                <motion.div
                  key={set.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedSet(set.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{set.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{set.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Target className="w-4 h-4 mr-2" />
                        <span>{set.type}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <BookOpen className="w-4 h-4 mr-2" />
                        <span>{set.questions.length} questions</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{set.timeEstimate}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        <span>{set.difficulty}</span>
                      </div>
                    </div>

                    <Button className="w-full mt-4">Start Practice</Button>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  const currentSet = practiceSets.find(set => set.id === selectedSet)!;

  if (showResults) {
    return renderResults(currentSet);
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedSet(null);
              setCurrentQuestion(0);
              setAnswers({});
            }}
            className="mb-4"
          >
            ← Back to Practice Sets
          </Button>
          <Progress value={(currentQuestion + 1) * (100 / currentSet.questions.length)} />
          <p className="text-sm text-gray-600 mt-2">
            Question {currentQuestion + 1} of {currentSet.questions.length}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Reading Passage</h2>
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{currentSet.passage}</p>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-semibold mb-4">
                {currentSet.questions[currentQuestion].question}
              </h2>

              {currentSet.questions[currentQuestion].type === "multiple-choice" && (
                <RadioGroup 
                  value={answers[currentQuestion]}
                  onValueChange={(value) => setAnswers({ ...answers, [currentQuestion]: value })}
                  className="space-y-4"
                >
                  {currentSet.questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`q${index}`} />
                      <label
                        htmlFor={`q${index}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {(currentSet.questions[currentQuestion].type === "short-answer" ||
                currentSet.questions[currentQuestion].type === "paragraph") && (
                <div>
                  <Textarea
                    className="w-full h-32 p-2 border rounded-md"
                    placeholder="Type your answer here..."
                    value={answers[currentQuestion] || ""}
                    onChange={handleTextChange}
                  />
                  {currentSet.questions[currentQuestion].type === "short-answer" && (
                    <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                      <span>Maximum: {currentSet.questions[currentQuestion].maxWords} words</span>
                      <span>
                        {currentSet.questions[currentQuestion].maxWords - getWordCount(answers[currentQuestion] || "")} words remaining
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion((prev) => prev - 1)}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    if (currentQuestion < currentSet.questions.length - 1) {
                      setCurrentQuestion((prev) => prev + 1);
                    } else {
                      calculateScore(currentSet);
                    }
                  }}
                >
                  {currentQuestion === currentSet.questions.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}