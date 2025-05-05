export enum EventType {
    APPOINTMENT = "Consulta",
    PROCEDURE = "Procedimento",
    FOLLOW_UP = "Acompanhamento",
    MEETING = "Reunião",
    OTHER = "Outro",
}

export enum EventStatus {
    SCHEDULED = "Agendado",
    CONFIRMED = "Confirmado",
    COMPLETED = "Concluído",
    CANCELLED = "Cancelado",
    RESCHEDULED = "Reagendado",
}

export interface Event {
    id?: string;
    title: string;
    description?: string;
    type: EventType;
    status: EventStatus;
    startDate: Date;
    endDate: Date;
    clientId?: string;
    serviceId?: string;
    location?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
