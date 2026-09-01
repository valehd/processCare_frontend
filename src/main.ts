import { type AssignedProcess, type HealthcareProcess, type Newborn } from './models/process';
import { generateCatalogCardHtml, generateAssignedCardHtml } from './components/ProcessCard';
import {loadAssignedProcesses, loadHealthcareProcesses, loadNewborn} from './services/processService';
import { generateNewbornFormHtml, bindNewbornForm } from './components/NewbornForm';
import { generatePatientInfoHtml } from "./components/PatientInfo";
import { generateHeaderHtml } from "./components/Header";
import { bindProcessEvents } from "./events/ProcessEvents";

let newborn: Newborn | null = null;
let healthcareProcesses: HealthcareProcess[] = [];
let assignedProcesses: AssignedProcess[] = [];

function render(): void {
    const appContainer = document.getElementById('app');
    if (!appContainer) return;

    const assignedNames = new Set(
        assignedProcesses.map(a => a.processName)
    );

    const catalogHtml = healthcareProcesses
        .map(p => generateCatalogCardHtml(p, assignedNames.has(p.name)))
        .join('');

    const assignedHtml = assignedProcesses.length > 0
        ? assignedProcesses.map(a => generateAssignedCardHtml(a)).join('')
        : `<p class="empty-state">No processes assigned yet.</p>`;

    appContainer.innerHTML = `
        ${generateHeaderHtml()}
        <main id="container-list">
         
        ${generatePatientInfoHtml(newborn)}

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

    bindProcessEvents(
    newborn,
    assignedProcesses,
    showNewbornForm,
    render
);
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




async function init(): Promise<void> {

    const appContainer = document.getElementById('app');

    if (appContainer) {
        appContainer.innerHTML =
            `<p class="loading-state">Loading...</p>`;
    }

    try {

        newborn = await loadNewborn();

        healthcareProcesses = await loadHealthcareProcesses();

        if (newborn) {
            assignedProcesses =
                await loadAssignedProcesses(newborn.id);
        } else {
            assignedProcesses = [];
        }

        if (!newborn) {
            showNewbornForm();
        } else {
            render();
        }

    } catch (error) {

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


