import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Link2,
  Sparkles,
  ArrowUp,
  CheckCircle2,
  Lightbulb,
  BookOpen,
  ClipboardList,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import GradientBackground from "../components/GradientBackground";
import GlassPanel from "../components/GlassPanel";
import Button from "../components/Button";
import SoonBadge from "../components/SoonBadge";
import { PAGE_TRANSITION } from "../lib/motion";

const timelineContainerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const timelineItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const markdownComponents = {
  h1: ({ children }) => <h3 className="text-lg font-semibold text-white mb-2">{children}</h3>,
  h2: ({ children }) => <h3 className="text-lg font-semibold text-white mb-2">{children}</h3>,
  h3: ({ children }) => <h4 className="text-base font-semibold text-white mb-2">{children}</h4>,
  p: ({ children }) => <p className="text-white/80 leading-relaxed mb-3 last:mb-0">{children}</p>,
  ul: ({ children }) => (
    <ul className="list-disc list-outside pl-5 space-y-1.5 text-white/80 mb-3 last:mb-0">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside pl-5 space-y-1.5 text-white/80 mb-3 last:mb-0">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
  code: ({ children }) => (
    <code className="px-1.5 py-0.5 rounded-md bg-white/10 text-violet-200 text-[0.85em]">
      {children}
    </code>
  ),
};

function SectionCard({ icon: Icon, title, accent, children }) {
  return (
    <GlassPanel
      className="p-6 will-change-transform"
      hover={false}
      variants={timelineItemVariants}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <span className={`flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 border border-white/10 ${accent}`}>
          <Icon size={16} />
        </span>
        <h3 className="text-sm uppercase tracking-[0.2em] text-white/70">{title}</h3>
      </div>
      {children}
    </GlassPanel>
  );
}

function BulletList({ items, icon: Icon, accent }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-white/75 leading-relaxed">
          <Icon size={15} className={`mt-0.5 flex-shrink-0 ${accent}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function AskAIBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 px-4 pb-6 pt-4 bg-gradient-to-t from-[#05050b] via-[#05050b]/90 to-transparent">
      <div
        title="AI-guided refinement is coming soon"
        className="max-w-3xl mx-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
      >
        <Sparkles size={18} className="text-violet-300/50 flex-shrink-0" />
        <input
          type="text"
          disabled
          placeholder="Ask AI to refine this summary — coming soon"
          className="w-full bg-transparent text-sm text-white/40 placeholder:text-white/30 outline-none cursor-not-allowed"
        />
        <SoonBadge className="flex-shrink-0" />
        <button
          type="button"
          disabled
          aria-label="AI refinement — coming soon"
          className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 text-white/30 disabled:cursor-not-allowed"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </div>
  );
}

function Summary() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const summaryData = state?.summaryData;
  const videoUrl = state?.videoUrl;
  const metadata = summaryData?.metadata;
  const executiveSummary = summaryData?.executive_summary;
  const keyTakeaways = summaryData?.key_takeaways || [];
  const concepts = summaryData?.concepts || [];
  const examples = summaryData?.examples || [];
  const actionItems = summaryData?.action_items || [];

  const hasContent =
    executiveSummary || keyTakeaways.length || concepts.length || examples.length || actionItems.length;

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <GradientBackground />

      <motion.section
        {...PAGE_TRANSITION}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-40 pb-40"
      >
        <div className="mb-8">
          <Button variant="secondary" onClick={() => navigate("/workspace")}>
            <ArrowLeft size={16} />
            Back to Workspace
          </Button>
        </div>

        <span className="block text-xs uppercase tracking-[0.3em] text-violet-300/70">
          Summary
        </span>
        <h1 className="mt-4 font-serif text-4xl md:text-5xl text-white max-w-3xl">
          {metadata?.title || "Study Notes"}
        </h1>

        {hasContent ? (
          <motion.div
            variants={timelineContainerVariants}
            initial="hidden"
            animate="show"
          >
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <div className="lg:col-span-4">
                <GlassPanel className="p-6 will-change-transform" hover={false} variants={timelineItemVariants}>
                  {metadata?.thumbnail_url && (
                    <img
                      src={metadata.thumbnail_url}
                      alt={metadata?.title || "Video thumbnail"}
                      className="w-full rounded-2xl border border-white/10"
                    />
                  )}

                  <div className="mt-5 space-y-3">
                    {metadata?.channel && (
                      <p className="text-sm text-white/70 font-medium">{metadata.channel}</p>
                    )}
                    {videoUrl && (
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm text-violet-300/80 hover:text-violet-200 transition-colors"
                      >
                        <Link2 size={15} className="flex-shrink-0" />
                        <span className="truncate underline underline-offset-2">{videoUrl}</span>
                      </a>
                    )}
                  </div>
                </GlassPanel>
              </div>

              <div className="lg:col-span-8">
                <SectionCard icon={Sparkles} title="Executive Summary" accent="text-violet-300">
                  {executiveSummary ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                      {executiveSummary}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-sm text-white/40">Not covered in this video.</p>
                  )}
                </SectionCard>
              </div>
            </div>

            <div className="mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <SectionCard icon={CheckCircle2} title="Key Takeaways" accent="text-emerald-300">
                {keyTakeaways.length ? (
                  <BulletList items={keyTakeaways} icon={CheckCircle2} accent="text-emerald-300/80" />
                ) : (
                  <p className="text-sm text-white/40">Not covered in this video.</p>
                )}
              </SectionCard>

              <SectionCard icon={Lightbulb} title="Concepts" accent="text-amber-300">
                {concepts.length ? (
                  <ul className="space-y-4">
                    {concepts.map((concept, i) => (
                      <li key={i}>
                        <p className="text-sm font-semibold text-white">{concept.term}</p>
                        <p className="mt-1 text-sm text-white/60 leading-relaxed">{concept.explanation}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-white/40">Not covered in this video.</p>
                )}
              </SectionCard>

              <SectionCard icon={BookOpen} title="Examples" accent="text-sky-300">
                {examples.length ? (
                  <BulletList items={examples} icon={BookOpen} accent="text-sky-300/80" />
                ) : (
                  <p className="text-sm text-white/40">Not covered in this video.</p>
                )}
              </SectionCard>

              <SectionCard icon={ClipboardList} title="Action Items" accent="text-fuchsia-300">
                {actionItems.length ? (
                  <BulletList items={actionItems} icon={ClipboardList} accent="text-fuchsia-300/80" />
                ) : (
                  <p className="text-sm text-white/40">Not covered in this video.</p>
                )}
              </SectionCard>
            </div>
          </motion.div>
        ) : (
          <GlassPanel
            className="mt-10 p-10 flex flex-col items-center text-center gap-3"
            hover={false}
          >
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <FileText size={20} className="text-white/40" />
            </div>
            <p className="text-sm text-white/40">
              No summary yet — head back to the workspace and analyze a lecture first.
            </p>
          </GlassPanel>
        )}
      </motion.section>

      <AskAIBar />
    </div>
  );
}

export default Summary;
