"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface MultipleChoiceQuestion {
  type: "multiple-choice";
  question: string;
  options: string[];
  correct: number;
}

interface ShortAnswerQuestion {
  type: "short-answer";
  question: string;
  maxWords: number;
}

interface ParagraphQuestion {
  type: "paragraph";
  question: string;
  expectedLength?: number;
}

type Question = MultipleChoiceQuestion | ShortAnswerQuestion | ParagraphQuestion;

const sampleText = `
In the heart of a bustling city, where the rhythm of life pulsed through crowded streets and towering buildings, lived a young artist named Maya. Her small studio apartment, perched on the twentieth floor of an aging high-rise, offered a panoramic view of the urban landscape that had become both her muse and her challenge.

Maya spent her days painting cityscapes that captured not just the physical structure of the metropolis, but its very soul. Her canvases were filled with the interplay of light and shadow, the movement of people, and the constant flow of life that made the city breathe. Yet lately, she had been struggling with a peculiar sense of disconnection.

Despite being surrounded by millions of people, Maya felt increasingly isolated. The city that had once inspired her now seemed to be closing in, its concrete walls and glass facades creating an invisible barrier between her and the world she sought to capture in her art.
`;

const questions: Question[] = [
  {
    type: "multiple-choice",
    question: "What is the main theme explored in this passage?",
    options: [
      "Urban development",
      "Artistic expression",
      "Isolation in a crowded city",
      "Career struggles",
    ],
    correct: 2,
  },
  {
    type: "short-answer",
    question: "How does the author use imagery to describe Maya's relationship with the city?",
    maxWords: 100
  },
  {
    type: "paragraph",
    question: "Explain how Maya's physical position in the city (twentieth floor) might symbolize her emotional state.",
    expectedLength: 200
  },
];

export default function PracticePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: string}>({});

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const question = questions[currentQuestion];
    const wordCount = getWordCount(text);
    
    if (question.type === "short-answer") {
      if (wordCount <= question.maxWords) {
        setAnswers({ ...answers, [currentQuestion]: text });
      }
    } else {
      setAnswers({ ...answers, [currentQuestion]: text });
    }
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Progress value={(currentQuestion + 1) * (100 / questions.length)} />
          <p className="text-sm text-gray-600 mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Reading Passage</h2>
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{sampleText}</p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold mb-4">
              {currentQuestionData.question}
            </h2>

            {currentQuestionData.type === "multiple-choice" && (
              <RadioGroup 
                value={answers[currentQuestion]}
                onValueChange={(value) => setAnswers({ ...answers, [currentQuestion]: value })}
                className="space-y-4"
              >
                {currentQuestionData.options.map((option, index) => (
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

            {(currentQuestionData.type === "short-answer" ||
              currentQuestionData.type === "paragraph") && (
              <div>
                <Textarea
                  className="w-full h-32 p-2 border rounded-md"
                  placeholder="Type your answer here..."
                  value={answers[currentQuestion] || ""}
                  onChange={handleTextChange}
                />
                {currentQuestionData.type === "short-answer" && (
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                    <span>Maximum: {currentQuestionData.maxWords} words</span>
                    <span>
                      {currentQuestionData.maxWords - getWordCount(answers[currentQuestion] || "")} words remaining
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
                onClick={() =>
                  currentQuestion < questions.length - 1
                    ? setCurrentQuestion((prev) => prev + 1)
                    : null
                }
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}