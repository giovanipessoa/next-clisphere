import { PrismaClientRepository } from "../../infra/repositories/prisma-client-repository";
import { CreateClientUseCase } from "../../domain/usecases/create-client";
import { PrismaEventRepository } from "../../infra/repositories/prisma-event-repository";
import { CreateEventUseCase } from "../../domain/usecases/create-event";

export const makeCreateClientUseCase = () => {
    const repository = new PrismaClientRepository();
    return new CreateClientUseCase(repository);
};

export const makeCreateEventUseCase = () => {
    const repository = new PrismaEventRepository();
    return new CreateEventUseCase(repository);
};
