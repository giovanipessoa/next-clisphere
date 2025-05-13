"use client";

import { useEffect, useState } from "react";
import {
    Button,
    ActionBar,
    ListItem,
    EmptyState,
    Input,
} from "@/components/ui/superhuman-interface";
import {
    User,
    PlusCircle,
    Search,
    Filter,
    SortAsc,
    Mail,
    Phone,
    Calendar,
} from "lucide-react";
import NewClientDialog from "@/components/clients/new-client-dialog";
import { Client, ClientStatus } from "@/domain/entities/client";

export default function ClientsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [clients, setClients] = useState<Client[]>([]);
    const [filteredClients, setFilteredClients] = useState<Client[]>([]);
    const [selectedClient, setSelectedClient] = useState<string | null>(null);
    const [isNewClientDialogOpen, setIsNewClientDialogOpen] = useState(false);

    useEffect(() => {
        // Fetch clients when component mounts
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/client`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch clients");
                }
                return response.json();
            })
            .then((data) => {
                setClients(data);
                setFilteredClients(data);
            })
            .catch((error) => {
                console.error("Error fetching clients:", error);
            });
    }, []);

    useEffect(() => {
        // Função para filtrar clientes baseado na busca
        if (searchQuery.trim() === "") {
            setFilteredClients(clients);
        } else {
            const query = searchQuery.toLowerCase();
            setFilteredClients(
                clients.filter(
                    (client: Client) =>
                        client.name.toLowerCase().includes(query) ||
                        client.email.toLowerCase().includes(query) ||
                        client.phone?.includes(query)
                )
            );
        }
    }, [searchQuery, clients]);

    // Configura atalhos de teclado
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Atalho para novo cliente: Ctrl+N ou Cmd+N
            if (e.key === "n" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                setIsNewClientDialogOpen(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Função para lidar com a adição de um novo cliente
    const handleSaveClient = (newClient: Client) => {
        const clientWithId = {
            ...newClient,
            id:
                clients.length > 0
                    ? (
                          Math.max(
                              ...clients.map((c: Client) => Number(c.id))
                          ) + 1
                      ).toString()
                    : "1",
        };
        setClients([clientWithId, ...clients]);
        setIsNewClientDialogOpen(false);
    };

    return (
        <main className="flex-1 overflow-hidden">
            <div className="flex h-full space-x-4">
                {/* Lista de clientes */}
                <div className="w-1/3 overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                    <ActionBar className="p-3">
                        <h2 className="text-sm font-medium">Clientes</h2>
                        <Button
                            size="sm"
                            onClick={() => setIsNewClientDialogOpen(true)}
                        >
                            <PlusCircle size={14} className="mr-1" />
                            Novo Cliente
                        </Button>
                    </ActionBar>

                    <div className="p-3">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                            <Input
                                type="text"
                                placeholder="Pesquisar clientes..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-b border-neutral-200 px-3 py-2 dark:border-neutral-800">
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            {filteredClients.length}{" "}
                            {filteredClients.length === 1
                                ? "cliente"
                                : "clientes"}
                        </span>
                        <div className="flex gap-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                            >
                                <Filter size={14} />
                                <span className="sr-only">Filter</span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                            >
                                <SortAsc size={14} />
                                <span className="sr-only">Sort</span>
                            </Button>
                        </div>
                    </div>

                    <div className="max-h-[calc(100vh-220px)] overflow-y-auto">
                        {filteredClients.length > 0 ? (
                            filteredClients.map((client: Client) => (
                                <ListItem
                                    key={client.id}
                                    active={selectedClient === client.id}
                                    onClick={() =>
                                        setSelectedClient(client.id || null)
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                                            <User size={14} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">
                                                {client.name}
                                            </p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                                Last contact:{" "}
                                                {client.lastContact
                                                    ? new Date(
                                                          client.lastContact
                                                      ).toLocaleDateString()
                                                    : "Never"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div
                                            className={`h-2 w-2 rounded-full ${
                                                client.status ===
                                                ClientStatus.Active
                                                    ? "bg-emerald-500"
                                                    : "bg-neutral-300 dark:bg-neutral-600"
                                            }`}
                                        />
                                    </div>
                                </ListItem>
                            ))
                        ) : (
                            <EmptyState
                                icon={<User size={20} />}
                                title="Nenhum cliente encontrado"
                                description="Tente um termo de busca diferente ou crie um novo cliente"
                                action={
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() =>
                                            setIsNewClientDialogOpen(true)
                                        }
                                    >
                                        <PlusCircle
                                            size={14}
                                            className="mr-1"
                                        />
                                        Novo Cliente
                                    </Button>
                                }
                            />
                        )}
                    </div>
                </div>

                {/* Detalhes do cliente */}
                <div className="flex-1 overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                    {selectedClient ? (
                        <div className="h-full">
                            <ActionBar>
                                <h2 className="text-sm font-medium">
                                    Detalhes do cliente
                                </h2>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm">
                                        <Mail size={14} className="mr-1" />
                                        E-mail
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Phone size={14} className="mr-1" />
                                        Telefone
                                    </Button>
                                    <Button variant="primary" size="sm">
                                        <Calendar size={14} className="mr-1" />
                                        Agendar
                                    </Button>
                                </div>
                            </ActionBar>

                            {(() => {
                                const client = clients.find(
                                    (c: Client) =>
                                        c.id === selectedClient?.toString()
                                );
                                return (
                                    <div className="p-4">
                                        <div className="mb-6 flex items-center gap-4">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                                                <User size={24} />
                                            </div>
                                            <div>
                                                <h1 className="text-lg font-semibold">
                                                    {client?.name}
                                                </h1>
                                                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                                    Status: {client?.status}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="rounded-md border border-neutral-200 p-3 dark:border-neutral-800">
                                                <h3 className="mb-2 text-xs font-medium uppercase text-neutral-500 dark:text-neutral-400">
                                                    Contato
                                                </h3>
                                                <div className="space-y-2">
                                                    <p className="flex items-center gap-2 text-sm">
                                                        <Mail
                                                            size={14}
                                                            className="text-neutral-500 dark:text-neutral-400"
                                                        />
                                                        {client?.email}
                                                    </p>
                                                    <p className="flex items-center gap-2 text-sm">
                                                        <Phone
                                                            size={14}
                                                            className="text-neutral-500 dark:text-neutral-400"
                                                        />
                                                        {client?.phone}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="rounded-md border border-neutral-200 p-3 dark:border-neutral-800">
                                                <h3 className="mb-2 text-xs font-medium uppercase text-neutral-500 dark:text-neutral-400">
                                                    Engajamento
                                                </h3>
                                                <div className="space-y-2">
                                                    <p className="text-sm">
                                                        Última interação:{" "}
                                                        {client?.lastContact
                                                            ? new Date(
                                                                  client.lastContact
                                                              ).toLocaleDateString()
                                                            : "Nunca"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    ) : (
                        <div className="p-3">
                            <EmptyState
                                icon={<User size={24} />}
                                title="Nenhum cliente selecionado"
                                description="Selecione um cliente da lista para visualizar os detalhes ou crie um novo cliente"
                                action={
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() =>
                                            setIsNewClientDialogOpen(true)
                                        }
                                    >
                                        <PlusCircle
                                            size={14}
                                            className="mr-1"
                                        />
                                        Novo Cliente
                                    </Button>
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
            {/* Modal para novo cliente */}
            <NewClientDialog
                isOpen={isNewClientDialogOpen}
                onClose={() => setIsNewClientDialogOpen(false)}
                onSave={handleSaveClient}
            />

            {/* Dica de atalho de teclado */}
            <div className="fixed bottom-4 right-4 flex items-center gap-1 rounded-md bg-white/80 p-2 text-xs text-neutral-500 shadow backdrop-blur-sm dark:bg-neutral-800/80 dark:text-neutral-400">
                <kbd className="rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono dark:border-neutral-700 dark:bg-neutral-800">
                    {typeof navigator !== "undefined" &&
                    navigator.platform.indexOf("Mac") === 0
                        ? "⌘"
                        : "Ctrl"}
                </kbd>
                <span>+</span>
                <kbd className="rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono dark:border-neutral-700 dark:bg-neutral-800">
                    N
                </kbd>
                <span className="ml-1">Novo Cliente</span>
            </div>
        </main>
    );
}
