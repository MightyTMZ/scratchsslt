"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Clock, Filter, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const practiceProblems = [
  {
    id: 1,
    title: "Understanding News Articles",
    description: "Practice reading and analyzing news articles with questions focused on main ideas and supporting details.",
    type: "Reading",
    difficulty: "Medium",
    questions: 12,
    timeEstimate: "30 mins",
    author: "Ms. Thompson",
    tags: ["News Articles", "Main Ideas", "Details"],
  },
  {
    id: 2,
    title: "Literary Devices in Poetry",
    description: "Explore various poems and identify literary devices while understanding their effects on the reader.",
    type: "Reading",
    difficulty: "Hard",
    questions: 15,
    timeEstimate: "45 mins",
    author: "Mr. Roberts",
    tags: ["Poetry", "Literary Devices"],
  },
  {
    id: 3,
    title: "Opinion Paragraph Writing",
    description: "Learn to write effective opinion paragraphs with clear arguments and supporting evidence.",
    type: "Writing",
    difficulty: "Medium",
    questions: 8,
    timeEstimate: "40 mins",
    author: "Mrs. Davis",
    tags: ["Writing", "Opinion", "Arguments"],
  },
  {
    id: 4,
    title: "Informational Text Analysis",
    description: "Practice analyzing informational texts and identifying key concepts and supporting details.",
    type: "Reading",
    difficulty: "Easy",
    questions: 10,
    timeEstimate: "25 mins",
    author: "Mr. Wilson",
    tags: ["Informational", "Analysis"],
  },
  {
    id: 5,
    title: "Narrative Writing Skills",
    description: "Develop narrative writing skills through guided practice and structured exercises.",
    type: "Writing",
    difficulty: "Medium",
    questions: 6,
    timeEstimate: "35 mins",
    author: "Ms. Anderson",
    tags: ["Writing", "Narrative"],
  },
  {
    id: 6,
    title: "Graph and Chart Interpretation",
    description: "Learn to interpret and analyze various types of graphs and charts in context.",
    type: "Reading",
    difficulty: "Medium",
    questions: 8,
    timeEstimate: "20 mins",
    author: "Mr. Chen",
    tags: ["Graphs", "Data", "Analysis"],
  },
];

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");

  const filteredProblems = practiceProblems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || !selectedType || problem.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || !selectedDifficulty || problem.difficulty === selectedDifficulty;
    return matchesSearch && matchesType && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ScratchSSLT Library</h1>
            <p className="text-gray-600 mt-2">Browse and practice from our collection of OSSLT questions</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search practice sets..."
                className="pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Reading">Reading</SelectItem>
                <SelectItem value="Writing">Writing</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProblems.map((problem) => (
            <Card key={problem.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{problem.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{problem.type}</span>
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4" />
                      <span>{problem.timeEstimate}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    problem.difficulty === "Easy" ? "bg-green-100 text-green-800" :
                    problem.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{problem.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {problem.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">By {problem.author}</span>
                  <Link href={`/practice/${problem.id}`}>
                    <Button>Start Practice</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}