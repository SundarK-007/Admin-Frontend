import { create } from "zustand";

type ToastTone = "success" | "error";
type ToastEntry = { id: number; message: string; tone: ToastTone };

type ToastState = {
  toasts: ToastEntry[];
  dismiss: (id: number) => void;
};

let nextId = 1;
const AUTO_DISMISS_MS = 3000;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

function show(message: string, tone: ToastTone) {
  const id = nextId++;
  useToastStore.setState((s) => ({ toasts: [...s.toasts, { id, message, tone }] }));
  setTimeout(() => {
    useToastStore.setState((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
  }, AUTO_DISMISS_MS);
}

/**
 * Fire-and-forget success/error notices for actions that already closed
 * their own modal — create/update/delete across every master screen call
 * this right after the drawer/dialog closes, so "it worked" is confirmed
 * somewhere durable rather than only implied by the modal disappearing.
 */
export const toast = {
  success: (message: string) => show(message, "success"),
  error: (message: string) => show(message, "error"),
};
