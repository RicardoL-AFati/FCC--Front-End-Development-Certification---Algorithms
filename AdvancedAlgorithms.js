
// ------------------------------Validate US Telephone Numbers---------------------------------------

// Checks if str is in valid US telephone number format
function telephoneCheck(str) {
    var regexToCheck = [
        /* Without parentheses check
           From beginning of line - (0 or 1) 1 --> (0 or 1) whitespace or dash -> 
           3 digits -> (0 or 1) whitespace -> 3 digits -> (0 or 1) whitespace -> 4 digits -> end of line */
        /^[1]?[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{4}$/,
        // Like previous except first 3 digit sequence must be preceded by ( and followed by )
        /^[1]?[\s-]?\(\d{3}\)[\s-]?\d{3}[\s-]?\d{4}$/
    ]
    // test str for every regex in regexToCheck -> if it returns true for a regex, return true -> else return false
    for (var regex of regexToCheck){
        if (regex.test(str)) return true;
    }
    return false;
  }
  
  console.log(telephoneCheck("1 555-555-5555"));

// -------------------------------------Record Collection------------------------------------------------

//Takes an id (for album), a property to change/delete/add, and a value to -- to modify the data in this collection.
//--Setup--
var collection = {
    "2548": {
      "album": "Slippery When Wet",
      "artist": "Bon Jovi",
      "tracks": [ 
        "Let It Rock", 
        "You Give Love a Bad Name" 
      ]
    },
    "2468": {
      "album": "1999",
      "artist": "Prince",
      "tracks": [ 
        "1999", 
        "Little Red Corvette" 
      ]
    },
    "1245": {
      "artist": "Robert Palmer",
      "tracks": [ ]
    },
    "5439": {
      "album": "ABBA Gold"
    }
};

var collectionCopy = JSON.parse(JSON.stringify(collection));

function updateRecords(id, prop, value) {
  // If value is empty delete that property-(prop) from object with that id from collection
  if (value.length <= 0){
    delete collection[id][prop];
  } else {
      // If prop is not tracks set or update - prop of that object with value 
      if (prop !== "tracks") {
        collection[id][prop] = value;
      // If prop is tracks and object with id does not have a tracks property  
      } else if (prop == "tracks" && !collection[id].hasOwnProperty(prop)){
        // Create tracks property (empty array) on that object
        collection[id][prop] = [];
        // Push value onto tracks array
        collection[id][prop].push(value);
      // If this else is reached (prop == "tracks" and object has tracks property)
      } else {
        // Push value onto that objects tracks array  
        collection[id][prop].push(value);
      }
  }
  return collection;
}

updateRecords(5439, "album", "");

// -------------------------------Symmetric Difference-----------------------------------

// Creates an array that is the Symmetric Difference of all passed in arrays
function sym(args) {
    // Takes two arrays as parameters. Compares each array against the other, and the current symDifference array, to form the symmetric difference (SD) of both arrays. 
    function symmetricDiff(setA, setB){
        var symDifference = [];
        // For every number of set - if other set and symDifference does not contain that number - push onto symDifference
        for (var number of setA){
            if (setB.indexOf(number) == -1 && symDifference.indexOf(number) == -1) symDifference.push(number);
        }
        for (var number of setB){
            if (setA.indexOf(number) == -1 && symDifference.indexOf(number) == -1) symDifference.push(number);
        }
        return symDifference;
    }
    // Creating sets array from arguments
    var sets = [...arguments];
    // First pair of sets to find SD of
    var setA = sets[0];
    var setB = sets[1];
    // Calling symmetricDiff - saving to symDifference
    var symDifference = symmetricDiff(setA, setB);
    // i is set to 2 because the first two arrays in sets were already compared
    var i = 2;
    // If there are more than two arrays in sets
    if (sets.length > 2){
        // While next index of sets (i) is < sets.length
        while (i < sets.length){
            // setA is set to previously found SD
            setA = symDifference;
            // symDifference is SD of previous SD and next set in sets
            symDifference = symmetricDiff(setA, sets[i]);
            // Incrementing i - to find SD of SD and next set (if there is one)
            i++;
        }
    }
    // return symDifference sorted from smallest to biggest
    return symDifference.sort();
  }
  
  sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]);

// ------------------------------Exact Change----------------------------------

// checkCashRegister() accepts purchase price as the first argument (price) -- payment as the second argument (cash) -- and cash-in-drawer (cid) as the third argument.

// cid is a 2D array listing available currency.

// Returns the "Insufficient Funds" if cash-in-drawer is less than the change due. Returns "Closed" if cash-in-drawer is equal to the change due.
    // Otherwise, returns change in coin and bills, sorted in highest to lowest order.

