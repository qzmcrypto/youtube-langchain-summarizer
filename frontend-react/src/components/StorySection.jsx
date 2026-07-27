import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  BrainCircuit,
  Sparkles,
  FileText,
  Layers,
  HelpCircle,
  Upload,
} from "lucide-react";

import GlassPanel from "./GlassPanel";
import VoiceWave from "./VoiceWave";
import Button from "./Button";

const stages = [
  {
    key: "capture",
    number: "01",
    title: "Capture",
    description:
      "Every word is captured in real time — no note-taking required.",
    icon: Mic,
  },
  {
    key: "understand",
    number: "02",
    title: "Understand",
    description:
      "As the lecture unfolds, key ideas and structure come into focus — automatically.",
    icon: BrainCircuit,
  },
  {
    key: "transform",
    number: "03",
    title: "Transform",
    description:
      "It all becomes notes, flashcards, and revision material — ready the moment class ends.",
    icon: Sparkles,
  },
];

function CaptureVisual() {
  return (
    <div className="flex flex-col items-center gap-8">
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-[0_0_40px_-8px_rgba(139,92,246,0.6)]"
      >
        <Mic size={30} className="text-violet-200" />
      </motion.div>
      <VoiceWave barCount={28} size="lg" />
      <p className="text-xs text-white/40 tracking-wide">Listening to lecture audio…</p>
    </div>
  );
}

const NODES = [
  { x: -70, y: -50 },
  { x: 70, y: -60 },
  { x: -90, y: 30 },
  { x: 90, y: 40 },
  { x: 0, y: -95 },
  { x: 0, y: 80 },
];

function UnderstandVisual() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-10">
      <div className="relative w-56 h-56 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-violet-400/20"
        />
        <div className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-300/30 backdrop-blur-xl flex items-center justify-center">
          <BrainCircuit size={26} className="text-violet-200" />
        </div>
        {NODES.map((n, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
            className="absolute w-3 h-3 rounded-full bg-violet-300 shadow-[0_0_10px_2px_rgba(196,181,253,0.6)]"
            style={{ left: `calc(50% + ${n.x}px)`, top: `calc(50% + ${n.y}px)` }}
          />
        ))}
      </div>

      <div className="w-3/4 space-y-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
            className="h-2 rounded-full bg-white/10 mx-auto"
            style={{ width: `${80 - i * 15}%` }}
          />
        ))}
      </div>
    </div>
  );
}

const OUTPUTS = [
  { icon: FileText, label: "Notes" },
  { icon: Layers, label: "Flashcards" },
  { icon: HelpCircle, label: "Quiz" },
  { icon: Sparkles, label: "Revision" },
];

function TransformVisual() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
      {OUTPUTS.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-4 flex flex-col items-center gap-2 text-center"
          >
            <Icon size={20} className="text-violet-300" />
            <span className="text-xs text-white/70">{item.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

const VISUALS = {
  capture: CaptureVisual,
  understand: UnderstandVisual,
  transform: TransformVisual,
};

function StorySection({ fileInputRef, onUpload, onPasteLink }) {
  const [active, setActive] = useState(0);
  const stage = stages[active];
  const Visual = VISUALS[stage.key];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-violet-300/70">How it works</span>
        <h2 className="mt-4 font-serif text-4xl md:text-5xl text-white">
          How a lecture becomes knowledge.
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
        {/* stepper */}
        <div className="flex flex-col gap-4">
          {stages.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === active;
            return (
              <button
                key={s.key}
                onClick={() => setActive(i)}
                className={`text-left rounded-2xl border p-6 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-violet-400/40 bg-white/[0.06]"
                    : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`font-serif text-2xl ${isActive ? "text-violet-300" : "text-white/30"}`}>
                    {s.number}
                  </span>
                  <h3 className={`text-lg font-medium ${isActive ? "text-white" : "text-white/70"}`}>
                    {s.title}
                  </h3>
                  <Icon size={18} className={`ml-auto ${isActive ? "text-violet-300" : "text-white/30"}`} />
                </div>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="text-sm text-white/50 overflow-hidden"
                    >
                      {s.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* visual stage */}
        <GlassPanel className="h-[420px] flex items-center justify-center p-8" hover={false}>
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.key}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex items-center justify-center"
            >
              <Visual />
            </motion.div>
          </AnimatePresence>
        </GlassPanel>
      </div>

      <div className="w-full flex justify-center items-center gap-6 mt-16 mb-8">
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*,audio/*"
          className="hidden"
        />
        <Button variant="primary" onClick={onUpload}>
          <Upload size={16} />
          Upload Lecture
        </Button>
        <Button variant="secondary" onClick={onPasteLink}>
          Paste YouTube Link
        </Button>
      </div>
    </section>
  );
}

export default StorySection;
