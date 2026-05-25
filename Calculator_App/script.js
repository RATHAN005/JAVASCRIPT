const display = document.getElementById("display");

const buttons = document.querySelectorAll("button");

const historyContainer = document.getElementById("history");

const themeToggle = document.getElementById("theme-toggle");

let currentInput = "";

// Check if value is an operator
function isOperator(value) {
    return ["+", "-", "*", "/"].includes(value);
}

// Update display
function updateDisplay() {
    display.value = currentInput;
}

// Add animation to display
function animateDisplay() {

    display.classList.add("animate");

    setTimeout(() => {
        display.classList.remove("animate");
    }, 150);
}

// Custom calculator parser
function calculate(expression) {

    const tokens =
        expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);

    if (!tokens) {
        return "";
    }

    let result = Number(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {

        const operator = tokens[i];

        const number = Number(tokens[i + 1]);

        switch (operator) {

            case "+":
                result += number;
                break;

            case "-":
                result -= number;
                break;

            case "*":
                result *= number;
                break;

            case "/":
                result /= number;
                break;
        }
    }

    return result;
}

// Save calculation history
function addToHistory(expression, result) {

    const historyItem =
        document.createElement("p");

    historyItem.textContent =
        `${expression} = ${result}`;

    historyContainer.prepend(historyItem);
}

// Calculate result
function calculateResult() {

    try {

        const expression = currentInput;

        const result =
            calculate(currentInput);

        currentInput =
            result.toString();

        display.value =
            currentInput;

        addToHistory(expression, result);

    } catch {

        display.value = "Error";

        currentInput = "";
    }
}

// Button clicks
buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const value =
            button.textContent;

        // Clear
        if (value === "C") {

            currentInput = "";

            updateDisplay();

            return;
        }

        // Backspace
        if (value === "⌫") {

            currentInput =
                currentInput.slice(0, -1);

            updateDisplay();

            return;
        }

        // Equals
        if (value === "=") {

            calculateResult();

            animateDisplay();

            return;
        }

        // Scientific functions
        if (value === "sin") {

            currentInput =
                Math.sin(
                    Number(currentInput)
                ).toString();

            updateDisplay();

            return;
        }

        if (value === "cos") {

            currentInput =
                Math.cos(
                    Number(currentInput)
                ).toString();

            updateDisplay();

            return;
        }

        if (value === "tan") {

            currentInput =
                Math.tan(
                    Number(currentInput)
                ).toString();

            updateDisplay();

            return;
        }

        if (value === "√") {

            currentInput =
                Math.sqrt(
                    Number(currentInput)
                ).toString();

            updateDisplay();

            return;
        }

        if (value === "x²") {

            currentInput =
                Math.pow(
                    Number(currentInput),
                    2
                ).toString();

            updateDisplay();

            return;
        }

        // Prevent invalid operators
        const lastCharacter =
            currentInput.slice(-1);

        if (
            isOperator(value) &&
            isOperator(lastCharacter)
        ) {
            return;
        }

        // Add value
        currentInput += value;

        updateDisplay();

        animateDisplay();
    });

});

// Keyboard support
document.addEventListener("keydown", (event) => {

    const key = event.key;

    const allowedKeys = [
        "0", "1", "2", "3", "4",
        "5", "6", "7", "8", "9",
        "+", "-", "*", "/", "."
    ];

    // Numbers/operators
    if (allowedKeys.includes(key)) {

        const lastCharacter =
            currentInput.slice(-1);

        if (
            isOperator(key) &&
            isOperator(lastCharacter)
        ) {
            return;
        }

        currentInput += key;

        updateDisplay();

        animateDisplay();
    }

    // Enter
    if (key === "Enter") {

        calculateResult();

        animateDisplay();
    }

    // Backspace
    if (key === "Backspace") {

        currentInput =
            currentInput.slice(0, -1);

        updateDisplay();
    }

    // Escape = Clear
    if (key === "Escape") {

        currentInput = "";

        updateDisplay();
    }
});

// Dark mode
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");
});