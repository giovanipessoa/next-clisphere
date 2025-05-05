"use client";

import { useState } from "react";
import {
    Button,
    ActionBar,
    ListItem,
    EmptyState,
} from "@/components/ui/superhuman-interface";
import {
    CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Clock,
    Plus,
    User,
} from "lucide-react";
import NewEventDialog from "@/components/calendar/new-event-dialog";
import { Event } from "@/domain/entities/event";

// Exemplo de dados de eventos
const events = [
    {
        id: 1,
        title: "Client Meeting: Alice Johnson",
        date: "2023-06-15",
        time: "09:00 - 10:00",
        client: "Alice Johnson",
        type: "Meeting",
    },
    {
        id: 2,
        title: "Follow-up Call: Bob Smith",
        date: "2023-06-15",
        time: "11:30 - 12:00",
        client: "Bob Smith",
        type: "Call",
    },
    {
        id: 3,
        title: "Proposal Review: Carol Williams",
        date: "2023-06-16",
        time: "14:00 - 15:00",
        client: "Carol Williams",
        type: "Review",
    },
    {
        id: 4,
        title: "Onboarding: David Brown",
        date: "2023-06-17",
        time: "10:00 - 11:00",
        client: "David Brown",
        type: "Onboarding",
    },
];

// Dias da semana
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Horas do dia (formato 24h)
const hours = Array.from({ length: 12 }, (_, i) => i + 8);

