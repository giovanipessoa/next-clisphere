"use client";

import { useState } from "react";
import { Button } from "@/components/ui/superhuman-interface";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import NewServiceDialog from "@/components/clients/new-service-dialog";
import { columns } from "@/app/dashboard/services/columns";

export default function ServicesPage() {
    const [isNewClientDialogOpen, setIsNewClientDialogOpen] = useState(false);

    const handleSaveService = () => {};

    return (
        <main className="flex-1 overflow-hidden">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Serviços</h1>
                    <Button
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => setIsNewClientDialogOpen(true)}
                    >
                        <Plus size={16} />
                        Novo Serviço
                    </Button>
                </div>
                <DataTable columns={columns} data={[]} />
            </div>
            {/* Modal para novo cliente */}
            <NewServiceDialog
                isOpen={isNewClientDialogOpen}
                onClose={() => setIsNewClientDialogOpen(false)}
                onSave={handleSaveService}
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
