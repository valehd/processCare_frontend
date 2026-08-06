import type {
    AssignedProcess,
    HealthcareProcess,
    Newborn
} from "../models/process";

export async function loadNewborn(): Promise<Newborn> {

    const response = await fetch("/src/data/newborn.json");

     if (!response.ok) {
        throw new Error("Failed to load newborn data.");
    }

    return response.json();
}

export async function loadHealthcareProcesses(): Promise<HealthcareProcess[]> {

    const response = await fetch("/src/data/healthcareProcesses.json");
    if (!response.ok) {
        throw new Error("Failed to load healthcare processes.");
    }
    return response.json();
}

export async function loadAssignedProcesses(): Promise<AssignedProcess[]> {

    const response = await fetch("/src/data/assignedProcesses.json");

    if (!response.ok) {
        throw new Error("Failed to load assigned processes.");
    }
    return response.json();
}