import { ProcessStatus } from "../models";
import type { AssignedProcess, Newborn } from "../models";


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


        btn.addEventListener("click", (event) => {


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
                        assigned.process.name === processName
                );


            if (alreadyAssigned) {
                return;
            }


            assignedProcesses.push({

                newborn,

                process: {
                    name: processName
                },

                status: ProcessStatus.PENDING

            });


            render();

        });


    });

}



function bindCompleteButtons(
    assignedProcesses: AssignedProcess[],
    render: () => void
): void {


    document.querySelectorAll(".btn-complete")
        .forEach(btn => {


        btn.addEventListener("click", (event) => {


            const button =
                event.currentTarget as HTMLButtonElement;


            const processName =
                button.dataset.process;


            const assigned =
                assignedProcesses.find(
                    process =>
                        process.process.name === processName
                );


            if (
                assigned &&
                assigned.status === ProcessStatus.PENDING
            ) {


                assigned.status =
                    ProcessStatus.COMPLETED;


                render();

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


        btn.addEventListener("click", (event) => {


            const button =
                event.currentTarget as HTMLButtonElement;


            const processName =
                button.dataset.process;


            const assigned =
                assignedProcesses.find(
                    process =>
                        process.process.name === processName
                );


            if (
                assigned &&
                assigned.status === ProcessStatus.PENDING
            ) {


                assigned.status =
                    ProcessStatus.CANCELLED;


                render();

            }


        });


    });

}