const cart = [
  { name: "Laptop", price: "a" },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) { // Bug: <= should be < - corrected after console.log(i) showed index going out of bounds
    if (typeof cartItems[i].price === "number") {
      total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration - check to make sure price is a number before adding to the total to make sure total is a number.
    };
  }
  return total;
}

function applyDiscount(total, discountRate) {
  if (discountRate > 0 && discountRate < 1) {
    return total - total * discountRate; // Bug: Missing validation for discountRate - corrected to check if discount rate is between 0 and 1
  } else {
    return total;
  };
}

function generateReceipt(cartItems, total) {
  let receipt = "Items:\n";
  cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price}\n`;
  });
  receipt += `Total: $${total.toFixed(2)}`; // Bug: total may not be a number - took care of this bug in calculateTotal function
  return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal}`;
document.getElementById("receipt").textContent = receipt;

/*
  1. Breakpoint on line 10 in function calculateTotal OR Debugger statement before line 10
    - index going beyond the number of items
    - Total getting added for each item
    - Used console.log in the console to check values for various variables.
    - Hovering the cursor on the variables also displayed its value.
    Error:
      TypeError - Cannot read properties of undefined(reading 'price')
      Location - cart.js:10
      Call stack - 
        at calculateTotal (cart.js:10:29)
        at cart.js:30:15
    Correction:
      Modified the iteration to stop when the index is less than the length of the array object
  2. Discount rate can be a negative number OR a string - observed the process by changing the value in the console
    - Displays NaN for total
    - No error displayed. No validation for discount rate to be a numeral between 0 and 1
    Correction:
      Added validation to check if discount rate is between 0 and 1 before applying discount to the total
  3. Price can be set to a string
    - Displays NaN for total
    Correction:
      Added validation to check if price is a number before adding that to the total

  Debugging tools are great to research value in variables. Used concole.log, breakpoints, and debugger statement to stop the process in different places in the code to check the values. The value can also be modified in the developer tool to see the effect without changing the code or the data.
  \n was not working. Tried <br> and that didn't work either with innerHTML. Researched and found <pre> tag preserves line breaks without extra CSS. Need to research further to see the limitations, if any of using <pre>.
*/