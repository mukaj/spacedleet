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
import { Plus, Search, X } from "lucide-react";
import APIClient from "@/lib/axios";
import { useRouter } from "next/router";

export default function ProblemTracker() {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [refresh, setRefresh] = useState(0);

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
  }, [refresh]);

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

  const router = useRouter();

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
            onClick={() => router.push("/add")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Problem
          </Button>
        </div>
      </div>

      <ProblemTable
        filteredProblems={filteredProblems}
        setRefresh={setRefresh}
      ></ProblemTable>
      <div className="text-sm text-gray-400">
        Showing {filteredProblems.length} of {problems.length} problems
      </div>
    </div>
  );
}
