import { Client } from "../../entities/client";
import { ClientRepository } from "../../repositories/client/client-repository";

export class CreateClientUseCase {
    constructor(private readonly clientRepository: ClientRepository) {}

    async execute(
        data: Omit<Client, "id" | "createdAt" | "updatedAt">
    ): Promise<Client | any> {
        // here we can add validation rules
        if (!data.name || !data.email || !data.phone || !data.status) {
            throw new Error("Campos obrigatórios não informados");
        }

        const existingClient = await this.clientRepository.findByEmail(
            data.email
        );

        if (existingClient) {
            return {
                success: false,
                message: "Cliente existente para o email informado",
            };
        }

        return this.clientRepository.create(data);
    }
}
