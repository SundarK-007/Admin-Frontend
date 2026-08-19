import { AnimatePresence, motion } from "framer-motion";
import { useToastStore } from "../../lib/toastStore";

/**
 * The confirmation half of every create/update/delete flow — mounted once
 * in AdminLayout, so any page just calls `toast.success(...)` and it shows
 * up here regardless of which screen triggered it. Stacks bottom-right,
 * newest on top, each entry auto-dismissing on its own timer (see
 * lib/toastStore) independent of the others.
 */
export default function ToastStack() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[80] flex w-full max-w-sm flex-col gap-2.5">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.96 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`pointer-events-auto flex items-start gap-2.5 rounded-xl border px-4 py-3 text-[13.5px] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)] ${
              t.tone === "error"
                ? "border-crimson-500/40 bg-navy-900 text-crimson-600"
                : "border-gold-400/40 bg-navy-900 text-amber-700"
            }`}
          >
            <span className="mt-0.5 shrink-0">
              {t.tone === "error" ? (
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 6a1 1 0 112 0v4a1 1 0 11-2 0V6zm1 8a1.25 1.25 0 100-2.5A1.25 1.25 0 0010 14z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
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
