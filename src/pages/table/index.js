import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProblemTable } from "@/components/table/problemTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, X } from "lucide-react";
import APIClient from "@/lib/axios";

export default function ProblemTracker() {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProblem, setNewProblem] = useState({
    number: 0,
    title: "",
    difficulty: "Easy",
    url: "",
    tags: [],
  });
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await APIClient.get("problems");
        setProblems(response.data);
        console.log("Fetched problems:", response.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  const filteredProblems = problems.filter((userProblem) => {
    const matchesSearch = userProblem.problem.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || userProblem.isDue == (statusFilter === "due");

    const matchesDifficulty =
      difficultyFilter === "all" ||
      userProblem.problem.difficulty === difficultyFilter;

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  return (
    <div className="space-y-6 text-white p-6 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search Problems/Tags"
            className="pl-8 bg-gray-800 text-white border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[130px] bg-gray-800 text-white border-gray-700">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] bg-gray-800 text-white border-gray-700">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="due">Due</SelectItem>
              <SelectItem value="notdue">Not Due</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Problem
          </Button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-gray-800 p-4 rounded-lg space-y-4">
          <h3 className="font-medium text-white">Add New Problem</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300">
                Problem Number
              </label>
              <Input
                type="number"
                value={newProblem.number || ""}
                onChange={(e) =>
                  setNewProblem({
                    ...newProblem,
                    number: Number.parseInt(e.target.value) || 0,
                  })
                }
                placeholder="Problem number"
                className="bg-gray-700 text-white border-gray-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Title</label>
              <Input
                value={newProblem.title || ""}
                onChange={(e) =>
                  setNewProblem({ ...newProblem, title: e.target.value })
                }
                placeholder="Problem title"
                className="bg-gray-700 text-white border-gray-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">
                Difficulty
              </label>
              <Select
                value={newProblem.difficulty}
                onValueChange={(value) =>
                  setNewProblem({ ...newProblem, difficulty: value })
                }
              >
                <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white">
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">URL</label>
              <Input
                value={newProblem.url || ""}
                onChange={(e) =>
                  setNewProblem({ ...newProblem, url: e.target.value })
                }
                placeholder="Problem URL"
                className="bg-gray-700 text-white border-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300">Tags</label>
            <div className="flex gap-2 mt-1">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className="bg-gray-700 text-white border-gray-600"
              />
              <Button
                variant="outline"
                onClick={addTag}
                className="border-gray-600 text-white hover:bg-gray-600"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {(newProblem.tags || []).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1 bg-gray-700 text-white"
                >
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowAddForm(false)}
              className="border-gray-600 text-white hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Save Problem
            </Button>
          </div>
        </div>
      )}
      <ProblemTable filteredProblems={filteredProblems}></ProblemTable>
      <div className="text-sm text-gray-400">
        Showing {filteredProblems.length} of {problems.length} problems
      </div>
    </div>
  );
}
