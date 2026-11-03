// Get HTML Elements
const dateInput = document.getElementById("date");
const refNoInput = document.getElementById("refNo");
const descriptionInput = document.getElementById("description");
const accountInput = document.getElementById("account");
const debitInput = document.getElementById("debit");
const creditInput = document.getElementById("credit");

const addRowBtn = document.getElementById("addRowBtn");
const saveJournalBtn = document.getElementById("saveJournalBtn");
const transactionBody = document.getElementById("transactionBody");

// Automatic Debit and Credit Calculation
debitInput.addEventListener("input", function () {

    if (debitInput.value !== "") {
        creditInput.value = "";
    }

});

creditInput.addEventListener("input", function () {

    if (creditInput.value !== "") {
        debitInput.value = "";
    }

});

// Add Transaction Row
addRowBtn.addEventListener("click", function () {

    // Get Input Values
    const date = dateInput.value;
    const refNo = refNoInput.value.trim();
    const description = descriptionInput.value.trim();
    const account = accountInput.value;
    const debit = debitInput.value;
    const credit = creditInput.value;

    // Validate Required Inputs
    if (!date || !refNo || !description || !account) {

        alert("Please complete all required fields!");
        return;

    }

    // Validate Debit and Credit
    if (
        (debit === "" && credit === "") ||
        (debit !== "" && credit !== "")
    ) {

        alert("Please enter either Debit or Credit, not both!");
        return;

    }

    // Validate Positive Amount
    if (
        (debit !== "" && Number(debit) <= 0) ||
        (credit !== "" && Number(credit) <= 0)
    ) {

        alert("Debit and Credit amounts must be greater than zero!");
        return;

    }

    // Create New Table Row
    const newRow = document.createElement("tr");

    // Create Table Cells
    const dateCell = document.createElement("td");
    const refNoCell = document.createElement("td");
    const descriptionCell = document.createElement("td");
    const accountCell = document.createElement("td");
    const debitCell = document.createElement("td");
    const creditCell = document.createElement("td");
    const actionCell = document.createElement("td");

    // Insert Data into Table Cells
    dateCell.textContent = date;
    refNoCell.textContent = refNo;
    descriptionCell.textContent = description;
    accountCell.textContent = account;

    debitCell.textContent = debit !== ""
        ? Number(debit).toLocaleString("en-US")
        : "-";

    creditCell.textContent = credit !== ""
        ? Number(credit).toLocaleString("en-US")
        : "-";

    // Create Delete Button
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    // Delete Transaction Row
    deleteBtn.addEventListener("click", function () {

        newRow.remove();

    });

    // Add Delete Button to Action Cell
    actionCell.appendChild(deleteBtn);

    // Append Cells to New Row
    newRow.appendChild(dateCell);
    newRow.appendChild(refNoCell);
    newRow.appendChild(descriptionCell);
    newRow.appendChild(accountCell);
    newRow.appendChild(debitCell);
    newRow.appendChild(creditCell);
    newRow.appendChild(actionCell);

    // Append New Row to Table Body
    transactionBody.appendChild(newRow);

    // Clear Form Inputs
    document.getElementById("journalForm").reset();

});

// Save Journal Button
saveJournalBtn.addEventListener("click", function () {

    alert("Journal successfully saved! (Data is not persistent)");

    // Clear All Transaction Rows
    transactionBody.innerHTML = "";

});