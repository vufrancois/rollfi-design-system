import { type ReactNode, useEffect, useState, useCallback, createContext, useContext } from 'react';
import { CheckCircle, XCircle, Warning, Info, X } from '@phosphor-icons/react';
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
    success: <CheckCircle size={16} weight="fill" />,
    error: <XCircle size={16} weight="fill" />,
    warning: <Warning size={16} weight="fill" />,
    info: <Info size={16} weight="fill" />,
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
        <X size={14} />
      </button>
    </div>
  );
}
