import type { Newborn } from "../models/process";

export async function saveNewborn(
    newborn: Newborn
): Promise<Newborn> {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve(newborn);

        }, 1000);

    });
}