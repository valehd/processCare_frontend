import { type AssignedProcess, type HealthcareProcess, ProcessStatus } from '../models';

const statusLabel: Record<ProcessStatus, string> = {
    [ProcessStatus.PENDING]: "Pending",
    [ProcessStatus.COMPLETED]: "Completed",
    [ProcessStatus.CANCELLED]: "Cancelled",
};

export function generateCatalogCardHtml(
    process: HealthcareProcess,
    isAssigned: boolean
): string {

    return `
    <div class="catalog-card ${isAssigned ? 'is-assigned' : ''}">
        <div class="catalog-info">
            <span class="catalog-index"></span>
            <span class="catalog-name">${process.name}</span>
        </div>

        <button
            class="btn btn-assign"
            data-process="${process.name}"
            ${isAssigned ? 'disabled' : ''}>
            ${isAssigned ? 'Assigned' : 'Assign'}
        </button>
    </div>
    `;
}


export function generateAssignedCardHtml(
    assigned: AssignedProcess
): string {

    const label = statusLabel[assigned.status];

    const isPending =
        assigned.status === ProcessStatus.PENDING;

    return `
    <div class="process-card status-${assigned.status}">

        <div class="card-header">

            <h3>${assigned.processName}</h3>

            <span class="badge badge-${assigned.status}">
                ${label}
            </span>

        </div>

        <div class="card-footer">

            <button
                class="btn btn-complete"
                data-process="${assigned.processName}"
                ${isPending ? '' : 'disabled'}>
                Complete
            </button>

            <button
                class="btn btn-cancel"
                data-process="${assigned.processName}"
                ${isPending ? '' : 'disabled'}>
                Cancel
            </button>

        </div>

    </div>
    `;
}