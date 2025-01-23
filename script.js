let screen = document.getElementById("screen");
let memory = 0;
let firstValue = null; // Store the first number (x) for root calculation
let isRootMode = false; // Flag to check if the user is in root calculation mode

// Helper function to round off results to 4 decimal places
function roundToFour(value) {
    return parseFloat(value.toFixed(4));
}

// Append values to the screen
function appendToScreen(value) {
    screen.value += value;
}

// Clear the screen
function clearScreen() {
    screen.value = "";
    firstValue = null;  // Reset the stored value for root calculation
    isRootMode = false; // Reset the root calculation mode
}

// Delete the last character
function deleteLast() {
    screen.value = screen.value.slice(0, -1);
}

// Calculate the result of the expression
function calculate() {
    if (isRootMode) {
        let y = parseFloat(screen.value); // This is the second value (y)
        if (!isNaN(firstValue) && !isNaN(y) && y !== 0) {
            screen.value = roundToFour(Math.pow(firstValue, 1 / y));
        } else {
            screen.value = "Error";
        }
        firstValue = null;  // Reset the stored value after calculation
        isRootMode = false; // Exit root mode
    } else {
        try {
            screen.value = roundToFour(eval(screen.value));
        } catch (error) {
            screen.value = "Error";
        }
    }
}

// Square the current value
function square() {
    try {
        screen.value = roundToFour(Math.pow(parseFloat(screen.value), 2));
    } catch (error) {
        screen.value = "Error";
    }
}

// Reciprocal (1/x)
function reciprocal() {
    try {
        let value = parseFloat(screen.value);
        if (value !== 0) {
            screen.value = roundToFour(1 / value);
        } else {
            screen.value = "Error";
        }
    } catch (error) {
        screen.value = "Error";
    }
}

// Percentage (%) - Divide by 100 and add '*' for further input
function percentage() {
    try {
        let currentValue = parseFloat(screen.value);
        if (!isNaN(currentValue)) {
            screen.value = roundToFour(currentValue / 100) + "*";
        } else {
            screen.value = "Error";
        }
    } catch (error) {
        screen.value = "Error";
    }
}

// Modulus (mod) - Acts like percentage for modulus calculation
function mod() {
    appendToScreen("%");
}

// Memory functions (Add, Subtract, Store, Recall, Clear)
function memoryAdd() {
    try {
        memory += parseFloat(screen.value);
    } catch (error) {
        screen.value = "Error";
    }
}

function memorySubtract() {
    try {
        memory -= parseFloat(screen.value);
    } catch (error) {
        screen.value = "Error";
    }
}

function memoryStore() {
    try {
        memory = parseFloat(screen.value);
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
}

// Cube the current value
function cube() {
    try {
        screen.value = roundToFour(Math.pow(parseFloat(screen.value), 3));
    } catch (error) {
        screen.value = "Error";
    }
}

// Square root of the current value
function squareRoot() {
    try {
        screen.value = roundToFour(Math.sqrt(parseFloat(screen.value)));
    } catch (error) {
        screen.value = "Error";
    }
}

// Cube root of the current value
function cubicRoot() {
    try {
        screen.value = roundToFour(Math.cbrt(parseFloat(screen.value)));
    } catch (error) {
        screen.value = "Error";
    }
}

// Factorial of the current value
function factorial() {
    try {
        let value = parseInt(screen.value); // Get the current value from the screen
        if (value < 0) {
            screen.value = "Error"; // Factorial is not defined for negative numbers
        } else if (value === 0 || value === 1) {
            screen.value = 1; // 0! = 1 and 1! = 1
        } else {
            let result = 1;
            for (let i = 1; i <= value; i++) {
                result *= i;
            }
            screen.value = roundToFour(result); // Display the result rounded to 4 decimal places
        }
    } catch (error) {
        screen.value = "Error";
    }
}

// Toggle the sign of the current value (positive to negative, or vice versa)
function plusminus() {
    try {
        let currentValue = parseFloat(screen.value);  // Get the current value on the screen
        if (!isNaN(currentValue)) {  // Check if it's a valid number
            screen.value = roundToFour(currentValue * -1); // Multiply by -1 to toggle the sign
        } else {
            screen.value = "Error";  // Display an error if it's not a valid number
        }
    } catch (error) {
        screen.value = "Error";  // If an error occurs, show "Error"
    }
}

// Listen for keyboard input
document.addEventListener("keydown", function(event) {
    let key = event.key;
    if (key >= '0' && key <= '9') {
        appendToScreen(key); // Numbers 0-9
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToScreen(key); // Operators
    } else if (key === 'Enter') {
        calculate(); // Equal sign (Enter key)
    } else if (key === 'Backspace') {
        deleteLast(); // Delete (Backspace key)
    } else if (key === 'c' || key === 'C') {
        clearScreen(); // Clear (C or c key)
    } else if (key === 's' || key === 'S') {
        square(); // Square (S or s key)
    } else if (key === 'r' || key === 'R') {
        squareRoot(); // Square Root (R or r key)
    } else if (key === 't' || key === 'T') {
        cube(); // Cube (T or t key)
    } else if (key === 'p' || key === 'P') {
        percentage(); // Percentage (P or p key)
    } else if (key === 'm') {
        memoryRecall(); // Memory recall (M or m key)
    } else if (key === 'z' || key === 'Z') {
        memoryStore(); // Memory store (Z or z key)
    } else if (key === 'x' || key === 'X') {
        memoryClear(); // Memory clear (X or x key)
    } else if (key === 'a' || key === 'A') {
        memoryAdd(); // Memory add (A or a key)
    } else if (key === 'b' || key === 'B') {
        memorySubtract(); // Memory subtract (B or b key)
    } else if (key === 'f' || key === 'F') {
        factorial(); // Factorial (F or f key)
    } else if (key === 'm' || key === 'M') {
        plssminus(); // Plus/Minus (M or m key)
    }
});