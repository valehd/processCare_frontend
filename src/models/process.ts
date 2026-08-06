export enum ProcessStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export enum Relationship {
    MOTHER = "MOTHER",
    FATHER = "FATHER",
    GUARDIAN = "GUARDIAN"
}


export interface ParentContact {
    fullName: string;
    email: string;
    phone: string;
    relationship: Relationship;
}


export interface Newborn {
    id: number;
    name: string;
    birthDateTime: string;
    weight: number;
    gestationalAge: number;
    gender: Gender;
    admittedToNICU: boolean;
    contacts: ParentContact[];
}


export interface HealthcareProcess {
    name: string;
}


export interface AssignedProcess {
    newborn: Newborn;
    process: HealthcareProcess;
    status: ProcessStatus;
}