import { motion } from "framer-motion";

function GlassPanel({
  children,
  className = "",
  glow = true,
  hover = true,
  delay = 0,
  variants,
  ...props
}) {
  const viewportAnimationProps = variants
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <motion.div
      variants={variants}
      {...viewportAnimationProps}
      whileHover={hover ? { y: -4, transition: { type: "spring", stiffness: 300, damping: 22 } } : undefined}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] ${className}`}
      {...props}
    >
      {glow && (
        <div className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 rounded-full bg-violet-500/15 blur-3xl" />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}

export default GlassPanel;
