import type { User } from "@supabase/supabase-js";
import React from "react";

interface ProjectViewProps {
  darkMode: boolean;
  user: User;
}

const ProjectView: React.FC<ProjectViewProps> = ({ darkMode, user }) => {
  console.log(user.email);
  return (
    <div className={`${darkMode ? "bg-black" : "bg-white"}`}>ProjectView</div>
  );
};

export default ProjectView;
