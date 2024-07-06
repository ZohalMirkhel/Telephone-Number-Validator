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

    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    const PNF = libphonenumber.PhoneNumberFormat;

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

        if (!phoneNumber) {
            alert('Please provide a phone number');
            return;
        }

        let isValid = false;
        let formattedNumber = phoneNumber;

        if (!countryCode) {
            resultsDiv.textContent = 'Please select a country.';
            return;
        }

        try {
            const parsedNumber = phoneUtil.parse(phoneNumber, countryCode.toUpperCase());
            isValid = phoneUtil.isValidNumber(parsedNumber);
            formattedNumber = phoneUtil.format(parsedNumber, PNF.INTERNATIONAL);
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

    clearButton.addEventListener('click', function (event) {
        event.preventDefault();
        phoneNumberInput.value = '';
        selected.innerHTML = 'Select Country';
        resultsDiv.textContent = '';
    });
});
