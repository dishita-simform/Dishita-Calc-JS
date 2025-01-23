let screen = document.getElementById("screen");
let memory = 0;
let memoryDisplay = document.getElementById("memoryDisplay");

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
}

// Delete the last character
function deleteLast() {
    if (screen.value === "Error" || screen.value === "NaN") {
        screen.value = "";
    } else {
        screen.value = screen.value.slice(0, -1);
    }
}

// Function to evaluate the expression
function calculate() {
    try {
        screen.value = roundToFour(eval(screen.value)); // Using eval to evaluate the expression
    } catch (error) {
        screen.value = "Error";
    }
}

// Memory functions
function memoryAdd() {
    try {
        memory += parseFloat(screen.value);
        updateMemoryDisplay();
    } catch (error) {
        screen.value = "Error";
    }
}

function memorySubtract() {
    try {
        memory -= parseFloat(screen.value);
        updateMemoryDisplay();
    } catch (error) {
        screen.value = "Error";
    }
}

function memoryStore() {
    try {
        memory = parseFloat(screen.value);
        updateMemoryDisplay();
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
    memoryDisplay.innerHTML = `Memory: ${roundToFour(memory)}`;
}

// Scientific operations
function square() {
    try {
        screen.value = roundToFour(Math.pow(parseFloat(screen.value), 2));
    } catch (error) {
        screen.value = "Error";
    }
}

function squareRoot() {
    try {
        screen.value = roundToFour(Math.sqrt(parseFloat(screen.value)));
    } catch (error) {
        screen.value = "Error";
    }
}

function cube() {
    try {
        screen.value = roundToFour(Math.pow(parseFloat(screen.value), 3));
    } catch (error) {
        screen.value = "Error";
    }
}

function cubicRoot() {
    try {
        screen.value = roundToFour(Math.cbrt(parseFloat(screen.value)));
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
        screen.value = roundToFour(parseFloat(screen.value) * -1);
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
    }
});

// Percentage function
function percentage() {
    try {
        screen.value = roundToFour(parseFloat(screen.value) / 100);
    } catch (error) {
        screen.value = "Error";
    }
}
