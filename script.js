document.addEventListener("DOMContentLoaded", function() {
    const email = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const country = document.getElementById("country");
    const countryError = document.getElementById("country-error");
    const postalCode = document.getElementById("postal-code");
    const postalError = document.getElementById("postal-error");
    const password = document.getElementById("password");
    const passwordError = document.getElementById("password-error");
    const passwordConf = document.getElementById("password-confirmation");
    const passwordConfError = document.getElementById("passwConf-error");
    const form = document.getElementById("form");

    function showErrorEmail() {
        if(email.validity.valueMissing) {
            emailError.textContent = "You need to enter an email addres";
        } else if (email.validity.typeMismatch) {
            emailError.textContent = "Entered value needs to be an email addres"
        } else if (email.validity.tooShort) {
            emailError.textContent = `Email should be at least ${email.minLength} characters`;
        }
        emailError.className = "error active";
        email.classList.add("error-field");
    }

    function showErrorCountry(){
        const countryValue = country.value.trim();
        const countryRegex = /^[A-Za-z\s]+$/;

        if(country.validity.valueMissing) {
            countryError.textContent = "You need to enter a country name";
        } else if (!countryRegex.test(countryValue)) {
            countryError.textContent = "Country name should only have letters";
        }
        countryError.className = "error active";
        country.classList.add("error-field");
    }

    function showErrorPosCode (){
        const postalValue = postalCode.value.trim();
        const postalRegex = /^\d{4,10}$/;

        if (postalCode.validity.valueMissing) {
            postalError.textContent = "You need to enter a postal code";
        } else if (!postalRegex.test(postalValue)) {
            postalError.textContent = "Postal code must be 4 to 10 digits";
        }
        postalError.className = "error active";
        postalCode.classList.add("error-field");
    };

    function showErrorPassw() {
        const passwordValue = password.value.trim();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (password.validity.valueMissing) {
            passwordError.textContent = "You need to enter a password";
        } else if (!passwordRegex.test(passwordValue)) {
            passwordError.textContent = "Password must be at least 8 characters, contain one uppercase letter, one lowercase letter, and one number";
        }
        passwordError.className = "error active";
        password.classList.add("error-field");
    };

    function showErrorPasswConf () {
        if (passwordConf.value !== password.value) {
            passwordConfError.textContent = "Passwords do not match";
        }
        passwordConfError.className = "error active";
        passwordConf.classList.add("error-field");
    };


    email.addEventListener("input", () => {
        if(email.validity.valid) {
            emailError.textContent = "";
            emailError.className = "error";
        } else {
            showErrorEmail();
        }
    });

    country.addEventListener("input", () => {
        if(country.validity.valid && /^[A-Za-z\s]+$/.test(country.value.trim())) {
            countryError.textContent = "";
            countryError.className = "error";
        } else {
            showErrorCountry();
        }
    });

    postalCode.addEventListener("input", () => {
        if(postalCode.validity.valid && /^\d{4,10}$/.test(postalCode.value.trim())) {
            postalError.textContent = "";
            postalError.className = "error";
        } else {
            showErrorPosCode();
        }
    });

    password.addEventListener("input", () => {
        if(password.validity.valid && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password.value.trim())) {
            passwordError.textContent = "";
            passwordError.className = "error";
        } else {
            showErrorPassw();
        }
    });

    passwordConf.addEventListener("input", () => {
        if (passwordConf.value !== password.value) {
            showErrorPasswConf();
        } else {
            passwordConfError.textContent = "";
            passwordConfError.className = "error";
        }
    });

    form.addEventListener("submit", (event) => {
        let formValid = true;

        if (!email.validity.valid) {
            showErrorEmail();
            formValid = false;
        }
        if (!country.validity.valid || !/^[A-Za-z\s]+$/.test(country.value.trim())) {
            showErrorCountry();
            formValid = false;
        }
        if(!postalCode.validity.valid || !/^\d{4,10}$/.test(postalCode.value.trim())) {
            showErrorPosCode();
            formValid = false;
        }

        if (!password.validity.valid || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password.value.trim())) {
            showErrorPassw();
            formValid = false;
        }

        if (passwordConf.value !== password.value) {
            showErrorPasswConf();
            formValid = false;
        }
        if (!formValid){
            event.preventDefault();
        }
    });
});
