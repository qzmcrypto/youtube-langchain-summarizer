import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";

function ComingSoonModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
        >
          {/* backdrop */}
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="coming-soon-title"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(139,92,246,0.5)] p-8 text-center overflow-hidden"
          >
            <div className="pointer-events-none absolute -top-24 -left-16 w-56 h-56 rounded-full bg-violet-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 w-56 h-56 rounded-full bg-indigo-500/20 blur-3xl" />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 p-2 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-violet-500/30 to-indigo-500/30 border border-white/10 flex items-center justify-center"
              >
                <Sparkles size={26} className="text-violet-200" />
              </motion.div>

              <h3 id="coming-soon-title" className="mt-6 font-serif text-2xl text-white">
                AI Learning is on its way
              </h3>
              <p className="mt-3 text-sm text-white/50 leading-relaxed">
                We're building a smarter way to revisit, quiz, and master what
                you've learned. Coming soon.
              </p>

              <button
                onClick={onClose}
                className="mt-8 inline-flex items-center justify-center px-6 py-3 rounded-2xl text-sm font-medium bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-lg shadow-violet-900/40 hover:from-violet-400 hover:to-indigo-400 transition-all"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ComingSoonModal;
