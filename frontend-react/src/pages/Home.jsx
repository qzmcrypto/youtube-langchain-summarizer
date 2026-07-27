import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, FileText, BrainCircuit, Layers, Upload } from "lucide-react";

import Button from "../components/Button";
import GradientBackground from "../components/GradientBackground";
import AIOrb from "../components/AIOrb";
import FloatingCard from "../components/FloatingCard";
import StorySection from "../components/StorySection";

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
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <GradientBackground />

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-32 pb-16 min-h-screen flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-serif text-5xl md:text-7xl leading-[1.05] tracking-tight max-w-4xl"
        >
          <span className="text-white">LectureLens</span>{" "}
          <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
            AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-4 font-serif text-xl md:text-2xl text-white/70"
        >
          Every lecture,{" "}
          <span className="bg-gradient-to-r from-violet-300 via-fuchsia-200 to-indigo-300 bg-clip-text text-transparent italic">
            understood.
          </span>
        </motion.p>

        {/* Orb + floating AI output cards */}
        <div className="relative mt-10 flex items-center justify-center w-full max-w-2xl h-96 md:h-[440px]">
          <AIOrb />
          {floatingCards.map((card) => (
            <FloatingCard key={card.title} {...card} />
          ))}
        </div>

        {/* Workflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button variant="primary" onClick={() => navigate("/workspace")}>
            <Upload size={16} />
            Upload Lecture
          </Button>
          <Button variant="secondary" onClick={() => navigate("/workspace")}>
            Start Working
          </Button>
        </motion.div>
      </section>

      <StorySection />
    </div>
  );
}

export default Home;
