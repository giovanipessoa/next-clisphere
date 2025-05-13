import { Client } from "../../entities/client";

export interface ClientRepository {
    create(
        data: Omit<Client, "id" | "createdAt" | "updatedAt">
    ): Promise<Client>;
    findAll(): Promise<Client[]>;
    findById(id: string): Promise<Client | null>;
    findByEmail(email: string): Promise<Client | null>;
    update(id: string, data: Partial<Client>): Promise<Client>;
    delete(id: string): Promise<void>;
}
