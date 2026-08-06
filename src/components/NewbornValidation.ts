import type { Newborn } from "../models";


export function validateNewborn(newborn: Newborn) {

    if (newborn.id <= 0) {

        return {
            valid: false,
            message: "ID must be greater than 0."
        };

    }


    if (newborn.name.length < 5) {

        return {
            valid: false,
            message: "Name must contain at least 2 characters."
        };

    }


    if (!newborn.birthDateTime) {

    return {
        valid:false,
        message:"Birth date is required."
    };

}


const birthDate = new Date(newborn.birthDateTime);
const today = new Date();


if (birthDate > today) {

    return {
        valid:false,
        message:"Birth date cannot be in the future."
    };

}

    if (newborn.weight < 0.5 || newborn.weight > 8) {

        return {
            valid: false,
            message: "Weight must be between 0.5 and 8 kg."
        };

    }


    if (
        newborn.gestationalAge < 22 ||
        newborn.gestationalAge > 45
    ) {

        return {
            valid: false,
            message: "Gestational age must be between 22 and 45 weeks."
        };

    }

    if (newborn.contacts.length === 0) {

        return {
            valid: false,
            message: "At least one parent contact is required."
        };

    }

    if (newborn.contacts[0]?.fullName.length < 5) {

        return {
            valid: false,
            message: "Contact name must contain at least 5 characters."
        };

    }

    if (!newborn.contacts[0]?.email.includes("@")) {

        return {
            valid: false,
            message: "Invalid email address."
        };

    }


    return {
        valid: true,
        message: ""
    };

}