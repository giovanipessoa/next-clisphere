import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
    return (
        <div
            className={cn(
                "mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

interface ActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function ActionBar({ children, className, ...props }: ActionBarProps) {
    return (
        <div
            className={cn(
                "flex items-center justify-between border-b border-[rgb(var(--border))] p-3 dark:border-[rgb(var(--border))]",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

interface ShortcutProps {
    keys: string[];
    className?: string;
}

export function Shortcut({ keys, className }: ShortcutProps) {
    return (
        <div className={cn("flex items-center gap-1 text-xs", className)}>
            {keys.map((key, index) => (
                <React.Fragment key={index}>
                    {index > 0 && (
                        <span className="text-[rgb(var(--text-secondary))]">
                            +
                        </span>
                    )}
                    <kbd className="keyboard-shortcut">{key}</kbd>
                </React.Fragment>
            ))}
        </div>
    );
}

interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    active?: boolean;
    children: React.ReactNode;
}

export function ListItem({
    active = false,
    children,
    className,
    ...props
}: ListItemProps) {
    return (
        <div
            className={cn(
                "flex cursor-pointer items-center justify-between p-4 transition-all duration-200",
                active
                    ? "bg-[rgb(var(--surface-hover))] dark:bg-[rgb(var(--surface-hover))]"
                    : "hover:bg-[rgb(var(--surface))] dark:hover:bg-[rgb(var(--surface-hover))]",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

interface EmptyStateProps {
    icon: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export function EmptyState({
    icon,
    title,
    description,
    action,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-full bg-[rgb(var(--surface))] p-3 dark:bg-[rgb(var(--surface-hover))]">
                {icon}
            </div>
            <h3 className="mb-1 text-lg font-medium">{title}</h3>
            {description && (
                <p className="mb-4 max-w-md text-sm text-[rgb(var(--text-secondary))]">
                    {description}
                </p>
            )}
            {action}
        </div>
    );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={cn(
                "w-full rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-2 text-sm outline-none transition-all duration-200 placeholder:text-[rgb(var(--text-secondary))] focus:border-[rgb(var(--primary))] focus:ring-2 focus:ring-[rgb(var(--primary))/20] dark:border-[rgb(var(--border))] dark:focus:border-[rgb(var(--primary-light))] dark:focus:ring-[rgb(var(--primary-light))/20]",
                className
            )}
            {...props}
        />
    );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}

export function Button({
    variant = "primary",
    size = "md",
    children,
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))/50] focus:ring-offset-2 dark:focus:ring-[rgb(var(--primary-light))/50] dark:focus:ring-offset-[rgb(var(--background))]",
                size === "sm" && "px-2.5 py-1.5 text-xs",
                size === "md" && "px-4 py-2 text-sm",
                size === "lg" && "px-6 py-3 text-base",
                variant === "primary" &&
                    "bg-[rgb(var(--primary))] text-white hover:bg-[rgb(var(--primary-hover))] dark:bg-[rgb(var(--primary))] dark:text-white dark:hover:bg-[rgb(var(--primary-hover))]",
                variant === "secondary" &&
                    "border border-[rgb(var(--border))] bg-white text-[rgb(var(--text))] hover:bg-[rgb(var(--surface))] dark:border-[rgb(var(--border))] dark:bg-[rgb(var(--surface))] dark:text-[rgb(var(--text))] dark:hover:bg-[rgb(var(--surface-hover))]",
                variant === "ghost" &&
                    "text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface))] hover:text-[rgb(var(--text))] dark:text-[rgb(var(--text-secondary))] dark:hover:bg-[rgb(var(--surface-hover))] dark:hover:text-[rgb(var(--text))]",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}

// Novos componentes no estilo Superhuman

interface CommandBarProps extends React.HTMLAttributes<HTMLDivElement> {
    placeholder?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    onSubmit?: () => void;
}

export function CommandBar({
    placeholder = "Digite um comando ou pesquise...",
    value = "",
    onValueChange,
    onSubmit,
    className,
    ...props
}: CommandBarProps) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && onSubmit) {
            onSubmit();
        }
    };

    return (
        <div className={cn("command-input", className)} {...props}>
            <span className="mr-2 text-[rgb(var(--text-secondary))]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                >
                    <path d="M19 4c-.18 0-.36.03-.53.09C16.83 5.07 14 8.58 14 13.5c0 4.92 2.83 8.43 4.47 9.41.17.06.35.09.53.09.86 0 1.55-.73 1.55-1.64V5.64c0-.91-.69-1.64-1.55-1.64zM9 4c-.18 0-.36.03-.53.09C6.83 5.07 4 8.58 4 13.5c0 4.92 2.83 8.43 4.47 9.41.17.06.35.09.53.09.86 0 1.55-.73 1.55-1.64V5.64c0-.91-.69-1.64-1.55-1.64z" />
                </svg>
            </span>
            <input
                type="text"
                value={value}
                onChange={(e) => onValueChange?.(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[rgb(var(--text-secondary))]"
            />
            <div className="flex items-center gap-1">
                <Shortcut keys={["/"]} />
            </div>
        </div>
    );
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    hoverable?: boolean;
}

export function Card({
    children,
    hoverable = true,
    className,
    ...props
}: CardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border border-[rgb(var(--border))] bg-white p-5 shadow-sm dark:border-[rgb(var(--border))] dark:bg-[rgb(var(--surface))]",
                hoverable &&
                    "transition-all duration-200 hover:-translate-y-1 hover:shadow-md",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

interface ToastProps {
    title: string;
    description?: string;
    type?: "info" | "success" | "warning" | "error";
    onClose?: () => void;
}

export function Toast({
    title,
    description,
    type = "info",
    onClose,
}: ToastProps) {
    const getIcon = () => {
        switch (type) {
            case "success":
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            case "warning":
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            case "error":
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            default:
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
        }
    };

    return (
        <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-[rgb(var(--surface))]">
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">{getIcon()}</div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-[rgb(var(--text))]">
                            {title}
                        </p>
                        {description && (
                            <p className="mt-1 text-sm text-[rgb(var(--text-secondary))]">
                                {description}
                            </p>
                        )}
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                        <button
                            type="button"
                            className="inline-flex rounded-md bg-white text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text))] focus:outline-none dark:bg-[rgb(var(--surface))]"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close</span>
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
