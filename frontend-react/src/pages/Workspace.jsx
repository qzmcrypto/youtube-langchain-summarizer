import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link2, ArrowRight, FileText } from "lucide-react";

import GradientBackground from "../components/GradientBackground";
import GlassPanel from "../components/GlassPanel";
import Button from "../components/Button";

function Workspace() {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    navigate("/summary");
  };

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <GradientBackground />

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pt-40 pb-24"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-violet-300/70">
          Workspace
        </span>
        <h1 className="mt-4 font-serif text-4xl md:text-5xl text-white">
          Bring a lecture in.
        </h1>
        <p className="mt-4 max-w-xl text-white/50">
          Paste a YouTube lecture link and LectureLens AI will take it from there.
        </p>

        <GlassPanel className="mt-10 p-8" hover={false} glow={false}>
          <form
            onSubmit={handleAnalyze}
            className="flex flex-col sm:flex-row items-stretch gap-3"
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus-within:border-violet-400/40 transition-colors">
              <Link2 size={18} className="text-white/40 flex-shrink-0" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste a YouTube lecture URL"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
              />
            </div>
            <Button type="submit" variant="primary">
              Analyze
              <ArrowRight size={16} />
            </Button>
          </form>
        </GlassPanel>

        <div className="mt-16">
          <h2 className="text-sm uppercase tracking-[0.2em] text-white/40">
            Recent lectures
          </h2>

          <GlassPanel
            className="mt-6 p-10 flex flex-col items-center text-center gap-3"
            hover={false}
          >
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <FileText size={20} className="text-white/40" />
            </div>
            <p className="text-sm text-white/40">
              Nothing here yet — analyze your first lecture to see it appear.
            </p>
          </GlassPanel>
        </div>
      </motion.section>
    </div>
  );
}

export default Workspace;
