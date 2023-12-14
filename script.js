function operate(a, b, operator) {
  let result;
  switch (operator) {
    case "+":
      result = a + b;
      break;

    case "-":
      result = a - b;
      break;
    case "x":
      result = a * b;
      break;
    case "/":
      result = a / b;
      break;

    case "%":
      result = a % b;
      break;
    case "^":
      result = a ** b;
      break;
  }
  return parseFloat(result.toFixed(2));
}

function hasMoreThanOneDecimal(number) {
  const numberString = number.toString();
  if (numberString.includes(".")) {
    const decimal = numberString.split(".")[1];
    console.log(number);
    return decimal.length > 2;
  } else return false;
}

document.addEventListener("DOMContentLoaded", function () {
  const screen = document.querySelector(".screen");
  const previousScreen = document.querySelector(".screen-previous");
  const buttons = document.querySelectorAll("button");
  const digitButtons = document.querySelectorAll(".button-digit");
  const operationButtons = document.querySelectorAll(".button-operation");
  const equalButton = document.querySelector("#equal");
  const cButton = document.querySelector("#c");
  const githubButton = document.querySelector("#github");

  const delButton = document.querySelector("#del");

  function updatescreen(digit) {
    if (screen.textContent === "0.00") {
      screen.textContent = digit;
    } else {
      screen.textContent += digit;
    }
  }
  function parseString(string) {
    let result, nextNumber;
    let charList;
    charList = string.split(" ").filter(Boolean);
    if (charList.length % 2 === 0) {
      console.log("not even");
      return (screen.textContent = "Invalid input");
    }
    console.log(charList);

    result = charList.reduce((accumulator, operator, index) => {
      nextNumber = parseFloat(charList[index + 1]);
      console.log("accumulator", accumulator, "current", nextNumber);
      //error >1 decimal
      if (
        hasMoreThanOneDecimal(accumulator) ||
        hasMoreThanOneDecimal(nextNumber)
      ) {
        return (screen.textContent = "Too many decimals");
      }

      //error /0
      if (nextNumber === 0 && operator === "/")
        return (screen.textContent = "Can't divide by 0");
      else if (index % 2) {
        console.log(accumulator);
        console.log(operator);
        console.log(nextNumber);
        return operate(accumulator, nextNumber, operator);
      } else {
        return accumulator;
      }
    }, parseFloat(charList[0]));
    console.log("result", typeof result);
    if (typeof result === "number") {
      screen.textContent = `${result.toFixed(2)}`;
    }
  }

  //introduce new number, decimal
  digitButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let newNumber = `${e.target.value}`;
      updatescreen(newNumber);
    });
  });
  //operator button
  operationButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let newOperation = ` ${e.target.value} `;
      updatescreen(newOperation);
    });
  });
  //c button
  function clear() {
    previousScreen.textContent = "";
  }
  console.log(cButton);
  cButton.addEventListener("click", () => {
    clear();
    screen.textContent = "0.00";
  });
  //del button
  delButton.addEventListener("click", () => {
    screen.textContent = screen.textContent.slice(0, -1);
  });
  //equal button
  equalButton.addEventListener("click", () => {
    let stringToParse;
    stringToParse = screen.textContent;
    console.log("previous", previousScreen);
    clear();
    console.log(stringToParse);
    parseString(stringToParse);
    previousScreen.textContent = `${stringToParse}`;
  });
  //github hyperlink
  githubButton.addEventListener("click",()=>{window.open("https://github.com/SirGram/calculator")})
  //hover bg color
  buttons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      button.style.backgroundColor = `rgb(124, 252, 0)`;
    });
    button.addEventListener("mouseleave", () => {
      button.style.backgroundColor = "";
    });
  });

  //keyboard support
  document.addEventListener("keydown", function (e) {
    const key = e.key;
    if (/[0-9.]/.test(key)) {
      updatescreen(key);
    } else if (
      key === "+" ||
      key === "-" ||
      key === "/" ||
      key === "*" ||
      key === "^" ||
      key === "%"
    ) {
      updatescreen(key);
    } else if (key === "Enter") {
      equalButton.click();
    } else if (key === "c") {
      cButton.click();
    } else if (key === "Backspace") {
      delButton.click();
    }
  });
});
