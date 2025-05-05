export enum ServiceCategory {
    MEDICAL_APPOINTMENTS = "Consultas médicas",
    CLINICAL_EXAMS = "Exames clínicos",
    AESTHETIC_PROCEDURES = "Procedimentos estéticos",
    AESTHETIC_TREATMENTS = "Tratamentos estéticos",
    BUSINESS_CONSULTING = "Consultoria empresarial",
    FINANCIAL_CONSULTING = "Consultoria financeira",
    COSMETICS_SALES = "Venda de cosméticos",
    PERFUMERY = "Perfumaria",
    PET_SERVICES = "Serviços para pets",
    TRAVEL_PACKAGES = "Pacotes de viagem",
    CUSTOM_ITINERARIES = "Roteiros personalizados",
    OTHER = "Outros",
}

export enum BillingModel {
    FIXED = "Fixo",
    HOURLY = "Por hora",
    MONTHLY_SUBSCRIPTION = "Assinatura mensal",
    PER_SESSION = "Por sessão",
    PER_PROCEDURE = "Por procedimento",
    PER_PACKAGE = "Por pacote",
}

export interface Service {
    id: string;
    name: string;
    description: string;
    category: ServiceCategory;
    basePrice: number;
    targetAudience?: string;
    billingModel: BillingModel;
    standardDuration: number;
    averageExecutionTime: number;
    linkedToClient: boolean;
    autoRenewal: boolean;
    calendarAvailability: boolean;
    followUpDays: number;
    createdAt: Date;
    updatedAt: Date;
}
