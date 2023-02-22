// variable for questions
var questions = [
    {
        // question 0
        prompt: "Commonly used data types do NOT include:",
        answers: ["Strings", "Booleans", "Alerts", "Numbers"],
        // Correct answer: Booleans
        correctAnswer: "2"
    },

    {
         // question 1
         prompt: "The condition in an if / else statement is enclosed within ____.",
         answers: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
         // Correct answer: Quotes
         correctAnswer: "1"
    },

    {
         // question 2
         prompt: "Arrays in Javascript can be used to store ____.",
         answers: ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
         // Correct answer: Booleans
         correctAnswer: "3"
    },

    {
        // question 3
        prompt: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["Commmas", "Curly brackets", "Quotes", "Parentheses"],
        // Correct answer: Curly brackets
        correctAnswer: "2"
    },

    {
        // question 4
         prompt: "A very useful tool used during development and debugging for printing content to the debugger is:",
         answers: ["Javascript", "Terminal/Bash", "For loops", "console.log"],
         // Correct answer: For loops
         correctAnswer: "3"
    }
];

// DOM elements
// Returns a list of all id elements (id represented by #) with the word "___" in it
var timerEl = document.querySelector("#timer");

var startBtn = document.querySelector("#start-button");

var questionsEl = document.querySelector("#questions");

var multipchoiceEl = document.querySelector("#multiple-choice");

var submitBtn = document.querySelector("#submit-score");

var initialsEl = document.querySelector("#initials");

var feedbackEl = document.querySelector("#feedback");

// var reStartBtn = document.querySelector("#restart");

//Quiz landing page (Introduction)
var liveQuestionIndex = 0;
var time = questions.length * 20;
var timerId;

// Function triggered (Start quiz) and hide landing page
function quizStart() {
    timerId = setInterval(clockTimer, 1000);
    // The textContent property returns the content of an element/node and all of its descendents(child nodes).
    // A little confused why this is needed
    timerEl.textContent = time;
    var landingScreenEl = document.getElementById("start-screen");
    // Class attribute is set to be updated to hide
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

// Loop through array of questions and answers and present multiple choice as a list of buttons
function getQuestion() {
    var liveQuestion = questions[liveQuestionIndex];
    // promptEl = question-asked (retrieved from html (document) through getElementById)
    var promptEl = document.getElementById("question-asked")
    // The textContent in JS is a property used to set or get text content. It is used to return the text content of a specific node and its descendants.
    promptEl.textContent = liveQuestion.prompt;
    // The innerHTML property sets (or returns) the HTML content of an element. It is used to set text inside of an HTML tag (ie: Paragraoh, anchor, span, or div tag))
    multipchoiceEl.innerHTML = "";
    // forEach is used to run function for each array element (loop)
    // execute function choice
    // forEach(function (element, index)
    // array = liveQuestion.answers
    liveQuestion.answers.forEach(function(selectedAnswer, i) {
        // Each multiple choice will be presented as a mulitplechoice button (created)
        var multiplechoiceBtn = document.createElement("button");
        // multiple choice value attribute is set to be updated to selectedAnswer
        multiplechoiceBtn.setAttribute("value", selectedAnswer);
        // multiple choice text is set to be = index + 1 + . + selectedAnswer
        multiplechoiceBtn.textContent = i + 1 + ". " + selectedAnswer;
        // The onclick event allows the programmer to execute a JavaScript's function when an element gets clicked.
        // "Clickable"
        // addEventListener or onclick
        // object.onclick = function(){myScript};              object is the target
            //multiplechoiceBtn.onclick = questionClick;
        // object.addEventListener(event, function);           object is the target
        multiplechoiceBtn.addEventListener("click", questionClick);
        //multiplechoiceBtn.onclick = questionClick;
        // The appendChild() method appends a node (element) as the last child of an element
        multipchoiceEl.appendChild(multiplechoiceBtn);
    });
}

//  Conditional to check for right answers (else) deduct time for wrong answer, go to next question
function questionClick() {
    // this.something is used to take an input and use it for “this” when running a function in relation to an Object.
    // this is always a reference to an object (questionClick)
    // if the question clicked is not equal to the answer (beginning from index 0 from questions variable array).....
    if (this.value !== questions[liveQuestionIndex].correctAnswer) {
        // deduct 10 seconds from the time...
        // the time output is = (time - 10)
        time -= 10;
        // if time will result in less than 0, make time = 0....
        if (time < 0) {
        time = 0;
        }
        // set timerEl text to time 
        timerEl.textContent = time;
        // set feedbackEl text to say "Oops, not quite! The correct answer is [questions[i] correct Answer (which is a string)]"
        feedbackEl.textContent = `Oops, not quite! The correct answer is ${questions[liveQuestionIndex].correctAnswer}.`;
        feedbackEl.style.color = 'red';
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = 'green';
    }
    // Class attribute is set to be updated to feedback
    feedbackEl.setAttribute("class", "feedback");

    //setTimeout(functionReferenced, timer length in miliseconds)
    setTimeout(function() {
        // Class attribute is set to be updated to feedback hide
        feedbackEl.setAttribute("class", "feedback hide");
    }, 3000);


    // Increase from 0: 0, 1, 2, 3 .....
    liveQuestionIndex++;
    // If all questions have been answered, end quiz...
    if (liveQuestionIndex === questions.length) {
        quizEnd();
    // ... (else) get next question...
    } else {
        getQuestion();
    }
}

// When quiz ends: stop timer, hide the questions, and show the final score
function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("final-score");
    // The final score text is equal to time (the remaining time after answered questions)
    finalScoreEl.textContent = time;
    // Gives ability to hide questions
    questionsEl.setAttribute("class", "hide");
}

// End quiz if timer reaches reaches 0
function clockTimer() {
    // Tells time to decrease (--)
    time--;
    timerEl.textContent = time;
    // In theory time could be less than 0 if only have less than 10 seconds left in the quiz and you answer incorrectly (ie: 8-10 = -2)
    if (time <= 0) {
        quizEnd();
    }
}

// Store user's initials and highscores in local storage 
// Google: How to store in local storage?
function saveHighscore() {
    // The trim() method removes whitespace from both ends of a string and returns a new string, without modifying the original string.
    var initials = initialsEl.value.trim();
    if (initials !== "") {
        var highscores =
        // Turn string into object (parse)-->[highscores from window.localStorage and returned as an empty array]
            JSON.parse(window.localStorage.getItem("highscores")) || [];
        var newScore = {
            score: time,
            initials: initials
        };
         // The push() method adds new items to the end of an array.
         // Can continue to stack high score values
         highscores.push(newScore);
         // The JSON.stringify() static method converts a JavaScript value to a JSON string
         window.localStorage.setItem("highscores", JSON.stringify(highscores));

        location.href= 'highscores.html'
    }
}

// Save users' score after clicking submit
// The onclick event executes a certain functionality when a button is clicked.
submitBtn.onclick = saveHighscore;


// Save users' score after pressing enter
function checkForEnter(event) {
    // If press the key "Enter", then return function saveHighscore()
    if (event.key === "Enter") {
        saveHighscore();
    }
}

// Calls function checkForEnter when the user releases a key (keyup)
initialsEl.addEventListener("keyup", checkForEnter);

// Start quiz after clicking start quiz
// Add.Event Listener vs onclick
// object.addEventListener(event, function);           object is the target
startBtn.addEventListener("click", quizStart);