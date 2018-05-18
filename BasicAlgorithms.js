// // ------------------------Find the Longest Word in a String--------------------------

function findLongestWord(str) {
    // Create array of words using split() by a space  
    var subStrArray = str.split(" ");
    // longestWord to be used for comparing lengths
    var longestWord = '';
    // Iterating through subStrArray
    for (var i = 0; i < subStrArray.length; i++){
      // If word at current index is longer than longest word  
      if (subStrArray[i].length > longestWord.length){
        // longestWord is set to current word  
        longestWord = subStrArray[i];
      }
    }
  
    return longestWord.length;
  }
  
  findLongestWord("The quick brown fox jumped over the lazy dog");
  
  // --------------------------Title Case a Sentence---------------------------------
  
  function titleCase(str) {
    // Mutating str (oh no!) to an array of lowercase words using split() by a space   
    str = str.toLowerCase().split(' ');
    // Iterating through str
    for (var i = 0; i < str.length; i++){
      // capitalLetter is first letter of current word -> made uppercase  
      capitalLetter = str[i].charAt(0).toUpperCase();
      // replacing the first letter in current word with capitalLetter
      str[i] = str[i].replace(/[a-z]/, capitalLetter);
    }
    // str = str array joined into a single string
    str = str.join('');
    return str;
  }
  
  titleCase("I'm a little tea pot");
  
  
  // --------------------------------Return Largest Numbers in Arrays------------------------
  
  function largestOfFour(arr) {
    // Array for largest number in each sub-array  
    newArr = [];
    // For each array in arr
    arr.forEach(function(array){
      // largestNum for comparison  
      var largestNum = 0;
      // Iterating through current array 
      for (var i = 0; i < array.length; i++){
        // If number at current index > largestNum  
        if (array[i] > largestNum){
          // Largestnum is current number  
          largestNum = array[i];
        }
      }
      // Push largestNum of current array onto newArr
      newArr.push(largestNum);
    });
    return newArr;
  }
  
  largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);
  
  // --------------------------------------------Confirm the Ending-------------------------------------------
  
  function confirmEnding(str, target) {
      // indexStart for substring() is: str.length - length of comparison string    
      var startIndex = str.length - target.length;
      // getting substring of str - starting from startIndex to end of str
      endingString = str.substr(startIndex);
      // If endingString is equal to target -> confirmation is true, else false
      var confirmation = (endingString === target) ? true : false;
      return confirmation;
    }
    
    confirmEnding("Connor", "n");
  
  // ----------------------------------------Truncate a string-------------------------------------------
  
  function truncateString(str, num) {
      // Truncated version of str
      var truncatedString = "";
      // If num <= 3 - endIndex for slice() is num, else is num -3 (accounting for ellipsis)
      var cutIndex = (num <= 3) ? num : num - 3;
      /* truncatedString = If str.length > num - get section from beginning to cutIndex of str and add "..." 
                           else truncatedString is just str */
      truncatedString = (str.length > num) ? 
      truncatedString = str.slice(0, cutIndex) + "..." : str;
  
      return truncatedString;
    }
    
    truncateString("A-tisket a-tasket A green and yellow basket", 11);
  
  // ---------------------------------------Chunky Monkey----------------------------------------------
  
  // Creates 2d array with sub-arrays of length - size, using arr
  function chunkArrayInGroups(arr, size) {
      // Declaring hold and return arrays
      newArray = [];
      hold = [];
      // while arr still has elements in it
      while (arr.length != 0){
        // hold is elements removed from arr - from beginning of arr (size: how many to remove)    
        hold = arr.splice(0, size);
        // Push hold (sub-array) onto newArray
        newArray.push(hold);
        }
  
      return newArray;
      }
      
      chunkArrayInGroups(["a", "b", "c", "d"], 2);
      
  
  // -------------------------------------Mutations---------------------------------------
  
  // Returns true if first element of arr contains all letters in the second element of arr. Else, false
  function mutation(arr) {
    // Mutating both to be lowercase  
    arr[0] = arr[0].toLowerCase();
    arr[1] = arr[1].toLowerCase();
    // Setting return boolean value to true
    var allLettersPresent = true;
    // Iterating through second string in arr  
    for (var i = 0; i < arr[1].length; i++){
        // Searching first string for indexOf current letter of second string 
        indexOf = arr[0].indexOf(arr[1][i]);
        // If indexOf returned -1 -> letter was not found
        if (indexOf == -1){
            // first string does not contain all the letters in second string
            allLettersPresent = false;
        }
    }
    // If allLetterPresent wasn't changed to false - returns true 
    return allLettersPresent;
  }
  
  mutation(["hello", "Hello"]);
  
  // ------------------------------------------Seek and Destroy------------------------------------
  
  // Removing values from array in arr that match other elements in arr
  function destroyer(arr) {
     // Declaring arguments array (args) using the arguments object  
     var args = Array.prototype.slice.call(arguments);
     // Copying array from args
     var newArray = args[0];
     // Iterating through args starting at second index (values to remove)
     for (var i = 1; i < args.length; i++){
          // Function for filter() - Return elements not equal to current element in args
          function someValue(element) {
              return element !== args[i]
          }
          // newArray with elements that are equal to current element in args - filtered out
          newArray = newArray.filter(someValue); 
     } 
     return newArray;
    }
    
    destroyer([1, 2, 3, 1, 2, 3], 2, 3);
  
  // ----------------------------------Where do I belong-------------------------------------------
  
  // Return lowest index where num should be inserted once arr has been sorted (ascending left-to-right)
  function getIndexToIns(arr, num) {
      // Sorting arr using function: If return < 0 - a goes first, else b does
      arr.sort(function(a, b){
          return a - b;
      });
      // Iterating through arr and finding first index where num <= current element in arr
      for (var i = 0; i < arr.length; i++){ 
        if (num <= arr[i]) {
          return i;
        }
      }
      // If num > all elements in arr, return length of arr (insert num at end)
      return arr.length;
      }
      
      getIndexToIns([2, 5, 10], 15);  
  
  
  // ------------------------------------Caesars Cipher-------------------------------------------------
  
  // Takes an encoded - ROT13 cipher - string and returns decoded string
  function rot13(str) {
      // charCode of current letter
      var charCode;
      // decoded string
      var newString = "";
      // decoded letter to add to decoded string
      var decodedLetter;
      // Iterating through encoded string
      for (var i = 0; i < str.length; i++){
          // If current letter is not - anything not A-Z
          if (str[i].search(/[^a-z]/gi) == -1){
                  // retrieve charCode at current letter
                  charCode = str.charCodeAt(i);
                  /* A-Z is 65-90 for ASCII so 77 is cutoff to stay in range
                     Adding or subtracting has same result of shifting letter 13 places. */
                  if (charCode <= 77){
                      charCode += 13;
                  } else {
                      charCode -= 13;
                  }
                  // generating decoded letter from new charCode that has been shifted by 13 places
                  decodedLetter = String.fromCharCode(charCode);
                  // Adding letter to decoded string
                  newString += decodedLetter;
              } else {
                  // If current character is something other than A-Z, just add to decoded string
                  newString += str[i];
              }
          }
  return newString;
  }
    
  // Change the inputs below to test
  rot13("GUR DHVPX OEBJA QBT WHZCRQ BIRE GUR YNML SBK.");
