import { Gender, Relationship, type Newborn } from "../models";
import { getNewbornFormData } from "./NewbornFormFields";
import { validateNewborn } from "./NewbornValidation";
import { saveNewborn } from "../services/newbornService";


export function generateNewbornFormHtml(): string {

return `
<section class="newborn-form">

<h2>Register Newborn</h2>

<form id="newborn-form">

<label>
ID
<input id="newborn-id" type="number" required />
</label>

<label>
Name
<input id="newborn-name" type="text" required />
</label>


<label>
Birth date and time
<input id="birth-date-time" type="datetime-local" required />
</label>


<label>
Weight (kg)
<input id="newborn-weight" type="number" step="0.01" required />
</label>


<label>
Gestational age (weeks)
<input id="gestational-age" type="number" required />
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

<input id="nicu" type="checkbox"/>

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
callback:(newborn:Newborn)=>void
):void{


const form =
document.getElementById("newborn-form");


if(!(form instanceof HTMLFormElement)){
return;
}



form.addEventListener(
"submit",
async(event)=>{


event.preventDefault();



const newborn =
getNewbornFormData();



const validation =
validateNewborn(newborn);



if(!validation.valid){


const error =
document.getElementById("form-error");


if(error){

error.textContent =
validation.message;

}


return;

}




try{


await saveNewborn(newborn);


callback(newborn);


}catch(error){


console.error(error);


const message =
document.getElementById("form-error");


if(message){

message.textContent =
"Unable to save newborn data.";

}


}



});

}