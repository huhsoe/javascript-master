//1

const student = {
  name: "Sophie",
  age: 24,
  skills: ["JavaScript", "HTML"],
  address: {
    city: "Moscow",
    street: "Main St"
  }
};

const copy1 = { ...student };//копирует свойства верхнего уровня, вложенные объекты передаются по ссылке
copy1.name = "Mary";// строки копируются по значению, поэтому student.name останется как в оригинале
copy1.skills.push("CSS"); //массив skills общий для оригинала и копии, так как скопировалась только ссылка на него
copy1.address.city = "Tula"; // объект address также общий, изменится и student.address.city

const copy2 = Object.assign({}, student); //примитивы копирует, ссылки на объекты оставляет теми же

console.log("Name:", copy1.name);
console.log("Skills:", copy1.skills);
console.log("City:", copy1.address.city);

console.log(copy2);

console.log("Name:", student.name); 
console.log("Skills:", student.skills);
console.log("City:", student.address.city);

console.log(student === copy1); // false, объекты-контейнеры разные
console.log(student.skills === copy1.skills); // true тк ссылаются на один и тот же массив
console.log(student.address === copy1.address); // true тк ссылаются на один и тот же объект

//2

const user = {
  username: "soph01",
  phoneNumber: +1234567,
  socials: ["tg", "github"],
    signIn: function() {
        console.log("Signing a new user...");
    }
};

const userClone = JSON.parse(JSON.stringify(user));

console.log(userClone.username);
console.log(userClone.phoneNumber);
console.log(userClone.socials); // глубокая копия массива

console.log(userClone.signIn); // undefined


// JSON.stringify() и JSON.parse() не подходит для копирования объектов, содержащих логику (функции/методы) тк они будут утеряны

//3

function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj; //проверка на примитив или null, если значение не объект или это null, возвращаем его как есть тк примитивы копируются по значению
    }
    const copy = Array.isArray(obj) ? [] : {}; //если текущий объект массив, создаем новый пустой массив, если нет — пустой объект
    for (let key in obj) { //перебор всех ключей объекта
        if (obj.hasOwnProperty(key)) { //копируем только те свойства, которые принадлежат именно этому объекту, игнор свойства из цепочки прототипов
            copy[key] = deepCopy(obj[key]); //вызываем deepCopy снова, если внутри лежит другой объект, функция начнет его разбирать, позволяет копировать вложенность любой глубины
        }
    } 
    return copy;//возврат готовой копии
}

const original = { a: 1, b: { c: 2 } };
const deepCopyObj = deepCopy(original);
deepCopyObj.b.c = 3;

console.log(original.b.c); // 2