import React, { useState } from "react";

// Mock data for LeetCode problems (replace with API call if needed)
const mockProblems = [
  { id: 1, title: "Two Sum" },
  { id: 2, title: "Add Two Numbers" },
  { id: 3, title: "Longest Substring Without Repeating Characters" },
  { id: 4, title: "Median of Two Sorted Arrays" },
];

const CreateProblemEntry = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProblems, setFilteredProblems] = useState(mockProblems);
  const [selectedProblems, setSelectedProblems] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredProblems(
      mockProblems.filter((problem) =>
        problem.title.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleAddProblem = (problem) => {
    if (!selectedProblems.some((p) => p.id === problem.id)) {
      setSelectedProblems([...selectedProblems, problem]);
    }
  };

  return (
    <div className="mt-8 p-8 bg-gray-800 text-white rounded-md border border-gray-700 max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">Create New Problem Entry</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a problem..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Search Results</h2>
        <ul className="space-y-2">
          {filteredProblems.map((problem) => (
            <li
              key={problem.id}
              className="flex justify-between items-center p-2 bg-gray-700 rounded-md border border-gray-600"
            >
              <span className="text-sm">{problem.title}</span>
              <button
                onClick={() => handleAddProblem(problem)}
                className="ml-4 px-3 py-1 bg-blue-600 text-sm text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-medium mb-4">Selected Problems</h2>
        <ul className="space-y-2">
          {selectedProblems.map((problem) => (
            <li
              key={problem.id}
              className="p-2 bg-gray-700 rounded-md border border-gray-600 text-sm"
            >
              {problem.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateProblemEntry;
