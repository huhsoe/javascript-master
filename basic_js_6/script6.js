let num = 3;

if (num > 0) {
    console.log ('Positive number')
} else if (num === 0) {
    console.log ('Zero')
} else {
    console.log ('Negative number')
};


let height = Number(prompt('Your height (m):'));
let weight = Number(prompt ('Your weight (kg):'));
let BMI = Math.round(weight / (height**2));

console.log (BMI);

if (BMI >= 30) {
    document.body.innerHTML = 'Obesity :(';
} else if (BMI >= 25) {
    document.body.innerHTML = 'Overweight';
} else if (BMI >= 18) {
    document.body.innerHTML = 'Normal';
} else {
    document.body.innerHTML = 'Underweight';
};



const month = 3;

let monthName;

switch (month) {
    case 1:
        monthName = 'Январь';
        break;

    case 2:
        monthName = 'Февраль';
        break;

    case 3:
        monthName = 'Март';
        break;

    case 4:
        monthName = 'Апрель';
        break;

    case 5:
        monthName = 'Май';
        break;

    case 6:
        monthName = 'Июнь';
        break;

    case 7:
        monthName = 'Июль';
        break;

    case 8:
        monthName = 'Август';
        break;

    case 9:
        monthName = 'Сентябрь';
        break;

    case 10:
        monthName = 'Октябрь';
        break;

    case 11:
        monthName = 'Ноябрь';
        break;

    case 12:
        monthName = 'Декабрь';
        break;

    default:
        monthName = 'Неверный месяц';
}

console.log (monthName);


const mood = 'Fine';
let moodMessage;

switch (mood) {
    case 'Bad':
        moodMessage = 'Sorry to hear that!';
        break;
        
    case 'Good':
    case 'Great':
        moodMessage = 'Great to hear that!';
        break;
        
    case 'Ok':
    case 'Fine':
        moodMessage = 'Hope it will get better!';
        break;

    default:
        moodMessage = 'Tell me what is your mood';
}

console.log (moodMessage);
