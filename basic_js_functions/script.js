const greet = function(name) {
    return `Hello, ${name}!`;
};

console.log(greet('Alice')); // "Hello, Alice!" - Function Expression




function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet('Alice')); // "Hello, Alice!" - Function Declaration



const greet = (name) => `Hello, ${name}!`;
console.log(greet('Alice')); // "Hello, Alice!" - Arrow Function


function greet(name = 'Guest') {
    return `Hello, ${name}!`;
}

console.log(greet()); // Hello, Guest!



function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10



function display({ name, age }) {
    return `${name} is ${age} years old.`;
}

const person = { name: 'Bob', age: 25 };
console.log(display(person)); // Bob is 25 years old.



function applyOperation(a, b, operation) {
    return operation(a, b);
}

const sum = (a, b) => a + b;
console.log(applyOperation(5, 3, sum)); // 8



