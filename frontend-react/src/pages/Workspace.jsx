import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Link2,
  ArrowRight,
  FileText,
  Loader2,
  AlertCircle,
  Sparkles,
  ListChecks,
  PlayCircle,
} from "lucide-react";

import GradientBackground from "../components/GradientBackground";
import GlassPanel from "../components/GlassPanel";
import Button from "../components/Button";
import AnalyzeOverlay from "../components/AnalyzeOverlay";
import { analyzeVideo } from "../lib/api";
import { getRecentLectures, saveRecentLecture } from "../lib/recentLectures";
import { PAGE_TRANSITION } from "../lib/motion";

const YOUTUBE_URL_REGEX =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/|embed\/)|youtu\.be\/)[\w-]+/i;

const AI_TIPS = [
  "Works best with lectures that have clear spoken audio.",
  "Videos with existing captions are analyzed most accurately.",
  "Longer lectures may take a little longer to process.",
];

const QUICK_GUIDE_STEPS = [
  "Paste a YouTube lecture link on the left.",
  "Hit Analyze and let the AI listen and read.",
  "Get a structured summary with key takeaways and action items.",
];

const SAMPLE_LECTURES = [
  { label: "MIT — Intro to Algorithms", url: "https://www.youtube.com/watch?v=HtSuA80QTyo" },
  { label: "Stanford — CS229 Lecture 1", url: "https://www.youtube.com/watch?v=jGwO_UgTS7I" },
];

function Workspace() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // Workspace fully remounts on every navigation (App keys routes by
  // pathname), so a plain read on mount is enough to stay fresh — no need
  // for reactive state here.
  const recentLectures = getRecentLectures();

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!url.trim() || isAnalyzing) return;

    if (!YOUTUBE_URL_REGEX.test(url.trim())) {
      setError("Please enter a valid YouTube video URL.");
      return;
    }

    setError("");
    setIsAnalyzing(true);

    try {
      const data = await analyzeVideo(url.trim());
      saveRecentLecture({ videoUrl: url.trim(), summaryData: data });
      navigate("/summary", { state: { summaryData: data, videoUrl: url.trim() } });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const openRecentLecture = (entry) => {
    navigate("/summary", { state: { summaryData: entry.summaryData, videoUrl: entry.videoUrl } });
  };

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <GradientBackground />
      <AnalyzeOverlay active={isAnalyzing} />

      <motion.section
        {...PAGE_TRANSITION}
        className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-40 pb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7">
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
                  <label htmlFor="lecture-url" className="sr-only">
                    YouTube lecture URL
                  </label>
                  <input
                    id="lecture-url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste a YouTube lecture URL"
                    disabled={isAnalyzing}
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/30 outline-none disabled:opacity-50"
                  />
                </div>
                <Button type="submit" variant="primary" disabled={isAnalyzing}>
                  <AnimatePresence mode="wait" initial={false}>
                    {isAnalyzing ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                          className="flex"
                        >
                          <Loader2 size={16} />
                        </motion.span>
                        Analyzing...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        Analyze
                        <ArrowRight size={16} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </form>

              <AnimatePresence>
                {error && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-400/20 text-red-300 text-sm overflow-hidden"
                  >
                    <AlertCircle size={16} className="flex-shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassPanel>

            <div className="mt-16">
              <h2 className="text-sm uppercase tracking-[0.2em] text-white/40">
                Recent lectures
              </h2>

              {recentLectures.length ? (
                <ul className="mt-6 space-y-3">
                  {recentLectures.map((entry) => (
                    <li key={entry.videoUrl}>
                      <button
                        type="button"
                        onClick={() => openRecentLecture(entry)}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl text-left hover:bg-white/[0.07] hover:border-violet-400/30 transition-colors"
                      >
                        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                          {entry.thumbnail ? (
                            <img
                              src={entry.thumbnail}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FileText size={18} className="text-white/40" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-white/85 font-medium truncate">
                            {entry.title}
                          </p>
                          {entry.channel && (
                            <p className="text-xs text-white/40 truncate">{entry.channel}</p>
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
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
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <GlassPanel className="p-6 lg:sticky lg:top-28" hover={false}>
              <div className="flex items-center gap-2 text-violet-300/80">
                <Sparkles size={16} />
                <h3 className="text-xs uppercase tracking-[0.2em]">AI Tips</h3>
              </div>
              <ul className="mt-4 space-y-3">
                {AI_TIPS.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/60 leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/70 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>

              <div className="my-6 h-px bg-white/10" />

              <div className="flex items-center gap-2 text-violet-300/80">
                <ListChecks size={16} />
                <h3 className="text-xs uppercase tracking-[0.2em]">Quick Guide</h3>
              </div>
              <ol className="mt-4 space-y-3">
                {QUICK_GUIDE_STEPS.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white/5 border border-white/10 text-[11px] flex items-center justify-center text-white/50">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>

              <div className="my-6 h-px bg-white/10" />

              <div className="flex items-center gap-2 text-violet-300/80">
                <PlayCircle size={16} />
                <h3 className="text-xs uppercase tracking-[0.2em]">Try a Sample</h3>
              </div>
              <ul className="mt-4 space-y-2">
                {SAMPLE_LECTURES.map((sample) => (
                  <li key={sample.url}>
                    <button
                      type="button"
                      onClick={() => setUrl(sample.url)}
                      disabled={isAnalyzing}
                      className="w-full text-left px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white/60 hover:text-white hover:border-violet-400/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sample.label}
                    </button>
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Workspace;
