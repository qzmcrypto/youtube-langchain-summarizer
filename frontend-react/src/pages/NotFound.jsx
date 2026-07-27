import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";

import GradientBackground from "../components/GradientBackground";
import GlassPanel from "../components/GlassPanel";
import Button from "../components/Button";
import { PAGE_TRANSITION } from "../lib/motion";

function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div
      {...PAGE_TRANSITION}
      className="relative min-h-screen text-white overflow-x-hidden"
    >
      <GradientBackground />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-24">
        <GlassPanel
          className="max-w-md w-full p-10 flex flex-col items-center text-center gap-4"
          hover={false}
        >
          <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <Compass size={24} className="text-violet-300" />
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-violet-300/70">404</span>
          <h1 className="font-serif text-2xl text-white">This page went off-topic.</h1>
          <p className="text-sm text-white/50 leading-relaxed">
            We couldn't find what you were looking for. Let's get you back to
            something LectureLens AI actually understands.
          </p>
          <Button variant="primary" onClick={() => navigate("/")} className="mt-2">
            Back to Home
          </Button>
        </GlassPanel>
      </div>
    </motion.div>
  );
}

export default NotFound;