function checkCashRegister(price, cash, cid) {
    // changeDue = cash(payment) - price
    var changeDue = cash - price;
    // Creating copy of cid parameter 
    var cashInDrawer = cid;
    // Summing amounts of all denominations in cashInDrawer (cID)
    var cidTotal = 0;
    for (var denom of cashInDrawer) {
        cidTotal += denom[1];
    }
    /* If changeDue > sum of all amounts -> not enough funds
       If changeDue = sum of all amounts -> register is closed*/
    if (changeDue > cidTotal) {
        return "Insufficient Funds";
    } else if (changeDue == cidTotal) {
        return "Closed";
    } else {
    // creating values array to represent each denominations value. left-to-right Ascending order like cID.
    var values = [.01, .05, .10, .25, 1, 5, 10, 20, 100];
    // Pushing each value to it's corresponding denomonation in cID
    for (var i = 0; i < values.length; i++){
        cashInDrawer[i].push(values[i]);
    }
    // Change array that will contain denomination sub-arrays (bills and coins)
    var change = [];
    // Iterating backwards through cID - starting at largest denomination (right-to-left)
    for (var i = cashInDrawer.length -1; i >= 0; i--) {
        // If there's an instance of that denomination in cID && result of : (subtracting change due by denomination) > 0
        if (cashInDrawer[i][1] > 0 && (changeDue - cashInDrawer[i][2]) > 0){
            // Creating array that will represent the denomination and the total value (if there are multiple instances)
            // ["BillorCoin", totalValue]
            var denomAndAmount = [cashInDrawer[i][0], 0];
            // While changeDue is >= current denomination and there are still instances of denomination in cID
            while (changeDue >= cashInDrawer[i][2] && cashInDrawer[i][1] > 0){
                // Subtract change due by denomination
                changeDue -= cashInDrawer[i][2];
                // Add value of one denomination to denomAndAmount 
                denomAndAmount[1] += cashInDrawer[i][2];
                // Update cID by subtracting value of one denomination (one less instance)
                cashInDrawer[i][1] -= cashInDrawer[i][2];
                // Rounding changeDue up to 3 decimal places
                changeDue = changeDue.toFixed(3);
            }
            // Pushing sub-array onto change 
            change.push(denomAndAmount);
        }
    }
    // If there is even a "penny" left
    if (changeDue > 0.00){
        return "Insufficient Funds";
    }
    return change;
    }
}
  
checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

// -----------------------------------------------Inventory Update------------------------------------------------------------

// Compares and updates elements in arr1 (2d array) against arr2. 
    //If item exists in arr1 (from arr2) - adds inventory quantity to arr1 -- else adds new item (from arr2) to arr1. Sorts array alphabetically by item name.
function updateInventory(arr1, arr2) {
    // Searches array for element with search string. If found returns index of element else returns false. 
    function searchInventory(array, searchString){
        for (var item in array) {
            if (array[item].includes(searchString)) return item;
        }
        return false;
    }
    // compare function for sorting array values by their second index
    function compareNames(a, b) {
        // Place a before b
        if (a[1] < b[1]) return -1;
        // Place a after b
        if (a[1] > b[1]) return 1;
        // a and b are equal, sort a & b in respect to other elements 
        return 0;
    }
    // Creating copy of current inventory (updatedInventory)
    var updatedInventory = arr1;
    // For each item in new inventory array
    for (var item of arr2) {
        // name of current item is second index of item
        var ItemName = item[1];
        // search updatedInventory for index of item that matches search string (itemName)
        var indexOfItem = searchInventory(updatedInventory, ItemName);
        // If an index was returned
        if (indexOfItem) {
            // Update item at index - by adding the quantity of current item of new inventory 
            updatedInventory[indexOfItem][0] += item[0];
        } else {
            // item not found in current inventory - push current item onto updatedInventory
            updatedInventory.push(item);
        }
    }
    // return updatedInventory sorted alphabetically
    return updatedInventory.sort(compareNames);
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);

// --------------------------------No Repeats Please-----------------------------------

// Returns number of total permutations of the provided string that don't have repeated consecutive letters. 
    //Assumes that all characters in the provided string are unique.
function permAlone(str) {
    // Splitting str into array of characters
    var strArray = str.split('');
    // Setting starting string array (strArray) index to call allPermutations() with
    var lengthOfStr = strArray.length;
    // Array to push permutations onto
    var permutations = [];
    // Function that swaps elements at a & b in an index
    function swap (a, b) {
        var hold = strArray[a];
        strArray[a] = strArray[b];
        strArray[b] = hold;
    }
    // Heap's Algorithm
    function allPermutations (lengthOfStr){
        // Final call, once here joins and pushes current strArray to permutations
        if (lengthOfStr == 1) { 
            permutations.push(strArray.join(''));
        } else {
        // Loop runs (lengthOfStr - 1) times      
        for (var i = 0; i < lengthOfStr - 1; i++) {
            // Calls allPermutations with lengthOfStr (in current call) - 1 
            allPermutations(lengthOfStr - 1);
            // if lengthOfStr is even
            if (lengthOfStr % 2 == 0) {
                // swap element at i (a) with element at lengthOfStr -1 (b)
                swap(i, lengthOfStr - 1);
            } else {
                // swap first element (a) with element at lengthOfStr - 1 (b)
                swap(0, lengthOfStr - 1);
            }
        }
        // After for loop - call with lengthOfStr (in current call) - 1
        allPermutations(lengthOfStr - 1);
        }   
    }
    // Initial call with original lengthOfStr
    allPermutations(lengthOfStr);
    // Matches - alphanumeric (captures it) followed by that capture again 
    var regex = /(\w)\1/g;
    // Number of strings that don't match. Strings without repeating characters. 
    var count = 0;
    // Iterating through permutations
    for (var string of permutations) {
        // If string doesn't match regex (repeated char) increment count
        if (!string.match(regex)) count++; 
    }
    // return number of strings in permutations that don't have repeated characters
    return count;
  }
  
  permAlone("aaabb");

