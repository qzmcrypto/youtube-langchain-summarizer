function SoonBadge({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center text-[9px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-violet-400/10 text-violet-300/80 border border-violet-400/20 ${className}`}
    >
      Soon
    </span>
  );
}

export default SoonBadge;
