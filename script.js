let screen = document.getElementById("screen");
let memory = 0;
let memoryDisplay = document.getElementById("memoryDisplay");

function appendToScreen(value) {
    let screen = document.getElementById("screen");

    // If screen contains an error, reset it before appending
    if (screen.value === "Error" || screen.value === "NaN") {
        screen.value = '';
    }

    let lastChar = screen.value.slice(-1); // Get last character

    // If the last character is an operator and the new value is also an operator, replace it
    if (isOperator(lastChar) && isOperator(value)) {
        screen.value = screen.value.slice(0, -1);
    }

    // Append the new value
    screen.value += value;
}

// Function to check if a character is an operator
function isOperator(char) {
    return ['+', '-', '*', '/', '%'].includes(char);
}

// Clear the screen
function clearScreen() {
    screen.value = "";
}

// Delete the last character
function deleteLast() {
    if (screen.value === "Error" || screen.value === "NaN") {
        screen.value = "";
    } else {
        screen.value = screen.value.slice(0, -1);
    }
}

// Evaluate the expression
function calculate() {
    try {
        if (screen.value.includes('(') && !screen.value.includes(')')) {
            screen.value += ')'; // Automatically close open brackets
        }

        // Replace π with Math.PI and log with Math.log10 for proper evaluation
        screen.value = screen.value.replace(/π/g, 'Math.PI').replace(/log/g, 'Math.log10');

        // Evaluate the expression
        screen.value = eval(screen.value);

        // After calculating, check if the result is a valid number
        if (isNaN(screen.value)) {
            screen.value = "Error"; // Invalid result
        } else {
            screen.dataset.result = "true"; // Mark that a calculation was just completed
        }
    } catch (error) {
        screen.value = "Error"; // Handle any unexpected errors
    }
}

// Memory functions
function memoryAdd() {
    try {
        memory += parseFloat(screen.value);
        updateMemoryDisplay();
        screen.value = '';
    } catch (error) {
        screen.value = "Error";
    }
}

function memorySubtract() {
    try {
        memory -= parseFloat(screen.value);
        updateMemoryDisplay();
        screen.value = '';
    } catch (error) {
        screen.value = "Error";
    }
}

function memoryStore() {
    try {
        memory = parseFloat(screen.value);
        updateMemoryDisplay();
        screen.value = '';
    } catch (error) {
        screen.value = "Error";
    }
}

function memoryRecall() {
    screen.value = memory;
}

function memoryClear() {
    memory = 0;
    screen.value = "0";
    updateMemoryDisplay();
}

function updateMemoryDisplay() {
    memoryDisplay.innerHTML = `Memory: ${memory}`;
}

// Scientific operations
function square() {
    try {
        screen.value = Math.pow(parseFloat(screen.value), 2);
    } catch (error) {
        screen.value = "Error";
    }
}

function squareRoot() {
    try {
        screen.value = Math.sqrt(parseFloat(screen.value));
    } catch (error) {
        screen.value = "Error";
    }
}

function cube() {
    try {
        screen.value = Math.pow(parseFloat(screen.value), 3);
    } catch (error) {
        screen.value = "Error";
    }
}

function cubicRoot() {
    try {
        screen.value = Math.cbrt(parseFloat(screen.value));
    } catch (error) {
        screen.value = "Error";
    }
}

function factorial() {
    try {
        let value = parseInt(screen.value);
        if (value >= 0) {
            let result = 1;
            for (let i = 1; i <= value; i++) {
                result *= i;
            }
            screen.value = result;
        } else {
            screen.value = "Error";
        }
    } catch (error) {
        screen.value = "Error";
    }
}

function plusminus() {
    try {
        screen.value = parseFloat(screen.value) * -1;
    } catch (error) {
        screen.value = "Error";
    }
}

// Handle keyboard input
document.addEventListener("keydown", function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendToScreen(event.key);
    } else if (event.key === 'Enter') {
        calculate();
    } else if (event.key === 'Backspace') {
        deleteLast();
    } else if (event.key === '.') {
        appendToScreen('.');
    } else if (event.key === '+') {
        appendToScreen('+');
    } else if (event.key === '-') {
        appendToScreen('-');
    } else if (event.key === '*') {
        appendToScreen('*');
    } else if (event.key === '/') {
        appendToScreen('/');
    } else if (event.key === '%') {
        percentage();
    } else if (event.key === 'p') { // Pi input
        appendToScreen('π');
    } else if (event.key === 'c' || event.key === 'C') {
        clearScreen();
    }
});

// Percentage function
function percentage() {
    try {
        screen.value = parseFloat(screen.value) / 100;
    } catch (error) {
        screen.value = "Error";
    }
}

// Append 'Math.log(' when the log button is clicked
function appendLog() {
    appendToScreen('log(');
}

// Append 'π' when the π button is clicked
function appendPi() {
    appendToScreen('π');
}

// Modulo operation
function mod() {
    try {
        let input = screen.value;

        if (!input.includes('%')) {
            input += '%';
            screen.value = input;
        } else {
            let numbers = input.split('%');

            if (numbers.length === 2) {
                let num1 = parseFloat(numbers[0].trim());
                let num2 = parseFloat(numbers[1].trim());

                if (isNaN(num1) || isNaN(num2)) {
                    screen.value = "Error";
                } else {
                    screen.value = num1 % num2;
                }
            } else {
                screen.value = "Error";
            }
        }
    } catch (error) {
        screen.value = "Error";
    }
}

// Reciprocal function
function reciprocal() {
    try {
        let value = parseFloat(screen.value);

        if (value === 0) {
            screen.value = "Error";
        } else {
            screen.value = 1 / value;
        }
    } catch (error) {
        screen.value = "Error";
    }
}