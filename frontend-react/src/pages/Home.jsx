import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, FileText, BrainCircuit, Layers, ArrowRight } from "lucide-react";

import Button from "../components/Button";
import GradientBackground from "../components/GradientBackground";
import AIOrb from "../components/AIOrb";
import FloatingCard from "../components/FloatingCard";
import StorySection from "../components/StorySection";
import ComingSoonModal from "../components/ComingSoonModal";

const floatingCards = [
  {
    icon: FileText,
    title: "Lecture Summary Generated",
    text: "Concise, structured summary ready",
    className: "top-4 -left-4 md:-left-20",
    delay: 0.7,
    floatDuration: 5,
  },
  {
    icon: BrainCircuit,
    title: "Key Concepts Extracted",
    text: "12 core concepts identified",
    className: "top-1/2 -right-4 md:-right-24 -translate-y-1/2",
    delay: 1,
    floatDuration: 6,
  },
  {
    icon: Layers,
    title: "Flashcards Ready",
    text: "24 cards generated for revision",
    className: "bottom-2 -left-2 md:-left-28",
    delay: 1.3,
    floatDuration: 4.5,
  },
  {
    icon: Sparkles,
    title: "Quiz Created",
    text: "10 question adaptive quiz",
    className: "bottom-8 -right-2 md:-right-16",
    delay: 1.6,
    floatDuration: 5.5,
  },
];

function Home() {
  const [aiLearningOpen, setAiLearningOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <GradientBackground />

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-40 pb-24 min-h-screen flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/10 text-xs tracking-wide text-violet-200"
        >
          <Sparkles size={14} />
          Smarter lecture notes, automatically
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 font-serif text-5xl md:text-7xl leading-[1.05] tracking-tight max-w-4xl"
        >
          Every lecture,{" "}
          <span className="bg-gradient-to-r from-violet-300 via-fuchsia-200 to-indigo-300 bg-clip-text text-transparent italic">
            understood.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-xl text-base md:text-lg text-white/50"
        >
          Turn every lecture into notes, flashcards, and revision material —
          the moment it ends.
        </motion.p>

        {/* Orb + floating AI output cards */}
        <div className="relative mt-16 flex items-center justify-center w-full max-w-2xl h-96 md:h-[440px]">
          <AIOrb />
          {floatingCards.map((card) => (
            <FloatingCard key={card.title} {...card} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button variant="primary" className="group">
            Analyze Lecture
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button variant="secondary" onClick={() => setAiLearningOpen(true)}>
            Explore AI Learning
          </Button>
        </motion.div>
      </section>

      <StorySection />

      <ComingSoonModal open={aiLearningOpen} onClose={() => setAiLearningOpen(false)} />
    </div>
  );
}

export default Home;
