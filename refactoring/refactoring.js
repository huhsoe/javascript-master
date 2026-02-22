/*/ 1 задание
// В следующем коде несколько раз повторяются похожие операции. Проведите рефакторинг, чтобы избежать дублирования,
// используя функции или другие средства:
const product1 = { name: 'Product 1', price: 10 };
const product2 = { name: 'Product 2', price: 20 }; // объединить продукты в массив
const total1 = product1.price * 1.2;
const total2 = product2.price * 1.2; // 1.2 это видимо налог, вывести в конст
console.log('Total for Product 1:', total1);
console.log('Total for Product 2:', total2);


const products = [
  { name: 'Product 1', price: 10 },
  { name: 'Product 2', price: 20 }
];

const tax = 1.2;

const countProductTotal = (product) => {
  const total = product.price * tax;
  console.log(`Total for ${product.name}: ${total}`);
};

products.forEach(countProductTotal);


// 2 задание
// Код ниже содержит сложные вложенные условия. Упростите его, чтобы улучшить читаемость и уменьшить вероятность ошибок:

/*if (user.isAdmin) {
  if (user.isActive) {
    if (user.age > 18) {
      console.log('Access granted');
    }
  }
} 

function checkAccess(user) {
  if (user.role === 'admin' && user.status === 'active' && user.age > 18) {
    console.log('Access granted');
  } else {
    console.log('Access denied');
  }
}

const user1 = { role: 'admin', status: 'active', age: 25 }; 
checkAccess(user1);*/

// 3 задание
// В следующей функции выполняется слишком много операций. Разделите её на несколько более коротких функций,
// чтобы улучшить читаемость и повторное использование кода:
function checkStock(item) {
  return Math.random() < 0.5; // Возвращает рандомно true или false, это просто иммитация функции!
}
function processOrder(order) {
  // Валидация данных заказа
  if (!order.id || !order.items || order.items.length === 0) {
    console.log('Invalid order');
    return;
  }
  // Рассчет суммы
  let total = 0;
  for (let item of order.items) {
    total += item.price * item.quantity;
  }
  // Проверка наличия на складе
  for (let item of order.items) {
    if (!checkStock(item)) {
      console.log('Item out of stock:', item.name);
      return;
    }
  }
  // Выполнение заказа
  console.log('Order processed with total:', total);
}

function checkStock(item) {
  return Math.random() < 0.5;
}

function processOrder(order) {
  if (isOrderValid(order) && isInStock(order)) {
    const total = calculatePrice(order);
    console.log('Order processed with total:', total);
  } else {
    console.log('Order was not processed');
  }
}

function isOrderValid (order) {
  if (!order.id || !order.items || order.items.length === 0) {
    console.log('Invalid order');
    return false;
  }
  return true;
}

function calculatePrice (order) {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function isInStock (order) {
  for (let item of order.items) {
    if (!checkStock(item)) {
      console.log(`Item ${item.name} is out of stock`);
      return false;
    }
  }
  return true;
}

const myOrder = {
  id: 101,
  items: [
    { name: "keyboard", price: 3000, quantity: 1 },
    { name: "mouse", price: 1500, quantity: 2 }
  ]
};

processOrder(myOrder);
