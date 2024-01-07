// idHandler.js

// Initialize a counter variable
let counter = 0;

function genpID() {
  counter += 1;
  return counter;
}

function getHpID() {
    return counter;
}

export { genpID, getHpID };