// -----------------------------------Make a Person-----------------------------

// Creates a person object with methods for first and last name modification
var Person = function(firstAndLast) {
    // Creating array that will serve as full name. Takes parameter and splits by a space.
    var fullNameArray = firstAndLast.split(" ");
    // Full name getter. Returns fullNameArray joined by a space.
    this.getFullName = function() {
      return fullNameArray.join(' ');
    };
    // First name getter. Returns first index of fullNameArray
    this.getFirstName = function() {
        return fullNameArray[0];
    };
    // Last name getter. Returns second index of fullNameArray
    this.getLastName = function() {
        return fullNameArray[1];
    };
    // First name setter. Sets first index of fullNameArray to parameter.
    this.setFirstName = function(first) {
        fullNameArray[0] = first;
    };
    // Last name setter. Sets second index of fullNameArray to parameter.
    this.setLastName = function(last) {
        fullNameArray[1] = last;
    };
    // Full name setter. Creates fullNameArray then calls setters using indexes from that array. 
    this.setFullName = function(firstAndLast) {
        var fullNameArray = firstAndLast.split(" ");
        this.setFirstName(fullNameArray[0]);
        this.setLastName(fullNameArray[1]);
    };

};

var bob = new Person('Bob Ross');
bob.getFullName();

// -------------------------------Map the Debris----------------------------------------

// Takes array and returns new array with modified objects taken from arr parameter 
    // converts their avgAlt: value -> orbitalPeriod: value
function orbitalPeriod(arr) {
    // Variables given by FreeCodeCamp
    var GM = 398600.4418;
    var earthRadius = 6367.4447;
    // Creating copy of parameter to mutate and return 
    var orbitalBodies = arr;
    // For every object in orbitalBodies -- Determine orbitalPeriod using Kepler's Third Law (KTL)
    for (var body of orbitalBodies) {
        // a^3 in KTL is (earthRadius + avgAlt) ^ 3 
        var aCubed = Math.pow(earthRadius + body.avgAlt, 3);
        // orbitalPeriod (t) = 2π * √ (aCubed / GM) 
        var t = 2 * Math.PI * Math.sqrt(aCubed / GM);
        // Creating orbitalPeriod key on current body and assigning t rounded to nearest whole number
        body.orbitalPeriod = Math.round(t);
        // deleting avgAlt key on current body
        delete body.avgAlt;
    }
    
    return orbitalBodies;
    
  }
  
  orbitalPeriod([{name: "iss", avgAlt: 413.6}, {name: "hubble", avgAlt: 556.7}, {name: "moon", avgAlt: 378632.553}]);

// ------------------------------Pairwise-----------------------------------------------

// Given an array - arr, finds element pairs whose sum equal arg and return the sum of their indices.
function pairwise(arr, arg) {
    // Creating array from indexes of arr
    var indicesToCheck = Array.from(arr.keys());
    // sum of index pairs to be returned
    var sum = 0;
    /* Adds - arr[checkIndex] + arr[every other index in indicesToCheck]
       if sum is equal to arg -> return current index in indicesToCheck */ 
    function checkForSums(indicesToCheck){
        for (var i = 1; i < indicesToCheck.length; i++) {
            var nextIndex = indicesToCheck[i];
            if(arr[checkIndex] + arr[nextIndex] == arg) return nextIndex;
        }
        // No pairs were found
        return -1;
    }
    // While indicesToCheck has more than one index in it
    while (indicesToCheck.length > 1){
        // Index to add other indexes in arr to. Set to first element of indicesToCheck 
        var checkIndex = indicesToCheck[0];
        // foundIndex is the second of index pair that sums to arg
        var foundIndex = checkForSums(indicesToCheck);
        // If an index was found (not -1)
        if (foundIndex > 0){
            // Sum the two indexes whose values sum to arg
            sum += checkIndex + foundIndex;
            // Remove first index in indicesToCheck -- Once an index has been used in a pair, can't be re-used.
            indicesToCheck.splice(0, 1);
            // Remove second index in found pair from indicesToCheck
            indicesToCheck.splice(indicesToCheck.indexOf(foundIndex), 1);
        } else {
            // If no pair was found - just remove first index from indicesToCheck (addition is associative)
            indicesToCheck.splice(0, 1);
        }
    }
    // Return sum of all index pairs
    return sum;
  }
  
  pairwise([0, 0, 0, 0, 1, 1], 1);
