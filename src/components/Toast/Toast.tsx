import { type ReactNode, useEffect, useState, useCallback, createContext, useContext } from 'react';
import './Toast.css';

type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

interface ToastData {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

interface ToastContextValue {
  toast: (message: string, opts?: { variant?: ToastVariant; duration?: number }) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const toast = useCallback((message: string, opts?: { variant?: ToastVariant; duration?: number }) => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, {
      id,
      message,
      variant: opts?.variant || 'default',
      duration: opts?.duration || 4000,
    }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="rf-toast-container" role="region" aria-label="Notifications">
        {toasts.map(t => (
          <ToastItem key={t.id} data={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ data, onDismiss }: { data: ToastData; onDismiss: (id: string) => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), data.duration);
    return () => clearTimeout(timer);
  }, [data.duration]);

  useEffect(() => {
    if (exiting) {
      const timer = setTimeout(() => onDismiss(data.id), 200);
      return () => clearTimeout(timer);
    }
  }, [exiting, data.id, onDismiss]);

  const icons: Record<ToastVariant, ReactNode> = {
    default: null,
    success: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M13 5L6.5 11.5 3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    error: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10.5 5.5l-5 5M5.5 5.5l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    warning: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 5v3.5M8 10.5h.005" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    info: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 7v4M8 5h.005" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  };

  return (
    <div
      className={`rf-toast rf-toast--${data.variant} ${exiting ? 'rf-toast--exit' : ''}`}
      role="alert"
    >
      {icons[data.variant] && (
        <span className="rf-toast__icon">{icons[data.variant]}</span>
      )}
      <span className="rf-toast__message">{data.message}</span>
      <button className="rf-toast__close" onClick={() => setExiting(true)} aria-label="Dismiss">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
