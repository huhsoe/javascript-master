const numbers = [2, 5, 8, 9];

const squares = numbers.map(num => num ** 2); 

console.log(numbers);

console.log(squares);


const copies = [1, 1, 2, 4, 4, 4, 4, 5, 7, 7];

const unique = copies.filter ((item, index) => copies.indexOf(item) === index);

console.log(unique);


const a = [3, 6, 7, 8, 9];

const sum = a.reduce((total, num) => total + num, 0);

console.log(sum);


const b = [1, 2, 3, 4, 5];

const reversed = b.reduce ((reversed, num) => [num, ...reversed], []);

console.log(reversed);


let job = 'teacher';
job = 'doctor';

console.log(job);

/*const name = 'Mary';
name = 'Sue';

console.log(name); из-за намеренной ошибки тут не могу дальше вывести в консоль, поэтому вот так, при const не можем переопределить переменную  */


let arrLet = [1, 2, 3];
const arrConst = [2, 5, 7, 9];

arrLet.push(4);
arrConst.push(11);

arrLet.pop(2);
arrConst.pop(2);

arrLet.reverse();
arrConst.reverse();

arrLet = [2, 3, 4, 5];
/* arrConst = [2, 2, 2]; объяснение: let можно переопределить, const - нет, однако менять массив можно в обоих случаях. в случае с const нельзя изменить саму ссылку на ячейку (переопределить), но можно изменить содержимое по той же ссылке*/


console.log(arrLet);
console.log(arrConst);


