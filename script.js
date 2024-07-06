document.addEventListener('DOMContentLoaded', function () {
    const phoneForm = document.getElementById('phone-form');
    const select = document.getElementById('dropdown');
    const selected = select.querySelector('.selected');
    const optionsContainer = select.querySelector('.options-container');
    const options = select.querySelectorAll('.option');
    const phoneNumberInput = document.getElementById('user-input');
    const checkButton = document.getElementById('check-btn');
    const clearButton = document.getElementById('clear-btn');
    const resultsDiv = document.getElementById('results-div');

    optionsContainer.style.display = 'none';

    selected.addEventListener('click', () => {
        if (optionsContainer.style.display === 'none') {
            optionsContainer.style.display = 'block';
        } else {
            optionsContainer.style.display = 'none';
        }
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerHTML = option.innerHTML;
            selected.setAttribute('data-value', option.getAttribute('data-value'));
            optionsContainer.style.display = 'none';
        });
    });

    document.addEventListener('click', (e) => {
        if (!select.contains(e.target)) {
            optionsContainer.style.display = 'none';
        }
    });

    if (!phoneForm || !select || !phoneNumberInput || !checkButton || !clearButton || !resultsDiv) {
        console.error('Required elements not found.');
        return;
    }

    phoneForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const phoneNumber = phoneNumberInput.value.trim();
        const countryCode = selected.getAttribute('data-value');

        let isValid = false;
        let formattedNumber = phoneNumber;

        if (!countryCode) {
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
        selected.innerHTML = 'Select Country';
        resultsDiv.textContent = '';
    });
});
