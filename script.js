document.addEventListener('DOMContentLoaded', function () {
    const phoneForm = document.getElementById('phone-form');
    const countryDropdown = document.getElementById('dropdown');
    const phoneNumberInput = document.getElementById('user-input');
    const checkButton = document.getElementById('check-btn');
    const clearButton = document.getElementById('clear-btn');

    if (!phoneForm || !countryDropdown || !phoneNumberInput || !checkButton || !clearButton) {
        console.error('Required elements not found.');
        return;
    }

    // Prevent form submission and handle validation
    phoneForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const phoneNumber = phoneNumberInput.value.trim();
        const countryCode = countryDropdown.value;
        let isValid = false;
        let formattedNumber = phoneNumber;

        if (countryCode === '') {
            alert('Please select a country.');
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
            alert(`Valid ${countryCode} number: ${formattedNumber}`);
        } else {
            alert(`Invalid ${countryCode} number: ${phoneNumber}`);
        }
    });

    // Function to validate US phone number based on specified regex
    function validateUSPhoneNumber(phoneNumber) {
        // Define your regex pattern for US phone numbers
        const usPhoneRegex = /^(1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/;
        return usPhoneRegex.test(phoneNumber);
    }

    // Function to format US phone number
    function formatUSPhoneNumber(phoneNumber) {
        const match = phoneNumber.match(/^(1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/);
        if (match) {
            return phoneNumber; // Return the phone number as is for demonstration
        }
        return phoneNumber; // Return original number if format doesn't match
    }

    // Event listener for clear button
    clearButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default button behavior (form submission, if any)
        phoneNumberInput.value = ''; // Clear the phone number input
        countryDropdown.value = ''; // Reset the country dropdown to default (if needed)
    });
});
