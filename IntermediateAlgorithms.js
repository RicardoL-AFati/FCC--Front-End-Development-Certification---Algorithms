//--------Sum all numbers in a range--------------

function sumAll(arr) {
    var start = Math.min(...arr);
    var end = Math.max(...arr);
    var sum = start;

    for (var i = start + 1; i <= end; i++){
        sum = sum + i;
    }

    return sum;
  }
  
  sumAll([1, 4]);

// ---------Symmetric Difference between two arrays-----------

function diffArray(arr1, arr2) {
    // Will serve as SD array
    var newArr = [];
    // compares two arrays - checks comparisonArray for every element in array 
    function compareArrays(array, comparisonArray) {
        // will serve as Symmetric Difference array 
        var notFoundArray = [];
        // Iterating through array
        for (var element of array) {
            // index of current element in comparisonArray
            var index = comparisonArray.indexOf(element);
            // If element was not found -> push onto notFoundArray
            if (index === -1) notFoundArray.push(element);
        }
        return notFoundArray;
    }
     // Finding elements present in arr1 but not arr2
     newArr = compareArrays(arr1, arr2);
     // Finding elements present in arr2 but not arr 1, adding that to SD array
     newArr = newArr.concat(compareArrays(arr2, arr1));

     return newArr;
  }
 
  diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);

// ---------------- Roman Numeral Converter---------------

function convertToRoman(num) {
    //declaring string that will be returned roman numeral
    var romanNum = "";
    // array of roman numerals. Descending order. 
    var romanNumerals = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    // arrray of corresponding decimal numbers. Descending order.
    var numbers = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

    // iterating through numbers array
    for (var i = 0; i < numbers.length; i++){
        // while num is >= current index of numbers value 
        while (num >= numbers[i]) {
                // subtract the current value from num 
                num = num - numbers[i];
                // Add the corresponsing roman numeral of the value subtracted to the romanNum string
                romanNum += romanNumerals[i];
                // num will decrease in value as converted to romanNum
        }
    }

    return romanNum;
}
   
   convertToRoman(36);
   

// -----------Wherefore Art Thou-------------------

// returns an array of objects that have matching property and value pairs as second argument
function whatIsInAName(collection, source) {
    var arr = [];
    // Saving properties from source using Object.keys() to an array
    var propertiesArray = Object.keys(source);
    // Iterating through properties array 
    for (var property of propertiesArray) {
        // Iterating through collection array (name pairs)
        for (var namePair of collection) {
            // If current namePair has current property and it's value matches current property value of source -->
            if (namePair.hasOwnProperty(property) && namePair[property] === source[property]) {
                // Push namePair onto arr. Current namePair has matching property:value pairs as in source.  
                arr.push(namePair);
            }
        }
        // Collection is set to arr. Looped through again if more properties are in source.
        collection = arr;
        // arr is cleared of previous namePairs. 
        arr = [];
    }

    return collection;
  }
  
  whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });

// ----------------------Search and Replace----------------------------------------------

// replaces a word (before) with another word (after) in a string (str)
function myReplace(str, before, after) {
    // if char at first index of before matches itself made uppercase ->
    if (before[0] === before[0].toUpperCase()) {
        // first letter in after is replaced with itself uppercase 
        after = after.replace(/[a-z]/i , after[0].toUpperCase());
    }
    // replace word (before) in str with after. Return str
    str = str.replace(before, after);
    return str;
}
  
  myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");

// -----------------------------------Pig Latin------------------------------

