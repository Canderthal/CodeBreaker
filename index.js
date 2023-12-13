let secretCode = [];
let hintContainer = document.getElementById("hintContainer");
let attemptedPassword = [];
let rowPos = 1;
let row = 1;
let accessGranted = false;
let hackAttempts = 0;
let hintsUsed = 0; // Havent added a tracker but may add one in the future
let score = 0;
const scoreId = document.getElementById("score");


function openHowToPlay() {
    var myModal = new bootstrap.Modal(document.getElementById('roadMap'));
    myModal.show();
}

function openRoadmap() {
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal2'));
    myModal.show();
}

function openModal() {
    // Show the modal
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    myModal.show();
}

//Called after hack is successful 
function nextTarget() {
    let buttonText = document.getElementById("gameButton");
    if (buttonText.textContent === "Reset"){
        resetGame();
    } else {
        let popUp = document.getElementById("gameButton");
        popUp.textContent = "Next Target"
        generateRandomCode();
        clearRejectedPasswords();
        resetHints();
        clearHints();
        newGameHints();
        accessGranted = false;
        score++;
        scoreId.textContent = score;
        hintsUsed = 0; // Not currently in use
        hackAttempts = 0;
        clearSelectedNum();
    }
}


//Resets game after failure
function resetGame() {
    generateRandomCode();
    clearRejectedPasswords();
    resetHints();
    newGameHints();
    clearHints();
    accessGranted = false;
    score = 0;
    scoreId.textContent = score;
    hintsUsed = 0;
    hackAttempts = 0;

}


//Clears hints for next game
function clearHints() {
    var myList = document.getElementById("hintContainer");

// Remove all <li> elements from the list
    while (myList.firstChild) {
        myList.removeChild(myList.firstChild);
    }
}


//Generate the secret phrase 
function generateRandomCode() {
    secretCode = []; // removed numbers 10-12
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    for (let i = 0; i< 7; i++) {
        let randomIndex = Math.floor(Math.random() * numbers.length);
        let randomNum = numbers[randomIndex];
        numbers.splice(randomIndex, 1);
        secretCode.push(randomNum);
    }
    secretCode.sort(function(a, b){return a - b});
    console.log("SecretCode is " + secretCode);

}

function hintPicked(id) {
    console.log(Object.keys(restartHints).length);
    //Get the html element with the specified ID
    let hint = document.getElementById(id);
    // Get the text content of the HTML element and remove leading/trailing whitespaces
    hint = hint.textContent.trim();
    // Check if there is a corresponding function for the hint in the 'hintsAndFunctions' object
    if(hintsAndFunctions[hint]) {
        // If a function is found, call it
        hintsAndFunctions[hint]();
        if (Object.keys(restartHints).length < 1) {
            document.getElementById(id).textContent = "No More Hints";
        } else {
            let newHint = getRandomHintKey();
            document.getElementById(id).textContent = newHint;
            delete restartHints[newHint];
            hintsUsed += 1;

        }


    } else {
        // If no function is found, log a message to the console
        console.log("No function found for the hint")
        document.getElementById(id).textContent = "No More Hints";
    }

}




function startGame() {
    newGameHints();
    generateRandomCode();

}


//Controls the functions needed for each hint
const hintsAndFunctions = {
    //Hint 1
    "The total sum of all digits is even or odd": hintSumIsEvenOrOdd,
    //Hint 2
    "The total sum is...": totalSum,
    //Hint 3
    "The fourth digit is greater or less than 5.": hintMiddleDigitGreaterThan5,
    //Hint 4
    "Total Sum of the 4 left most tiles": leftTotalSum,
    //Hint 5
    "Total Sum of the 4 right most tiles": rightTotalSum,
    //Hint 6
    "Total number of even numbers": totalEvenNum,
    //Hint 7
    "Total number of odd numbers": totalOddNum,
    //Hint 8
    "Sum of first and third number": sumPos0Pos2,
    //Hint 9
    "The sum of the first and the third numbers are": sumPos1Pos3,
    //Hint 10
    "Sum of the third and fifth number": sumPos2Pos4,
    //Hint 11
    "The sum of the fourth and sixth numbers are": sumPos3Pos5,
    //Hint 12
    "Sum of the fifth and last number": sumPos4Pos6,
    //Hint 13
    "The difference between the highest and lowest number is...": diffHighesAndLowest,
    //Hint 14
    "The difference between the third and first number is": diffPos0Pos2,
    //Hint 15
    "The difference between the fourth and second number is": diffPos1Pos3,
    //Hint 16
    "The difference between the fifth and third number is": diffPos2Pos4,
    //Hint 17
    "The difference between the sixth and fourth number is": diffPos3Pos5,
    //Hint 18
    "The difference between the seventh and fifth number is": diffPos4Pos6,
};

