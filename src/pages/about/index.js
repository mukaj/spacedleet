import React from "react";

const AboutPage = () => {
  return (
    <div className="mt-8 p-8 bg-gray-800 text-white rounded-md border border-gray-700 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">About SpacedLeet</h1>
      <p className="text-gray-300 mb-4">
        SpacedLeet is a powerful tool designed to help users master coding
        problems from LeetCode using the principles of spaced repetition. Our
        app allows you to create a personalized list of problems you want to
        study, track your progress, and focus on the areas where you need the
        most improvement.
      </p>
      <p className="text-gray-300 mb-4">
        Whether you're preparing for coding interviews or simply improving your
        problem-solving skills, SpacedLeet makes it easy to organize and
        prioritize your study sessions. With features like problem search,
        filtering by difficulty, and tracking due problems, you can stay on top
        of your learning goals.
      </p>
      <p className="text-gray-300">
        Start building your problem-solving skills today with SpacedLeet and
        take your coding journey to the next level!
      </p>
    </div>
  );
};

export default AboutPage;
