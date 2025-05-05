import { Client } from "../entities/client";
import { ClientRepository } from "../repositories/client-repository";

export class CreateClientUseCase {
    constructor(private readonly clientRepository: ClientRepository) {}

    async execute(
        data: Omit<Client, "id" | "createdAt" | "updatedAt">
    ): Promise<Client> {
        return this.clientRepository.create(data);
    }
}
