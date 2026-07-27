import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { AudioLines } from "lucide-react";

import ComingSoonModal from "./ComingSoonModal";
import SoonBadge from "./SoonBadge";
import { EASE_ENTRANCE } from "../lib/motion";

const navItems = [{ name: "Home", path: "/" }];

function Navbar() {
  const [aiLearningOpen, setAiLearningOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_ENTRANCE }}
        className="fixed top-0 w-full z-50 flex justify-center px-4 pt-4 pb-3 backdrop-blur-md bg-gradient-to-b from-[#05050b]/60 to-transparent"
      >
        <nav className="flex items-center gap-1 md:gap-1.5 pl-3 pr-2 py-2 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-2xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]">
          <Link
            to="/"
            aria-label="LectureLens AI — home"
            className="flex items-center gap-2.5 pr-4 mr-1 border-r border-white/10"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-[0_0_20px_-4px_rgba(139,92,246,0.55)]">
              <AudioLines size={18} className="text-white" />
            </div>
            <span className="hidden sm:inline text-lg font-bold tracking-tight">
              <span className="text-white">LectureLens</span>{" "}
              <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
                AI
              </span>
            </span>
          </Link>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <button
            onClick={() => setAiLearningOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            AI Learning
            <SoonBadge />
          </button>
        </nav>
      </motion.header>

      <ComingSoonModal open={aiLearningOpen} onClose={() => setAiLearningOpen(false)} />
    </>
  );
}

export default Navbar;
