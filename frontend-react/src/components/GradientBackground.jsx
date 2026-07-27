import { motion } from "framer-motion";

function GradientBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#05050b]">
      {/* base radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.25),transparent)]" />

      {/* slow moving iridescent blobs — trimmed from 4 to 3 layers (the
          fuchsia accent blob was fully redundant with the violet + indigo
          blobs at typical viewport sizes) to cut composited blur/mix-blend
          layers on every page load. */}
      <motion.div
        animate={{
          x: [0, 120, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-violet-600/20 blur-[140px] mix-blend-screen will-change-transform"
      />
      <motion.div
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 80, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/15 blur-[150px] mix-blend-screen will-change-transform"
      />
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -50, 0],
        }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[55%] left-[5%] w-[28vw] h-[28vw] rounded-full bg-indigo-500/20 blur-[120px] mix-blend-screen will-change-transform"
      />

      {/* grain texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* vignette for cinematic falloff */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.65)_100%)]" />
    </div>
  );
}

export default GradientBackground;
