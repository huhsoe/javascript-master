for (let a = 1; a < 11; a++) {
    console.log(a);
}



let sum = 0;
let b = 1;

while (b <= 100) {
    sum += b++
}

console.log('Сумма чисел от 1 до 100 равна ' + sum);



function isPrime(number) {
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) return false;
    }
    
    return number > 1;
}

for (let i = 0; i <= 100; i++) {
    if (isPrime(i)) {
        console.log(i);
    }
}

