import { motion } from "framer-motion";

function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
      whileHover={{
        y: -6,
      }}
      className={`
        relative
        overflow-hidden

        p-6

        bg-white/70
        backdrop-blur-xl

        border
        border-white/50

        rounded-3xl

        shadow-sm
        hover:shadow-xl

        transition-shadow
        duration-300

        ${className}
      `}
    >

      {/* subtle glow */}
      <div
        className="
          absolute
          -top-20
          -right-20

          w-40
          h-40

          bg-indigo-200/30
          blur-3xl

          rounded-full
        "
      />

      <div className="relative">
        {children}
      </div>

    </motion.div>
  );
}

export default GlassCard;