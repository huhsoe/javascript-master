//1. Назначь для кнопки обработчик события click, который будет изменять текст этой кнопки при нажатии;

const button = document.getElementById('button1');

button.addEventListener('click', () => {
    console.log('Кнопка нажата!');
    button.style.backgroundColor = 'white';
    button.style.color = 'red';
    button.innerText = 'Clicked'
});


//2. Назначь для любого элемента обработчик события mouseover, который будет изменять размер элемента при наведении;

const header = document.getElementById('header');

header.addEventListener('mouseover', () => {
    header.style.fontSize = '50px';
});

header.addEventListener('mouseout', () => {
    header.style.fontSize = '';
});

//3. Назначь для инпута обработчик события keyup, который будет выводить отпущенную клавишу в консоль;

const inputElement = document.getElementById('input');

inputElement.addEventListener('keyup', (event) => {
    console.log('Отпущена клавиша:', event.key);
});


//4. Создай форму и добавь обработчик события submit, который будет показывать сообщение об успешной отправке;

const form = document.getElementById('myForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Форма успешно отправлена!');
});

//5. Пусть на странице есть кнопка с надписью 'Изменить тему', которая позволяет переключать тему страницы. 
// Например, по умолчанию тема светлая:
// задний фон - белый, текст - черный. 
// Нажимаем на кнопку -> тема меняется на темную: цвет фона - черный, текст - белый. 
// Еще раз нажимаем на кнопку -> тема снова светлая и т. д.


const themeChanger = document.getElementById('changeThemeButton');

themeChanger.addEventListener('click', () => {
    console.log('Кнопка нажата!');
    document.body.classList.toggle('dark-theme');
});