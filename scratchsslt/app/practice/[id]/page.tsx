"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { useState } from "react";

const samplePassage = `
In the bustling city of Toronto, where skyscrapers pierce the clouds and streetcars weave through historic neighborhoods, Sarah Chen found herself at a crossroads. As a high school student passionate about environmental science, she had noticed the growing problem of plastic waste in her community. The local ravines, once pristine urban wilderness corridors, were increasingly dotted with discarded water bottles and food packaging.

Sarah remembered her grandmother's stories about growing up in rural China, where every resource was precious and nothing went to waste. These tales sparked an idea: what if she could combine traditional wisdom with modern innovation to address her community's waste problem?

With determination, Sarah started a school initiative called "GreenCycle." The project began small, with recycling bins in classrooms, but quickly evolved into something more ambitious. She organized workshops where seniors from various cultural backgrounds shared their knowledge about sustainable living with students. These sessions revealed fascinating parallels between different traditions and modern environmental practices.

The impact was remarkable. Within six months, the school's waste output decreased by 40%. More importantly, students began bringing these practices home, creating a ripple effect throughout the community. Local businesses took notice, and soon several shops near the school adopted more environmentally friendly packaging options.

Sarah's initiative demonstrated how young people could bridge generational and cultural gaps while addressing contemporary challenges. Her story became a testament to the power of combining diverse perspectives in problem-solving, proving that solutions to modern problems sometimes lie in the wisdom of the past.`;

const questions = [
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
  },
  {
    type: "matching",
    question: "Match the following elements with their impacts:",
    pairs: [
      { item: "Recycling bins", match: "Classroom waste reduction" },
      { item: "Senior workshops", match: "Knowledge sharing" },
      { item: "Student participation", match: "Community ripple effect" },
      { item: "Local business involvement", match: "Sustainable packaging" }
    ]
  }
];

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' }
  ];
}

export default function PracticeProblemPage() {
  const params = useParams();
  const questionId = params.id;
  
  const [activeTab, setActiveTab] = useState("reading");
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: any}>({});
  const [matchingPairs, setMatchingPairs] = useState<{[key: string]: string}>({});
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (item: string) => {
    setDraggedItem(item);
  };

  const handleDrop = (match: string) => {
    if (draggedItem) {
      setMatchingPairs({
        ...matchingPairs,
        [draggedItem]: match
      });
    }
    setDraggedItem(null);
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleShortAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const wordCount = getWordCount(text);
    
    if (wordCount <= questions[1].maxWords) {
      setSelectedAnswers({ ...selectedAnswers, "short-answer": text });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Practice Problem #{questionId}</h1>
          <Progress value={25} className="mt-4" />
          <p className="text-sm text-gray-600 mt-2">Question 1 of 4</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Reading Passage</h2>
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{samplePassage}</p>
            </div>
          </Card>

          <Card className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="multiple-choice">Multiple Choice</TabsTrigger>
                <TabsTrigger value="short-answer">Short Answer</TabsTrigger>
                <TabsTrigger value="paragraph">Paragraph</TabsTrigger>
                <TabsTrigger value="matching">Matching</TabsTrigger>
              </TabsList>

              <TabsContent value="multiple-choice" className="mt-6">
                <h3 className="font-semibold mb-4">{questions[0].question}</h3>
                <RadioGroup
                  value={selectedAnswers["multiple-choice"]}
                  onValueChange={(value) => 
                    setSelectedAnswers({...selectedAnswers, "multiple-choice": value})
                  }
                >
                  {questions[0].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <label htmlFor={`option-${index}`}>{option}</label>
                    </div>
                  ))}
                </RadioGroup>
              </TabsContent>

              <TabsContent value="short-answer" className="mt-6">
                <h3 className="font-semibold mb-4">{questions[1].question}</h3>
                <Textarea 
                  placeholder="Type your answer here..."
                  value={selectedAnswers["short-answer"] || ""}
                  onChange={handleShortAnswerChange}
                  className="mb-2"
                />
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Maximum: {questions[1].maxWords} words</span>
                  <span>
                    {questions[1].maxWords - getWordCount(selectedAnswers["short-answer"] || "")} words remaining
                  </span>
                </div>
              </TabsContent>

              <TabsContent value="paragraph" className="mt-6">
                <h3 className="font-semibold mb-4">{questions[2].question}</h3>
                <Textarea 
                  placeholder="Write your paragraph here..."
                  className="min-h-[200px]"
                  value={selectedAnswers["paragraph"] || ""}
                  onChange={(e) => 
                    setSelectedAnswers({...selectedAnswers, "paragraph": e.target.value})
                  }
                />
                <p className="text-sm text-gray-500 mt-2">
                  Expected length: {questions[2].expectedLength} words
                </p>
              </TabsContent>

              <TabsContent value="matching" className="mt-6">
                <h3 className="font-semibold mb-4">{questions[3].question}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {questions[3].pairs.map(({ item }) => (
                      <div
                        key={item}
                        draggable
                        onDragStart={() => handleDragStart(item)}
                        className="p-2 bg-blue-50 rounded border border-blue-200 cursor-move"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {questions[3].pairs.map(({ match }) => (
                      <div
                        key={match}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(match)}
                        className="p-2 bg-gray-50 rounded border border-gray-200"
                      >
                        {match}
                        {Object.entries(matchingPairs).map(([item, matched]) => 
                          matched === match ? (
                            <div key={item} className="mt-2 p-2 bg-blue-50 rounded">
                              {item}
                            </div>
                          ) : null
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between mt-6">
              <Button variant="outline">Previous</Button>
              <Button>Next</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}