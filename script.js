const display = document.querySelector('.display')
let equalsPressed = false
let firstNum = ''
let secondNum = ''
let operator = null

function add(num1, num2) {
  return +num1 + +num2
}

function subtract(num1, num2) {
  return num1 - num2
}

function multiply(num1, num2) {
  return num1 * num2
}

function divide(num1, num2) {
  return num1 / num2
}

function operate(num1, num2, operator) {
  switch (operator) {
    case '+':
      return add(num1, num2)

    case '-':
      return subtract(num1, num2)

    case '*':
      return multiply(num1, num2)

    case '/':
      if (secondNum === '0') return 'ERROR'
      return divide(num1, num2)
  }
}

function updateNumber(e) {
  if (equalsPressed) {
    equalsPressed = false
    firstNum = e.target.textContent
    display.textContent = firstNum
    return
  }

  if (!operator) {
    firstNum += e.target.textContent
    display.textContent = firstNum

  } else if (operator) {
    secondNum += e.target.textContent
    display.textContent = secondNum
  }
}

document.body.addEventListener('click', (e) => {

  if (e.target.classList.contains('number') || e.target.classList.contains('point')) {
    updateNumber(e)
    console.log(firstNum, secondNum, equalsPressed)
  }

  if (e.target.classList.contains('operator') && firstNum) {
    if (secondNum) {
      display.textContent = operate(firstNum, secondNum, operator)
      firstNum = operate(firstNum, secondNum, operator)
      secondNum = ''
      switch (e.target.firstElementChild.getAttribute('data-lucide')) {
        case 'minus':
          operator = '-'
          break

        case 'plus':
          operator = '+'
          break
        
        case 'x':
          operator = 'x'
          break

        case 'divide':
          operator = '/'
      }

    } else {
      switch (e.target.firstElementChild.getAttribute('data-lucide')) {
        case 'minus':
          operator = '-'
          break

        case 'plus':
          operator = '+'
          break
        
        case 'x':
          operator = '*'
          break

        case 'divide':
          operator = '/'
      }

      display.textContent = operator  
    }
  }

  if (e.target.classList.contains('equals') && secondNum) {
    display.textContent = operate(firstNum, secondNum, operator)
    equalsPressed = true
    console.log(equalsPressed)
    firstNum = operate(firstNum, secondNum, operator)
    secondNum = ''
    operator = null
  }

  if (e.target.classList.contains('clear')) {
    firstNum = ''
    secondNum = ''
    operator = null
    display.textContent = ''
  }

  if (e.target.classList.contains('delete')) {
    if (!secondNum && !operator) {
      firstNum = firstNum.slice(0, -1)
      display.textContent = firstNum
    } else if (!secondNum && operator) {
      operator = null
      display.textContent = ''
    } else {
      secondNum = secondNum.slice(0, -1)
      display.textContent = secondNum
    }
  }
})