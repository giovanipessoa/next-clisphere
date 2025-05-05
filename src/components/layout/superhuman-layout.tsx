"use client";

import React, { useState, useEffect } from "react";
import {
    Search,
    Command,
    User,
    Calendar,
    MessageSquare,
    Briefcase,
    Settings,
    PanelLeftClose,
    PanelLeft,
    Moon,
    Sun,
} from "lucide-react";
import { Shortcut, CommandBar } from "@/components/ui/superhuman-interface";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SuperhumanLayoutProps {
    children: React.ReactNode;
}

export function SuperhumanLayout({ children }: SuperhumanLayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Detecta o modo escuro do sistema e monitora mudanças
    useEffect(() => {
        setMounted(true);

        // Verifica preferência inicial
        const isDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        setDarkMode(isDarkMode);

        // Monitora mudanças na preferência do sistema
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);
        mediaQuery.addEventListener("change", handleChange);

        // Atalho de teclado para alternar a barra lateral
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "\\" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setSidebarCollapsed(!sidebarCollapsed);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [sidebarCollapsed]);

    // Evita renderização durante SSR
    if (!mounted) return null;

    return (
        <div className="flex h-screen overflow-hidden bg-[rgb(var(--background))] text-[rgb(var(--text))]">
            {/* Sidebar */}
            <div
                className={cn(
                    "flex h-full flex-col border-r border-[rgb(var(--border))] bg-[rgb(var(--surface))] transition-all duration-300 ease-in-out",
                    sidebarCollapsed ? "w-16" : "w-64"
                )}
            >
                <div className="flex h-14 items-center justify-between border-b border-[rgb(var(--border))] px-4">
                    {!sidebarCollapsed && (
                        <h1 className="text-lg font-bold tracking-tight text-[rgb(var(--primary))]">
                            CliSphere
                        </h1>
                    )}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="ml-auto flex h-8 w-8 items-center justify-center rounded-md text-[rgb(var(--text-secondary))] transition-colors hover:bg-[rgb(var(--surface-hover))] hover:text-[rgb(var(--text))]"
                        aria-label={
                            sidebarCollapsed
                                ? "Expandir barra lateral"
                                : "Recolher barra lateral"
                        }
                    >
                        {sidebarCollapsed ? (
                            <PanelLeft size={16} />
                        ) : (
                            <PanelLeftClose size={16} />
                        )}
                    </button>
                </div>
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-2">
                        <NavItem
                            href="/dashboard"
                            icon={<Command size={16} />}
                            label="Dashboard"
                            shortcut={["D"]}
                            collapsed={sidebarCollapsed}
                        />
                        <NavItem
                            href="/dashboard/clients"
                            icon={<User size={16} />}
                            label="Clientes"
                            shortcut={["C"]}
                            collapsed={sidebarCollapsed}
                        />
                        <NavItem
                            href="/dashboard/calendar"
                            icon={<Calendar size={16} />}
                            label="Agenda"
                            shortcut={["A"]}
                            collapsed={sidebarCollapsed}
                        />
                        <NavItem
                            href="/messages"
                            icon={<MessageSquare size={16} />}
                            label="Mensagens"
                            shortcut={["M"]}
                            collapsed={sidebarCollapsed}
                        />
                        <NavItem
                            href="/dashboard/services"
                            icon={<Briefcase size={16} />}
                            label="Serviços"
                            shortcut={["S"]}
                            collapsed={sidebarCollapsed}
                        />
                    </ul>
                </nav>
                <div className="border-t border-[rgb(var(--border))] px-2 py-4">
                    <NavItem
                        href="/settings"
                        icon={<Settings size={16} />}
                        label="Configurações"
                        collapsed={sidebarCollapsed}
                    />
                    <button
                        onClick={() =>
                            document.documentElement.classList.toggle("dark")
                        }
                        className="mt-2 flex w-full items-center gap-3 rounded-md px-3 py-2 text-[rgb(var(--text-secondary))] transition-all hover:bg-[rgb(var(--surface-hover))] hover:text-[rgb(var(--text))]"
                        aria-label="Alternar modo escuro"
                    >
                        <span className="flex h-5 w-5 items-center justify-center">
                            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                        </span>
                        {!sidebarCollapsed && (
                            <span className="flex-1">
                                {darkMode ? "Modo claro" : "Modo escuro"}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-14 items-center justify-between border-b border-[rgb(var(--border))] px-4">
                    <div className="flex items-center gap-2 lg:w-96">
                        <CommandSearch />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden items-center gap-2 md:flex">
                            <Shortcut
                                keys={["/"]}
                                className="text-[rgb(var(--text-secondary))]"
                            />
                            <span className="text-xs text-[rgb(var(--text-secondary))]">
                                Pesquisar
                            </span>
                        </div>
                        <div className="hidden items-center gap-2 md:flex">
                            <Shortcut
                                keys={["\\", "⌘"]}
                                className="text-[rgb(var(--text-secondary))]"
                            />
                            <span className="text-xs text-[rgb(var(--text-secondary))]">
                                Alternar barra
                            </span>
                        </div>
                        <button
                            className="ml-2 h-8 w-8 rounded-full bg-[rgb(var(--primary))] text-white"
                            aria-label="Perfil do usuário"
                        >
                            <span className="sr-only">Perfil do usuário</span>
                            <span className="flex h-full w-full items-center justify-center text-xs font-medium">
                                DR
                            </span>
                        </button>
                    </div>
                </header>
                <main className="flex-1 overflow-auto p-4">{children}</main>
            </div>
        </div>
    );
}

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    shortcut?: string[];
    collapsed?: boolean;
    active?: boolean;
    href: string;
}

function NavItem({
    icon,
    label,
    shortcut,
    collapsed = false,
    active = false,
    href,
}: NavItemProps) {
    return (
        <li>
            <Link
                href={href}
                className={cn("sidebar-item", active && "active")}
            >
                <span className="flex h-5 w-5 items-center justify-center">
                    {icon}
                </span>
                {!collapsed && (
                    <>
                        <span className="flex-1">{label}</span>
                        {shortcut && <Shortcut keys={shortcut} />}
                    </>
                )}
            </Link>
        </li>
    );
}

function CommandSearch() {
    const [value, setValue] = useState("");

    const handleSubmit = () => {
        console.log("Pesquisando por:", value);
        // Implemente a ação de pesquisa
    };

    return (
        <CommandBar
            value={value}
            onValueChange={setValue}
            onSubmit={handleSubmit}
            placeholder="Pesquisar ou usar comandos..."
            className="w-full"
        />
    );
}
