"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload } from "lucide-react";
import { useState } from "react";

export function UploadModal() {
  const [step, setStep] = useState(1);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Practice Set
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Practice Set</DialogTitle>
          <DialogDescription>
            Upload your practice questions and materials.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {step === 1 && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter practice set title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what students will practice"
                />
              </div>
              <div className="grid gap-2">
                <Label>Reading Material</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Upload PDF or paste text content
                  </p>
                </div>
              </div>
              <Button onClick={() => setStep(2)}>Next: Add Questions</Button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-4">
                <h3 className="font-medium">Questions</h3>
                <div className="grid gap-4">
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Multiple Choice
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Short Answer
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Paragraph
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Matching
                  </Button>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button>Create Practice Set</Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}