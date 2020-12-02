const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingforsecondOperand: false,
    operator: null
}

const operation ={
    '/': (firstOperand, secondOperator) => firstOperand/secondOperator,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => firstOperand
}

function inputDigit(digit){
    const {displayValue, waitingforsecondOperand} = calculator;
    if(waitingforsecondOperand === true){
        calculator.displayValue = digit;
        calculator.waitingforsecondOperand = false;
    }
    else{
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit; 
    }
}

function decimalPoint(dot){
    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot ;
    }
}

function operatorhandler(nextOperator){
    const {firstOperand, operator, displayValue } = calculator;
    const digit = parseFloat(displayValue);
   if(firstOperand === null){
       calculator.firstOperand = digit;
   }
   // 7 
   // +
   // 8 
   // = 
   else if(operator){
       
       const result = operation[operator](firstOperand, digit);
       calculator.displayValue = String(result);
       calculator.firstOperand = result;
   }

   calculator.waitingforsecondOperand = true;
   calculator.operator = nextOperator;


}

function updateDisplay(){
    screen = document.querySelector('.calculator-screen');
    screen.value = calculator.displayValue;
}

const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', (event) =>{
    const{ target } = event;
    if (!target.matches('button')){
        return;
    }

    else if(target.classList.contains('operator')){
        operatorhandler(target.value);
        updateDisplay();
        return;
    }

    else if(target.classList.contains('decimal')){
        decimalPoint(target.value);
        updateDisplay();
        return;
    }

    else if(target.classList.contains('all-clear')){
        console.log('clear', target.value);
        return;
    }

    else {
        inputDigit(target.value);
        updateDisplay();
    }
    
});





