// Translates str to pig latin. Takes first constant of str, moves to end and suffixes "ay", If str starts with vowel - adds "way" to end
function translatePigLatin(str) {
    var consonant = [];
    // returns first element that matches vowel regex 
    function findFirstVowel(element) {
        if (element.match(/[aeiou]/i) !== null) {
            return element;
        }
    }
    // if the first char of str is a vowel -> add way to end 
    if (str[0].match(/[aeiou]/i)) {
        str = str + "way";
    } else {
        // else split str into array
        str = str.split("");
        // suffix array to be pushed onto new string
        var suffix = ["a", "y"];

        // calls findIndex() of letter returned from findFirstVowel(str) --> that index is number of elements to remove  
        var numToRemove = str.findIndex(findFirstVowel);
        // starting at index 0 - remove numToRemove letters and save to consonant 
        consonant = str.splice(0, numToRemove);
        // push suffix onto end of consonant
        consonant.push(...suffix);

        // push consonant onto end of str
        str.push(...consonant);
        // Join str into string 
        str = str.join("");
    }

    return str;
}
  translatePigLatin("glove");

// --------------------------DNA Pairing-------------------------------------------------- 

// Returns the base pairs that correspond to each char in str - as 2d array. Provided char first.
function pairElement(str) {
    // array that will hold base pair arrays
    var dnaPairs = [];
    /* basePairs object that holds (ATGC) and their appropriate pairs. 
    Used to return correct pair based on input. */ 
    var basePairs = {
        "A" : "T",
        "T" : "A",
        "G" : "C",
        "C" : "G"
    };
    // Iterating through each character of str
    for (var character of str) {
        // Pair array where original char and it's pair will be pushed onto
        var pair = [];
        // Push onto pair -- the original character and value from basePairs that corresponds to that char.
        pair.push(character , basePairs[character]);
        // Push pair onto dnaPairs
        dnaPairs.push(pair);
    }

    return dnaPairs;
  }
  
  pairElement("GCG");
  
// -------------------------------------------------Missing Letters---------------------------------------------------------

// Finds missing letter in str range and returns it
function fearNotLetter(str) {
    // Defining numeric range of str using the charCodes of the letters at first and last index 
    // Start of range   
    var start = str.charCodeAt(0);
    // End of range
    var end = str.charCodeAt(str.length - 1);
    // Variable for sum of all charCodes from start to end
    var trueSum = 0;
    // Summing all charCodes from start to end 
    for (var i = start; i <= end; i++) {
        trueSum += i;
    }

    // Variable for sum of charCodes of all letters in str 
    var sum = 0;
    // Sum all charCodes from start index to final index
    for (var index in str) {
        sum += str.charCodeAt(index);
    }

    // If the sum of the numeric range is not equal to sum of all letters actually present in str
    if (trueSum !== sum) {
        // A letter is missing. Find charCode by subtracting difference between numeric and letter sum
        var missing = trueSum - sum;
        // return string generated from that charCode 
        return String.fromCharCode(missing);
    } else {
        // Else no letter is missing.
        return undefined;
    }
  }
  
  fearNotLetter("abce");
  

// -----------------------------Boo who-------------------------

function booWho(bool) {
    // If typeof returns any string other than "boolean" -> isBoolean is false, else isBoolean is true // 
    var isBoolean = (typeof bool !== "boolean") ? false : true; 
    return isBoolean;
  }
  booWho(null);

// -----------------------------Sorted Union---------------------------------

// Takes two or more arrays and returns a new array of unique values in order of original arrays
function uniteUnique(arr) {
    // Creating one array consisting of arguments passed in 
    var args = Array.from(arguments);
    // using apply to concantenate every element of args (an array) to merged -- creates one array
    merged = [].concat.apply([], args);
    
    // Will filter out elements from merged that are equivalent to compare parameter 
    // returns array with unique elements 
    function filterNotUnique(compare) {
        return merged.filter(function(element){
            return element !== compare;
        })
    }

    var unique = [];
    var i = 0;

    // While merged has elements in it
    while (merged.length > 0) {
        // Push first element of merged onto unique
        unique.push(merged[0]);
        // compare is set to value just passed to unique or i
        compare = unique[i];

        // merged is set to merged with compare values filtered out
        merged = filterNotUnique(compare);
        i++;
    }
    return test;
  }
  
  uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);

