export enum LeadSource {
    Instagram = "Instagram",
    Referral = "Indicação",
    Event = "Evento",
    Website = "Site",
    Other = "Outro",
}

export enum ClientStatus {
    NewLead = "Novo lead",
    InTreatment = "Em tratamento",
    Loyal = "Fiel",
    Active = "Ativo",
    Inactive = "Inativo",
}

export interface ClientDetails {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    notes?: string;
}

export interface ClientProfessionalInfo {
    company?: string;
    jobTitle?: string;
    leadSource?: LeadSource;
}

export interface Client {
    id?: string;
    name: string;
    email: string;
    phone: string | null;
    status: ClientStatus;
    details?: ClientDetails;
    professionalInfo?: ClientProfessionalInfo;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    lastContact?: Date | null;
}
