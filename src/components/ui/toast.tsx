"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "warning" | "error" | "info";

interface ToastProps {
    title?: string;
    description?: string;
    variant?: ToastVariant;
    onClose?: () => void;
    duration?: number;
}

const variantStyles: Record<ToastVariant, string> = {
    success:
        "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-900 dark:text-green-200",
    warning:
        "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-900 dark:text-yellow-200",
    error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-900 dark:text-red-200",
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-900 dark:text-blue-200",
};

const variantIcons: Record<ToastVariant, React.ReactNode> = {
    success: (
        <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
            />
        </svg>
    ),
    warning: (
        <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
        </svg>
    ),
    error: (
        <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    ),
    info: (
        <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    ),
};

export function Toast({
    title = "CliSphere",
    description,
    variant = "info",
    onClose,
    duration = 5000,
}: ToastProps) {
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose?.();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    if (!isVisible) return null;

    return (
        <div
            className={cn(
                "fixed bottom-4 right-4 z-50 flex min-w-[300px] max-w-md items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out",
                variantStyles[variant]
            )}
            role="alert"
        >
            <div className="mt-0.5">{variantIcons[variant]}</div>
            <div className="flex-1">
                <h3 className="text-sm font-medium">{title}</h3>
                {description && (
                    <p className="mt-1 text-sm opacity-90">{description}</p>
                )}
            </div>
            {onClose && (
                <button
                    onClick={() => {
                        setIsVisible(false);
                        onClose();
                    }}
                    className="ml-auto mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Fechar</span>
                </button>
            )}
        </div>
    );
}

// Toast Provider and Context
interface ToastContextType {
    showToast: (props: ToastProps) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(
    undefined
);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<ToastProps[]>([]);

    const showToast = React.useCallback((props: ToastProps) => {
        setToasts((prev) => [...prev, props]);
    }, []);

    const removeToast = React.useCallback((index: number) => {
        setToasts((prev) => prev.filter((_, i) => i !== index));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                {toasts.map((toast, index) => (
                    <Toast
                        key={index}
                        {...toast}
                        onClose={() => removeToast(index)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