//Hints are removed from this dictionary as they get picked
let restartHints = {
    //Hint 1
    "The total sum of all digits is even or odd": hintSumIsEvenOrOdd,
    //Hint 2
    "The total sum is...": totalSum,
    //Hint 3
    "The fourth digit is greater or less than 5.": hintMiddleDigitGreaterThan5,
    //Hint 4
    "Total Sum of the 4 left most tiles": leftTotalSum,
    //Hint 5
    "Total Sum of the 4 right most tiles": rightTotalSum,
    //Hint 6
    "Total number of even numbers": totalEvenNum,
    //Hint 7
    "Total number of odd numbers": totalOddNum,
    //Hint 8
    "Sum of first and third number": sumPos0Pos2,
    //Hint 9
    "The sum of the first and the third numbers are": sumPos1Pos3,
    //Hint 10
    "Sum of the third and fifth number": sumPos2Pos4,
    //Hint 11
    "The sum of the fourth and sixth numbers are": sumPos3Pos5,
    //Hint 12
    "Sum of the fifth and last number": sumPos4Pos6,
    //Hint 13
    "The difference between the highest and lowest number is...": diffHighesAndLowest,
    //Hint 14
    "The difference between the third and first number is": diffPos0Pos2,
    //Hint 15
    "The difference between the fourth and second number is": diffPos1Pos3,
    //Hint 16
    "The difference between the fifth and third number is": diffPos2Pos4,
    //Hint 17
    "The difference between the sixth and fourth number is": diffPos3Pos5,
    //Hint 18
    "The difference between the seventh and fifth number is": diffPos4Pos6,
};




//Resets the hint pool
function resetHints() {
    restartHints = {
    //Hint 1
    "The total sum of all digits is even or odd": hintSumIsEvenOrOdd,
    //Hint 2
    "The total sum is...": totalSum,
    //Hint 3
    "The fourth digit is greater or less than 5.": hintMiddleDigitGreaterThan5,
    //Hint 4
    "Total Sum of the 4 left most tiles": leftTotalSum,
    //Hint 5
    "Total Sum of the 4 right most tiles": rightTotalSum,
    //Hint 6
    "Total number of even numbers": totalEvenNum,
    //Hint 7
    "Total number of odd numbers": totalOddNum,
    //Hint 8
    "Sum of first and third number": sumPos0Pos2,
    //Hint 9
    "The sum of the first and the third numbers are": sumPos1Pos3,
    //Hint 10
    "Sum of the third and fifth number": sumPos2Pos4,
    //Hint 11
    "The sum of the fourth and sixth numbers are": sumPos3Pos5,
    //Hint 12
    "Sum of the fifth and last number": sumPos4Pos6,
    //Hint 13
    "The difference between the highest and lowest number is...": diffHighesAndLowest,
    //Hint 14
    "The difference between the third and first number is": diffPos0Pos2,
    //Hint 15
    "The difference between the fourth and second number is": diffPos1Pos3,
    //Hint 16
    "The difference between the fifth and third number is": diffPos2Pos4,
    //Hint 17
    "The difference between the sixth and fourth number is": diffPos3Pos5,
    //Hint 18
    "The difference between the seventh and fifth number is": diffPos4Pos6,
    }
}


//Fills the board with 6 new hints
function newGameHints() {
    for (let i = 0; i < 6; i++) {
        let hint = document.getElementById("hint" + i);
        let hintText = getRandomHintKey();
        hint.textContent = getRandomHintKey();
        hint.textContent = hintText;
        delete restartHints[hintText];

    }

}



//Selects random hint to replace hints that are picked
function getRandomHintKey() {
    const hintKeys = Object.keys(restartHints); //changed from hintsAndFunctions
    const randomIndex = Math.floor(Math.random() * hintKeys.length);
    return hintKeys[randomIndex];
}



//Resets number selects for each new round
function clearSelectedNum() {
    for (let i = 0; i < 7; i++) {
        let x = document.getElementById("input" + i);
        x.value = "0";
    }
}


