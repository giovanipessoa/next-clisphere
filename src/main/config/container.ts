import { PrismaClientRepository } from "../../infra/repositories/prisma-client-repository";
import { CreateClientUseCase } from "../../domain/usecases/client/create-client";
import { PrismaEventRepository } from "../../infra/repositories/prisma-event-repository";
import { CreateEventUseCase } from "../../domain/usecases/event/create-event";

// Client
export const makeCreateClientUseCase = () => {
    const repository = new PrismaClientRepository();
    return new CreateClientUseCase(repository);
};

// Event
export const makeCreateEventUseCase = () => {
    const repository = new PrismaEventRepository();
    return new CreateEventUseCase(repository);
};
