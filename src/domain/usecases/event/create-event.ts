import { Event } from "@/domain/entities/event";
import { EventRepository } from "@/domain/repositories/event/event-repository";

export class CreateEventUseCase {
    constructor(private readonly eventRepository: EventRepository) {}

    async execute(data: Event): Promise<Event> {
        // here we can add validation rules
        if (!data.title || !data.type || !data.startDate || !data.endDate) {
            throw new Error("Missing required fields");
        }

        return await this.eventRepository.create(data);
    }
}
