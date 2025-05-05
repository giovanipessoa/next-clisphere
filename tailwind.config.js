/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    safelist: [
        // Cores básicas
        "bg-blue-600",
        "text-blue-600",
        "text-blue-400",
        "text-blue-100",
        "border-blue-600",
        "hover:bg-blue-700",
        "dark:bg-blue-700",
        "dark:text-blue-400",
        "dark:text-blue-200",

        // Background e cores de texto
        "bg-gray-50",
        "bg-gray-100",
        "bg-gray-700",
        "bg-gray-800",
        "bg-gray-900",
        "dark:bg-gray-700",
        "dark:bg-gray-800",
        "dark:bg-gray-900",

        // Elementos de formulário
        "focus:ring-2",
        "focus:ring-blue-500/20",
        "focus:border-blue-500",
        "dark:focus:border-blue-400",
        "dark:focus:ring-blue-400/20",
    ],
    theme: {
        extend: {
            colors: {
                primary: "rgb(var(--primary) / <alpha-value>)",
                "primary-hover": "rgb(var(--primary-hover) / <alpha-value>)",
                "primary-light": "rgb(var(--primary-light) / <alpha-value>)",
                premium: "rgb(var(--premium) / <alpha-value>)",
                "premium-hover": "rgb(var(--premium-hover) / <alpha-value>)",
                "premium-light": "rgb(var(--premium-light) / <alpha-value>)",
                surface: "rgb(var(--surface) / <alpha-value>)",
                "surface-hover": "rgb(var(--surface-hover) / <alpha-value>)",
                border: "rgb(var(--border) / <alpha-value>)",
                text: "rgb(var(--text) / <alpha-value>)",
                "text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
                accent: "rgb(var(--accent) / <alpha-value>)",

                // Light mode
                "light-bg": "#ffffff",
                "light-surface": "#f7f9fc",
                "light-border": "#e5e7eb",
                "light-text": "#1f2937",
                "light-text-secondary": "#6b7280",
                "light-accent": "#3b82f6",
                "light-accent-hover": "#2563eb",

                // Dark mode
                "dark-bg": "#111827",
                "dark-surface": "#1f2937",
                "dark-border": "#374151",
                "dark-text": "#f3f4f6",
                "dark-text-secondary": "#9ca3af",
                "dark-accent": "#3b82f6",
                "dark-accent-hover": "#60a5fa",

                // Status colors
                "status-success": "#10b981",
                "status-warning": "#f59e0b",
                "status-error": "#ef4444",
                "status-info": "#3b82f6",
            },
        },
    },
    plugins: [],
};