export default function CalendarPage() {
    const [view, setView] = useState<"month" | "week" | "day">("week");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
    const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false);

    // Gera dias da semana atual
    const currentWeekDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(selectedDate);
        date.setDate(date.getDate() - date.getDay() + i);
        return date;
    });

    const handleSaveEvent = (event: Event) => {
        // Implementar lógica para salvar o evento
        console.log("Novo evento:", event);
        // Atualizar a lista de eventos
        // Fechar o modal
        setIsNewEventDialogOpen(false);
    };

    return (
        <main className="flex-1 overflow-hidden">
            <div className="flex h-full flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setSelectedDate(new Date())}
                        >
                            Today
                        </Button>
                        <div className="flex items-center">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                            >
                                <ChevronLeft size={16} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                            >
                                <ChevronRight size={16} />
                            </Button>
                        </div>
                        <h2 className="text-lg font-medium">
                            {selectedDate.toLocaleDateString("en-US", {
                                month: "long",
                                year: "numeric",
                            })}
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex rounded-md border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                            <Button
                                variant={view === "day" ? "primary" : "ghost"}
                                size="sm"
                                className="rounded-none border-r border-neutral-200 dark:border-neutral-800"
                                onClick={() => setView("day")}
                            >
                                Day
                            </Button>
                            <Button
                                variant={view === "week" ? "primary" : "ghost"}
                                size="sm"
                                className="rounded-none border-r border-neutral-200 dark:border-neutral-800"
                                onClick={() => setView("week")}
                            >
                                Week
                            </Button>
                            <Button
                                variant={view === "month" ? "primary" : "ghost"}
                                size="sm"
                                onClick={() => setView("month")}
                            >
                                Month
                            </Button>
                        </div>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setIsNewEventDialogOpen(true)}
                        >
                            <Plus size={14} className="mr-1" />
                            Novo Evento
                        </Button>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                    {view === "week" && (
                        <div className="flex flex-1 flex-col">
                            {/* Cabeçalho dos dias da semana */}
                            <div className="flex border-b border-neutral-200 dark:border-neutral-800">
                                <div className="w-16 border-r border-neutral-200 dark:border-neutral-800"></div>
                                {currentWeekDays.map((date, i) => {
                                    const isToday =
                                        date.toDateString() ===
                                        new Date().toDateString();
                                    return (
                                        <div
                                            key={i}
                                            className={`flex-1 p-2 text-center border-r border-neutral-200 dark:border-neutral-800 ${
                                                isToday
                                                    ? "bg-blue-50 dark:bg-blue-900/20"
                                                    : ""
                                            }`}
                                        >
                                            <div className="text-xs text-neutral-500 dark:text-neutral-400">
                                                {days[i]}
                                            </div>
                                            <div
                                                className={`text-sm font-medium ${
                                                    isToday
                                                        ? "rounded-full bg-blue-500 text-white h-6 w-6 mx-auto flex items-center justify-center mt-1"
                                                        : ""
                                                }`}
                                            >
                                                {date.getDate()}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Grid de horas e eventos */}
                            <div className="flex flex-1 overflow-y-auto">
                                {/* Coluna de horas */}
                                <div className="w-16 flex-shrink-0">
                                    {hours.map((hour) => (
                                        <div
                                            key={hour}
                                            className="h-16 border-b border-r border-neutral-200 p-2 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
                                        >
                                            {hour}:00
                                        </div>
                                    ))}
                                </div>

                                {/* Dias e eventos */}
                                {currentWeekDays.map((date, dayIndex) => (
                                    <div
                                        key={dayIndex}
                                        className="relative flex-1 border-r border-neutral-200 dark:border-neutral-800"
                                    >
                                        {hours.map((hour) => (
                                            <div
                                                key={hour}
                                                className="h-16 border-b border-neutral-200 dark:border-neutral-800"
                                            ></div>
                                        ))}

                                        {/* Eventos exemplo */}
                                        {dayIndex === 1 && (
                                            <div
                                                className="absolute top-[32px] left-1 right-1 h-16 rounded-md bg-blue-100 p-2 text-xs dark:bg-blue-900/50"
                                                onClick={() =>
                                                    setSelectedEvent(1)
                                                }
                                            >
                                                <div className="font-medium text-blue-800 dark:text-blue-200">
                                                    Client Meeting
                                                </div>
                                                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-300">
                                                    <Clock size={10} />
                                                    <span>9:00 - 10:00</span>
                                                </div>
                                            </div>
                                        )}
                                        {dayIndex === 1 && (
                                            <div
                                                className="absolute top-[112px] left-1 right-1 h-8 rounded-md bg-green-100 p-2 text-xs dark:bg-green-900/50"
                                                onClick={() =>
                                                    setSelectedEvent(2)
                                                }
                                            >
                                                <div className="font-medium text-green-800 dark:text-green-200">
                                                    Follow-up Call
                                                </div>
                                            </div>
                                        )}
                                        {dayIndex === 2 && (
                                            <div
                                                className="absolute top-[240px] left-1 right-1 h-16 rounded-md bg-purple-100 p-2 text-xs dark:bg-purple-900/50"
                                                onClick={() =>
                                                    setSelectedEvent(3)
                                                }
                                            >
                                                <div className="font-medium text-purple-800 dark:text-purple-200">
                                                    Proposal Review
                                                </div>
                                                <div className="flex items-center gap-1 text-purple-600 dark:text-purple-300">
                                                    <Clock size={10} />
                                                    <span>14:00 - 15:00</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Painel de detalhes do evento */}
                {selectedEvent && (
                    <div className="absolute right-4 top-24 h-96 w-80 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
                        <ActionBar>
                            <h2 className="text-sm font-medium">
                                Event Details
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedEvent(null)}
                            >
                                ✕
                            </Button>
                        </ActionBar>
                        <div className="p-4">
                            {(() => {
                                const event = events.find(
                                    (e) => e.id === selectedEvent
                                );
                                return event ? (
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-lg font-medium">
                                                {event.title}
                                            </h3>
                                            <div className="mt-1 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                                                <CalendarIcon size={14} />
                                                <span>
                                                    {new Date(
                                                        event.date
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            weekday: "long",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                            <div className="mt-1 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                                                <Clock size={14} />
                                                <span>{event.time}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 rounded-md border border-neutral-200 p-3 dark:border-neutral-800">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                                                <User size={16} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {event.client}
                                                </p>
                                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                                    Client
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="flex-1"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                className="flex-1"
                                            >
                                                Join Meeting
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <EmptyState
                                        icon={<CalendarIcon size={20} />}
                                        title="Event not found"
                                        description="The selected event could not be found"
                                    />
                                );
                            })()}
                        </div>
                    </div>
                )}

                {/* Modal para novo evento */}
                <NewEventDialog
                    isOpen={isNewEventDialogOpen}
                    onClose={() => setIsNewEventDialogOpen(false)}
                    onSave={handleSaveEvent}
                    selectedDate={selectedDate}
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
                    <span className="ml-1">Novo Evento</span>
                </div>
            </div>
        </main>
    );
}
