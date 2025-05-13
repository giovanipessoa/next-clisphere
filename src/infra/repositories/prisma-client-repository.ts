import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";
import { Client, ClientStatus } from "../../domain/entities/client";
import { ClientRepository } from "../../domain/repositories/client/client-repository";

export class PrismaClientRepository implements ClientRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    private mapToDomainClient(prismaClient: any): Client {
        return {
            ...prismaClient,
            status: prismaClient.status as ClientStatus,
        };
    }

    async create(
        data: Omit<Client, "id" | "createdAt" | "updatedAt">
    ): Promise<Client> {
        const prismaClient = await this.prisma.client.create({
            data: {
                ...data,
                id: new ObjectId().toString(),
                details: (data.details as any) || null,
                professionalInfo: (data.professionalInfo as any) || null,
            } as any,
        });
        return this.mapToDomainClient(prismaClient);
    }

    async findAll(): Promise<Client[]> {
        const clients = await this.prisma.client.findMany();
        return clients.map(this.mapToDomainClient);
    }

    async findById(id: string): Promise<Client | null> {
        const client = await this.prisma.client.findUnique({
            where: { id },
        });
        return client ? this.mapToDomainClient(client) : null;
    }

    async findByEmail(email: string): Promise<Client | null> {
        const client = await this.prisma.client.findFirst({
            where: { email },
        });
        return client ? this.mapToDomainClient(client) : null;
    }

    async update(id: string, data: Partial<Client>): Promise<Client> {
        const prismaClient = await this.prisma.client.update({
            where: { id },
            data: {
                ...data,
                details: (data.details as any) || null,
                professionalInfo: (data.professionalInfo as any) || null,
            } as any,
        });
        return this.mapToDomainClient(prismaClient);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.client.delete({
            where: { id },
        });
    }
}
