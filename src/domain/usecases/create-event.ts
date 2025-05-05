import { Event } from "@/domain/entities/event";
import { EventRepository } from "@/infra/repositories/prisma-event-repository";

export class CreateEventUseCase {
    constructor(private readonly eventRepository: EventRepository) {}

    async execute(data: Event): Promise<Event> {
        // Aqui podemos adicionar validações de negócio
        if (!data.title || !data.type || !data.startDate || !data.endDate) {
            throw new Error("Missing required fields");
        }

        if (new Date(data.startDate) > new Date(data.endDate)) {
            throw new Error("Start date cannot be after end date");
        }

        // Se houver um cliente associado, podemos validar se ele existe
        if (data.clientId) {
            // Adicionar validação do cliente se necessário
        }

        // Se houver um serviço associado, podemos validar se ele existe
        if (data.serviceId) {
            // Adicionar validação do serviço se necessário
        }

        return await this.eventRepository.create(data);
    }
}
