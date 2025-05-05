"use client";

import { useState, useEffect, useRef } from "react";
import { Input, Button } from "@/components/ui/superhuman-interface";
import { ArrowRight, X } from "lucide-react";

interface QuickAddClientProps {
    isVisible: boolean;
    onClose: () => void;
    onSave: (client: any) => void;
    initialQuery?: string;
}

export default function QuickAddClient({
    isVisible,
    onClose,
    onSave,
    initialQuery = "",
}: QuickAddClientProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [step, setStep] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    // Reset and initialize state when dialog opens
    useEffect(() => {
        if (isVisible) {
            setName("");
            setEmail("");
            setPhone("");
            setStep(0);

            // Parse initial query if available
            if (initialQuery) {
                const parts = initialQuery.trim().split(" ");
                if (parts.length >= 1) {
                    setName(parts[0]);
                    setStep(1);

                    if (parts.length >= 2) {
                        // Check if second part looks like an email
                        if (parts[1].includes("@")) {
                            setEmail(parts[1]);
                            setStep(2);

                            if (parts.length >= 3) {
                                setPhone(parts.slice(2).join(" "));
                                setStep(3);
                            }
                        } else {
                            // If not an email, assume it's part of the name
                            setName(parts.slice(0, 2).join(" "));

                            if (parts.length >= 3) {
                                if (parts[2].includes("@")) {
                                    setEmail(parts[2]);
                                    setStep(3);

                                    if (parts.length >= 4) {
                                        setPhone(parts.slice(3).join(" "));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, [isVisible, initialQuery]);

    // Focus the input field when component opens or step changes
    useEffect(() => {
        if (isVisible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isVisible, step]);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isVisible) return;

            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
            } else if (e.key === "Enter") {
                e.preventDefault();
                handleNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isVisible, step, name, email, phone]);

    const handleNext = () => {
        // If we're on the last step, save
        if (step === 2) {
            if (name && email && phone) {
                handleSave();
            }
            return;
        }

        // Otherwise, move to next field if current field is valid
        if (step === 0 && name) {
            setStep(1);
        } else if (step === 1 && isValidEmail(email)) {
            setStep(2);
        }
    };

    const handleSave = () => {
        if (name && email && phone) {
            onSave({
                name,
                email,
                phone,
                status: "Novo Lead",
                lastInteraction: new Date().toISOString(),
            });
            onClose();
        }
    };

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (!isVisible) return null;

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <>
                        <h3 className="text-sm font-medium">Nome do cliente</h3>
                        <Input
                            id="client-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome completo"
                            className="mt-2"
                            autoFocus
                        />
                    </>
                );
            case 1:
                return (
                    <>
                        <h3 className="text-sm font-medium">
                            E-mail do cliente
                        </h3>
                        <Input
                            id="client-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@exemplo.com"
                            className="mt-2"
                            autoFocus
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <h3 className="text-sm font-medium">
                            Telefone do cliente
                        </h3>
                        <Input
                            id="client-phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="(00) 00000-0000"
                            className="mt-2"
                            autoFocus
                        />
                    </>
                );
        }
    };

    return (
        <div className="fixed inset-x-0 bottom-16 z-50 flex justify-center">
            <div className="w-full max-w-md rounded-lg border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-base font-medium">Adicionar Cliente</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-7 w-7 p-0"
                    >
                        <X size={16} />
                    </Button>
                </div>

                <div className="mb-4">{renderStep()}</div>

                <div className="flex items-center justify-between">
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        {step + 1}/3
                    </div>
                    <div className="space-x-2">
                        {step > 0 && (
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setStep(step - 1)}
                            >
                                Voltar
                            </Button>
                        )}
                        <Button
                            size="sm"
                            onClick={handleNext}
                            disabled={
                                (step === 0 && !name) ||
                                (step === 1 && !isValidEmail(email)) ||
                                (step === 2 && !phone)
                            }
                        >
                            {step === 2 ? (
                                <>
                                    Salvar
                                    <ArrowRight size={14} className="ml-1" />
                                </>
                            ) : (
                                "Próximo"
                            )}
                        </Button>
                    </div>
                </div>

                <div className="mt-3 border-t border-neutral-200 pt-3 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="font-medium">Dica:</span> Use Tab
                            para navegar e Enter para confirmar
                        </div>
                        <div className="flex items-center gap-1">
                            <kbd className="rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono dark:border-neutral-700 dark:bg-neutral-800">
                                Esc
                            </kbd>
                            <span>para cancelar</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
