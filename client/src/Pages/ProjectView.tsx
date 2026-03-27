import React from "react";

interface ProjectViewProps {
  darkMode: boolean;
}

const ProjectView: React.FC<ProjectViewProps> = ({ darkMode }) => {
  return (
    <div className={`${darkMode ? "bg-black" : "bg-white"}`}>ProjectView</div>
  );
};

export default ProjectView;
