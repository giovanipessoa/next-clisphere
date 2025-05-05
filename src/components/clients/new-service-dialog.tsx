"use client";

import { useState, useEffect } from "react";
import { X, ChevronDown, ArrowRight } from "lucide-react";
import { Button, Input } from "@/components/ui/superhuman-interface";
import { cn } from "@/lib/utils";
import { ServiceCategory, BillingModel } from "@/domain/entities/service";

interface NewServiceDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (client: any) => void;
}

interface ServiceData {
    id?: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    targetAudience?: string;
    billingModel: string;
    standardDuration: string;
    averageExecutionTime: string;
    autoRenewal: boolean;
    calendarAvailability: boolean;
}

export default function NewServiceDialog({
    isOpen,
    onClose,
    onSave,
}: NewServiceDialogProps) {
    const [activeTab, setActiveTab] = useState<"basic" | "advanced">("basic");
    const [service, setService] = useState<ServiceData>({
        name: "",
        description: "",
        category: ServiceCategory.OTHER,
        basePrice: 0,
        targetAudience: "",
        billingModel: BillingModel.FIXED,
        standardDuration: "",
        averageExecutionTime: "",
        autoRenewal: false,
        calendarAvailability: false,
    });

    const categoryOptions = Object.values(ServiceCategory);
    const billingModelOptions = Object.values(BillingModel);

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
        setService((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setService((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Implementation similar to existing code but for services
        // ...
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/50 pt-16">
            <div className="w-full max-w-md rounded-lg border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
                    <h2 className="text-base font-medium">Novo Serviço</h2>
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
                            onClick={() => setActiveTab("advanced")}
                            className={cn(
                                "px-4 py-2 text-sm font-medium transition-colors",
                                activeTab === "advanced"
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
                                        htmlFor="name"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Nome
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={service.name}
                                        onChange={handleChange}
                                        placeholder="Ex.: Consultoria estratégica"
                                        required
                                        autoFocus
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="description"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Descrição
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={service.description}
                                        onChange={handleChange}
                                        placeholder="Descreva o serviço em até 200 caracteres"
                                        maxLength={200}
                                        rows={3}
                                        className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-300 focus:ring-2 focus:ring-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:border-neutral-700 dark:focus:ring-neutral-800/50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="category"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Categoria
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="category"
                                            name="category"
                                            value={service.category}
                                            onChange={handleChange}
                                            className="w-full appearance-none rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-300 focus:ring-2 focus:ring-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:border-neutral-700 dark:focus:ring-neutral-800/50"
                                            required
                                        >
                                            {categoryOptions.map((option) => (
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
                                        htmlFor="basePrice"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Preço Base
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="basePrice"
                                        name="basePrice"
                                        type="number"
                                        value={service.basePrice}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div>
                                    <label
                                        htmlFor="targetAudience"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Público-alvo
                                    </label>
                                    <Input
                                        id="targetAudience"
                                        name="targetAudience"
                                        value={service.targetAudience}
                                        onChange={handleChange}
                                        placeholder="Ex.: Empresas de médio porte"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="billingModel"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Modelo de cobrança
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="billingModel"
                                            name="billingModel"
                                            value={service.billingModel}
                                            onChange={handleChange}
                                            className="w-full appearance-none rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-300 focus:ring-2 focus:ring-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:border-neutral-700 dark:focus:ring-neutral-800/50"
                                        >
                                            {billingModelOptions.map(
                                                (option) => (
                                                    <option
                                                        key={option}
                                                        value={option}
                                                    >
                                                        {option}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="standardDuration"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Duração padrão (em horas)
                                    </label>
                                    <Input
                                        type="number"
                                        id="standardDuration"
                                        name="standardDuration"
                                        value={service.standardDuration}
                                        onChange={handleChange}
                                        placeholder="Ex.: 2"
                                        min="1"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="averageExecutionTime"
                                        className="mb-1 block text-xs font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        Tempo médio de execução (em horas)
                                    </label>
                                    <Input
                                        type="number"
                                        id="averageExecutionTime"
                                        name="averageExecutionTime"
                                        value={service.averageExecutionTime}
                                        onChange={handleChange}
                                        placeholder="Ex.: 4"
                                        min="1"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="autoRenewal"
                                            name="autoRenewal"
                                            checked={service.autoRenewal}
                                            onChange={handleCheckboxChange}
                                            className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary dark:border-neutral-700"
                                        />
                                        <label
                                            htmlFor="autoRenewal"
                                            className="text-sm text-neutral-700 dark:text-neutral-300"
                                        >
                                            Renovação automática
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="calendarAvailability"
                                            name="calendarAvailability"
                                            checked={
                                                service.calendarAvailability
                                            }
                                            onChange={handleCheckboxChange}
                                            className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary dark:border-neutral-700"
                                        />
                                        <label
                                            htmlFor="calendarAvailability"
                                            className="text-sm text-neutral-700 dark:text-neutral-300"
                                        >
                                            Disponibilidade no calendário
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

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
