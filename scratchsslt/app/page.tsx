"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Brain, Library, Plus, Trophy } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to ScratchSSLT
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practice with our comprehensive collection of OSSLT questions and improve your literacy skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Practice Tests</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Access a variety of practice tests designed to help you succeed.
            </p>
            <Link href="/practice">
              <Button className="w-full">Start Practice</Button>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Library className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">Question Library</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Browse our extensive collection of practice questions.
            </p>
            <Link href="/library">
              <Button className="w-full" variant="outline">
                View Library
              </Button>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold">Progress Tracking</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Monitor your improvement and track your success.
            </p>
            <Link href="/progress">
              <Button className="w-full" variant="outline">
                View Progress
              </Button>
            </Link>
          </Card>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recent Practice Sets
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Reading Practice #{i}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Multiple choice · Short answer · 20 minutes
                </p>
                <Button className="w-full" variant="outline">
                  Start Practice
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}