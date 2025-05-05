"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Service } from "@/domain/entities/service";
import { Button } from "@/components/ui/superhuman-interface";
import { formatCurrency } from "@/lib/utils";
import { Pencil, Trash } from "lucide-react";

export const columns: ColumnDef<Service>[] = [
    {
        accessorKey: "name",
        header: "Nome do serviço",
    },
    {
        accessorKey: "category",
        header: "Categoria",
    },
    {
        accessorKey: "basePrice",
        header: "Preço base",
        cell: ({ row }) => formatCurrency(row.original.basePrice),
    },
    {
        accessorKey: "billingModel",
        header: "Modelo de cobrança",
        cell: ({ row }) => {
            const models = {
                FIXED: "Fixo",
                HOURLY: "Por Hora",
                MONTHLY_SUBSCRIPTION: "Assinatura Mensal",
            };
            return models[row.original.billingModel];
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                        <Pencil size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                        <Trash size={16} />
                    </Button>
                </div>
            );
        },
    },
];
