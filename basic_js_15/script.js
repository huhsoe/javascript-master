//1. Найди элемент на странице по его ID и измени его текстовое содержимое на что-то новое;

const firstTitle = document.getElementById('title1');
firstTitle.textContent = 'Changed title 1';

console.log(firstTitle);

//2. Используй JavaScript, чтобы изменить фон и цвет текста элемента с определенным классом;

const paragraphs = document.getElementsByClassName('paragraphForStyles');

for (let paragraph of paragraphs) {
    paragraph.style.backgroundColor = 'green';
    paragraph.style.color = 'blue'

    console.log(paragraph.textContent);
};

//3. Напиши код, который создает новый параграф с текстом и добавляет его в конец документа;

const newParagraph = document.createElement('p');
newParagraph.textContent = 'New paragraph';
newParagraph.id = 'new-paragraph';
document.body.appendChild(newParagraph);

//4. Напиши функцию, которая удаляет элемент с указанным ID из документа;

function removeElementById(id) {
    const elementToRemove = document.getElementById(id);
    if (elementToRemove) {
        elementToRemove.parentNode.removeChild(elementToRemove);
    } else {
        console.warn(`Элемент с id ${id} не найден`);
    }
    console.log('Element is removed');
}

removeElementById('to-remove');

//5. Измени атрибут ссылки на новый URL и выведи его значение в консоль;

const link = document.querySelector('a');

link.setAttribute('href', 'https://google.com');

console.log(link.getAttribute('href'));

//6. Создай новый элемент, добавь к нему класс и добавь его в DOM;

const newestElement = document.createElement('div');
newestElement.textContent = 'its a div';
newestElement.classList.add('newestElement');
document.body.appendChild(newestElement);

console.log(newestElement);

//7. Переключи класс у существующего элемента и проверьте его наличие в консоли.

link.classList.toggle('link');

console.log(link);
