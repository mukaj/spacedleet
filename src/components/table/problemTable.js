"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import APIClient from "@/lib/axios";

export const ProblemTable = ({ filteredProblems, setRefresh }) => {
  return (
    <div className="rounded-md border border-gray-700">
      <Table className="bg-gray-800 text-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center text-gray-300">#</TableHead>
            <TableHead className="text-gray-300">Title</TableHead>
            <TableHead className="w-24 text-gray-300">Difficulty</TableHead>
            <TableHead className="w-36 text-gray-300">Last Reviewed</TableHead>
            <TableHead className="w-36 text-gray-300">Next Review</TableHead>
            <TableHead className="text-gray-300">Complete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProblems.length > 0 ? (
            filteredProblems.map((userProblem) => (
              <TableRow key={userProblem.problemId}>
                <TableCell className="text-center font-medium text-white">
                  {userProblem.number}
                </TableCell>
                <TableCell>
                  <a
                    href={userProblem.problem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {userProblem.problem.title}
                  </a>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      userProblem.problem.difficulty === "Easy"
                        ? "bg-green-600 text-white"
                        : userProblem.problem.difficulty === "Medium"
                        ? "bg-yellow-600 text-white"
                        : "bg-red-600 text-white"
                    }
                  >
                    {userProblem.problem.difficulty}
                  </Badge>
                </TableCell>
                <TableCell>
                  {userProblem.lastReviewed
                    ? new Date(userProblem.lastReviewed).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell>
                  {userProblem.nextReview
                    ? new Date(userProblem.nextReview).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell>
                  <select
                    className="bg-gray-700 text-white rounded-md p-1"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value) {
                        APIClient.post(`problems/${userProblem.id}/review`, {
                          score: value,
                        })
                          .then((response) => {
                            console.log("Update successful:", response.data);
                          })
                          .catch((error) => {
                            console.error("Error updating problem:", error);
                          });
                        setRefresh((prev) => prev + 1);
                        e.target.value = "";
                      }
                    }}
                  >
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-gray-400">
                No problems found. Try adjusting your filters or add a new
                problem.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
