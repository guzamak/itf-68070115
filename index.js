let accountBalance = 1000;
let cashBalance = 1000;
let logCount = 0;

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("accountBalanceInput").value = accountBalance;
  document.getElementById("cashBalanceInput").value = cashBalance;

  document.getElementById("btnChange").addEventListener("click", changeBalances);
  document.getElementById("btnProceed").addEventListener("click", processOperation);
});

function changeBalances() {
  const accInput = document.getElementById("accountBalanceInput");
  const cashInput = document.getElementById("cashBalanceInput");

  accountBalance = Number(accInput.value);
  cashBalance = Number(cashInput.value);

  logCount++;
  addLog("Balances updated successfully.");
}

function processOperation() {
  const mode = document.getElementById("operationType").value;
  const amount = Number(document.getElementById("operationAmount").value);

  if (amount <= 0 || isNaN(amount)) return;

  logCount++;
  if (mode === "Deposit") {
    if (amount <= cashBalance) {
      accountBalance += amount;
      cashBalance -= amount;
      addLog(`Deposited ${amount}.`);
    } else {
      addLog("Error: Not enough cash to deposit.", true);
    }
  } else if (mode === "Withdraw") {
    if (amount <= accountBalance) {
      accountBalance -= amount;
      cashBalance += amount;
      addLog(`Withdrew ${amount}.`);
    } else {
      addLog("Error: Insufficient account balance.", true);
    }
  }

  document.getElementById("accountBalanceInput").value = accountBalance;
  document.getElementById("cashBalanceInput").value = cashBalance;
}

function addLog(message, isError = false) {
  const logBox = document.getElementById("logBox");
  const prefix = isError ? "[ERROR]" : "[INFO]";
  logBox.value += `${logCount} ${prefix} ${message} | Account: ${accountBalance}, Cash: ${cashBalance}\n`;
  logBox.scrollTop = logBox.scrollHeight;
}