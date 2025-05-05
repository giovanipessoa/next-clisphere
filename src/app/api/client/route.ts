import { NextResponse } from "next/server";
import { makeCreateClientUseCase } from "@/main/config/container";
import { PrismaClientRepository } from "@/infra/repositories/prisma-client-repository";

export async function POST(request: Request) {
    try {
        const clientData = await request.json();
        const createClient = makeCreateClientUseCase();

        const client = await createClient.execute(clientData);

        return NextResponse.json(client, { status: 201 });
    } catch (error) {
        console.error("Error creating client:", error);
        return NextResponse.json(
            { error: "Failed to create client" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const repository = new PrismaClientRepository();
        const clients = await repository.findAll();

        return Response.json(clients);
    } catch (error) {
        console.error("Error fetching clients:", error);
        return Response.json(
            { error: "Failed to fetch clients" },
            { status: 500 }
        );
    }
}
