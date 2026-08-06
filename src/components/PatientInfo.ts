import type { Newborn } from "../models";

export function generatePatientInfoHtml(
    newborn: Newborn | null
): string {

    if (!newborn) {
        return `
        <section class="patient-info">
            <h2>Patient Information</h2>
            <p>No newborn registered.</p>
        </section>
        `;
    }

    return `
    <section class="patient-info">

        <h2>Patient Information</h2>

        <p>
            <strong>Name:</strong>
            ${newborn.name}
        </p>

        <p>
            <strong>Birth date:</strong>
            ${newborn.birthDateTime}
        </p>

        <p>
            <strong>Weight:</strong>
            ${newborn.weight} kg
        </p>

        <p>
            <strong>Gestational age:</strong>
            ${newborn.gestationalAge} weeks
        </p>

        <p>
            <strong>Gender:</strong>
            ${newborn.gender}
        </p>

        <p>
            <strong>NICU:</strong>
            ${newborn.admittedToNICU ? "Yes" : "No"}
        </p>

        <h3>Contacts</h3>

        ${
            newborn.contacts.length > 0
                ? newborn.contacts.map(contact => `
                    <div class="contact-card">

                        <p>
                            <strong>${contact.relationship}</strong>
                        </p>

                        <p>${contact.fullName}</p>

                        <p>${contact.email}</p>

                        <p>${contact.phone}</p>

                    </div>
                `).join("")
                : "<p>No contacts.</p>"
        }

    </section>
    `;
}