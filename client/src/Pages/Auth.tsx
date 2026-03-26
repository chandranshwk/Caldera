import { useState } from "react";
import Input from "../components/Input";
import { motion, AnimatePresence } from "motion/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { faker } from "@faker-js/faker";
import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);

  const navigate = useNavigate();

  const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth",
      },
    });
    if (error) toast.error(error.message);
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth",
      },
    });
    if (error) toast.error(error.message);
  };

  const handleAuth = async () => {
    const { data, error } = await (!login
      ? supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        })
      : supabase.auth.signInWithPassword({ email, password }));

    if (error) {
      toast.error(error.message);
    } else {
      // 1. If we have a session (login success or signup with no email confirm)
      if (data?.session) {
        localStorage.setItem("token", data.session.access_token);
        toast.success(`Logged In Successfully`);
        navigate("/dashboard");
      } else {
        // 2. If no session, they probably need to check email
        toast.info("Check your email to confirm your account!");
      }
    }
  };

  return (
    <div className="h-screen w-full flex bg-white font-sans selection:bg-indigo-100 ">
      {/* Left Side: The Form */}
      <div className="w-full lg:w-125 flex flex-col justify-center p-8 md:p-16 border-r border-slate-100 shadow-sm z-10">
        <motion.div layout className="max-w-sm w-full mx-auto space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-12">
            <img
              src="/icon-caldera.png"
              className="h-10 w-10 rounded-full border border-black"
            />
            <span className="text-slate-900 font-bold tracking-tight text-xl">
              CALDERA
            </span>
          </div>

          <div>
            <motion.h2
              layout
              className="text-3xl font-extrabold text-slate-900 tracking-tight"
            >
              {login ? "Welcome back" : "Create account"}
            </motion.h2>
            <p className="text-slate-500 mt-2 text-sm">
              {login
                ? "Sign in to your account to continue."
                : "Start your 14-day free trial today."}
            </p>
          </div>

          {/* Social Auth */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={signInWithGitHub}
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-xl text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all active:scale-95"
            >
              <FaGithub className="text-lg" /> GitHub
            </button>
            <button
              onClick={signInWithGoogle}
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-xl text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all active:scale-95"
            >
              <FaGoogle className="text-lg text-red-500" /> Google
            </button>
          </div>

          <div className="relative flex items-center py-2">
            <div className="grow border-t border-slate-100"></div>
            <span className="shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              or email
            </span>
            <div className="grow border-t border-slate-100"></div>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <AnimatePresence mode="popLayout">
              {!login && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden h-max pt-2"
                >
                  <Input
                    darkMode={false}
                    label="Full Name"
                    placeholder="Jane Doe"
                    input={name}
                    setInput={setName}
                    type="text"
                    size="md"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Input
              darkMode={false}
              label="Email"
              placeholder="you@example.com"
              input={email}
              setInput={setEmail}
              type="email"
              size="md"
              autocomplete={false}
            />

            <Input
              darkMode={false}
              label="Password"
              placeholder="••••••••"
              input={password}
              setInput={setPassword}
              type="password"
              size="md"
            />
            {login && (
              <button className="relative left-[calc(100%-6.5rem)] m-0 -top-5 text-xs font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                Forgot Password ?
              </button>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xl shadow-slate-200 transition-all"
              onClick={() => handleAuth()}
            >
              {login ? "Sign in" : "Create account"}
            </motion.button>
          </form>

          <p className="text-center text-slate-500 text-sm">
            {login ? "New to Caldera?" : "Already have an account?"}{" "}
            <button
              onClick={() => setLogin(!login)}
              className="text-indigo-600 font-bold hover:underline underline-offset-4"
            >
              {login ? "Create an account" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex flex-1 bg-slate-50 flex-col justify-center items-center p-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-150 h-150 bg-indigo-100/50 blur-[120px] rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-150 h-150 bg-orange-100/50 blur-[100px] rounded-full -ml-24 -mb-24" />

        <div className="relative z-10 max-w-lg">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              Join 10k+ Teams
            </div>

            <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
              The operating system for{" "}
              <span className="text-indigo-600">infinite flow.</span>
            </h3>

            <p className="text-lg text-slate-600 leading-relaxed">
              Experience the first workspace that merges documentation, tasks,
              and visual brainstorming into one high-performance desktop app.
            </p>

            {/* Mini Testimonial */}
            <div className="pt-12 border-t border-slate-200">
              <p className="text-slate-500 italic">
                "Caldera has not only helped me to better{" "}
                {faker.person.jobDescriptor().toLowerCase()} with my team but
                has also helped me to improve my own {faker.word.adjective()}{" "}
                productivity."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-300">
                  <img
                    src={faker.image.avatarGitHub()}
                    alt="avatar"
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm">
                    {faker.person.fullName()}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {faker.person.jobTitle()} at {faker.company.name()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
