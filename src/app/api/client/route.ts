import { NextResponse } from "next/server";
import { makeCreateClientUseCase } from "@/main/config/container";
import { PrismaClientRepository } from "@/infra/repositories/prisma-client-repository";

export async function POST(request: Request) {
    try {
        const clientData = await request.json();
        const createClient = makeCreateClientUseCase();

        const client = await createClient.execute(clientData);

        console.log(client);

        return NextResponse.json(client, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Ocorreu um erro inesperado",
            },
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
        console.error("Erro ao buscar clientes:", error);
        return Response.json(
            { error: "Erro ao buscar clientes" },
            { status: 500 }
        );
    }
}
