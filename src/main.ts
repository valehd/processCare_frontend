import { type AssignedProcess, type HealthcareProcess, type Newborn, ProcessStatus } from './models/process';
import { generateCatalogCardHtml, generateAssignedCardHtml } from './components/ProcessCard';
import {loadAssignedProcesses, loadHealthcareProcesses, loadNewborn} from './services/processService';
import { generateNewbornFormHtml, bindNewbornForm } from './components/NewbornForm';


let newborn: Newborn | null = null;
let healthcareProcesses: HealthcareProcess[] = [];
let assignedProcesses: AssignedProcess[] = [];

function render(): void {
    const appContainer = document.getElementById('app');
    if (!appContainer) return;

    const assignedNames = new Set(assignedProcesses.map(a => a.process.name));

    const catalogHtml = healthcareProcesses
        .map(p => generateCatalogCardHtml(p, assignedNames.has(p.name)))
        .join('');

    const assignedHtml = assignedProcesses.length > 0
        ? assignedProcesses.map(a => generateAssignedCardHtml(a)).join('')
        : `<p class="empty-state">No processes assigned yet.</p>`;

    appContainer.innerHTML = `
        <header class="app-header">
            <div class="header-content">
                <img src="/logo.png" alt="ProcessCare logo" class="header-logo" />
                <div>
                    <h1>ProcessCare</h1>
                    <p class="header-subtitle">Neonatal Healthcare Process Management</p>
                </div>
            </div>
             <button
            id="btn-register-newborn"
            class="btn"
        >
            + Register Newborn
        </button>
        </header>
        <main id="container-list">
           <div class="patient-info">

    <h2>Patient Information</h2>

    <p>
        <strong>Name:</strong>
        ${newborn?.name ?? 'No newborn registered'}
    </p>

    <p>
        <strong>Birth date:</strong>
        ${newborn?.birthDateTime ?? '-'}
    </p>

    <p>
        <strong>Weight:</strong>
        ${newborn?.weight ?? '-'} kg
    </p>

    <p>
        <strong>Gestational age:</strong>
        ${newborn?.gestationalAge ?? '-'} weeks
    </p>

    <p>
        <strong>Gender:</strong>
        ${newborn?.gender ?? '-'}
    </p>

    <p>
        <strong>NICU:</strong>
        ${newborn?.admittedToNICU ? 'Yes' : 'No'}
    </p>


    <h3>Contacts</h3>

    ${
        newborn?.contacts?.map(contact => `
            <div class="contact-card">

                <p>
                    <strong>${contact.relationship}</strong>
                </p>

                <p>
                    ${contact.fullName}
                </p>

                <p>
                    ${contact.email}
                </p>

                <p>
                    ${contact.phone}
                </p>

            </div>
        `).join('')
        ?? '<p>No contacts</p>'
    }


</div>

            <section class="section">
                <h2 class="section-title">Available Processes</h2>
                <div class="catalog-grid">${catalogHtml}</div>
            </section>

            <section class="section">
                <h2 class="section-title">Assigned Processes</h2>
                <div class="cards-grid">${assignedHtml}</div>
            </section>
        </main>
    `;

    bindEvents();
}


function showNewbornForm(): void {

    const appContainer =
        document.getElementById('app');

    if (!appContainer) return;


    appContainer.innerHTML =
        generateNewbornFormHtml();


    bindNewbornForm((newbornData) => {

        newborn = newbornData;

        render();

    });
}

function bindEvents(): void {
    document.querySelectorAll('.btn-assign').forEach(btn => {
        btn.addEventListener('click', (e) => {
             if (!newborn) {
              showNewbornForm();
               return;
            }
            
            const processName = (e.currentTarget as HTMLButtonElement).dataset.process;
            if (!processName) return;



            const alreadyAssigned = assignedProcesses.some(a => a.process.name === processName);
            if (alreadyAssigned) return;

            assignedProcesses.push({
                newborn,
                process: { name: processName },
                status: ProcessStatus.PENDING,
            });
            render();
        });
    
    const registerButton =
    document.getElementById("btn-register-newborn");

registerButton?.addEventListener("click", () => {

    showNewbornForm();

});
    });

    document.querySelectorAll('.btn-complete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const processName = (e.currentTarget as HTMLButtonElement).dataset.process;
            const assigned = assignedProcesses.find(a => a.process.name === processName);
            if (assigned && assigned.status === ProcessStatus.PENDING) {
                assigned.status = ProcessStatus.COMPLETED;
                render();
            }
        });
    });

    document.querySelectorAll('.btn-cancel').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const processName = (e.currentTarget as HTMLButtonElement).dataset.process;
            const assigned = assignedProcesses.find(a => a.process.name === processName);
            if (assigned && assigned.status === ProcessStatus.PENDING) {
                assigned.status = ProcessStatus.CANCELLED;
                render();
            }
        });
    });
}

async function init(): Promise<void> {

    const appContainer = document.getElementById('app');

    if (appContainer) {
        appContainer.innerHTML =
            `<p class="loading-state">Loading...</p>`;
    }

    try {

        [newborn, healthcareProcesses, assignedProcesses] =
            await Promise.all([
        loadNewborn(),
        loadHealthcareProcesses(),
        loadAssignedProcesses()
    ]);
        if (!newborn) {
    showNewbornForm();
        } else {        
        render();

    } }
    catch (error) {

        console.error(error);

        if (appContainer) {
            appContainer.innerHTML = `
                <p class="error-state">
                    Unable to load application data.
                </p>
            `;
        }
    }
}

init();


