
import type {
    AssignedProcess,
    HealthcareProcess,
    Newborn
} from "../models/process";

const API_BASE = "http://localhost:8080/api/v1";


/**
 * Backend response for an assigned healthcare process.
 *
 * The backend returns:
 *
 * {
 *   newbornId,
 *   newbornName,
 *   processName,
 *   status
 * }
 */
interface AssignedProcessResponse {
    newbornId: number;
    newbornName: string;
    processName: string;
    status: AssignedProcess["status"];
}


/**
 * Load newborn from backend.
 */
export async function loadNewborn(): Promise<Newborn | null> {

    const response =
        await fetch(`${API_BASE}/newborns/1`);

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error("Failed to load newborn data.");
    }

    return response.json();
}


/**
 * Healthcare process catalog.
 *
 * The backend currently does not expose
 * a catalog endpoint, so the catalog remains local.
 */
export async function loadHealthcareProcesses(): Promise<HealthcareProcess[]> {

    const response =
        await fetch("/src/data/healthcareProcesses.json");

    if (!response.ok) {
        throw new Error("Failed to load healthcare processes.");
    }

    return response.json();
}


/**
 * Load processes assigned to a newborn.
 */
export async function loadAssignedProcesses(
    newbornId: number
): Promise<AssignedProcess[]> {

    const response =
        await fetch(
            `${API_BASE}/newborns/${newbornId}/processes`
);

if (!response.ok) {
    throw new Error("Failed to load assigned processes.");
}

const data: AssignedProcessResponse[] =
    await response.json();

return data.map(item => ({
    newbornId: item.newbornId,
    newbornName: item.newbornName,
    processName: item.processName,
    status: item.status
}));
}


/**
 * Assign a healthcare process to a newborn.
 */
export async function assignProcess(
    newbornId: number,
    processName: string
): Promise<AssignedProcess> {

    const response =
        await fetch(
            `${API_BASE}/newborns/${newbornId}/processes`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    processName
                })
            }
        );

    if (!response.ok) {

        const error =
            await response.json();

        throw new Error(
            error.message ??
            "Failed to assign process."
        );
    }

    const data: AssignedProcessResponse =
        await response.json();

    return {
        newbornId: data.newbornId,
        newbornName: data.newbornName,
        processName: data.processName,
        status: data.status
    };
}

/**
 * Complete an assigned healthcare process.
 */
export async function completeProcess(
    newbornId: number,
    processName: string
): Promise<AssignedProcess> {

    const response =
        await fetch(
            `${API_BASE}/newborns/${newbornId}/processes/${encodeURIComponent(processName)}/complete`,
            {
                method: "POST"
            }
        );

    if (!response.ok) {

        const error =
            await response.json();

        throw new Error(
            error.message ??
            "Failed to complete process."
        );
    }

    const data: AssignedProcessResponse =
        await response.json();

    return {
        newbornId: data.newbornId,
        newbornName: data.newbornName,
        processName: data.processName,
        status: data.status
    };
}


/**
 * Cancel an assigned healthcare process.
 */
export async function cancelProcess(
    newbornId: number,
    processName: string
): Promise<AssignedProcess> {

    const response =
        await fetch(
            `${API_BASE}/newborns/${newbornId}/processes/${encodeURIComponent(processName)}/cancel`,
            {
                method: "POST"
            }
        );

    if (!response.ok) {

        const error =
            await response.json();

        throw new Error(
            error.message ??
            "Failed to cancel process."
        );
    }

    const data: AssignedProcessResponse =
        await response.json();

    return {
        newbornId: data.newbornId,
        newbornName: data.newbornName,
        processName: data.processName,
        status: data.status
    };
}

