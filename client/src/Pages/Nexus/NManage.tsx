import type { User } from "@supabase/supabase-js";
import { useOutletContext } from "react-router-dom";

const NManage = () => {
  const { user, darkMode } = useOutletContext<{
    user: User;
    darkMode: boolean;
  }>();
  console.log(darkMode);
  console.log(user.email);
  return <div>NManage</div>;
};

export default NManage;
