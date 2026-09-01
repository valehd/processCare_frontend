import { ProcessStatus } from "../models";
import type { AssignedProcess, Newborn } from "../models";
import {
    assignProcess,
    completeProcess,
    cancelProcess
} from "../services/processService";

export function bindProcessEvents(
    newborn: Newborn | null,
    assignedProcesses: AssignedProcess[],
    showNewbornForm: () => void,
    render: () => void
): void {

    bindRegisterButton(showNewbornForm);

    bindAssignButtons(
        newborn,
        assignedProcesses,
        showNewbornForm,
        render
    );

    bindCompleteButtons(
        assignedProcesses,
        render
    );

    bindCancelButtons(
        assignedProcesses,
        render
    );
}


function bindRegisterButton(
    showNewbornForm: () => void
): void {

    const registerButton =
        document.getElementById("btn-register-newborn");

    if (!(registerButton instanceof HTMLButtonElement)) {
        return;
    }

    registerButton.addEventListener("click", () => {
        showNewbornForm();
    });
}


function bindAssignButtons(
    newborn: Newborn | null,
    assignedProcesses: AssignedProcess[],
    showNewbornForm: () => void,
    render: () => void
): void {

    document.querySelectorAll(".btn-assign")
        .forEach(btn => {

            btn.addEventListener("click", async (event) => {

                if (!newborn) {
                    showNewbornForm();
                    return;
                }

                const button =
                    event.currentTarget as HTMLButtonElement;

                const processName =
                    button.dataset.process;

                if (!processName) {
                    return;
                }

                const alreadyAssigned =
                    assignedProcesses.some(
                        assigned =>
                            assigned.processName === processName
                    );

                if (alreadyAssigned) {
                    return;
                }

                try {

                    const assignedProcess =
                        await assignProcess(
                            newborn.id,
                            processName
                        );

                    assignedProcesses.push(
                        assignedProcess
                    );

                    render();

                } catch (error) {

                    console.error(error);

                    alert(
                        error instanceof Error
                            ? error.message
                            : "Unable to assign process."
                    );
                }
            });
        });
}


function bindCompleteButtons(
    assignedProcesses: AssignedProcess[],
    render: () => void
): void {

    document.querySelectorAll(".btn-complete")
        .forEach(btn => {

            btn.addEventListener("click", async (event) => {

                const button =
                    event.currentTarget as HTMLButtonElement;

                const processName =
                    button.dataset.process;

                if (!processName) {
                    return;
                }

                const assigned =
                    assignedProcesses.find(
                        process =>
                            process.processName === processName
                    );

                if (
                    !assigned ||
                    assigned.status !== ProcessStatus.PENDING
                ) {
                    return;
                }

                try {

                    const updatedProcess =
                        await completeProcess(
                            assigned.newbornId,
                            processName
                        );

                    assigned.status =
                        updatedProcess.status;

                    render();

                } catch (error) {

                    console.error(error);

                    alert(
                        error instanceof Error
                            ? error.message
                            : "Unable to complete process."
                    );
                }
            });
        });
}



function bindCancelButtons(
    assignedProcesses: AssignedProcess[],
    render: () => void
): void {

    document.querySelectorAll(".btn-cancel")
        .forEach(btn => {

            btn.addEventListener("click", async (event) => {

                const button =
                    event.currentTarget as HTMLButtonElement;

                const processName =
                    button.dataset.process;

                if (!processName) {
                    return;
                }

                const assigned =
                    assignedProcesses.find(
                        process =>
                            process.processName === processName
                    );

                if (
                    !assigned ||
                    assigned.status !== ProcessStatus.PENDING
                ) {
                    return;
                }

                try {

                    const updatedProcess =
                        await cancelProcess(
                            assigned.newbornId,
                            processName
                        );

                    assigned.status =
                        updatedProcess.status;

                    render();

                } catch (error) {

                    console.error(error);

                    alert(
                        error instanceof Error
                            ? error.message
                            : "Unable to cancel process."
                    );
                }
            });
        });
}