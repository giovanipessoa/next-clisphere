"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/superhuman-interface";
import {
    LogIn,
    User,
    Lock,
    Stethoscope,
    Command,
    Moon,
    Sun,
    Sparkles,
} from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [isPremium, setIsPremium] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);

        // Verifica preferência de tema do sistema
        const isDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        setDarkMode(isDarkMode);

        // Atalhos de teclado
        const handleKeyDown = (e: KeyboardEvent) => {
            // Atalho para focar no email
            if (e.key === "e" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                document.getElementById("email")?.focus();
            }

            // Atalho para focar na senha
            if (e.key === "p" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                document.getElementById("password")?.focus();
            }

            // Atalho para enviar o formulário
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                document.getElementById("login-btn")?.click();
            }

            // Atalho para alternar tema claro/escuro
            if (e.key === "d" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggleDarkMode();
            }

            // Atalho para alternar tema premium
            if (e.key === "g" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                togglePremium();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulação de login
        setTimeout(() => {
            setIsLoading(false);
            router.push("/dashboard");
        }, 600); // Reduzido ainda mais para percepção de velocidade
    };

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle("dark");
        setDarkMode(!darkMode);
    };

    const togglePremium = () => {
        setIsPremium(!isPremium);
        // Atualiza as variáveis CSS dinamicamente
        const root = document.documentElement;
        if (!isPremium) {
            // Salvar valores originais para restaurar depois
            root.style.setProperty(
                "--original-primary",
                root.style.getPropertyValue("--primary")
            );
            root.style.setProperty(
                "--original-primary-hover",
                root.style.getPropertyValue("--primary-hover")
            );
            root.style.setProperty(
                "--original-primary-light",
                root.style.getPropertyValue("--primary-light")
            );

            // Aplicar valores premium
            root.style.setProperty("--primary", "var(--premium)");
            root.style.setProperty("--primary-hover", "var(--premium-hover)");
            root.style.setProperty("--primary-light", "var(--premium-light)");
        } else {
            // Restaurar valores originais
            root.style.setProperty(
                "--primary",
                root.style.getPropertyValue("--original-primary")
            );
            root.style.setProperty(
                "--primary-hover",
                root.style.getPropertyValue("--original-primary-hover")
            );
            root.style.setProperty(
                "--primary-light",
                root.style.getPropertyValue("--original-primary-light")
            );
        }
    };

    return mounted ? (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[rgb(var(--background))]">
            <div className="w-full max-w-md overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-white shadow-xl transition-all dark:border-[rgb(var(--border))] dark:bg-[rgb(var(--surface))] fade-in">
                {/* Logo flutuante */}
                <div className="absolute left-1/2 top-0 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white p-3 shadow-lg transition-all hover:-translate-y-[26px] dark:bg-[rgb(var(--surface))]">
                    <Stethoscope
                        size={28}
                        className="text-[rgb(var(--primary))] transition-all duration-300 dark:text-[rgb(var(--primary-light))]"
                    />
                </div>

                {/* Controles de tema na barra superior */}
                <div className="absolute right-2 top-2 z-20 flex items-center gap-2">
                    <button
                        onClick={toggleDarkMode}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-all hover:bg-white/20"
                        aria-label={
                            darkMode
                                ? "Alternar para modo claro"
                                : "Alternar para modo escuro"
                        }
                        title={`Alternar tema escuro (${
                            darkMode ? "Ctrl" : "⌘"
                        }+D)`}
                    >
                        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                    <button
                        onClick={togglePremium}
                        className={`flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-white/20 ${
                            isPremium
                                ? "text-[rgb(var(--premium))]"
                                : "text-white"
                        }`}
                        aria-label={
                            isPremium
                                ? "Alternar para tema padrão"
                                : "Alternar para tema premium"
                        }
                        title={`Alternar tema premium (${
                            darkMode ? "Ctrl" : "⌘"
                        }+G)`}
                    >
                        <Sparkles size={16} />
                    </button>
                </div>

                {/* Cabeçalho */}
                <div className="relative bg-[rgb(var(--primary))] px-6 py-10 text-center text-white">
                    <h1 className="mt-4 text-3xl font-bold tracking-tight slide-up">
                        CliSphere
                    </h1>
                    <p
                        className="mt-2 text-sm font-light opacity-90 slide-up"
                        style={{ animationDelay: "100ms" }}
                    >
                        Gestão eficiente de clientes, automação de follow-ups e
                        experiência sem fricção.
                    </p>
                </div>

                {/* Formulário */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div
                            className="slide-up"
                            style={{ animationDelay: "200ms" }}
                        >
                            <label
                                htmlFor="email"
                                className="mb-2 flex items-center justify-between text-sm font-medium text-[rgb(var(--text))] dark:text-[rgb(var(--text-secondary))]"
                            >
                                <span>Email</span>
                                <div className="keyboard-shortcut">
                                    {darkMode ? "Ctrl" : "⌘"}+E
                                </div>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-[rgb(var(--text-secondary))]">
                                    <User size={16} />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--surface))] pl-10 focus-ring dark:border-[rgb(var(--border))]"
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div
                            className="slide-up"
                            style={{ animationDelay: "300ms" }}
                        >
                            <label
                                htmlFor="password"
                                className="mb-2 flex items-center justify-between text-sm font-medium text-[rgb(var(--text))] dark:text-[rgb(var(--text-secondary))]"
                            >
                                <span>Senha</span>
                                <div className="keyboard-shortcut">
                                    {darkMode ? "Ctrl" : "⌘"}+P
                                </div>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-[rgb(var(--text-secondary))]">
                                    <Lock size={16} />
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--surface))] pl-10 focus-ring dark:border-[rgb(var(--border))]"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div
                            className="pt-3 slide-up"
                            style={{ animationDelay: "400ms" }}
                        >
                            <button
                                id="login-btn"
                                type="submit"
                                className={`w-full ${
                                    isPremium ? "btn-premium" : "btn-primary"
                                }`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="inline-flex items-center">
                                        <svg
                                            className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Entrando...
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center">
                                        <LogIn size={16} className="mr-2" />
                                        Entrar{" "}
                                        <span className="ml-2 opacity-70">
                                            ({darkMode ? "Ctrl" : "⌘"}+Enter)
                                        </span>
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>

                    <div
                        className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-[rgb(var(--text-secondary))] slide-up"
                        style={{ animationDelay: "500ms" }}
                    >
                        <Command size={14} />
                        <span>Use atalhos para navegar mais rápido</span>
                    </div>

                    <div
                        className="mt-4 text-center slide-up"
                        style={{ animationDelay: "600ms" }}
                    >
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                            Ainda não tem uma conta?{" "}
                            <a
                                href="#"
                                className={`font-medium hover:underline ${
                                    isPremium
                                        ? "text-[rgb(var(--premium))] dark:text-[rgb(var(--premium-light))]"
                                        : "text-[rgb(var(--primary))] dark:text-[rgb(var(--primary-light))]"
                                }`}
                            >
                                Fale com o administrador
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <div
                className="mt-8 text-center text-xs text-[rgb(var(--text-secondary))] slide-up"
                style={{ animationDelay: "700ms" }}
            >
                &copy; {new Date().getFullYear()} ClíSphere — Todos os direitos
                reservados
            </div>
        </div>
    ) : null; // Evita flash de conteúdo durante a hidratação
}
