"use client";

import { useState, useEffect } from "react";
import { X, ChevronDown, ArrowRight } from "lucide-react";
import { Button, Input } from "@/components/ui/superhuman-interface";
import { cn } from "@/lib/utils";
import { Event, EventType, EventStatus } from "@/domain/entities/event";

interface NewEventDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (event: Event) => void;
    selectedDate?: Date;
    selectedClientId?: string;
    selectedServiceId?: string;
}

export default function NewEventDialog({
    isOpen,
    onClose,
    onSave,
    selectedDate,
    selectedClientId,
    selectedServiceId,
}: NewEventDialogProps) {
    const [activeTab, setActiveTab] = useState<"basic" | "details">("basic");
    const [event, setEvent] = useState<Partial<Event>>({
        title: "",
        description: "",
        type: EventType.APPOINTMENT,
        status: EventStatus.SCHEDULED,
        startDate: selectedDate || new Date(),
        endDate: selectedDate
            ? new Date(selectedDate.getTime() + 3600000)
            : new Date(Date.now() + 3600000),
        clientId: selectedClientId,
        serviceId: selectedServiceId,
        location: "",
        notes: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const typeOptions = Object.values(EventType);
    const statusOptions = Object.values(EventStatus);

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
        setEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: "startDate" | "endDate"
    ) => {
        const value = e.target.value;
        setEvent((prev) => ({
            ...prev,
            [field]: new Date(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(event),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erro ao criar evento");
            }

            const savedEvent = await response.json();
            onSave(savedEvent);
            onClose();
        } catch (error) {
            console.error("Erro ao salvar evento:", error);
            // TODO: Implementar sistema de notificação para feedback visual
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/50 pt-16">
            <div className="w-full max-w-md rounded-lg border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
                    <h2 className="text-base font-medium">Novo Evento</h2>
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
                            onClick={() => setActiveTab("basic")}
                            className={cn(
                                "px-4 py-2 text-sm font-medium transition-colors",
                                activeTab === "basic"
                                    ? "border-b-2 border-primary text-primary"
                                    : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                            )}
                        >
                            Informações Básicas
                        </button>
                        <button
                            onClick={() => setActiveTab("details")}
                            className={cn(
                                "px-4 py-2 text-sm font-medium transition-colors",
                                activeTab === "details"
                                    ? "border-b-2 border-primary text-primary"
                                    : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                            )}
                        >
                            Mais detalhes
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                    <div className="space-y-4">
                        {activeTab === "basic" ? (
                            <div className="space-y-3">
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Título
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={event.title}
                                        onChange={handleChange}
                                        placeholder="Título do evento"
                                        required
                                        autoFocus
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="type"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Tipo
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="type"
                                            name="type"
                                            value={event.type}
                                            onChange={handleChange}
                                            className="w-full appearance-none rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-300 focus:ring-2 focus:ring-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:border-neutral-700 dark:focus:ring-neutral-800/50"
                                            required
                                        >
                                            {typeOptions.map((option) => (
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

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label
                                            htmlFor="startDate"
                                            className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                        >
                                            Início
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <Input
                                            id="startDate"
                                            name="startDate"
                                            type="datetime-local"
                                            value={event.startDate
                                                ?.toISOString()
                                                .slice(0, 16)}
                                            onChange={(e) =>
                                                handleDateChange(e, "startDate")
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="endDate"
                                            className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                        >
                                            Término
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <Input
                                            id="endDate"
                                            name="endDate"
                                            type="datetime-local"
                                            value={event.endDate
                                                ?.toISOString()
                                                .slice(0, 16)}
                                            onChange={(e) =>
                                                handleDateChange(e, "endDate")
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div>
                                    <label
                                        htmlFor="description"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Descrição
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={event.description}
                                        onChange={handleChange}
                                        placeholder="Descrição do evento"
                                        rows={3}
                                        className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-300 focus:ring-2 focus:ring-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:border-neutral-700 dark:focus:ring-neutral-800/50"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="location"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Local
                                    </label>
                                    <Input
                                        id="location"
                                        name="location"
                                        value={event.location}
                                        onChange={handleChange}
                                        placeholder="Local do evento"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="status"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Status
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="status"
                                            name="status"
                                            value={event.status}
                                            onChange={handleChange}
                                            className="w-full appearance-none rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-300 focus:ring-2 focus:ring-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:border-neutral-700 dark:focus:ring-neutral-800/50"
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

                                <div>
                                    <label
                                        htmlFor="notes"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Observações
                                    </label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        value={event.notes}
                                        onChange={handleChange}
                                        placeholder="Observações adicionais"
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
