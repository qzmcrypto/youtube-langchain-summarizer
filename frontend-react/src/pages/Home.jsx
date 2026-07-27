import { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  FileText,
  BrainCircuit,
  Layers,
  CheckCircle2,
  Clock,
  CalendarCheck,
} from "lucide-react";

import GradientBackground from "../components/GradientBackground";
import AIOrb from "../components/AIOrb";
import FloatingCard from "../components/FloatingCard";
import StorySection from "../components/StorySection";

const floatingCards = [
  {
    icon: FileText,
    title: "Lecture Summary Generated",
    text: "Concise, structured summary ready",
    className: "absolute z-10 top-0 left-[2%] lg:left-[4%] xl:left-[6%]",
    floatDuration: 5,
    floatDelay: 0,
    floatY: 8,
    floatX: 5,
  },
  {
    icon: BrainCircuit,
    title: "Key Concepts Extracted",
    text: "12 core concepts identified",
    className: "absolute z-10 top-1/2 -translate-y-1/2 left-0",
    floatDuration: 6.4,
    floatDelay: 0.6,
    floatY: 10,
    floatX: -7,
  },
  {
    icon: Layers,
    title: "Flashcards Ready",
    text: "24 cards generated for revision",
    className: "absolute z-10 bottom-0 left-[2%] lg:left-[4%] xl:left-[6%]",
    floatDuration: 4.6,
    floatDelay: 1.1,
    floatY: 7,
    floatX: 5,
  },
  {
    icon: Sparkles,
    title: "Quiz Created",
    text: "10 question adaptive quiz",
    className: "absolute z-10 top-0 right-[2%] lg:right-[4%] xl:right-[6%]",
    floatDuration: 5.8,
    floatDelay: 0.3,
    floatY: 9,
    floatX: -6,
  },
  {
    icon: CheckCircle2,
    title: "Action Items Extracted",
    text: "Next steps ready",
    className: "absolute z-10 top-1/2 -translate-y-1/2 right-0",
    floatDuration: 4.9,
    floatDelay: 0.85,
    floatY: 6,
    floatX: 6,
  },
  {
    icon: Clock,
    title: "Smart Timestamps",
    text: "Jump to key topics",
    className: "absolute z-10 bottom-0 right-[2%] lg:right-[4%] xl:right-[6%]",
    floatDuration: 6.6,
    floatDelay: 1.35,
    floatY: 11,
    floatX: -5,
  },
  {
    icon: CalendarCheck,
    title: "Study Plan Generated",
    text: "Optimized for revision",
    className: "absolute z-10 top-0 left-1/2 -translate-x-1/2",
    floatDuration: 5.3,
    floatDelay: 1.6,
    floatY: 8,
    floatX: 6,
  },
];

function Home() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="relative min-h-screen text-white overflow-x-hidden"
    >
      <GradientBackground />

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 xl:px-16 pt-24 pb-8 md:h-[100dvh] md:min-h-[640px] md:max-h-[980px] flex flex-col items-center justify-center text-center gap-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl"
        >
          <span className="text-white">LectureLens</span>{" "}
          <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
            AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-xl md:text-2xl text-white/70"
        >
          Every lecture,{" "}
          <span className="bg-gradient-to-r from-violet-300 via-fuchsia-200 to-indigo-300 bg-clip-text text-transparent italic">
            understood.
          </span>
        </motion.p>

        {/* Orb + floating AI output cards */}
        <div className="relative w-full max-w-6xl xl:max-w-7xl h-72 md:h-[min(56vh,480px)] lg:h-[min(58vh,540px)] xl:h-[min(60vh,600px)] 2xl:h-[min(60vh,640px)] mx-auto flex items-center justify-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.2, delayChildren: 0.4 } } }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <div className="relative z-20 scale-[0.8] md:scale-90 lg:scale-100">
              <AIOrb />
            </div>
            {floatingCards.map((card) => (
              <FloatingCard key={card.title} {...card} />
            ))}
          </motion.div>
        </div>
      </section>

      <StorySection
        fileInputRef={fileInputRef}
        onUpload={() => fileInputRef.current?.click()}
        onPasteLink={() => navigate("/workspace")}
      />
    </motion.div>
  );
}

export default Home;
