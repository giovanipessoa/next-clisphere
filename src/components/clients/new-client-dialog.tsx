"use client";

import { useState, useEffect } from "react";
import {
    X,
    ChevronDown,
    ChevronUp,
    PlusCircle,
    ArrowRight,
} from "lucide-react";
import { Button, Input } from "@/components/ui/superhuman-interface";
import { cn } from "@/lib/utils";
import {
    Client,
    ClientStatus,
    ClientDetails,
    ClientProfessionalInfo,
    LeadSource,
} from "@/domain/entities/client";

interface NewClientDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (client: any) => void;
}

export default function NewClientDialog({
    isOpen,
    onClose,
    onSave,
}: NewClientDialogProps) {
    const [activeTab, setActiveTab] = useState<"basic" | "details">("basic");
    const [client, setClient] = useState<
        Omit<Partial<Client>, "phone"> & { phone: string }
    >({
        name: "",
        email: "",
        phone: "",
        status: ClientStatus.NewLead,
        details: {
            address: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
            notes: "",
        } as ClientDetails,
        professionalInfo: {
            company: "",
            jobTitle: "",
            leadSource: LeadSource.Other,
        } as ClientProfessionalInfo,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastContact: new Date(),
    });

    const statusOptions = Object.values(ClientStatus);
    const leadSourceOptions = Object.values(ClientStatus);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        // Handle nested fields
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setClient((prev) => ({
                ...prev,
                [parent]: {
                    ...((prev[parent as keyof typeof prev] as
                        | ClientDetails
                        | ClientProfessionalInfo) || {}),
                    [child]: value,
                },
            }));
        } else {
            // Handle direct fields
            setClient((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const clientData = {
                ...client,
                details: client.details ? (client.details as any) : null,
                professionalInfo: client.professionalInfo
                    ? (client.professionalInfo as any)
                    : null,
            };

            const response = await fetch("/api/client", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(clientData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erro ao criar cliente");
            }

            const savedClient = await response.json();
            onSave(savedClient);
            onClose();
        } catch (error) {
            console.error("Erro ao salvar cliente:", error);
            // TODO: Implementar um sistema de notificação para feedback visual
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/50 pt-16">
            <div className="w-full max-w-md rounded-lg border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
                    <h2 className="text-base font-medium">Novo Cliente</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-7 w-7 p-0"
                    >
                        <X size={16} />
                        <span className="sr-only">Fechar</span>
                    </Button>
                </div>

                <div className="border-b border-neutral-200 dark:border-neutral-800">
                    <div className="flex">
                        <button
                            className={cn(
                                "px-4 py-2 text-sm font-medium transition-colors",
                                activeTab === "basic"
                                    ? "border-b-2 border-neutral-900 text-neutral-900 dark:border-neutral-100 dark:text-neutral-100"
                                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                            )}
                            onClick={() => setActiveTab("basic")}
                        >
                            Informações básicas
                        </button>
                        <button
                            className={cn(
                                "px-4 py-2 text-sm font-medium transition-colors",
                                activeTab === "details"
                                    ? "border-b-2 border-neutral-900 text-neutral-900 dark:border-neutral-100 dark:text-neutral-100"
                                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                            )}
                            onClick={() => setActiveTab("details")}
                        >
                            Mais detalhes
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                    <div className="space-y-4">
                        {activeTab === "basic" ? (
                            // Campos essenciais
                            <div className="space-y-3">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Nome
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={client.name}
                                        onChange={handleChange}
                                        placeholder="Nome completo"
                                        required
                                        autoFocus
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        E-mail
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={client.email}
                                        onChange={handleChange}
                                        placeholder="email@exemplo.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Telefone/WhatsApp
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={client.phone}
                                        onChange={handleChange}
                                        placeholder="(00) 00000-0000"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="status"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Status
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="status"
                                            name="status"
                                            value={client.status}
                                            onChange={handleChange}
                                            className="w-full appearance-none rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-300 focus:ring-2 focus:ring-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:border-neutral-700 dark:focus:ring-neutral-800/50"
                                            required
                                        >
                                            {statusOptions.map((option) => (
                                                <option
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Campos detalhados
                            <div className="space-y-3">
                                <div>
                                    <label
                                        htmlFor="company"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Empresa
                                    </label>
                                    <Input
                                        id="company"
                                        name="professionalInfo.company"
                                        value={client.professionalInfo?.company}
                                        onChange={handleChange}
                                        placeholder="Nome da empresa"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="jobTitle"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Cargo
                                    </label>
                                    <Input
                                        id="jobTitle"
                                        name="professionalInfo.jobTitle"
                                        value={
                                            client.professionalInfo?.jobTitle
                                        }
                                        onChange={handleChange}
                                        placeholder="Cargo na empresa"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="address"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Endereço
                                    </label>
                                    <Input
                                        id="address"
                                        name="details.address"
                                        value={client.details?.address}
                                        onChange={handleChange}
                                        placeholder="Endereço completo"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="city"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Cidade
                                    </label>
                                    <Input
                                        id="city"
                                        name="details.city"
                                        value={client.details?.city}
                                        onChange={handleChange}
                                        placeholder="Cidade"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="cep"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        CEP
                                    </label>
                                    <Input
                                        id="cep"
                                        name="details.zipCode"
                                        value={client.details?.zipCode}
                                        onChange={handleChange}
                                        placeholder="Código postal"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="leadSource"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Origem do Lead
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="leadSource"
                                            name="professionalInfo.leadSource"
                                            value={
                                                client.professionalInfo
                                                    ?.leadSource
                                            }
                                            onChange={handleChange}
                                            className="w-full appearance-none rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-300 focus:ring-2 focus:ring-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:border-neutral-700 dark:focus:ring-neutral-800/50"
                                        >
                                            {leadSourceOptions.map((option) => (
                                                <option
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="notes"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Anotações
                                    </label>
                                    <textarea
                                        id="notes"
                                        name="details.notes"
                                        value={client.details?.notes}
                                        onChange={handleChange}
                                        placeholder="Observações sobre o cliente"
                                        rows={3}
                                        className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-300 focus:ring-2 focus:ring-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:border-neutral-700 dark:focus:ring-neutral-800/50"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Barra de ações */}
                        <div className="flex items-center justify-end space-x-2 pt-4">
                            <div className="flex-1 text-xs text-neutral-500 dark:text-neutral-400">
                                <span className="text-red-500">*</span> Campos
                                obrigatórios
                            </div>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={onClose}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit">
                                <span>Salvar</span>
                                <ArrowRight size={14} className="ml-1" />
                            </Button>
                        </div>
                    </div>
                </form>

                {/* Atalhos de teclado */}
                <div className="border-t border-neutral-200 p-3 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <kbd className="rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono text-xs dark:border-neutral-700 dark:bg-neutral-800">
                                    Tab
                                </kbd>
                                <span>Navegar</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <kbd className="rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono text-xs dark:border-neutral-700 dark:bg-neutral-800">
                                    Enter
                                </kbd>
                                <span>Salvar</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <kbd className="rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono text-xs dark:border-neutral-700 dark:bg-neutral-800">
                                Esc
                            </kbd>
                            <span>Cancelar</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
