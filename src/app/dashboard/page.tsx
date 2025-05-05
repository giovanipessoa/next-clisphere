"use client";

import { useEffect, useState } from "react";
import {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
} from "@/components/ui/command-menu";
import {
    User,
    Users,
    Calendar,
    BarChart3,
    LineChart,
    PlusCircle,
    Inbox,
    Search,
    MessageSquare,
} from "lucide-react";
import {
    Button,
    EmptyState,
    ListItem,
} from "@/components/ui/superhuman-interface";
import QuickAddClient from "@/components/clients/quick-add-client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const [open, setOpen] = useState(false);
    const [commandInput, setCommandInput] = useState("");
    const [isQuickAddClientOpen, setIsQuickAddClientOpen] = useState(false);
    const [quickAddQuery, setQuickAddQuery] = useState("");
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    // Processa comandos especiais
    useEffect(() => {
        if (
            commandInput.startsWith("/cliente") ||
            commandInput.startsWith("/client")
        ) {
            // Extrai o resto do comando para usar como dados iniciais
            const query = commandInput
                .replace(/^\/(cliente|client)\s*/, "")
                .trim();
            if (query) {
                setQuickAddQuery(query);
                setIsQuickAddClientOpen(true);
                setOpen(false);
                setCommandInput("");
            } else {
                // Se não tiver dados, apenas abra a tela de cliente
                router.push("/clients");
                setOpen(false);
                setCommandInput("");
            }
        }
    }, [commandInput, router]);

    const handleSaveQuickClient = (client: any) => {
        // Aqui você pode salvar o cliente ou redirecionar para a página de clientes
        console.log("Cliente criado:", client);
        setIsQuickAddClientOpen(false);

        // Opcional: redirecione para a página de clientes
        // router.push("/clients");
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Upcoming */}
                <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
                        <h2 className="text-sm font-medium">Upcoming</h2>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                                <Calendar size={14} className="mr-1" />
                                View Calendar
                            </Button>
                        </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                        {[...Array(3)].map((_, i) => (
                            <ListItem key={i}>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                                            <User size={14} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">
                                                Client Meeting {i + 1}
                                            </p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                                Today, {i + 9}:00 AM
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm">
                                        <Calendar size={14} className="mr-1" />
                                        Details
                                    </Button>
                                </div>
                            </ListItem>
                        ))}
                    </div>
                </div>

                {/* Recent Clients */}
                <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
                        <h2 className="text-sm font-medium">Recent Clients</h2>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                                <Users size={14} className="mr-1" />
                                View All
                            </Button>
                        </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                        {[...Array(3)].map((_, i) => (
                            <ListItem key={i}>
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                                        <User size={14} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">
                                            Client Name {i + 1}
                                        </p>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                            Last contact: {i + 1} days ago
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm">
                                        <MessageSquare
                                            size={14}
                                            className="mr-1"
                                        />
                                        Message
                                    </Button>
                                </div>
                            </ListItem>
                        ))}
                    </div>
                </div>

                {/* Follow-ups */}
                <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
                        <h2 className="text-sm font-medium">Follow-ups</h2>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                                <Inbox size={14} className="mr-1" />
                                View All
                            </Button>
                        </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                        <EmptyState
                            icon={<Inbox size={20} />}
                            title="No follow-ups"
                            description="You're all caught up! No pending follow-ups."
                            action={
                                <Button variant="secondary" size="sm">
                                    <PlusCircle size={14} className="mr-1" />
                                    Create Follow-up
                                </Button>
                            }
                        />
                    </div>
                </div>
            </div>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    placeholder="Type a command or search..."
                    value={commandInput}
                    onValueChange={setCommandInput}
                />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Actions">
                        <CommandItem
                            onSelect={() => {
                                setQuickAddQuery("");
                                setIsQuickAddClientOpen(true);
                                setOpen(false);
                            }}
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            <span>New Client</span>
                            <CommandShortcut>/cliente</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Schedule Appointment</span>
                            <CommandShortcut>/cal</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <Inbox className="mr-2 h-4 w-4" />
                            <span>Send Follow-up</span>
                            <CommandShortcut>/follow</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="Navigation">
                        <CommandItem
                            onSelect={() => {
                                router.push("/clients");
                                setOpen(false);
                            }}
                        >
                            <Users className="mr-2 h-4 w-4" />
                            <span>Clients</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => {
                                router.push("/calendar");
                                setOpen(false);
                            }}
                        >
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Calendar</span>
                        </CommandItem>
                        <CommandItem>
                            <Inbox className="mr-2 h-4 w-4" />
                            <span>Follow-ups</span>
                        </CommandItem>
                        <CommandItem>
                            <BarChart3 className="mr-2 h-4 w-4" />
                            <span>Pipeline</span>
                        </CommandItem>
                        <CommandItem>
                            <LineChart className="mr-2 h-4 w-4" />
                            <span>Insights</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>

            {/* Componente para adicionar cliente rápido */}
            <QuickAddClient
                isVisible={isQuickAddClientOpen}
                onClose={() => setIsQuickAddClientOpen(false)}
                onSave={handleSaveQuickClient}
                initialQuery={quickAddQuery}
            />
        </>
    );
}
