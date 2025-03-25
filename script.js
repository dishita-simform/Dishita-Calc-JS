let screen = document.getElementById("screen");
let memory = 0;
let memoryDisplay = document.getElementById("memoryDisplay");

function appendToScreen(value) {
    let screen = document.getElementById("screen");

    // If the screen contains an error, reset it before appending
    if (screen.value === "Error" || screen.value === "NaN") {
        screen.value = '';
    }

    // If the screen contains a result (not an operator) and the user enters a number, clear it
    if (!isNaN(screen.value) && screen.dataset.result === "true" && !isNaN(value)) {
        screen.value = ''; // Clear only if a new number is entered after a full calculation
    }

    // Reset the result flag
    screen.dataset.result = "false";

    // Add multiplication between a number and a function like log (but not inside brackets)
    if (screen.value && /\d$/.test(screen.value) && /log|sin|cos|tan/.test(value) && !screen.value.includes('(')) {
        screen.value += "*"; // Add multiplication automatically if a number is followed by a function
    }

    // Append the value to the screen
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
        screen.value='';
    } catch (error) {
        screen.value = "Error";
    }
}

function memorySubtract() {
    try {
        memory -= parseFloat(screen.value);
        updateMemoryDisplay();
        screen.value='';
    } catch (error) {
        screen.value = "Error";
    }
}

function memoryStore() {
    try {
        memory = parseFloat(screen.value);
        updateMemoryDisplay();
        screen.value='';
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
    // Check if a number is pressed after a result and clear the screen
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

// Function to handle the modulo operation
function mod() {
    try {
        // Get the current value from the screen
        let input = screen.value;

        // Check if there is a number on the screen and split it based on the operator '%'
        if (!input.includes('%')) {
            // If there is no '%' operator in the input, append it automatically.
            input += '%';
            screen.value = input; // Display updated input on the screen
        } else {
            // If the '%' operator exists, perform the modulo operation
            let numbers = input.split('%'); // Split the input into two parts

            if (numbers.length === 2) {
                let num1 = parseFloat(numbers[0].trim()); // First number
                let num2 = parseFloat(numbers[1].trim()); // Second number

                // Validate if both parts are valid numbers
                if (isNaN(num1) || isNaN(num2)) {
                    screen.value = "Error"; // Invalid input
                } else {
                    // Perform modulo operation
                    let result = num1 % num2;
                    screen.value = result; // Display the result
                }
            } else {
                screen.value = "Error"; // Invalid format
            }
        }
    } catch (error) {
        screen.value = "Error"; // Handle any unexpected errors
    }
}

function reciprocal() {
    try {
        let input = screen.value;
        
        // Check if the input has any brackets, if so, evaluate the expression inside them first
        if (input.includes('(') && input.includes(')')) {
            // Evaluate the expression inside brackets
            input = input.replace(/\(([^)]+)\)/g, function(match, p1) {
                return eval(p1); // Evaluate the expression inside the brackets
            });
        }
        
        // Now that the brackets are evaluated, calculate the reciprocal
        let value = parseFloat(input); // Convert the evaluated result to a number
        
        // Check if the value is zero to avoid division by zero
        if (value === 0) {
            screen.value = "Error"; // Display error if value is zero
        } else {
            screen.value = 1 / value; // Calculate reciprocal and update the screen
        }
    } catch (error) {
        screen.value = "Error"; // Handle any invalid input
    }
}
