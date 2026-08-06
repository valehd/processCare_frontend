import type { Newborn } from "../models";


export async function saveNewborn(
    newborn: Newborn
): Promise<Newborn> {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve(newborn);

        }, 1000);

    });

}