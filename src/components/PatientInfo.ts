
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

    const contacts = newborn.contacts ?? [];

    return `
<section class="patient-info">

    <h2>Patient Information</h2>

<p>
<strong>Name:</strong>
${newborn.name}
</p>

<p>
<strong>Birth date:</strong>
${newborn.birthDateTime ?? "Not available"}
</p>

<p>
<strong>Weight:</strong>
${newborn.weight ?? "Not available"} kg
</p>

<p>
<strong>Gestational age:</strong>
${newborn.gestationalAge ?? "Not available"} weeks
</p>

<p>
<strong>Gender:</strong>
${newborn.gender ?? "Not available"}
</p>

<p>
<strong>NICU:</strong>
${
    newborn.admittedToNICU !== undefined
        ? newborn.admittedToNICU ? "Yes" : "No"
        : "Not available"
}
</p>

<h3>Contacts</h3>

${
    contacts.length > 0
        ? contacts.map(contact => `
                    <div class="contact-card">

                        <p>
                            <strong>${contact.relationship}</strong>
                        </p>

                        <p>${contact.fullName}</p>

                        <p>${contact.email}</p>

                        <p>${contact.phone}</p>

                    </div>
                `).join("")
        : "<p>No contacts available.</p>"
}

</section>
    `;
}
