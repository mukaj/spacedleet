import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const ProblemTable = ({ filteredProblems, toggleSolved }) => {
  return (
    <div className="rounded-md border border-gray-700">
      <Table className="bg-gray-800 text-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center text-gray-300">#</TableHead>
            <TableHead className="text-gray-300">Title</TableHead>
            <TableHead className="w-24 text-gray-300">Difficulty</TableHead>
            <TableHead className="w-24 text-center text-gray-300">
              Status
            </TableHead>
            <TableHead className="w-36 text-gray-300">Solved Date</TableHead>
            <TableHead className="text-gray-300">Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <TableRow key={problem.id}>
                <TableCell className="text-center font-medium text-white">
                  {problem.number}
                </TableCell>
                <TableCell>
                  <a
                    href={problem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {problem.title}
                  </a>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      problem.difficulty === "Easy"
                        ? "bg-green-600 text-white"
                        : problem.difficulty === "Medium"
                        ? "bg-yellow-600 text-white"
                        : "bg-red-600 text-white"
                    }
                  >
                    {problem.difficulty}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant={problem.solved ? "default" : "outline"}
                    size="sm"
                    className={`w-24 ${
                      problem.solved
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "border-gray-600 text-white hover:bg-gray-600"
                    }`}
                    onClick={() => toggleSolved(problem.id)}
                  >
                    {problem.solved ? (
                      <>
                        <Check className="h-4 w-4 mr-1" /> Solved
                      </>
                    ) : (
                      "Mark Solved"
                    )}
                  </Button>
                </TableCell>
                <TableCell>
                  {problem.solvedDate
                    ? new Date(problem.solvedDate).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {problem.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-gray-700 text-white"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
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
