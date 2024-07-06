document.addEventListener('DOMContentLoaded', function () {
    const phoneForm = document.getElementById('phone-form');
    const countryDropdown = document.getElementById('dropdown');
    const phoneNumberInput = document.getElementById('user-input');
    const checkButton = document.getElementById('check-btn');
    const clearButton = document.getElementById('clear-btn');
    const resultsDiv = document.getElementById('results-div');

    if (!phoneForm || !countryDropdown || !phoneNumberInput || !checkButton || !clearButton || !resultsDiv) {
        console.error('Required elements not found.');
        return;
    }

    phoneForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const phoneNumber = phoneNumberInput.value.trim();
        const countryCode = countryDropdown.value;
        let isValid = false;
        let formattedNumber = phoneNumber;


        if (countryCode === '') {
            resultsDiv.textContent = 'Please select a country.';
            return;
        }

        try {
            if (countryCode.toUpperCase() === 'US') {
                isValid = validateUSPhoneNumber(phoneNumber);
                if (isValid) {
                    formattedNumber = formatUSPhoneNumber(phoneNumber);
                }
            } else {

                const parsedNumber = libphonenumber.parsePhoneNumberFromString(phoneNumber, countryCode.toUpperCase());
                isValid = parsedNumber.isValid();
                formattedNumber = parsedNumber.formatInternational();
            }
        } catch (error) {
            console.error('Error validating phone number:', error);
            isValid = false;
        }


        if (isValid) {
            resultsDiv.textContent = `Valid ${countryCode} number: ${formattedNumber}`;
        } else {
            resultsDiv.textContent = `Invalid ${countryCode} number: ${phoneNumber}`;
        }
    });


    function validateUSPhoneNumber(phoneNumber) {
        const usPhoneRegex = /^(1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/;
        return usPhoneRegex.test(phoneNumber);
    }


    function formatUSPhoneNumber(phoneNumber) {
        const match = phoneNumber.match(/^(1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/);
        if (match) {
            return phoneNumber;
        }
        return phoneNumber;
    }


    clearButton.addEventListener('click', function (event) {
        event.preventDefault();
        phoneNumberInput.value = '';
        countryDropdown.value = '';
        resultsDiv.textContent = '';
    });
});
