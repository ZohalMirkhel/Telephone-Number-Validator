document.addEventListener('DOMContentLoaded', function () {
    const phoneForm = document.getElementById('phone-form');
    const countryDropdown = document.getElementById('dropdown');
    const phoneNumberInput = document.querySelector('input[name="phone"]');
  
    phoneForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const phoneNumber = phoneNumberInput.value.trim();
      const countryCode = countryDropdown.value;
      let isValid = false;
      let formattedNumber = phoneNumber;
  
      if (countryCode === '') {
        window.alert('Please select a country.');
        return;
      }
  
      try {
        // Adjust parsing based on expected format for the selected country
        const parsedNumber = libphonenumber.parsePhoneNumberFromString(phoneNumber, countryCode.toUpperCase());
        isValid = parsedNumber.isValid();
        formattedNumber = parsedNumber.formatInternational();
      } catch (error) {
        isValid = false;
      }
  
      if (isValid) {
        window.alert(`Valid ${countryCode} number: ${formattedNumber}`);
      } else {
        window.alert(`Invalid ${countryCode} number: ${phoneNumber}`);
      }
    });
  
    countryDropdown.addEventListener('change', function () {
      const selectedOption = countryDropdown.options[countryDropdown.selectedIndex];
      const countryCode = selectedOption.value;
      const flagClass = `fi fi-${countryCode.toLowerCase()}`;
  
      countryDropdown.className = '';
      countryDropdown.classList.add('select-box', flagClass);
    });
  });
  