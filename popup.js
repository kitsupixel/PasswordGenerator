const alphaLowercase = "abcdefghijklmnopqrstuvwxyz";
const alphaUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+~|}{[]:;?><,./-=";

const passwordTxt = document.getElementById("password");
const passwordLength = document.getElementById("length");
const incAlphaLower = document.getElementById("alpha-lower");
const incAlphaUpper = document.getElementById("alpha-upper");
const incNumbers = document.getElementById("numbers");
const incSymbols = document.getElementById("symbols");
const generateBtn = document.getElementById("generate");
const alertMessage = document.getElementById("alert");


generateBtn.addEventListener("click", () => {
    let characters = "";
    let countSelected = 0;
    let passwordPattern = "^(";

    alertMessage.style.display = "none";

    if (incAlphaLower.checked) {
        characters += alphaLowercase;
        countSelected++;
        passwordPattern += "(?=.+[a-z])"
    }

    if (incAlphaUpper.checked) {
        characters += alphaUppercase;
        countSelected++;
        passwordPattern += "(?=.+[A-Z])"
    }

    if (incNumbers.checked) {
        characters += numbers;
        countSelected++;
        passwordPattern += "(?=.+[0-9])"
    }

    if (incSymbols.checked) {
        characters += symbols;
        countSelected++;
        passwordPattern += "(?=.+[!@#$%^&*()_+~|}{\\[\\]:;?><,\\.\\/\\-=])"
    }

    // Verifies if at least one options was selected
    if (countSelected == 0) {
        alertMessage.style.display = "block";
        return;
    }

    // Compiles a regex expression to verify if all options selected are met
    passwordPattern += `)(?=.{${passwordLength.value},})`

    passwordTxt.value = generatePassword(passwordLength.value, characters, RegExp(passwordPattern));

    savePreferences();
});

const copyBtn = document.getElementById("copy");

copyBtn.addEventListener("click", () => {
    passwordTxt.select();
    navigator.clipboard.writeText(password.value)
});

/**
 * Generates a random password
 * @param {int}     length 
 * @param {string}  characters 
 * @param {RegExp}  pattern 
 * @returns 
 */
const generatePassword = (length, characters, pattern) => {
    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }

    // Verifies if the password includes all of the selected options
    if (pattern.test(password))
        return password;

    return generatePassword(length, characters, pattern);
};



/**
 * Saves the selected options on the browser storage
 */
const savePreferences = () => {
    chrome.storage.sync.set({ "incAlphaLower": incAlphaLower.checked });
    chrome.storage.sync.set({ "incAlphaUpper": incAlphaUpper.checked });
    chrome.storage.sync.set({ "incNumbers": incNumbers.checked });
    chrome.storage.sync.set({ "incSymbols": incSymbols.checked });
    chrome.storage.sync.set({ "passwordLength": passwordLength.value });
    chrome.storage.sync.set({ "lastPassword": passwordTxt.value });
    chrome.alarms.clearAll(() => {
        chrome.alarms.create({
            periodInMinutes: 1
        });
    });
}

/**
 * Loads the user preferences
 */
function loadPreferences() {
    chrome.storage.sync.get(["incAlphaLower"], (result) => {
        incAlphaLower.checked = result["incAlphaLower"];
    });

    chrome.storage.sync.get(["incAlphaUpper"], (result) => {
        incAlphaUpper.checked = result["incAlphaUpper"];
    });

    chrome.storage.sync.get(["incNumbers"], (result) => {
        incNumbers.checked = result["incNumbers"];
    });

    chrome.storage.sync.get(["incSymbols"], (result) => {
        incSymbols.checked = result["incSymbols"];
    });

    chrome.storage.sync.get(["passwordLength"], (result) => {
        passwordLength.value = !isNaN(result["passwordLength"]) ? parseInt(result["passwordLength"]) : 16;
    });

    chrome.storage.sync.get(["lastPassword"], (result) => {
        passwordTxt.value = result["lastPassword"] ? result["lastPassword"] : "";
    });
}

loadPreferences();