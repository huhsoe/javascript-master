let a = "Hello";
let b = 24;
let c = false;

console.log(typeof a); // "string"
console.log(typeof b); // "number"
console.log(typeof c); // "boolean"


/* Отличия: 
по значению - создается копия данных, изменения копии не влияют на оригинал.
по ссылке - создается ссылка на те же данные, изменения влияют и на оригинал и на копию */

let x = 10;
let y = x; // копируется значение

y = 20;
console.log(x); // не изменилось
console.log(y); // стало 20


let person1 = {name: "kate"};
let person2 = person1; // копируется ссылка

person2.name = "ann";

console.log(person1.name); // ориг изменился на ann
console.log(person2.name);