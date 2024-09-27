// Set the initial balance and cash when the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  const currentDateTime = new Date().toLocaleString();
  document.getElementById('dateTime').innerText = `Date & Time: ${currentDateTime}`;

  // Set initial values for Balance (2000) and Cash (0)
  const rows = ['memory', 'banglalink', 'grameenphone', 'robi', 'airtel', 'bkash', 'nagad'];
  rows.forEach(row => {
    document.getElementById(`${row}Balance`).value = 2000;  // Starting balance is 2000
    document.getElementById(`${row}Cash`).value = 0;        // Starting cash is 0
  });

  // Set initial totals to 0
  document.getElementById('totalIn').value = 0;
  document.getElementById('totalOut').value = 0;
  document.getElementById('totalBalance').value = 2000 * rows.length; // Total balance is starting balance * number of rows
  document.getElementById('totalCash').value = 0;
});

// Function to calculate balance and cash for each row from the initial state
function recalculateValues() {
  const rows = ['memory', 'banglalink', 'grameenphone', 'robi', 'airtel', 'bkash', 'nagad'];
  let totalIn = 0, totalOut = 0, totalBalance = 0, totalCash = 0;

  rows.forEach(row => {
    // Get the initial values (2000 for balance, 0 for cash)
    const initialBalance = 2000;
    const initialCash = 0;

    // Get the current input values for "In" and "Out"
    const inValue = parseFloat(document.getElementById(`${row}In`).value) || 0;
    const outValue = parseFloat(document.getElementById(`${row}Out`).value) || 0;

    // Recalculate balance and cash from the initial values
    const newBalance = initialBalance + inValue - outValue;
    const newCash = initialCash + outValue - inValue;

    // Update the balance and cash fields
    document.getElementById(`${row}Balance`).value = newBalance;
    document.getElementById(`${row}Cash`).value = newCash;

    // Add to totals
    totalIn += inValue;
    totalOut += outValue;
    totalBalance += newBalance;
    totalCash += newCash;
  });

  // Update total fields
  document.getElementById('totalIn').value = totalIn;
  document.getElementById('totalOut').value = totalOut;
  document.getElementById('totalBalance').value = totalBalance;
  document.getElementById('totalCash').value = totalCash;
}

// Add event listeners to all In/Out input fields to recalculate values on input
const rows = ['memory', 'banglalink', 'grameenphone', 'robi', 'airtel', 'bkash', 'nagad'];
rows.forEach(row => {
  document.getElementById(`${row}In`).addEventListener('input', recalculateValues);
  document.getElementById(`${row}Out`).addEventListener('input', recalculateValues);
});

// Handle form submission
document.getElementById('telecomForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent page reload

  // Get the current submission date
  const submissionDate = new Date().toLocaleDateString(); // Only date part, not time

  // Capture all input values
  const formData = {};

  rows.forEach(row => {
    formData[row] = {
      in: parseFloat(document.getElementById(`${row}In`).value) || 0,
      out: parseFloat(document.getElementById(`${row}Out`).value) || 0,
      balance: parseFloat(document.getElementById(`${row}Balance`).value) || 2000,  // Initialize with 2000
      cash: parseFloat(document.getElementById(`${row}Cash`).value) || 0           // Initialize with 0
    };
  });

  // Structure the data with the date as the key
  const finalData = {
    [submissionDate]: formData
  };

  // Display the captured data
  document.getElementById('message').innerHTML = `
    <pre>${JSON.stringify(finalData, null, 2)}</pre>
  `;

  // Optionally clear form after submission
  document.getElementById('telecomForm').reset();

  // Reinitialize balance and cash after form reset
  rows.forEach(row => {
    document.getElementById(`${row}Balance`).value = 2000;  // Starting balance is 2000
    document.getElementById(`${row}Cash`).value = 0;        // Starting cash is 0
  });

  // Recalculate totals after resetting the form
  document.getElementById('totalIn').value = 0;
  document.getElementById('totalOut').value = 0;
  document.getElementById('totalBalance').value = 2000 * rows.length; // Total balance is starting balance * number of rows
  document.getElementById('totalCash').value = 0;
});
