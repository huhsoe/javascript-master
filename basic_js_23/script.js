//1

function createCounter() {
  let count = 0;

  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3


//2

const globalGreeting = "Привет";

function sayHello(name) {
  const localMessage = "как дела?";

  function display() {
    console.log(globalGreeting, name + '!', localMessage);
  }

  display();
}

sayHello("Алексей"); 


//3

function createFibonacciCalculator() {
  const cache = {
    0: 0,
    1: 1
  };

  return function fibonacci(n) {
    if (n in cache) {
      return cache[n];
    }

    let keys = Object.keys(cache);
    let lastComputedIndex = Math.max(...keys.map(Number));

    for (let i = lastComputedIndex + 1; i <= n; i++) {
      cache[i] = cache[i - 1] + cache[i - 2];
    }

    return cache[n];
  };
}

const fibonacci = createFibonacciCalculator();

console.log(fibonacci(0));  // 0
console.log(fibonacci(50)); // 12586269025
console.log(fibonacci(6));  // 8 