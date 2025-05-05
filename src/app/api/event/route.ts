import { NextResponse } from "next/server";
import { makeCreateEventUseCase } from "@/main/config/container";
import { PrismaEventRepository } from "@/infra/repositories/prisma-event-repository";

export async function POST(request: Request) {
    try {
        const eventData = await request.json();
        const createEvent = makeCreateEventUseCase();

        const event = await createEvent.execute(eventData);

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        console.error("Error creating event:", error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json(
            { error: "Failed to create event" },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");

        const repository = new PrismaEventRepository();

        if (startDate && endDate) {
            const events = await repository.findByDateRange(
                new Date(startDate),
                new Date(endDate)
            );
            return NextResponse.json(events);
        }

        const events = await repository.findAll();
        return NextResponse.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json(
            { error: "Failed to fetch events" },
            { status: 500 }
        );
    }
}