//Called from the button, "attempt hack". Test if the attempted code is correct
function testSubmission() {
    let total = 0;
    attemptedPassword = [];
    hackAttempts++;
    // Check each input against secretCode
    for (let i = 0; i < 7; i++) {
        let x = document.getElementById("input" + i);
        let xVal = parseInt(x.value);
        attemptedPassword.push(xVal);
        if (xVal === secretCode[i]) {

            total += 1;
            if (total === 7) {
                accessGranted = true;
                let popUp = document.getElementById("gameButton");
                let granted = document.getElementById("granted");
                let codeCard = document.getElementById("secretCodeCard");
                codeCard.textContent = "";
                granted.textContent = "ACCESS GRANTED";
                granted.style.color = "green";
                popUp.textContent = "Reset";
            }
        } 
    }

    // Secondary Function to change the color of boxes after a delay
    function changeColorWithDelay(index) {

        let codePos = document.getElementById("code" + index);

        // Using setTimeout to delay the background color change
        setTimeout(function() {
            if (total > 0) {
                codePos.style.backgroundColor = "green";
            } else {
                codePos.style.backgroundColor = "red";
            }
            // total represents the amount of numbers user got correct
            total -= 1;

            // Call the function recursively for the next index
            if (index < 6) {
                changeColorWithDelay(index + 1);
            }
        }, 300);

    }

    // Start the color change with a delay for the first box
    changeColorWithDelay(0);
    resetColor(total);
}


//Adds rejected password to the list
function updateRejectedPasswords() {
    for (let i = 0; i < 7; i++, rowPos++) {
        const reject = document.getElementById("rejected" + row + rowPos);
        reject.textContent = attemptedPassword[i];
    }
    row++;
}


//clears rejected passwords
function clearRejectedPasswords() {
    row = 1;
    rowPos = 1;
    for (let row = 1; row <= 3; row++) {
        for (let rowPos = 1; rowPos <= 7; rowPos++) {
            const reject = document.getElementById("rejected" + row + rowPos);
            reject.textContent = "#";
        }
        rowPos = 1;
    }
}



//Resets color back to the normal background
function resetColor(total) {
    setTimeout(function() {
        for (let i = 0; i < 7; i++) {
            let codePos = document.getElementById("code" + i);
            codePos.style.backgroundColor = "black";
        }
        if (accessGranted) {
            let popUp = document.getElementById("gameButton");
            popUp.textContent = "Next Target";
            openModal();
        }
        updateTotalCorrect(total);
        if (!accessGranted){
            if (hackAttempts > 2) {
                let popUp = document.getElementById("gameButton");
                let granted = document.getElementById("granted");
                granted.textContent = "ACCESS DENIED";
                let codeCard = document.getElementById("secretCodeCard");
                codeCard.textContent = "The secret code was: " + secretCode;
                granted.style.color = "red";
                popUp.textContent = "Reset";
                openModal();
            } else {
                updateRejectedPasswords();
                rowPos = 1;
            }

        }
    }, 3000);
}


//Updates the hint container to tell the player how many are in the correct position.
function updateTotalCorrect(total) {
    let text = document.createElement("li");
    text.textContent = "You had " + total + " numbers in the correct position";
    text.style.fontWeight = 600;
    hintContainer.appendChild(text);
}










///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hint Functions
//Hint 1
function hintSumIsEvenOrOdd() {
    console.log("Hint 1");
    let total = 0
    let text = document.createElement("li");
    for (let i = 0; i < 7; i++) {
        total += secretCode[i];
    }
    if (total % 2 === 0) {
        console.log("The total sum is even");
        text.textContent = "The total sum is even"
    } else {
        console.log("The total sum is odd");
        text.textContent = "The total sum is odd"
    }
    hintContainer.appendChild(text);
  }

//Hint 2
function totalSum() {
    console.log("Hint 2");
    let total = 0
    let text = document.createElement("li");
    for (let i = 0; i < 7; i++) {
        total += secretCode[i];
    }
    console.log(total);
    text.textContent = "The total sum is " + total;
    hintContainer.appendChild(text);
}

//Hint 3
function hintMiddleDigitGreaterThan5() {
    let text = document.createElement("li");
    console.log("Hint 3");
    console.log(secretCode);

    if (secretCode[3] > 5) {
        console.log("The middle number is larger than 5")
        text.textContent = "The middle number is larger than 5"
        hintContainer.appendChild(text);
    } 
    else if (secretCode[3] === 5) {
        console.log("The middle number is 5");
        text.textContent = "The middle number is 5"
        hintContainer.appendChild(text);
    } else {
        console.log("The middle number is less than 5")
        text.textContent = "The middle number is less than 5"
        hintContainer.appendChild(text);
    }
  }

