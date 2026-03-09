//1

function sumArray(arr) {
  if (arr.length === 0) {
    return 0;
  }

  return arr[0] + sumArray(arr.slice(1));
}

const numbers = [1, 2, 3, 4, 5];
console.log(sumArray(numbers)); 

//2

function findMax(arr) {
  if (arr.length === 1) {
    return arr[0];
  }

  const maxOfRest = findMax(arr.slice(1));

  return arr[0] > maxOfRest ? arr[0] : maxOfRest;
}

/*const numbers = [3, 7, 2, 9, 5];
console.log(findMax(numbers)); // 9*/


//4

function createMemoizedFibonacci() {
  const cache = {
    0: 0,
    1: 1
  };

  function fibonacci(n) {
    if (n in cache) {
      return cache[n];
    }

    cache[n] = fibonacci(n - 1) + fibonacci(n - 2);

    return cache[n];
  }

  return fibonacci;
}

const fib = createMemoizedFibonacci();

console.log(fib(10)); // 55
