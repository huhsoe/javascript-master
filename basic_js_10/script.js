function average ( ...numbers) {
    if (numbers.length === 0)
        return 0;

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

console.log(average(1, 2, 3, 4, 5));


function getUserInfo (user) {
    const { name, age, country } = user;
    return `User: ${name}, Age: ${age}, Country: ${country}`;
}

const user1 = {
    name: 'Mary',
    age: 23,
    country: 'Russia'
};

console.log(getUserInfo(user1));



const danceSchool = {
    name: 'Twice',
    founded: 2020,
    staff: {
        administration: {
            director: 'Park Jinyoung',
            managers: ['John Smith', 'Mary Sue']
        },
        teachers: ['Hirai Momo', 'Park Jihyo']
    },
    styles: ['k-pop', 'jazz-funk', ' hip-hop'],
    adress: {
        country: 'South Korea',
        city: 'Seoul',
        street: 'Once st'
    }
};

const { name, founded } = danceSchool;
console.log(`Dance school ${name} was founded in ${founded}`);

const { adress: {country, city, street } } = danceSchool;
console.log(`The school is located in ${city}, ${country}, on ${street}`);

const { styles: [style1, ...rest] } = danceSchool;
console.log(`There are many styles in the school, for example: ${style1}, ${rest}`);

const { staff: { administration: {director: schoolDirector} } } = danceSchool;
console.log(`The school is directed by ${schoolDirector}`);

const { staff: { teachers: [teacher1, teacher2] } } = danceSchool;
console.log(`Most prominent teachers of the school are ${teacher1} and ${teacher2}`);


const oldArr = [1, 2, 3, 4];
const newArr = [-1, 0, ...oldArr, 5, 6];

console.log(newArr);



function removeProperty(obj, toRemove) {
    const {[toRemove]: removed, ...rest } = obj;
    return rest;
}

const someData = {
    password: 12345,
    name: 'user1',
    age: 20
};

const result = removeProperty(someData, 'password');
console.log(result);