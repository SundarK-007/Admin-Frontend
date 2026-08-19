import { AnimatePresence, motion } from "framer-motion";
import { useToastStore } from "../../lib/toastStore";
import { PlusIcon, TrashIcon } from "../divine/icons";

const TONE_STYLES = {
  create: "border-gold-400/50 text-amber-700",
  update: "border-blue-400/50 text-blue-700",
  delete: "border-crimson-500/40 text-crimson-600",
  error: "border-crimson-500/40 text-crimson-600",
} as const;

const TONE_ICON_BG = {
  create: "bg-gold-500/15",
  update: "bg-blue-500/15",
  delete: "bg-crimson-500/15",
  error: "bg-crimson-500/15",
} as const;

function ToastIcon({ tone }: { tone: keyof typeof TONE_STYLES }) {
  if (tone === "create") return <PlusIcon />;
  if (tone === "delete") return <TrashIcon />;
  if (tone === "error") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 6a1 1 0 112 0v4a1 1 0 11-2 0V6zm1 8a1.25 1.25 0 100-2.5A1.25 1.25 0 0010 14z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  // update
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * The confirmation half of every create/update/delete flow — mounted once
 * in AdminLayout, so any page just calls `toast.created/updated/deleted(...)`
 * and it shows up here regardless of which screen triggered it.
 *
 * Centered on the viewport like the modals it follows (FormDrawer,
 * ConfirmDialog) rather than corner-anchored, so it reads as the direct
 * continuation of the dialog that just closed instead of a separate,
 * easy-to-miss notification system. The backdrop stays absent on purpose —
 * unlike a modal this never blocks interaction, it just briefly occupies
 * the same visual center.
 */
export default function ToastStack() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] flex flex-col items-center justify-center gap-2.5 p-4">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl border bg-navy-900 px-4 py-3 text-[13.5px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.45)] ${TONE_STYLES[t.tone]}`}
          >
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${TONE_ICON_BG[t.tone]}`}>
              <ToastIcon tone={t.tone} />
            </span>
            <span className="flex-1 text-ink-100">{t.message}</span>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
              className="shrink-0 text-ink-500 transition-colors hover:text-ink-100"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
