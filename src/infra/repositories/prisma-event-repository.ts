import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";
import { Event, EventType, EventStatus } from "../../domain/entities/event";
import { EventRepository } from "../../domain/repositories/event/event-repository";

export class PrismaEventRepository implements EventRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    private mapToDomainEvent(prismaEvent: any): Event {
        return {
            ...prismaEvent,
            type: prismaEvent.type as EventType,
            status: prismaEvent.status as EventStatus,
        };
    }

    async create(
        data: Omit<Event, "id" | "createdAt" | "updatedAt">
    ): Promise<Event> {
        const prismaEvent = await this.prisma.event.create({
            data: {
                ...data,
                id: new ObjectId().toString(),
            } as any,
        });
        return this.mapToDomainEvent(prismaEvent);
    }

    async findAll(): Promise<Event[]> {
        const events = await this.prisma.event.findMany({
            include: {
                client: true,
                service: true,
            },
        });
        return events.map(this.mapToDomainEvent);
    }

    async findById(id: string): Promise<Event | null> {
        const event = await this.prisma.event.findUnique({
            where: { id },
            include: {
                client: true,
                service: true,
            },
        });
        return event ? this.mapToDomainEvent(event) : null;
    }

    async findByDateRange(startDate: Date, endDate: Date): Promise<Event[]> {
        const events = await this.prisma.event.findMany({
            where: {
                startDate: {
                    gte: startDate,
                },
                endDate: {
                    lte: endDate,
                },
            },
            include: {
                client: true,
                service: true,
            },
        });
        return events.map(this.mapToDomainEvent);
    }

    async update(id: string, data: Partial<Event>): Promise<Event> {
        const prismaEvent = await this.prisma.event.update({
            where: { id },
            data: {
                ...data,
            } as any,
        });
        return this.mapToDomainEvent(prismaEvent);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.event.delete({
            where: { id },
        });
    }
}
