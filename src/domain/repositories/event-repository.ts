import { Event } from "../entities/event";

export interface EventRepository {
    create(data: Omit<Event, "id" | "createdAt" | "updatedAt">): Promise<Event>;
    findAll(): Promise<Event[]>;
    findById(id: string): Promise<Event | null>;
    findByDateRange(startDate: Date, endDate: Date): Promise<Event[]>;
    update(id: string, data: Partial<Event>): Promise<Event>;
    delete(id: string): Promise<void>;
}
