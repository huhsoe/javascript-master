//1

function safeDivide(a, b) {
  try {
    if (b === 0) {
      throw new Error("Division by zero is impossible");
    }
    return a / b;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

console.log("Result of 10 / 2:", safeDivide(20, 2)); 
console.log("Result of 10 / 0:", safeDivide(10, 0)); // null


//2

function transformJSON(jsonString) {
  try {
    const parsedObject = JSON.parse(jsonString);
    return parsedObject;
  } catch (error) {
    console.error("Error JSON parse:", error.message);
    return null;
  }
}

const validJson = '{"name": "Sophie", "age": 25}';
const user = transformJSON(validJson);
console.log("Succeed:", user); 

const invalidJson = '{"name": "Sophie", "age": 25'; // нет }
const result = transformJSON(invalidJson);
console.log("Result with error:", result);


//3

function checkAccess(age) {
  if (age < 18) {
    throw new Error("Access is restricted");
  }
  return "Access is granted";
}

try {
  console.log(checkAccess(15));
} catch (error) {
  console.error(error.message);
}

try {
  console.log(checkAccess(20));
} catch (error) {
  console.error(error.message);
}

