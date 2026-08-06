import { Gender, Relationship, type Newborn } from "../models";


export function generateNewbornFormHtml(): string {

    return `
    <section class="newborn-form">

        <h2>Register Newborn</h2>

        <form id="newborn-form">

            <label>
                ID
                <input 
                    id="newborn-id"
                    type="number"
                    min="1"
                    required
                />
            </label>


            <label>
                Name
                <input 
                    id="newborn-name"
                    type="text"
                    required
                />
            </label>


            <label>
                Birth date and time
                <input 
                    id="birth-date-time"
                    type="datetime-local"
                    required
                />
            </label>


            <label>
                Weight (kg)
                <input 
                    id="newborn-weight"
                    type="number"
                    step="0.01"
                    required
                />
            </label>


            <label>
                Gestational age (weeks)
                <input 
                    id="gestational-age"
                    type="number"
                    required
                />
            </label>


            <label>
                Gender
                <select id="newborn-gender">
                    <option value="${Gender.MALE}">
                        Male
                    </option>

                    <option value="${Gender.FEMALE}">
                        Female
                    </option>
                </select>
            </label>


            <label>
                Admitted to NICU

                <input 
                    id="nicu"
                    type="checkbox"
                />

            </label>


            <h3>Parent Contact</h3>


            <label>
                Contact name
                <input 
                    id="contact-name"
                    type="text"
                    required
                />
            </label>


            <label>
                Email
                <input 
                    id="contact-email"
                    type="email"
                    required
                />
            </label>


            <label>
                Phone
                <input 
                    id="contact-phone"
                    type="tel"
                    required
                />
            </label>


            <label>
                Relationship

                <select id="relationship">

                    <option value="${Relationship.MOTHER}">
                        Mother
                    </option>

                    <option value="${Relationship.FATHER}">
                        Father
                    </option>

                    <option value="${Relationship.GUARDIAN}">
                        Guardian
                    </option>

                </select>

            </label>


            <button type="submit">
                Register Newborn
            </button>


            <p id="form-error"></p>

        </form>

    </section>
    `;
}

export function bindNewbornForm(
    callback: (newborn: Newborn) => void
): void {

    const form = document.getElementById("newborn-form");

    if (!(form instanceof HTMLFormElement)) {
        return;
    }


    form.addEventListener("submit", (event) => {

        event.preventDefault();


        const idInput =
            document.getElementById("newborn-id");

        const nameInput =
            document.getElementById("newborn-name");

        const birthDateInput =
            document.getElementById("birth-date-time");

        const weightInput =
            document.getElementById("newborn-weight");

        const gestationalInput =
            document.getElementById("gestational-age");

        const genderInput =
            document.getElementById("newborn-gender");

        const nicuInput =
            document.getElementById("nicu");

        const contactNameInput =
            document.getElementById("contact-name");

        const emailInput =
            document.getElementById("contact-email");

        const phoneInput =
            document.getElementById("contact-phone");

        const relationshipInput =
            document.getElementById("relationship");


        if (
            !(idInput instanceof HTMLInputElement) ||
            !(nameInput instanceof HTMLInputElement) ||
            !(birthDateInput instanceof HTMLInputElement) ||
            !(weightInput instanceof HTMLInputElement) ||
            !(gestationalInput instanceof HTMLInputElement) ||
            !(genderInput instanceof HTMLSelectElement) ||
            !(nicuInput instanceof HTMLInputElement) ||
            !(contactNameInput instanceof HTMLInputElement) ||
            !(emailInput instanceof HTMLInputElement) ||
            !(phoneInput instanceof HTMLInputElement) ||
            !(relationshipInput instanceof HTMLSelectElement)
        ) {
            return;
        }

        // Read values

const id = Number(idInput.value);

const name = nameInput.value.trim();

const birthDateTime = birthDateInput.value;

const weight = Number(weightInput.value);

const gestationalAge = Number(gestationalInput.value);

const gender = genderInput.value as Gender;

const admittedToNICU = nicuInput.checked;

const contactName = contactNameInput.value.trim();

const email = emailInput.value.trim();

const phone = phoneInput.value.trim();

const relationship =
    relationshipInput.value as Relationship;


const error =
    document.getElementById("form-error");

if (!(error instanceof HTMLParagraphElement)) {
    return;
}

error.textContent = "";


// ---------- Validations ----------

// ID
if (id <= 0) {

    error.textContent =
        "ID must be greater than 0.";

    return;
}

// Name
if (name.length < 2) {

    error.textContent =
        "Name must contain at least 2 characters.";

    return;
}

if (/^\d+$/.test(name)) {

    error.textContent =
        "Name cannot contain only numbers.";

    return;
}

// Birth date
if (!birthDateTime) {

    error.textContent =
        "Birth date is required.";

    return;
}

// Weight
if (weight < 0.5 || weight > 8) {

    error.textContent =
        "Weight must be between 0.5 and 8 kg.";

    return;
}

// Gestational age
if (gestationalAge < 22 || gestationalAge > 45) {

    error.textContent =
        "Gestational age must be between 22 and 45 weeks.";

    return;
}

// Contact name
if (contactName.length < 2) {

    error.textContent =
        "Contact name is required.";

    return;
}

// Email
if (!email.includes("@")) {

    error.textContent =
        "Invalid email address.";

    return;
}

// Phone
if (!/^\+?\d{8,15}$/.test(phone)) {

    error.textContent =
        "Invalid phone number.";

    return;
}


        const newborn: Newborn = {

    id,

    name,

    birthDateTime,

    weight,

    gestationalAge,

    gender,

    admittedToNICU,

    contacts: [
        {
            fullName: contactName,
            email,
            phone,
            relationship
        }
    ]
};


        callback(newborn);

    });
}