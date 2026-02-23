//1

const multiplyByTwo = (numbers) => numbers.map(num => num * 2);

const inputArray = [1, 2, 3, 4, 5];
const resultArray = multiplyByTwo(inputArray);

console.log(resultArray);
console.log(inputArray);

//2

const user = {
  name: "Sophie",
  
  sayHiWithDelay() {
    console.log("In a sec...");
    setTimeout(() => {
      console.log(`Hi, my name is ${this.name}!`);
    }, 1000);
  }
};

user.sayHiWithDelay();

//3

const processArray = (operation, array) => {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    result.push(operation(array[i]));
  }
  return result;
};

const numbers = [1, 3, 7];

const incremented = processArray((n) => n + 1, numbers);

console.log(incremented);