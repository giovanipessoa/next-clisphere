import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class values using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(
    value: number,
    locale: string = "pt-BR",
    currency: string = "BRL"
): string {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
    }).format(value);
}

export function formatDate(date: Date, locale: string = "pt-BR"): string {
    return new Intl.DateTimeFormat(locale).format(date);
}

export function formatTime(date: Date, locale: string = "pt-BR"): string {
    return new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}

export function formatDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
}

export function formatPhoneNumber(phoneNumber: string): string {
    return phoneNumber
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

export function formatCpf(cpf: string): string {
    return cpf
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatCnpj(cnpj: string): string {
    return cnpj
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

export function formatCep(cep: string): string {
    return cep.replace(/\D/g, "").replace(/(\d{5})(\d{3})/, "$1-$2");
}

export function formatPercentage(
    value: number,
    locale: string = "pt-BR"
): string {
    return new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

export function formatNumber(value: number, locale: string = "pt-BR"): string {
    return new Intl.NumberFormat(locale).format(value);
}
