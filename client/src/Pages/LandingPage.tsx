import { motion } from "motion/react";
import {
  BiCheckSquare,
  BiChevronRight,
  BiMessageSquare,
  BiSearch,
  BiUser,
} from "react-icons/bi";
import { FiActivity, FiEdit3, FiPenTool } from "react-icons/fi";
import { LuFolderKanban } from "react-icons/lu";

import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-100 to-rose-100 text-slate-900 relative overflow-x-hidden">
      {/* Animated dark wave overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-linear-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 60%, 0 80%)",
          }}
          animate={{
            clipPath: [
              "polygon(0 0, 100% 0, 100% 60%, 0 80%)",
              "polygon(0 0, 100% 0, 100% 65%, 0 75%)",
              "polygon(0 0, 100% 0, 100% 60%, 0 80%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <header className="relative px-8 pt-20 pb-32">
          <div className="max-w-7xl mx-auto">
            {/* Logo/Brand */}
            <motion.div
              className="flex items-center gap-3 mb-16"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/icon-caldera.png"
                className="h-10 w-10 rounded-full border border-black"
              />
              <span className="tracking-wider text-white font-bold text-4xl">
                CALDERA
              </span>
            </motion.div>

            {/* Hero Content */}
            <div className="max-w-4xl">
              <motion.h1
                className="mb-6 text-6xl leading-tight text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Your Work OS.
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-orange-400 to-rose-400">
                  One Place, Infinite Flow.
                </span>
              </motion.h1>
              <motion.p
                className="mb-10 text-xl text-slate-200 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Stop switching tabs. Caldera merges your editor, tasks, chat,
                and whiteboard into a single, high-performance desktop
                workspace—designed to keep teams in flow.
              </motion.p>
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.button
                  className="px-8 py-4 bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-lg transition-colors flex items-center gap-2 shadow-xl shadow-amber-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/auth")}
                >
                  Start Free Trial
                  <BiChevronRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="px-8 py-4 bg-slate-900/50 hover:bg-slate-900/70 backdrop-blur-sm text-white rounded-lg transition-colors border border-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Watch Demo
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Decorative gradient orbs */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-amber-500/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.35, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </header>

        {/* Four Pillars Section */}
        <section className="px-8 py-20 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-4 text-white">The Four Pillars</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Four powerful tools, perfectly integrated. Move seamlessly from
                brainstorm to execution without ever leaving your workspace.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* The Forge */}
              <motion.div
                className="group p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 hover:bg-white hover:shadow-xl hover:shadow-orange-500/20 transition-all"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className="w-14 h-14 bg-linear-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <FiEdit3 className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="mb-3 text-slate-900">The Forge</h3>
                <p className="text-slate-600 mb-4">
                  Rich-text editor for final documentation, reports, and
                  scripts. Features version history to rewind changes and
                  templates for quick starts.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-orange-100 border border-orange-200 rounded-full text-sm text-orange-800">
                    Version History
                  </span>
                  <span className="px-3 py-1 bg-orange-100 border border-orange-200 rounded-full text-sm text-orange-800">
                    Templates
                  </span>
                </div>
              </motion.div>

              {/* The Nexus */}
              <motion.div
                className="group p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 hover:bg-white hover:shadow-xl hover:shadow-teal-500/20 transition-all"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className="w-14 h-14 bg-linear-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-teal-500/30"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <BiCheckSquare className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="mb-3 text-slate-900">The Nexus</h3>
                <p className="text-slate-600 mb-4">
                  Professional project management with Kanban boards and
                  timelines along with efficient team or personal assignment
                  systems. Links directly to the editor so tasks can be born
                  from documents.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-teal-100 border border-teal-200 rounded-full text-sm text-teal-800">
                    Kanban Boards
                  </span>
                  <span className="px-3 py-1 bg-teal-100 border border-teal-200 rounded-full text-sm text-teal-800">
                    Timelines
                  </span>
                </div>
              </motion.div>

              {/* The Hearth */}
              <motion.div
                className="group p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 hover:bg-white hover:shadow-xl hover:shadow-rose-500/20 transition-all"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className="w-14 h-14 bg-linear-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-rose-500/30"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <BiMessageSquare className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="mb-3 text-slate-900">The Hearth</h3>
                <p className="text-slate-600 mb-4">
                  Real-time communication hub with channels and threads. Lives
                  as a persistent sidebar—your team is always one click away.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-rose-100 border border-rose-200 rounded-full text-sm text-rose-800">
                    Channels
                  </span>
                  <span className="px-3 py-1 bg-rose-100 border border-rose-200 rounded-full text-sm text-rose-800">
                    Threads
                  </span>
                </div>
              </motion.div>

              {/* The Strata */}
              <motion.div
                className="group p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 hover:bg-white hover:shadow-xl hover:shadow-emerald-500/20 transition-all"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className="w-14 h-14 bg-linear-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <FiPenTool className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="mb-3 text-slate-900">The Strata</h3>
                <p className="text-slate-600 mb-4">
                  Infinite 2D space for visual brainstorming, flowcharts, and
                  wireframes. Export ideas directly into the word editor to
                  solidify them.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-emerald-100 border border-emerald-200 rounded-full text-sm text-emerald-800">
                    Infinite Strata
                  </span>
                  <span className="px-3 py-1 bg-emerald-100 border border-emerald-200 rounded-full text-sm text-emerald-800">
                    Export to Docs
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Power Features Section */}
        <section className="px-8 py-20 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-4 text-white">Built for Performance</h2>
              <p className="text-slate-200 max-w-2xl mx-auto">
                Desktop-first features that make work feel effortless
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="p-6 bg-slate-900/60 backdrop-blur-md rounded-xl border border-white/10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <BiSearch className="w-10 h-10 mb-4 text-amber-400" />
                <h4 className="mb-2 text-white">Global Search (Ctrl+K)</h4>
                <p className="text-sm text-slate-300">
                  Command palette that searches across all docs, tasks, chat,
                  and files. Execute actions instantly.
                </p>
              </motion.div>

              <motion.div
                className="p-6 bg-slate-900/60 backdrop-blur-md rounded-xl border border-white/10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <FiActivity className="w-10 h-10 mb-4 text-orange-400" />
                <h4 className="mb-2 text-white">Project Dashboard</h4>
                <p className="text-sm text-slate-300">
                  Glassmorphic HUD with 3D Activity Heatmap ("The Pulse")
                  showing where your team's energy flows.
                </p>
              </motion.div>

              <motion.div
                className="p-6 bg-slate-900/60 backdrop-blur-md rounded-xl border border-white/10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <LuFolderKanban className="w-10 h-10 mb-4 text-rose-400" />
                <h4 className="mb-2 text-white">The Vault</h4>
                <p className="text-sm text-slate-300">
                  Resource library storing all PDFs, images, and assets.
                  Instantly accessible across all pillars.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="px-8 py-20 relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="p-12 bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-2xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-start gap-8">
                <div className="flex-1">
                  <h2 className="mb-4 text-slate-900">The Power Stack</h2>
                  <p className="text-slate-700 mb-6">
                    Built with cutting-edge, open-source technology. Fast,
                    reliable, and completely free to start.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">
                        Frontend
                      </div>
                      <div className="text-slate-900">React + Vercel</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Backend</div>
                      <div className="text-slate-900">Node.js + WebSockets</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">
                        Database
                      </div>
                      <div className="text-slate-900">MongoDB + Supabase</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Hosting</div>
                      <div className="text-slate-900">Render (Free Tier)</div>
                    </div>
                  </div>
                </div>
                <div className="shrink-0">
                  <div className="w-32 h-32 bg-linear-to-br from-amber-500/20 to-orange-500/20 rounded-2xl border border-amber-200 flex items-center justify-center">
                    <BiUser className="w-16 h-16 text-amber-600" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-8 py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="mb-6 text-5xl text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              Work Like Software,
              <br />
              Not a Website.
            </motion.h2>
            <motion.p
              className="mb-10 text-xl text-slate-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Desktop-first. Flow-optimized. Built for teams who refuse to
              compromise.
            </motion.p>
            <motion.div
              className="flex gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.button
                className="px-10 py-5 bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-lg transition-all shadow-xl shadow-amber-500/40"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/auth")}
              >
                Start Your Free Trial
              </motion.button>
              <motion.button
                className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg transition-colors border border-white/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Demo
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 py-12 border-t border-white/10">
          <motion.div
            className="max-w-7xl mx-auto flex justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <img
                src="/icon-caldera.png"
                className="h-10 w-10 rounded-full border border-black"
              />
              <span className="text-sm text-slate-950">
                © 2026 Caldera. Desktop-first Work OS.
              </span>
            </div>
            <div className="flex gap-6 text-sm text-slate-950">
              <a href="#" className="hover:text-black/90 transition-colors">
                Features
              </a>
              <a href="#" className="hover:text-black/90 transition-colors">
                Pricing
              </a>
              <a href="#" className="hover:text-black/90 transition-colors">
                Docs
              </a>
              <a href="#" className="hover:text-black/90 transition-colors">
                Contact
              </a>
            </div>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
