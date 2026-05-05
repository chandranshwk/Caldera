import React, { useEffect } from "react";
import { FiPlus, FiLayers, FiCpu, FiCommand, FiActivity } from "react-icons/fi";

interface Props {
  isDark: boolean;
  setShow: (value: boolean) => void;
}

const Documentation: React.FC<Props> = ({ isDark, setShow }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className={`fixed inset-0 z-999 overflow-y-auto py-12 px-6 md:px-12 transition-all duration-500 ${isDark ? "bg-[#050505] text-white" : "bg-white text-black"}`}
    >
      {/* HEADER CONTROL */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-12 sticky -top-10 z-50 bg-inherit py-4 border-b border-border/10">
        <div className="flex items-center gap-4">
          <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
            {" "}
            O{" "}
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter uppercase">
              {" "}
              OXU_O / SYSTEM_MANIFEST{" "}
            </h1>
            <p className="text-[10px] font-mono opacity-40">
              {" "}
              STABLE_BUILD_2026 // KERNEL_V1.0.4 // LATENCY: 2ms{" "}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShow(false)}
          className={`p-3 rounded-xl border transition-all ${isDark ? "bg-white/5 border-white/10 hover:bg-red-500/20" : "bg-black/5 border-black/10 hover:bg-red-500/10"}`}
        >
          <FiPlus className="text-red-500 rotate-45" size={24} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
        {/* SIDEBAR NAVIGATION */}
        <aside className="hidden lg:block">
          <div className="sticky top-32 space-y-10">
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.3em] opacity-30 mb-6 uppercase">
                {" "}
                I. Core Engines{" "}
              </h4>
              <nav className="flex flex-col gap-3">
                {[
                  "The_Forge_Engine",
                  "Nexus_Sequence",
                  "Hearth_Bridge",
                  "Axis_Plane",
                ].map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="text-sm font-medium opacity-40 hover:opacity-100 hover:text-blue-500 text-left transition-all"
                  >
                    {id.replace(/_/g, " ")}
                  </button>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.3em] opacity-30 mb-6 uppercase">
                {" "}
                II. Architecture{" "}
              </h4>
              <nav className="flex flex-col gap-3">
                {[
                  "Project_Playgrounds",
                  "Tech_Stack_Deep_Dive",
                  "Command_Registry",
                ].map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="text-sm font-medium opacity-40 hover:opacity-100 hover:text-purple-500 text-left transition-all"
                  >
                    {id.replace(/_/g, " ")}
                  </button>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.3em] opacity-30 mb-6 uppercase">
                {" "}
                III. Kernel Specs{" "}
              </h4>
              <nav className="flex flex-col gap-3">
                {[
                  "Lazy_Sync_Logic",
                  "Sovereignty_Protocol",
                  "System_Health",
                ].map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="text-sm font-medium opacity-40 hover:opacity-100 hover:text-green-500 text-left transition-all"
                  >
                    {id.replace(/_/g, " ")}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* MAIN DOCUMENTATION CONTENT */}
        <main className="space-y-32 pb-32">
          {/* SECTION: PILLARS */}
          <section id="The_Forge_Engine" className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-6 text-blue-500">
              <FiLayers size={24} />
              <h2 className="text-3xl font-bold tracking-tight">
                {" "}
                The Four Pillars{" "}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`p-8 rounded-2xl border ${isDark ? "bg-white/2 border-white/10" : "bg-black/2 border-black/5"}`}
              >
                <h3 className="font-bold text-lg mb-4 text-blue-500">
                  {" "}
                  01. TEXT_O (The Forge){" "}
                </h3>
                <p className="text-sm opacity-70 leading-relaxed mb-6">
                  {" "}
                  Multi-dimensional data objects merging Word Processing and
                  Spreadsheets.{" "}
                </p>
                <ul className="text-xs space-y-2 opacity-50 font-mono">
                  <li>- Markdown & Rich-text interoperability</li>
                  <li>- Formula-driven sheet cells within text blocks</li>
                  <li>- Presentation mode: dynamic slide generation</li>
                </ul>
              </div>
              <div
                id="Nexus_Sequence"
                className={`p-8 rounded-2xl border ${isDark ? "bg-white/2 border-white/10" : "bg-black/2 border-black/5"}`}
              >
                <h3 className="font-bold text-lg mb-4 text-blue-500">
                  {" "}
                  02. FLOW_O (The Nexus){" "}
                </h3>
                <p className="text-sm opacity-70 leading-relaxed mb-6">
                  {" "}
                  Sequence Engine for "Horizontal Planning, Vertical
                  Execution."{" "}
                </p>
                <ul className="text-xs space-y-2 opacity-50 font-mono">
                  <li>- @dnd-kit powered bento timelines</li>
                  <li>- Velocity Sparklines: real-time analytics</li>
                  <li>- Smart-Buckets: Auto-querying tasks</li>
                </ul>
              </div>
              <div
                id="Hearth_Bridge"
                className={`p-8 rounded-2xl border ${isDark ? "bg-white/2 border-white/10" : "bg-black/2 border-black/5"}`}
              >
                <h3 className="font-bold text-lg mb-4 text-blue-500">
                  {" "}
                  03. ECHO_O (The Hearth){" "}
                </h3>
                <p className="text-sm opacity-70 leading-relaxed mb-6">
                  {" "}
                  Real-time communication bridge aggregating external social
                  feeds.{" "}
                </p>
                <ul className="text-xs space-y-2 opacity-50 font-mono">
                  <li>- CORS-bypass bridge for social aggregation</li>
                  <li>- Contextual threading tied to Vaults</li>
                  <li>- Zero-latency WebRTC integration</li>
                </ul>
              </div>
              <div
                id="Axis_Plane"
                className={`p-8 rounded-2xl border ${isDark ? "bg-white/2 border-white/10" : "bg-black/2 border-black/5"}`}
              >
                <h3 className="font-bold text-lg mb-4 text-blue-500">
                  {" "}
                  04. AXIS_O (Infinite Plane){" "}
                </h3>
                <p className="text-sm opacity-70 leading-relaxed mb-6">
                  {" "}
                  Boundless 2D whiteboard for spatial logic and visual
                  architecture.{" "}
                </p>
                <ul className="text-xs space-y-2 opacity-50 font-mono">
                  <li>- Node-based spatial organization</li>
                  <li>- GPU-accelerated infinite zoom/pan</li>
                  <li>- Collaborative multi-user drawing layer</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION: TECH STACK */}
          <section id="Tech_Stack_Deep_Dive" className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-6 text-purple-500">
              <FiCpu size={24} />
              <h2 className="text-3xl font-bold tracking-tight">
                {" "}
                Technical Architecture{" "}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Frontend",
                  items: [
                    "React 18",
                    "Tailwind CSS",
                    "Framer Motion",
                    "Zustand State Management",
                  ],
                },
                {
                  title: "Storage",
                  items: [
                    "IndexedDB (Local)",
                    "Redis (Session)",
                    "MongoDB (Snapshots)",
                    "Supabase (Auth)",
                  ],
                },
                {
                  title: "Protocols",
                  items: [
                    "WebRTC (Voice)",
                    "Socket.io (Sync)",
                    "AES-256 Encryption",
                    "Markdown-IT",
                  ],
                },
              ].map((stack) => (
                <div
                  key={stack.title}
                  className={`p-6 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"}`}
                >
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-4 opacity-50">
                    {stack.title}
                  </h4>
                  <ul className="space-y-2">
                    {stack.items.map((item) => (
                      <li key={item} className="text-sm font-mono">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: COMMAND REGISTRY */}
          <section id="Command_Registry" className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-6 text-yellow-500">
              <FiCommand size={24} />
              <h2 className="text-3xl font-bold tracking-tight">
                {" "}
                Command Registry{" "}
              </h2>
            </div>
            <div
              className={`overflow-hidden rounded-2xl border ${isDark ? "border-white/10 bg-white/1" : "border-black/10 bg-black/1"}`}
            >
              <table className="w-full text-left text-sm font-mono">
                <thead
                  className={`border-b ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}
                >
                  <tr>
                    <th className="p-4">Action</th>
                    <th className="p-4">Shortcut</th>
                    <th className="p-4">Scope</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { act: "Quick Search", key: "⌘ + K", scope: "Global" },
                    { act: "New Block", key: "/ slash", scope: "The Forge" },
                    { act: "Toggle Axis", key: "⌥ + A", scope: "Workspace" },
                    { act: "Sync Force", key: "⇧ + S", scope: "Kernel" },
                  ].map((cmd) => (
                    <tr
                      key={cmd.act}
                      className="hover:bg-white/2 transition-colors"
                    >
                      <td className="p-4 opacity-70">{cmd.act}</td>
                      <td className="p-4 text-yellow-500">{cmd.key}</td>
                      <td className="p-4 opacity-40">{cmd.scope}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION: SYSTEM HEALTH */}
          <section id="System_Health" className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-6 text-cyan-500">
              <FiActivity size={24} />
              <h2 className="text-3xl font-bold tracking-tight">
                {" "}
                Kernel Status{" "}
              </h2>
            </div>
            <div
              className={`p-8 rounded-3xl border ${isDark ? "bg-cyan-500/5 border-cyan-500/20" : "bg-cyan-50 border-cyan-200"}`}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-[10px] uppercase tracking-tighter opacity-50 mb-2">
                    Memory_Usage
                  </div>
                  <div className="text-2xl font-mono font-bold text-cyan-500">
                    42.4MB
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-tighter opacity-50 mb-2">
                    Sync_Status
                  </div>
                  <div className="text-2xl font-mono font-bold text-green-500">
                    NOMINAL
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-tighter opacity-50 mb-2">
                    Active_Nodes
                  </div>
                  <div className="text-2xl font-mono font-bold text-blue-500">
                    12
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-tighter opacity-50 mb-2">
                    Uptime
                  </div>
                  <div className="text-2xl font-mono font-bold">99.9%</div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: SOVEREIGNTY PROTOCOL */}
          <section id="Sovereignty_Protocol" className="scroll-mt-32">
            <div
              className={`p-12 rounded-3xl border-2 ${isDark ? "bg-orange-500/5 border-orange-500/20" : "bg-orange-50 border-orange-200"}`}
            >
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-6 text-orange-600">
                  {" "}
                  The Yearly Flush Protocol{" "}
                </h2>
                <p className="text-sm opacity-70 leading-relaxed mb-8">
                  OXU_O is built for sustainability. Cloud storage is not a
                  "Digital Attic." Every 365 days, all cloud snapshots are
                  cleared.
                  <strong> This is a feature, not a bug.</strong> <br />
                  <br />
                  Users receive a <strong>Recovery Manifest</strong> containing
                  a Re-upload Code. Restoration happens locally, ensuring no
                  shadow data persists on external servers.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div
                    className={`px-4 py-2 rounded-lg font-mono text-[10px] ${isDark ? "bg-black border border-white/10" : "bg-white border border-black/10 shadow-sm"}`}
                  >
                    RESTORE_CODE: OXU-2026-X99-PROT
                  </div>
                  <div className="px-4 py-2 rounded-lg font-mono text-[10px] bg-orange-600 text-white font-bold">
                    DATA_SOVEREIGNTY_VERIFIED
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </section>
  );
};

export default Documentation;
