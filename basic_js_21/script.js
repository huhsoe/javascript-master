//1

const myUser = {
  name: "Sophie",
  age: 24,
  showData: function() {
    console.log(`Name: ${this.name}, age: ${this.age}`);
  }
};

myUser.showData();

const callData = myUser.showData;

callData(); // выведет Name: undefined, age: undefined, происходит потеря контекста

const fixedCallData = myUser.showData.bind(myUser);

fixedCallData();


//2

const student = {

  name: 'Alice',

  greet: function() {
    console.log(`Hello, ${this.name}!`); // this указывает на тот объект, который стоит перед точкой при вызове
  },

  delayedGreet: function() {
    setTimeout(this.greet, 1000); //передавая this.greet в setTimeout мы передаем только ссылку на саму функцию
  }
};

student.greet() // Hello, Alice, тк вызвано через точку: student.greet()
student.delayedGreet() // Hello, undefined, тк контекст внутри setTimeout потерян

const student1 = {
  name: 'Alice',
  greet: function() {
    console.log(`Hello, ${this.name}!`);
  },

  delayedGreet: function() {
    setTimeout(() => { // стрелочная функция не имеет своего this, она берет его из окружения (из delayedGreet)
      this.greet(); 
    }, 1000);
  }
};

student1.delayedGreet(); // "Hello, Alice!"

//3

const smartphone = {title: 'IPhone', price: 150000};
const laptop = {title: 'Huawei', price: 200000};

function getFinalPrice(taxRate, shippingCost) {
  const total = this.price + (this.price * taxRate) + shippingCost;
  console.log(`Item: ${this.title}. Final price: ${total}`);
}

getFinalPrice.call(smartphone, 0.2, 500); 

getFinalPrice.apply(laptop, [0.2, 0]); 

const calculateLaptopPrice = getFinalPrice.bind(laptop);
calculateLaptopPrice(0.2, 0); 

//4

function sayHello() {
    console.log('Hello, ' + this.name)
}

const admin = {
    name: 'Bob'
};

const user = {
    name: 'John'
};

const sayHelloToAdmin = sayHello.bind(admin)

sayHelloToAdmin()

const sayHelloToUser = sayHelloToAdmin.bind(user)

sayHelloToUser() // Hello, Bob (повторный bind не может изменить контекст, зафиксированный первым вызовом)
//переменная sayHelloToUser всё равно ссылается на функцию, где this это admin
