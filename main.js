
        const display = document.querySelector('.display');
        const previousOperandElement = document.querySelector('.previous-operand');
        const currentOperandElement = document.querySelector('.current-operand');
        const clearButton = document.querySelector('.clear');
        const deleteButton = document.querySelector('.delete');
        const equalsButton = document.querySelector('.equals');
        const numberButtons = document.querySelectorAll('[data-number]');
        const operationButtons = document.querySelectorAll('[data-operation]');
        const consoleElement = document.querySelector('.console');
        const demoResultElement = document.getElementById('demoResult');
        
        
        let currentOperand = '0';
        let previousOperand = '';
        let operation = undefined;
        let resetScreen = false;
        
        
        function initCalculator() {
            updateDisplay();
            logToConsole('Calculator initialized. Ready for input.', 'system');
        }
        
    
        function updateDisplay() {
            currentOperandElement.textContent = currentOperand;
            if (operation != null) {
                previousOperandElement.textContent = `${previousOperand} ${getOperationSymbol(operation)}`;
            } else {
                previousOperandElement.textContent = previousOperand;
            }
        }
        
        
        function getOperationSymbol(op) {
            switch(op) {
                case '+': return '+';
                case '-': return '−';
                case '*': return '×';
                case '/': return '÷';
                case '%': return '%';
                default: return op;
            }
        }
        
        
        function appendNumber(number) {
            if (resetScreen) {
                currentOperand = '';
                resetScreen = false;
            }
            
    
            if (number === '.' && currentOperand.includes('.')) return;
            
            
            if (currentOperand === '0' && number !== '.') {
                currentOperand = number;
            } else {
                currentOperand += number;
            }
            
            updateDisplay();
        }
        
        
        function chooseOperation(op) {
            if (currentOperand === '' && previousOperand === '') return;
            
            if (currentOperand === '') {
                operation = op;
                updateDisplay();
                return;
            }
            
            if (previousOperand !== '') {
                compute();
            }
            
            operation = op;
            previousOperand = currentOperand;
            resetScreen = true;
            updateDisplay();
            
            logToConsole(`Operation selected: ${op}`, 'user');
        }
        
    
        function compute() {
            let computation;
            const prev = parseFloat(previousOperand);
            const current = parseFloat(currentOperand);
            
            if (isNaN(prev) || isNaN(current)) return;
            
            switch (operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '*':
                    computation = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        alert('Error: Division by zero');
                        clear();
                        return;
                    }
                    computation = prev / current;
                    break;
                case '%':
                    computation = prev % current;
                    break;
                default:
                    return;
            }
            
            
            logToConsole(`Operation: ${prev} ${operation} ${current} = ${computation}`, 'operation');
            
            currentOperand = computation.toString();
            operation = undefined;
            previousOperand = '';
            resetScreen = true;
            
        
            animateResult();
            
            updateDisplay();
        }
        
        
        function clear() {
            currentOperand = '0';
            previousOperand = '';
            operation = undefined;
            updateDisplay();
            logToConsole('Calculator cleared', 'system');
        }
        
    
        function deleteDigit() {
            if (resetScreen) return;
            
            currentOperand = currentOperand.slice(0, -1);
            if (currentOperand === '') {
                currentOperand = '0';
            }
            updateDisplay();
        }
        
        function animateResult() {
            display.classList.add('animate-bounce');
            display.classList.add('animate-pulse');
            
            setTimeout(() => {
                display.classList.remove('animate-bounce');
                display.classList.remove('animate-pulse');
            }, 1000);
        }
        
    
        function logToConsole(message, type = 'info') {
            const entry = document.createElement('div');
            entry.className = 'console-entry';
            
            switch(type) {
                case 'system':
                    entry.innerHTML = `<span class="highlight">[System]</span>: ${message}`;
                    break;
                case 'user':
                    entry.innerHTML = `<span class="highlight">[User Input]</span>: ${message}`;
                    break;
                case 'operation':
                    entry.innerHTML = `<span class="highlight">[Operation]</span>: ${message}`;
                    break;
                default:
                    entry.textContent = message;
            }
            
            consoleElement.appendChild(entry);
            consoleElement.scrollTop = consoleElement.scrollHeight;
        }
        
        function demonstrateHoisting() {

            try {
                console.log(tdzVariable);
            } catch (e) {
                logToConsole(`TDZ Error: ${e.message}`, 'system');
            }
            
    
            hoistedFunction();
            
            
            function hoistedFunction() {
                logToConsole("Hoisting: Function executed before declaration", 'system');
            }
            
    
            let tdzVariable = "I'm now initialized";
            
            
            demoResultElement.innerHTML = `
                <p><strong>Hoisting Demo:</strong> Function executed before its declaration</p>
                <p><strong>TDZ Demo:</strong> Accessing variable before initialization throws error</p>
            `;
            demoResultElement.classList.add('show', 'animate-slide-in');
        }
        
        
        function demonstrateCurrying() {

            const greet = greeting => name => message => {
                return `${greeting} ${name}! ${message}`;
            }
            
            const greetUser = greet('Hello')('John');
            const fullMessage = greetUser('Welcome back to your calculator!');
            
            logToConsole(`Currying: ${fullMessage}`, 'system');
            
        
            demoResultElement.innerHTML = `
                <p><strong>Currying Demo:</strong></p>
                <p>${fullMessage}</p>
            `;
            demoResultElement.classList.add('show', 'animate-slide-in');
        }
    
        function demonstrateBOM() {
            const userResponse = confirm('Would you like to see an example of BOM interaction?');
            
            if (userResponse) {
                const name = prompt('Please enter your name:', 'John');
                if (name) {
                    alert(`Hello ${name}! This is a Browser Object Model (BOM) interaction example.`);
                    logToConsole(`BOM: User confirmed and entered name: ${name}`, 'system');
                    
            
                    demoResultElement.innerHTML = `
                        <p><strong>BOM Demo:</strong></p>
                        <p>User confirmed and entered name: ${name}</p>
                    `;
                    demoResultElement.classList.add('show', 'animate-slide-in');
                }
            } else {
                logToConsole('BOM: User canceled the interaction', 'system');
                
                
                demoResultElement.innerHTML = `
                    <p><strong>BOM Demo:</strong></p>
                    <p>User canceled the interaction</p>
                `;
                demoResultElement.classList.add('show', 'animate-slide-in');
            }
        }
        

        clearButton.addEventListener('click', () => {
            clear();
        });
        
        deleteButton.addEventListener('click', () => {
            deleteDigit();
        });
        
        equalsButton.addEventListener('click', () => {
            compute();
        });
        
        numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                appendNumber(button.textContent);
            });
        });
        
        operationButtons.forEach(button => {
            button.addEventListener('click', () => {
                chooseOperation(button.dataset.operation);
            });
        });
        
    
        document.getElementById('hoistingBtn').addEventListener('click', demonstrateHoisting);
        document.getElementById('curryingBtn').addEventListener('click', demonstrateCurrying);
        document.getElementById('bomBtn').addEventListener('click', demonstrateBOM);
        
        
        initCalculator();
        

        (function() {
            logToConsole('IIFE: Immediately Invoked Function Expression executed', 'system');
        })();