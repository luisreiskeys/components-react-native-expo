import React, { createContext, useState, useCallback } from "react";
import { ToastMessage } from "./types";
import { ToastRenderer } from "./ToastRenderer";

interface ToastContextProps {
  showToast: (msg: Omit<ToastMessage, "id">) => void;
}

export const ToastContext = createContext<ToastContextProps>({
  showToast: () => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((msg: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substring(2);
    const toast: ToastMessage = { ...msg, id };
    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, msg.duration || 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastRenderer toasts={toasts} />
    </ToastContext.Provider>
  );
};
