"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Save, Plus, Trash2, Play, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { MonacoEditor } from "@/components/editor";

interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export default function ChallengeEditorPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("beginner");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [timeLimit, setTimeLimit] = useState("30");
  const [points, setPoints] = useState("100");
  const [starterCode, setStarterCode] = useState("");
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [solution, setSolution] = useState("");

  const addTestCase = () => {
    const newTestCase: TestCase = {
      id: Date.now().toString(),
      input: "",
      expectedOutput: "",
      isHidden: false,
    };
    setTestCases([...testCases, newTestCase]);
  };

  const removeTestCase = (id: string) => {
    setTestCases(testCases.filter(test => test.id !== id));
  };

  const updateTestCase = (id: string, field: keyof TestCase, value: string | boolean) => {
    setTestCases(testCases.map(test => 
      test.id === id ? { ...test, [field]: value } : test
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {title || "New Coding Challenge"}
        </h1>
        <Button onClick={() => console.log("Save challenge")}>
          <Save className="w-4 h-4 mr-2" />
          Save Challenge
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-3">
        {/* Main Configuration */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Challenge Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter challenge title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the challenge..."
                rows={5}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="algorithms">Algorithms</SelectItem>
                    <SelectItem value="data-structures">Data Structures</SelectItem>
                    <SelectItem value="web-development">Web Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Programming Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="points">Points</Label>
                <Input
                  id="points"
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  placeholder="100"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time and Points */}
        <Card>
          <CardHeader>
            <CardTitle>Challenge Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
              <Input
                id="timeLimit"
                type="number"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                placeholder="30"
              />
            </div>

            <div className="space-y-2">
              <Label>Visibility</Label>
              <Select defaultValue="public">
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="unlisted">Unlisted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Code Editor and Test Cases */}
        <Card className="col-span-3">
          <Tabs defaultValue="starter-code">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Code and Tests</CardTitle>
                <TabsList>
                  <TabsTrigger value="starter-code">Starter Code</TabsTrigger>
                  <TabsTrigger value="test-cases">Test Cases</TabsTrigger>
                  <TabsTrigger value="solution">Solution</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
            <TabsContent value="starter-code" className="border-none p-0">
              <div className="space-y-4 mt-4">
                <MonacoEditor
                  value={starterCode}
                  language={language.toLowerCase()}
                  onChange={setStarterCode}
                  height="400px"
                />
              </div>
            </TabsContent>

              <TabsContent value="test-cases">
                <div className="space-y-4">
                  {testCases.map((testCase) => (
                    <Card key={testCase.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Input</Label>
                                <Textarea
                                  value={testCase.input}
                                  onChange={(e) => updateTestCase(testCase.id, "input", e.target.value)}
                                  placeholder="Test case input..."
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Expected Output</Label>
                                <Textarea
                                  value={testCase.expectedOutput}
                                  onChange={(e) => updateTestCase(testCase.id, "expectedOutput", e.target.value)}
                                  placeholder="Expected output..."
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={testCase.isHidden}
                                onChange={(e) => updateTestCase(testCase.id, "isHidden", e.target.checked)}
                                id={`hidden-${testCase.id}`}
                              />
                              <Label htmlFor={`hidden-${testCase.id}`}>Hidden test case</Label>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTestCase(testCase.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button onClick={addTestCase}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Test Case
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="solution" className="border-none p-0">
                <div className="space-y-4 mt-4">
                  <MonacoEditor
                    value={solution}
                    language={language.toLowerCase()}
                    onChange={setSolution}
                    height="400px"
                  />
                  <Button variant="secondary">
                    <Play className="h-4 w-4 mr-2" />
                    Test Solution
                  </Button>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}