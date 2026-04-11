"use strict";

function showThis() {
  console.log(this);
}

showThis();

// в обычном режиме this внутри функции указывает на window, а в строгом режиме будет undefined, что предотвращает случайную работу с глобальным объектом