function reverseStr(inputStr) {
    var listOfChar = inputStr.split('');
    var reverseCharList = listOfChar.reverse();

    return reverseCharList.join('');
}

function checkIfPalindrome(inputStr) {
    return inputStr === reverseStr(inputStr);
}

function convertDateNumberToStr(date) {
    var dateStr = {
        date: '',
        month: '',
        year: ''
    };
    if (Number(date.day) < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (Number(date.month) < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function convertToAllDateFormats(date) {
    var tempDate = convertDateNumberToStr(date);

    var ddmmyyyy = tempDate.day + tempDate.month + tempDate.year;

    var mmddyyyy = tempDate.month + tempDate.day + tempDate.year;

    var yyyymmdd = tempDate.year + tempDate.month + tempDate.day;

    var ddmmyy = tempDate.day + tempDate.month + tempDate.year.slice(-2);

    var mmddyy = tempDate.month + tempDate.day + tempDate.year.slice(-2);

    var yymmdd = tempDate.year.slice(-2) + tempDate.month + tempDate.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];

}


function checkPalindromeForAllDateFormats(date) {
    var dateFormats = convertToAllDateFormats(date);

    var trueOrFalse = false;

    for (let dateFormat of dateFormats) {
        if (dateFormat === reverseStr(dateFormat)) {
            trueOrFalse = true;
            break;
        }
    }

    return trueOrFalse;
}

function isLeapYear(date) {
    if (date.year % 400 === 0) {
        return true;
    } else if (date.year % 100 === 0) {
        return true;
    } else if (date.year % 4 === 0) {
        return true;
    } else {
        return false;
    }
}

function getNextDate(date) {
    let dateObject = {day: date.day, month: date.month, year: date.year};
    dateObject.day = dateObject.day + 1;
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (dateObject.month === 2) {
        if (isLeapYear(dateObject)) {
            if (dateObject.day > 29) {
                dateObject.day = 1;
                dateObject.month = dateObject.month + 1;
            }
        } else {
            if (dateObject.day > 28) {
                dateObject.day = 1;
                dateObject.month = dateObject.month + 1;
            }
        }
    } else {
        if (dateObject.day > daysInMonth[dateObject.month - 1]) {
            dateObject.day = 1;
            dateObject.month = dateObject.month + 1;
        }
    }

    if (dateObject.month > 12) {
        dateObject.month = 1;
        dateObject.year = dateObject.year + 1;
    }

    return dateObject;
}

function getPreviuosDate(date) {
    let dateObject = {
        day: date.day,
        month: date.month,
        year: date.year
    };
    dateObject.day = dateObject.day - 1;
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (dateObject.day === 0) {
        if (dateObject.month - 1 === 2) {
            if (isLeapYear(dateObject)) {
                dateObject.day = 29;
                dateObject.month = dateObject.month - 1;
            } else {
                dateObject.day = 28;
                dateObject.month = dateObject.month - 1;
            }
        } else if (dateObject.month - 1 === 4 || dateObject.month - 1 === 6 || dateObject.month - 1 === 9 || dateObject.month - 1 === 11) {
            dateObject.day = 30;
            dateObject.month = dateObject.month - 1;
        } else {
            dateObject.day = 31;
            dateObject.month = dateObject.month - 1;
        }
    }


    if (dateObject.month === 0) {
        dateObject.month = 12;
        dateObject.year = dateObject.year - 1;
    }

    return dateObject;
}

function getPreviuosPalindromeDate(date) {
    let previousDate = getPreviuosDate(date);
    let missedBy = 0;

    while (1) {
        missedBy = missedBy + 1;
        let palindromeOrNot = checkPalindromeForAllDateFormats(previousDate);

        if (palindromeOrNot) {
            break;
        }
        previousDate = getPreviuosDate(previousDate);
    }

    return [missedBy, previousDate];
}

function getNextPalindromeDate(date) {
    let nextDate = getNextDate(date);
    let missedByHowMuch = 0;

    while (1) {
        missedByHowMuch += 1;
        let isPalindrome = checkPalindromeForAllDateFormats(nextDate);

        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [missedByHowMuch, nextDate];
}


const dob = document.querySelector('#input');
const checkPalindromeButton = document.querySelector('#check-palindrome-btn');
const outputMessage = document.querySelector('#output');
const goatImage = document.querySelector('#goat');

goatImage.style.display = "none";

function handleClick() {
    if (dob.value !== '') {
        let dateStr = dob.value.split('-');
        let date = {
            day: Number(dateStr[2]),
            month: Number(dateStr[1]),
            year: Number(dateStr[0]),
        }
        
        if (checkPalindromeForAllDateFormats(date)) {
            outputMessage.innerText = "";
            goatImage.style.display = "block";
            setTimeout(() => {
                goatImage.style.display = "none";
                outputMessage.innerText = "Yay! Your Birthday is a Palindrome🎉";
            }, 3000);
            
        } else {
            const [missedByHowMuch, nextDate] = getNextPalindromeDate(date);
            const [missedBy, previousDate] = getPreviuosPalindromeDate(date);

            if (missedByHowMuch < missedBy) {
                outputMessage.innerText = "";
                goatImage.style.display = "block";
                setTimeout(() => { 
                    goatImage.style.display = "none";
                    outputMessage.innerText = `Nope! Not a Palindrome. It could have been if you were born on ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${missedByHowMuch} days`;
                }, 3000);
                
            }
            else {
                outputMessage.innerText = "";
                goatImage.style.display = "block";
                setTimeout(() => { 
                    goatImage.style.display = "none";
                    outputMessage.innerText = `Nope! Not a Palindrome. It could have been if you were born on ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed it by ${missedBy} days`;
                }, 3000);
                
            }

        }
    } else {
        outputMessage.innerText = "You have not selected a date!";
    }
}

checkPalindromeButton.addEventListener('click', handleClick);