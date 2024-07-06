document.addEventListener("DOMContentLoaded", function() {
    var phoneForm = document.getElementById("phone-form");
    var countrySelect = document.getElementById("dropdown");
    var phoneInput = document.getElementById("user-input");
    var resultDiv = document.getElementById("results-div");

    phoneForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent the form from submitting

      var countryCode = countrySelect.value;
      var phoneNumber = phoneInput.value.trim();

      if (!countryCode || !phoneNumber) {
        resultDiv.textContent = "Please select a country and enter a phone number.";
        resultDiv.style.color = "red";
        return;
      }

      try {
        // Parse phone number using libphonenumber-js
        var phoneUtil = libphonenumber.parsePhoneNumber(phoneNumber, countryCode);
        var isValid = phoneUtil.isValid();
        var formattedNumber = phoneUtil.formatInternational();

        if (isValid) {
          resultDiv.textContent = `Valid phone number: ${formattedNumber}`;
          resultDiv.style.color = "green";
        } else {
          resultDiv.textContent = "Invalid phone number.";
          resultDiv.style.color = "red";
        }
      } catch (error) {
        resultDiv.textContent = "Error validating phone number.";
        resultDiv.style.color = "red";
      }
    });

    document.getElementById("clear-btn").addEventListener("click", function() {
      phoneInput.value = "";
      countrySelect.selectedIndex = 0;
      resultDiv.textContent = "";
    });
  });