// --------------------Convert HTML Entities-----------------------------------

function convertHTML(str) {
    // Object to be used as reference for HTML entities
    var htmlValues = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;"
    };
    // Iterating through str parameter
    for (var character of str) {
        /* if character matches any - non-alpha numeric excluding space 
        replace that char in str with it's corresponding HTML entity */
        if (character.match(/[^a-z0-9\s]/i)) {
            str = str.replace(character, htmlValues[character]);
        }
    }
   return str;
  }
  
  convertHTML("abc");

// ----------------------Spinal Tap Case-----------------------------

// Converts a string to - all-lowercase-words-joined-by-dashes.
function spinalCase(str) {
    // Converting str into array split by character
    str = str.split("");
    // Looping through array starting at second index
    for (var i = 1; i < str.length; i++) {
        /* If current letter is uppercase --> (Is beginning of a word)
        replace with a space before and that letter lowercase */ 
        if (str[i] == str[i].toUpperCase()) {
            var lower = " " + str[i].toLowerCase();
            str[i] = lower;
        }
    }
    // Join array into string made lowercase
    str = str.join("").toLowerCase();
    // replace 1 or more: spaces,underscores,dashes - with single dash in str
    str = str.replace(/[\s_-]+/g, "-");
    return str;
} 
   
  spinalCase('Teletubbies say Eh-oh');

// --------------------------Sum All Odd Fibonnaci Numbers--------------------

function sumFibs(num) {
    // First two numbers in sequence
    fibonacciSequence = [1, 1];
    var i = 0,
        sum = 0;
    // do while next fibonnaci in sequence is <= num parameter -- add to sequence  
     do {
        newFibonacci = fibonacciSequence[i] + fibonacciSequence[i + 1];
        fibonacciSequence.push(newFibonacci);
        i++;
    } while (newFibonacci <= num);
    // Iterate through sequence and sum odd values that are <= num parameter
    for (var fibonnaci of fibonacciSequence){
        if (fibonnaci % 2 !== 0 && fibonnaci <= num) {
            sum += fibonnaci;
        }
    }

    return sum;
}

sumFibs(4);


// --------------------------Smallest Common Multiple-------------------

function leastCommonMultiple(arr) {
    // Setting min and max to returns from Math.(min and max) of arr parameter (in case order varies)
    var min = Math.min(...arr);
    var max = Math.max(...arr);
    // Creates range array of all values in between min and max
    function range(min, max) {
        var numRange = [];
        for (var i = min; i <= max; i++) {
            numRange.push(i);
        }
        return numRange;
    }
    // Finds greatest common divisor using Euclidian Algorithm and recursion
    function gcd(a, b) {
        return !b ? a : gcd(b, a % b);
    }
    // Lowest common multiple using greatest common divisor
    function lcm(a, b) {
        return (a * b) / gcd(a, b);   
    }
    // multiple start with minimum value
    var lowestCommonMultiple = min;
    // Range array to be iterated through 
    var numRange = range(min, max);
    /* Set lowestCommonMultiple to lowest common multiple (lcm) of that and current number in range array
       lcm of lcm with next number applies to previous number pair. Last lcm is lcm of all previous numbers*/
    for (var number of numRange) {
        lowestCommonMultiple = lcm(lowestCommonMultiple, number);
    }

    console.log(lowestCommonMultiple);
}

leastCommonMultiple([1, 13]); // => 360360

// ----------------------------------Finders Keepers-----------------------

// returns first element in arr that passes func
function findElement(arr, func) {
    // Creating args variable from arguments object
    var args = [...arguments];
    // Setting - array of numbers to be checked - equal to first element of args array
    var numArray = args[0];

    /* Iterates through an array - first element that returns true from function from args[1] 
        - return that element. If no element is returned - return undefined. */  
    function firstTrue(array) {
        for (var element of array) {
            if (args[1](element)){
                return element;
            }
        }
        return undefined;
    }

    // return result from calling firstTrue with numArray as parameter.
    return firstTrue(numArray);
  }
  
  findElement([1, 2, 3, 4], function(num){ return num % 2 === 0; });

