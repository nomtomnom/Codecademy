// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
//helper of prepareArray, turns a strings into an array to prepare them for luhn algorithm functions
const stringToArray = string => {
  const numberArray = [];
  for (i = 0; i < string.length; i++) {
    numberArray[i]= Number(string[i].split(''));
  }
  return numberArray;
}
//console.log(stringToArray('123')); //test, prints the array made by stringToArray

//turns stringToArray into a function that operates for an Array of Strings, preparing a batch for other functions
const prepareArray = numberArray => {
  const batchArray = [];
  for (j = 0; j < numberArray.length; j++) {
    batchArray[j] = stringToArray(numberArray[j]);
  }
  return batchArray;
}
console.log(prepareArray(['123', '456', '789'])); //test, prints the final array made by prepareArray



//helper for luhn algorithm
const multiplyOther = oddnum => {
    let num = oddnum * 2;
    if (num > 9) { num -= 9 }
    return num;
}

//helper for luhn algorithm
const isOdd = num => {
    if (num % 2 !== 0) {
        return true;
    } else {
        return false;
    }
}

//helper for luhn algorithm
const checkModulo10 = sum => {
  if (sum%10 === 0) {return true
  } else { return false };
}

const validateCred = array => {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        if (isOdd(i)) { 
           sum += multiplyOther(array[(array.length-i-1)])
        } else { sum += array[array.length-i-1] }
    }
  return checkModulo10(sum);
}

//console.log(validateCred(invalid1)); //tests validateCred, prints 'false'
//console.log(validateCred(valid1)); //tests validateCred, prints 'true'


const findInvalidCards = array => {
    const invalidCards = [];
  for (i=0; i < array.length; i++) {
    if (validateCred(array[i]) === false ) {
        invalidCards.push(array[i]);
        console.log(`added ${array[i]} to invalid Cards list`);
      }
    }
    return invalidCards;
}

//console.log(findInvalidCards(['12345', '67890', '45678']));
//console.log(findInvalidCards([valid1, valid2, valid3, valid4, valid5])); //test prints empty array
console.log(findInvalidCards([invalid1, invalid2, invalid3, invalid4, invalid5])); //test prints invalid cards added
//console.log(findInvalidCards(batch)); //prints invalid cards and returns array


//accepts array of cards and returns array of companies represented in that list, intended to be used with results of findInvalidCards
idInvalidCardCompanies = badCards => {
  const cardCompanies = [];

  for (let i=0; i < badCards.length; i++) {
      switch (badCards[i][0]) {
        case 3:
          if (cardCompanies.indexOf('Amex') === -1) {
            cardCompanies.push('Amex');}
          break;
        case 4:
          if (cardCompanies.indexOf('Visa') === -1) {
            cardCompanies.push('Visa');}
          break;
        case 5:
          if (cardCompanies.indexOf('Mastercard') === -1) {
            cardCompanies.push('Mastercard');}
          break;
        case 6:
          if (cardCompanies.indexOf('Discover') === -1) {
            cardCompanies.push('Discover');}
          break;
        default:
          console.log('Company not found');
      }
    }
    return cardCompanies;
}

//tests idInvalidCardCompanies, should print each company once
//console.log(idInvalidCardCompanies(batch));