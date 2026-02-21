const str = 'JavaScript is fun!';

console.log(str.includes("fun"));



const user = '';
const userName = user || 'Friend';

console.log(`Hello, ${userName}!`);



const firstName = 'John';
const lastName = 'Doe';
const occupation = 'software developer';

console.log(`Hello, my name is ${firstName} ${lastName}. I'm a ${occupation}.`);


const nullVar = null;
const undefinedVar = undefined;

console.log(nullVar === undefinedVar); // false, потому что проверяется и значение и тип данных, здесь типы данных разные
console.log(nullVar == undefinedVar); // true, null и undefined являются равными только друг другу при нестрогом сравнении, выполняется преобразование типов


const a = 1;
const b = '1';
const result = a + b;

console.log(result); // произошло объединение строк, тк b - строкаб а тоже была приведенаэтому типу и строки объединились