// ---------------------------------Drop it--------------------------------------

// Remove elements from start of arr until an element returns true from func
function dropElements(arr, func) {
    // Creating args variable from arguments object
    var args = [...arguments];
    // Setting - array of numbers to be checked - equal to first element of args array
    var numArray = args[0];
    /* untiTrue returns passed array with values dropped from front - that return false from 
       function from arguments (args[1]) - until an element returns true*/
    function untilTrue(array) {
        // While first element of array returns false from args[1] -- remove first element
        while (!args[1](array[0])) {
            array.shift();
        }
        // return array with removed elements array[0] now returns true for args[1]
        return array;
    }
    
    console.log(untilTrue(numArray));
  }
  
  dropElements([1, 2, 3, 7, 4], function(n) {return n > 3;});

// --------------------------Steamroller--------------------------

// Flattens a nested array
function steamrollArray(arr) {
    // flat array on which elements are added from arr
    var newArray = [];
    // Recursive function that adds elements from array to newArray
    function addElements(array){
        // For every element of array 
        for (var element of array) {
            // If element is not an array - push onto newArray
            if (!Array.isArray(element)){
                newArray.push(element);
            } else {
                // If element is array call addElements and to push it's elements onto newArray
                addElements(element);
            }
        }
    }

    addElements(arr);
    return newArray;
  }
  
  steamrollArray([1, [2], [3, [[4]]]]);

// ---------------------------------Binary Agents--------------------------------

// Takes string with binary numbers and converts to english sentence
function binaryAgent(str) {
    // Empty string onto which characters will be added
    var sentence = "";
    // Array of binary numbers generated from input string. A space is used as seperator.
    var binaryArray = str.split(" ");
    // For each number in binary array 
    for (var binary of binaryArray) {
        // convert to decimal using parseInt() with radix: 2
        var decimal = parseInt(binary, 2);
        // add character returned from String.fromCharCode(decimal) to sentence 
        sentence += String.fromCharCode(decimal);
    }
    
    return sentence;
  }
  
  binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111");

// -----------------------------------Everything be true-----------------------------------

// Checks if a property (pre) is truthy on all objects in collection
function truthCheck(collection, pre) {
    // For every object in collection
    for (var object of collection) {
        // If the (pre) property of that object returns false - return false  
        if (!object[pre]) return false;
    }
    // All objects have properties (pre) with a truthy value - return true
    return true;
  }
  
  truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex");

// ----------------------------------Arguments Optional------------------------------------

// Function sums two arguments. If there is only one argument -> returns a function that expects one argument and returns sum of previous call and argument
function addTogether() {
    // Takes array and checks each element - if typeof does not return "number" return undefined, else return true
    function checkArguments(array){
        for (var element of array) {
            if (typeof element !== "number") return undefined;
        }
        return true;
    }
    // Function to apply in reduce() - takes currentValue and adds to an accumulator
    function reducer(accumulator, currentValue){
        return accumulator + currentValue;
    }
    // Creating args array from arguments 
    var args = [...arguments];
    
    // If checkArguments returns true (all elements are numbers)
    if (checkArguments(args)){
        if (args.length == 2){
            // If there is two elements in args - reduce to one value by adding them
            sum = args.reduce(reducer);
            // Return reduced value
            return sum;
        } else {
            /* In case args.length == 1 - assign parameter to oldNum - 
               return function that calls addTogether with oldNum and num (next number in original function call or otherwise)*/
            var oldNum = args[0];
            return function sumOldNumAnd(num){
                    return addTogether(oldNum , num);
            };
        }
    } else {return undefined};
    //return undefined if checkArguments returned undefined. 
    
  }
  
  addTogether(2)(3);
