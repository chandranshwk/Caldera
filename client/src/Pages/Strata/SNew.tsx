import type { User } from "@supabase/supabase-js";
import { useOutletContext } from "react-router-dom";
import ToolbarStrata from "../../components/ToolbarStrata";

const SNew = () => {
  const { user, darkMode } = useOutletContext<{
    user: User;
    darkMode: boolean;
  }>();
  console.log(darkMode);
  console.log(user.email);
  return (
    <div>
      <ToolbarStrata darkMode={darkMode} />
    </div>
  );
};

export default SNew;
