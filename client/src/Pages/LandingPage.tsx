import { useState, useEffect } from "react";
import {
  BiCheckSquare,
  BiLock,
  BiMessageSquare,
  BiTerminal,
} from "react-icons/bi";
import { CiDatabase } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { FiEdit3, FiLayers, FiMoon, FiSun, FiZap } from "react-icons/fi";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import Documentaion from "./Documentaion";

// Landing Page Component
const LandingPage = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("theme");
    return stored ? stored === "dark" : true; // Default to dark for "OS" feel
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const pillars = [
    {
      icon: FiEdit3,
      label: "TEXT_O",
      subtitle: "The Forge",
      description:
        "High-density document and sheet editor. Engineered for deep work.",
      features: [
        "Rich text processing",
        "Spreadsheet engine",
        "Offline-first sync",
      ],
    },
    {
      icon: BiCheckSquare,
      label: "FLOW_O",
      subtitle: "Sequence Engine",
      description:
        "Vertical timeline task manager with productivity analytics.",
      features: [
        "Timeline visualization",
        "Performance sparklines",
        "Intelligent scheduling",
      ],
    },
    {
      icon: BiMessageSquare,
      label: "ECHO_O",
      subtitle: "The Hearth",
      description:
        "Real-time team communication hub with contextual threading.",
      features: ["Instant messaging", "Theme customization", "Channel routing"],
    },
    {
      icon: FiLayers,
      label: "AXIS_O",
      subtitle: "Infinite Plane",
      description: "Boundless 2D whiteboard for spatial thinking and mapping.",
      features: [
        "Infinite canvas",
        "Node-based system",
        "Spatial organization",
      ],
    },
  ];

  const coreFeatures = [
    {
      icon: BiLock,
      label: "Privacy First",
      desc: "Your data is never locked in our servers",
    },
    {
      icon: CiDatabase,
      label: "Local Storage",
      desc: "SQLite-powered local database",
    },
    {
      icon: FiZap,
      label: "Zero Latency",
      desc: "Instant response, no network delays",
    },
    {
      icon: BiTerminal,
      label: "API Access",
      desc: "Full programmatic control",
    },
  ];

  const navigate = useNavigate();

  const [show, setShow] = useState<boolean>(false);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 overflow-y-auto selection:bg-blue-500/30 ${isDark ? "dark bg-[#0a0a0a] text-white" : "bg-slate-50 text-slate-950"}`}
    >
      {/* --- HUD / NAVIGATION --- */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`w-12 h-12 border rounded-xl flex items-center justify-center transition-all ${isDark ? "bg-white/5 border-white/10 hover:border-blue-500" : "bg-black/5 border-black/10 hover:border-blue-600"}`}
        >
          {isDark ? (
            <FiSun className="text-yellow-400 w-5 h-5" />
          ) : (
            <FiMoon className="text-blue-600 w-5 h-5" />
          )}
        </button>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div
            className={`absolute top-1/2 left-0 w-full h-px ${isDark ? "bg-blue-500" : "bg-blue-600"}`}
          />
          <div
            className={`absolute left-1/2 top-0 h-full w-px ${isDark ? "bg-blue-500" : "bg-blue-600"}`}
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-8 relative group"
          >
            <div
              className={`w-28 h-28 border-2 rounded-2xl mx-auto flex items-center justify-center p-2 transition-colors ${isDark ? "border-white/10 group-hover:border-blue-500" : "border-black/10 group-hover:border-blue-600"}`}
            >
              <div
                className="w-full h-full rounded-lg bg-cover bg-center"
                style={{ backgroundImage: 'url("/icon-OXU_O.png")' }}
              />
            </div>
          </motion.div>

          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6">
            OXU_O
          </h1>
          <p
            className={`text-xl md:text-2xl max-w-2xl mx-auto mb-12 font-light ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            A high-performance productivity shell engineered for deep work.{" "}
            <br />
            <span className={isDark ? "text-blue-400" : "text-blue-600"}>
              Minimum cloud dependency. Absolute control.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/auth")}
              className={`px-10 py-4 rounded-lg font-bold flex items-center gap-3 transition-all ${isDark ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]" : "bg-black hover:bg-gray-800 text-white"}`}
            >
              Enter System <FaArrowRight />
            </button>
            <button
              onClick={() => setShow(true)}
              className={`px-10 py-4 border rounded-lg font-mono text-sm transition-all ${isDark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"}`}
            >
              Documentation
            </button>
          </div>
        </div>
      </section>

      {/* --- THE PILLARS --- */}
      <section
        className={`py-24 px-8 border-y transition-colors ${isDark ? "border-white/5 bg-white/2" : "border-black/5 bg-black/2"}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div
              className={`font-mono text-xs mb-4 tracking-[0.3em] uppercase ${isDark ? "text-blue-400" : "text-blue-600"}`}
            >
              The _O Suite
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Four Pillars. One System.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className={`p-10 border rounded-2xl transition-all group relative overflow-hidden ${isDark ? "bg-black border-white/5 hover:border-blue-500/50" : "bg-white border-black/5 hover:border-blue-600/50"}`}
              >
                <div
                  className={`w-14 h-14 border rounded-lg flex items-center justify-center mb-6 transition-colors ${isDark ? "border-white/10 text-blue-400" : "border-black/10 text-blue-600"}`}
                >
                  <pillar.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{pillar.label}</h3>
                <div className="font-mono text-[10px] opacity-40 uppercase tracking-widest mb-4">
                  {pillar.subtitle}
                </div>
                <p
                  className={`mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  {pillar.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {pillar.features.map((f) => (
                    <span
                      key={f}
                      className={`text-[10px] font-mono px-2 py-1 rounded border ${isDark ? "border-white/5 bg-white/5" : "border-black/5 bg-black/5"}`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ARCHITECTURE --- */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">
                Engineered for Sovereignty
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {coreFeatures.map((f) => (
                  <div
                    key={f.label}
                    className={`p-6 border rounded-xl ${isDark ? "border-white/2" : "border-black/5 bg-black/2"}`}
                  >
                    <f.icon className="mb-3 text-blue-500" size={24} />
                    <div className="font-bold text-sm mb-1">{f.label}</div>
                    <div className="text-xs opacity-50">{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`p-8 border rounded-2xl font-mono text-sm ${isDark ? "bg-black border-white/10" : "bg-white border-black/10"}`}
            >
              <div className="opacity-30 mb-4 tracking-tighter text-xs">
                SYSTEM_STACK_v1.0.log
              </div>
              <div className="space-y-2">
                <div className="text-blue-500">{">"} RUST_CORE: RUNNING</div>
                <div className="text-green-500">{">"} SQLITE_DB: ENCRYPTED</div>
                <div className="text-purple-500">
                  {">"} WASM_ENGINE: OPTIMIZED
                </div>
                <div className="opacity-50">
                  {">"} CLOUD_SYNC: DISABLED (LOCAL_ONLY)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA / FINAL ENCOURAGEMENT --- */}
      <section className="py-32 px-8 relative overflow-hidden">
        {/* Decorative glow behind the CTA */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 blur-[120px] rounded-full pointer-events-none ${isDark ? "bg-blue-500/10" : "bg-blue-600/5"}`}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border font-mono text-[10px] mb-8 ${isDark ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : "bg-blue-50 border-blue-200 text-blue-700"}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
              </span>
              DEPLOYMENT READY
            </div>

            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
              Your data. <br />
              <span className={isDark ? "text-blue-500" : "text-blue-600"}>
                Your rules.
              </span>
            </h2>

            <p
              className={`text-xl mb-12 max-w-xl mx-auto leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Your workflow shouldn't depend on a server status page.
              Zero-latency modules. Local encryption. Absolute sovereignty over
              your data.
            </p>

            <div className="flex flex-col items-center gap-6">
              <button
                onClick={() => navigate("/auth")}
                className={`group relative px-12 py-6 font-bold uppercase tracking-widest text-sm transition-all rounded-sm overflow-hidden ${isDark ? "bg-white text-black hover:bg-blue-500 hover:text-white" : "bg-black text-white hover:bg-blue-600"}`}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <div
                    className="size-10 border border-white rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: 'url("/icon-OXU_O.png")' }}
                  />{" "}
                  Initialize OXU_O{" "}
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                </span>
                {/* Animated scanline effect on hover */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
              </button>

              <div
                className={`font-mono text-[10px] opacity-40 uppercase tracking-widest`}
              >
                Available for: macOS • Windows • Linux (AppImage)
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {show && <Documentaion isDark={isDark} setShow={setShow} />}

      {/* --- FOOTER --- */}
      <footer
        className={`py-12 px-8 border-t ${isDark ? "border-white/5" : "border-black/5"}`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div
              className="size-8 rounded-lg bg-cover"
              style={{ backgroundImage: 'url("/icon-OXU_O.png")' }}
            />
            <span className="font-mono text-xs opacity-40">
              © 2026 OXU_O. OPEN SOURCE CORE.
            </span>
          </div>
          <div className="flex gap-8 font-mono text-xs opacity-40 uppercase tracking-widest">
            <a
              href="https://github.com/chandranshwk/OXU_O"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              GitHub
            </a>
            <a
              onClick={() => setShow(true)}
              className="hover:text-blue-500 transition-colors"
            >
              Docs
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
