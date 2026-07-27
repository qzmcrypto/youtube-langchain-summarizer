import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AIOrb from "./AIOrb";

const MESSAGES = [
  "Listening to your lecture...",
  "Extracting transcript...",
  "Understanding concepts...",
  "Generating structured notes...",
  "Almost ready...",
];

const STEP_DURATION = 2600;

function AnalyzeOverlay({ active }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) {
      setStep(0);
      return;
    }

    const interval = setInterval(() => {
      setStep((s) => Math.min(s + 1, MESSAGES.length - 1));
    }, STEP_DURATION);

    return () => clearInterval(interval);
  }, [active]);

  const progress = ((step + 1) / MESSAGES.length) * 100;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05050b]/95 backdrop-blur-2xl overflow-hidden"
        >
          <motion.div
            animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] rounded-full bg-violet-600/25 blur-[140px] will-change-transform"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="pointer-events-none absolute bottom-0 right-1/4 w-[30vw] h-[30vw] rounded-full bg-blue-600/20 blur-[130px] will-change-transform"
          />

          <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">
            <AIOrb />

            <div className="flex flex-col items-center gap-5">
              <AnimatePresence mode="wait">
                <motion.p
                  key={step}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-xl md:text-2xl text-white"
                >
                  {MESSAGES[step]}
                </motion.p>
              </AnimatePresence>

              <div className="w-64 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400 shadow-[0_0_14px_2px_rgba(139,92,246,0.6)]"
                />
              </div>

              <div className="flex items-center gap-1.5">
                {MESSAGES.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === step ? "w-6 bg-violet-400" : "w-1.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                Do not close this tab
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AnalyzeOverlay;
