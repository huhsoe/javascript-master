const task1 = '1st task';
console.log(task1);

function checkIfPalindrome(str) {
    const preparedStr = str.toLowerCase();
    const resultStr = [...preparedStr].filter(char => char !== ' ');
     if ( resultStr.join('') === resultStr.reverse().join('') ) {
        return true;
    } else
        return false;
};

console.log(checkIfPalindrome('Nurses run'));
console.log(checkIfPalindrome('Hello'));
console.log(checkIfPalindrome('rotator'));

const task2 = '2nd task';
console.log(task2);

function findShortestWord(sentence) {
    if (!sentence || sentence.trim().length === 0) {
        return 'undefined';
    }
    const words = sentence.trim().split(' ').filter(Boolean);

    let shortestIndex = 0;
    for (let i = 1; i < words.length; i++) {
        if (words[i].length < words[shortestIndex].length) {
            shortestIndex = i;
        }
    }
    
    return words[shortestIndex];
};

console.log(findShortestWord('This is really hard for me'));



const task3 = '3rd task';
console.log(task3);


function formatPhoneNumber(numbers) {
    const numStr = numbers.toString();
    if (numStr.length < 10) {
        return 'Wrong format';
    }
    const lastTenDigits = numStr.slice(-10);

    return `8 (${lastTenDigits.slice(0, 3)}) ${lastTenDigits.slice(3, 6)} - ${lastTenDigits.slice(6)}`;
}

console.log(formatPhoneNumber(81234567890));
console.log(formatPhoneNumber(812345));


const task4 = '4th task';
console.log(task4);

function findMinAndMaxNum (nums) {
    if (nums.length === 0) {
        return 'undefined';
    }
    
    return {
        min: Math.min(...nums),
        max: Math.max(...nums)
    };
}

console.log(findMinAndMaxNum([3, 2, 5, 6, 7, 9, 1])); // как я поняла из задания, должен быть принят сразу массив, надеюсь верно

const task5 = '5th task';
console.log(task5);

function newSortedArr (initialArr) {
    const initialArrCopy = [...initialArr];
    
    if (initialArrCopy.length === 0) {
        return 'undefined';
    }

    return [...initialArrCopy].sort((a, b) => a - b);
}

const initialArr = [8, 2, 6, 4, 0]

console.log(newSortedArr(initialArr));

console.log(initialArr);