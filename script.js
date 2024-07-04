// Card
const cardCvc = document.querySelector("#card-cvc");
const cardNumber = document.querySelector("#card-number");
const cardholderName = document.querySelector("#cardholder-name");
const cardMonth = document.querySelector("#card-month");
const cardYear = document.querySelector("#card-year");

// Form
const form = document.querySelector(".form");
const nameForm = document.querySelector("#name-form");
const nameError = document.querySelector("#name-error");
const numberForm = document.querySelector("#number-form");
const numberError = document.querySelector("#number-error");
const monthForm = document.querySelector("#month-form");
const monthError = document.querySelector("#month-error");
const yearForm = document.querySelector("#year-form");
const yearError =  document.querySelector("#year-error");
const cvcForm = document.querySelector("#cvc-form");
const cvcError = document.querySelector("#cvc-error");
const formButton = document.querySelector("#button-form");

const completedDiv = document.querySelector(".completed-state");
const completedButton = document.querySelector("#button-completed");

const today = new Date();
const currentYear = parseInt(today.getFullYear().toString().slice(-2));
const currentMonth = today.getMonth();

nameForm.addEventListener("input", () => {
    cardholderName.textContent = nameForm.value;
});

numberForm.addEventListener("input", () => {
    const numberFormated = formatCardNumber(numberForm.value)
    cardNumber.textContent = numberFormated;
});

monthForm.addEventListener("input", () => {
    if (monthForm.value.length > 2) {
        monthForm.value = monthForm.value.slice(0, 2);
    }
    cardMonth.textContent = monthForm.value;
});

yearForm.addEventListener("input", () =>{
    if (yearForm.value.length > 2) {
        yearForm.value = yearForm.value.slice(0, 2);
    } 
    cardYear.textContent = yearForm.value;
});

cvcForm.addEventListener("input", () => {
    if (cvcForm.value.length > 3) {
        cvcForm.value = cvcForm.value.slice(0, 3);
    }
    cardCvc.textContent = cvcForm.value;
});

formButton.addEventListener("click", handdleSubmit);

completedButton.addEventListener("click", () => {
    form.classList.remove('hidden');
    completedDiv.classList.add('hidden');
    clearInformations();
})

function formatCardNumber(number) {
    const formatted = number.toString().replace(/(.{1,4})/g, '$1 ');
    return formatted;
}

function handdleSubmit(e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isCardNumberValid = validateCardNumber();
    const isCvcValid = validateCvc();
    const isDateValid = validateDate();

    if(isNameValid && isCardNumberValid && isCvcValid && isDateValid){
       form.classList.add('hidden');
       completedDiv.classList.remove('hidden');
    }
}

function validateName() {
    if(!nameForm.value){
        nameForm.classList.add("error");
        nameError.textContent = "Can't be blank";
        return false;
    }else {
        nameForm.classList.remove("error");
        nameError.textContent = "";
        return true;
    }
}

function validateCardNumber() {
    if (!numberForm.value) {
        numberError.textContent = "Can't be blank";
        numberForm.classList.add("error");
        return false;
    } else if (/[^\d]/.test(numberForm.value)) {
        numberError.textContent = "Wrong format, numbers only";
        numberForm.classList.add("error");
        return false;
    } else if (numberForm.value.length < 16) {
        numberError.textContent = "Must be 16 digits";
        numberForm.classList.add("error");
        return false;
    } else {
        numberForm.classList.remove("error");
        numberError.textContent = "";
        return true;
    }
}

function validateDate() {
    const monthValue = parseInt(monthForm.value);
    const yearValue = parseInt(yearForm.value);

    if(yearValue < currentYear || (yearValue === currentYear && monthValue < currentMonth)){
        monthForm.classList.add("error");
        yearForm.classList.add("error");
        monthError.textContent = "Expired card";
        return false;
    } else {
        monthForm.classList.remove("error");
        yearForm.classList.remove("error");
        monthError.textContent = "";
    }

    if(!monthForm.value){
        monthForm.classList.add("error");
        monthError.textContent = "Can't be blank";
    }else if(monthValue > 12 || monthValue === 0){
        monthForm.classList.add("error");
        monthError.textContent = "Invalid month";
    }else {
        monthForm.classList.remove("error");
        monthError.textContent = "";
    }

    if(!yearForm.value){
        yearForm.classList.add("error");
        yearError.textContent = "Can't be blank";
    }else {
        yearForm.classList.remove("error");
        yearError.textContent = "";
    }

    return true;
}

function validateCvc() {
    if(!cvcForm.value){
        cvcForm.classList.add("error");
        cvcError.textContent = "Can't be blank";
        return false;
    }else if(cvcForm.value.length < 3) {
        cvcForm.classList.add("error");
        cvcError.textContent = "Invalid";
        return false;
    }else {
        cvcForm.classList.remove("error");
        cvcError.textContent = "";
        return true;
    }
}

function clearInformations() {
    nameForm.value = "";
    numberForm.value = "";
    monthForm.value = "";
    yearForm.value = "";
    cvcForm.value = "";

    cardholderName.textContent = "Name";
    cardNumber.textContent = "0000 0000 0000 0000";
    cardMonth.textContent = "00";
    cardYear.textContent = "00";
    cardCvc.textContent = "000";
}