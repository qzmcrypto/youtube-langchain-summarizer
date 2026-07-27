import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  FileText,
  BrainCircuit,
  Layers,
  CheckCircle2,
  Clock,
} from "lucide-react";

import GradientBackground from "../components/GradientBackground";
import AIOrb from "../components/AIOrb";
import FloatingCard from "../components/FloatingCard";
import MobileOutputGrid from "../components/MobileOutputGrid";
import OrbitField from "../components/OrbitField";
import StorySection from "../components/StorySection";
import { PAGE_TRANSITION, EASE_ENTRANCE } from "../lib/motion";

// Six cards arranged as mirrored pairs on an elliptical path around the orb.
// x/y are percentages of the orb stage — kept perfectly symmetric left/right
// and top/bottom so the composition reads as intentional, not scattered.
const floatingCards = [
  {
    icon: FileText,
    title: "Lecture Summary",
    text: "Concise, structured summary ready",
    anchor: { x: 24, y: 12 },
    floatDuration: 7.5,
    floatDelay: 0,
    floatY: 12,
    floatX: 5,
  },
  {
    icon: Sparkles,
    title: "Quiz",
    text: "10 question adaptive quiz",
    anchor: { x: 76, y: 12 },
    floatDuration: 6.6,
    floatDelay: 0.9,
    floatY: 10,
    floatX: -6,
  },
  {
    icon: BrainCircuit,
    title: "Key Concepts",
    text: "12 core concepts identified",
    anchor: { x: 7, y: 50 },
    floatDuration: 8.2,
    floatDelay: 1.7,
    floatY: 13,
    floatX: -7,
  },
  {
    icon: CheckCircle2,
    title: "Action Items",
    text: "Next steps ready",
    anchor: { x: 93, y: 50 },
    floatDuration: 7,
    floatDelay: 0.5,
    floatY: 11,
    floatX: 7,
  },
  {
    icon: Layers,
    title: "Flashcards",
    text: "24 cards generated for revision",
    anchor: { x: 24, y: 88 },
    floatDuration: 6.9,
    floatDelay: 2.2,
    floatY: 10,
    floatX: 6,
  },
  {
    icon: Clock,
    title: "Smart Timestamps",
    text: "Jump to key topics",
    anchor: { x: 76, y: 88 },
    floatDuration: 8.6,
    floatDelay: 1.3,
    floatY: 12,
    floatX: -5,
  },
];

const cardAnchors = floatingCards.map((card) => card.anchor);

function Home() {
  const navigate = useNavigate();

  return (
    <motion.div {...PAGE_TRANSITION} className="relative min-h-screen text-white overflow-x-hidden">
      <GradientBackground />

      {/* Hero */}
      {/* `items-center` (fit-content cross-axis sizing) is intentionally
          avoided here — it made children compute an ambiguous shrink-wrap
          width that overflowed the viewport on mobile (clipped the "AI" in
          the heading and the output-card grid). Children stretch to the
          section's full, well-defined width instead and center themselves
          internally via max-w-* + mx-auto / text-center. */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 xl:px-16 pt-28 pb-12 md:pt-24 md:pb-8 md:h-[100dvh] md:min-h-[640px] md:max-h-[980px] flex flex-col justify-center text-center gap-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_ENTRANCE }}
          className="mx-auto font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] md:leading-[1.05] tracking-tight max-w-4xl text-balance"
        >
          <span className="text-white">LectureLens</span>{" "}
          <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
            AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE_ENTRANCE }}
          className="font-serif text-lg sm:text-xl md:text-2xl text-white/70"
        >
          Every lecture,{" "}
          <span className="bg-gradient-to-r from-violet-300 via-fuchsia-200 to-indigo-300 bg-clip-text text-transparent italic">
            understood.
          </span>
        </motion.p>

        {/* Orb + floating AI output cards (desktop) */}
        <div className="relative w-full max-w-6xl xl:max-w-7xl h-64 sm:h-72 md:h-[min(56vh,480px)] lg:h-[min(58vh,540px)] xl:h-[min(60vh,600px)] 2xl:h-[min(60vh,640px)] mx-auto flex items-center justify-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.14, delayChildren: 0.6 } } }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <OrbitField anchors={cardAnchors} />
            <div className="relative z-20 scale-[0.7] sm:scale-[0.8] md:scale-90 lg:scale-100">
              <AIOrb />
            </div>
            {floatingCards.map((card) => (
              <FloatingCard key={card.title} {...card} />
            ))}
          </motion.div>
        </div>

        {/* Compact AI output summary (mobile only) — keeps the value prop visible
            below the orb instead of hiding it entirely on small screens. */}
        <MobileOutputGrid cards={floatingCards} />
      </section>

      <StorySection onPasteLink={() => navigate("/workspace")} />
    </motion.div>
  );
}

export default Home;
