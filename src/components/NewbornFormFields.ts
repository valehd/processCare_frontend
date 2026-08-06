import { Gender, Relationship, type Newborn } from "../models";


export function getNewbornFormData(): Newborn {


const id =
Number(
(document.getElementById("newborn-id") as HTMLInputElement).value
);


const name =
(document.getElementById("newborn-name") as HTMLInputElement)
.value.trim();



const birthDateTime =
(document.getElementById("birth-date-time") as HTMLInputElement)
.value;



const weight =
Number(
(document.getElementById("newborn-weight") as HTMLInputElement)
.value
);



const gestationalAge =
Number(
(document.getElementById("gestational-age") as HTMLInputElement)
.value
);



const gender =
(document.getElementById("newborn-gender") as HTMLSelectElement)
.value as Gender;



const admittedToNICU =
(document.getElementById("nicu") as HTMLInputElement)
.checked;



const contactName =
(document.getElementById("contact-name") as HTMLInputElement)
.value.trim();



const email =
(document.getElementById("contact-email") as HTMLInputElement)
.value.trim();



const phone =
(document.getElementById("contact-phone") as HTMLInputElement)
.value.trim();



const relationship =
(document.getElementById("relationship") as HTMLSelectElement)
.value as Relationship;




return {

id,

name,

birthDateTime,

weight,

gestationalAge,

gender,

admittedToNICU,


contacts:[
{
fullName:contactName,
email,
phone,
relationship
}
]

};


}