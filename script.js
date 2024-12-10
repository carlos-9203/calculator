let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;

const display = document.getElementById("display");

function updateDisplay() {
    // Convert to scientific notation if the number is too long
    if (displayValue.length > 12) {
        display.textContent = parseFloat(displayValue).toExponential(5);
    } else {
        display.textContent = displayValue;
    }
}

document.querySelectorAll(".digit").forEach((button) =>
    button.addEventListener("click", () => {
        if (displayValue === "0" || displayValue === "Cannot divide by 0") {
            displayValue = button.textContent;
        } else {
            displayValue += button.textContent;
        }
        updateDisplay();
    })
);

document.querySelectorAll(".operator").forEach((button) =>
    button.addEventListener("click", () => {
        if (currentOperator && firstOperand !== null) {
            secondOperand = parseFloat(displayValue);
            const result = operate(currentOperator, firstOperand, secondOperand);
            displayValue = result.toString();
            updateDisplay();
            firstOperand = result;
        } else {
            firstOperand = parseFloat(displayValue);
        }
        currentOperator = button.textContent;
        displayValue = "0";
    })
);

document.getElementById("equals").addEventListener("click", () => {
    if (currentOperator && firstOperand !== null) {
        secondOperand = parseFloat(displayValue);
        const result = operate(currentOperator, firstOperand, secondOperand);
        displayValue = result.toString();
        updateDisplay();
        firstOperand = null;
        currentOperator = null;
    }
});

document.getElementById("clear").addEventListener("click", () => {
    displayValue = "0";
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    updateDisplay();
});

document.getElementById("decimal").addEventListener("click", () => {
    if (!displayValue.includes(".")) {
        displayValue += ".";
        updateDisplay();
    }
});

document.getElementById("backspace").addEventListener("click", () => {
    displayValue = displayValue.slice(0, -1) || "0";
    updateDisplay();
});

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b === 0 ? "Cannot divide by 0" : a / b;
        default:
            return "Invalid operator";
    }
}