//Hint 4
function leftTotalSum() {
    let text = document.createElement("li");
    console.log("Hint 4");
    let total = 0

    for (let i = 0; i < 4; i++) {
        total += secretCode[i];
    }
    console.log("Hint 4 left total sum: " + total);
    text.textContent = "The left 4 numbers total sum is: " + total;
    hintContainer.appendChild(text);
}

//Hint 5
function rightTotalSum() {
    let text = document.createElement("li");
    console.log("Hint 5");
    let total = 0

    for (let i = 3; i < 7; i++) {
        total += secretCode[i];
    }
    console.log("Hint 5 right total sum: " + total);
    text.textContent = "The right total sum is " + total;
    hintContainer.appendChild(text);
  }

//Hint 6
function totalEvenNum() {
    let text = document.createElement("li");
    console.log("Hint 6");
    const even = (secretCode.filter(num => num % 2 === 0).length);
    
    text.textContent = "There are " + even + " even numbers";
    hintContainer.appendChild(text);
}

//Hint 7
function totalOddNum() {
    let text = document.createElement("li");
    console.log("Hint 7");
    const odd = (secretCode.filter(num => num % 2 !== 0).length);
    text.textContent = "There are " + odd + " odd numbers";
    hintContainer.appendChild(text);
}

//Hint 8
function sumPos0Pos2() {
    let text = document.createElement("li");
    let difference = secretCode[2] - secretCode[0];
    text.textContent = "The sum of the first and the third numbers are " + difference;
    hintContainer.appendChild(text);
}
//Hint 9 
function sumPos1Pos3() {
    let text = document.createElement("li");
    console.log("Hint 8");
    let total = 0;
    total += secretCode[0];
    total += secretCode[3];
    text.textContent = "The sum of the first and the third numbers are " + total;
    hintContainer.appendChild(text);
}

//Hint 10
function sumPos2Pos4() {
    let text = document.createElement("li");
    console.log("Hint 9");
    let total = 0;
    total += secretCode[2];
    total += secretCode[4];
    text.textContent = "The sum of the third and fifth numbers are " + total;
    hintContainer.appendChild(text);
}

//Hint 11
function sumPos3Pos5() {
    let text = document.createElement("li");
    console.log("Hint 9");
    let total = 0;
    total += secretCode[3];
    total += secretCode[5];
    text.textContent = "The sum of the fourth and sixth numbers are " + total;
    hintContainer.appendChild(text);
}

//Hint 12
function sumPos4Pos6() {
    let text = document.createElement("li");
    console.log("Hint 10");
    let total = 0;
    total += secretCode[4];
    total += secretCode[6];
    text.textContent = "The sum of the fifth and last numbers are " + total;
    hintContainer.appendChild(text);
}
//Hint 13
function diffHighesAndLowest() {
    let text = document.createElement("li");
    let difference = secretCode[6] - secretCode[0];
    text.textContent = "The difference between the highest and lowest number is " + difference;
    hintContainer.appendChild(text);
}

//Hint 14
function diffPos0Pos2() {
    let text = document.createElement("li");
    let difference = secretCode[2] - secretCode[0];
    text.textContent = "The difference between the third and first number is " + difference;
    hintContainer.appendChild(text);
}

//Hint 15
function diffPos1Pos3() {
    let text = document.createElement("li");
    let difference = secretCode[3] - secretCode[1];
    text.textContent = "The difference between the fourth and second number is " + difference;
    hintContainer.appendChild(text);
}

//Hint 16
function diffPos2Pos4() {
    let text = document.createElement("li");
    let difference = secretCode[4] - secretCode[2];
    text.textContent = "The difference between the fifth and third number is " + difference;
    hintContainer.appendChild(text);
}

//Hint 17
function diffPos3Pos5() {
    let text = document.createElement("li");
    let difference = secretCode[5] - secretCode[3];
    text.textContent = "The difference between the sixth and fourth number is " + difference;
    hintContainer.appendChild(text);
}

//Hint 18
function diffPos4Pos6() {
    let text = document.createElement("li");
    let difference = secretCode[6] - secretCode[4];
    text.textContent = "The difference between the seventh and fifth number is " + difference;
    hintContainer.appendChild(text);
}