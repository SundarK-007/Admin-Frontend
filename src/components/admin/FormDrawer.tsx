import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type FormDrawerProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  footer: ReactNode;
  error?: string | null;
};

/**
 * Slide-over panel every master's create/edit form renders inside — one
 * shell, reused by Roles, Permissions, Users, and every master after them.
 */
export default function FormDrawer({ open, title, subtitle, onClose, children, footer, error }: FormDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-navy-950/70 backdrop-blur-sm"
          />
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-gold-500/15 bg-navy-900 shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-gold-500/10 px-6 py-5">
              <div>
                <h2 className="font-display text-[19px] text-ink-100">{title}</h2>
                {subtitle && <p className="mt-0.5 text-[12.5px] text-ink-500">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-lg p-1.5 text-ink-500 transition-colors hover:bg-navy-900 hover:text-ink-100"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {error && (
                <p className="rounded-xl border border-crimson-500/40 bg-crimson-500/10 px-4 py-2.5 text-[12.5px] text-crimson-400">
                  {error}
                </p>
              )}
              {children}
            </div>

            <div className="border-t border-gold-500/10 px-6 py-4">{footer}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
