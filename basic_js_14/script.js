// 1st task

const myData = {
    name: 'Sophie',
    age: 24,
    education: 'teacher',
    hobbies: ['dancing', 'true crime', 'sleeping'],
    phone: '8-123-123-1234'
};

console.log(myData.age);
console.log(myData['phone']);
console.log(Object.entries(myData));
console.log(myData['hobbies']);

// 2nd task

myData.city = 'Moscow';

console.log(myData.city);

myData.name = 'Sofia';

console.log(myData['name']);

delete myData.phone;

console.log(myData.phone);

