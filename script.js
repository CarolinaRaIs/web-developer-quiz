// variable for questions
var questions = [
    {
        // question 0
        prompt: "Commonly used data types do NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "2"
    },

    {
         // question 1
         prompt: "The condition in an if / else statement is enclosed within ____.",
         answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
         correctAnswer: "1"
    },

    {
         // question 2
         prompt: "Arrays in Javascript can be used to store ____.",
         answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
         correctAnswer: "3"
    },

    {
        // question 3
        prompt: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "2"
    },

    {
        // question 4
         prompt: "A very useful tool used during development and debugging for printing content to the debugger is:",
         answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
         correctAnswer: "3"
    }
];

// DOM elements
// Returns a list of all id elements (id represented by #) with the word "___" in it
var timerEl = document.querySelector("#timer");

var startBtn = document.querySelector("#start");

var questionsEl = document.querySelector("#questions");

var multipechoiceEl = document.querySelector("#multiple-choice");

var submitBtn = document.querySelector("#submit-score");

var initialsEl = document.querySelector("#initials");

var feedbackEl = document.querySelector("#feedback");

// var reStartBtn = document.querySelector("#restart");

//Quiz Landing Page (Introduction)
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// Function triggered (Start quiz) and hide landing page
function quizStart() {
    timerId = setInterval(clockTick, 1000);
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
    //
    var promptEl = document.getElementById("question-asked")
    // The textContent in JS is a property used to set or get text content. It is used to return the text content of a specific node and its descendants.
    promptEl.textContent = liveQuestion.prompt;
    // The innerHTML property sets (or returns) the HTML content of an element. It is used to set text inside of an HTML tag (ie: Paragraoh, anchor, span, or div tag))
    multipchoiceEl.innerHTML = "";
    // forEach is used to run function for each array element
    liveQuestion.answers.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        // Value attribute is set to be updated to choice
        choiceBtn.setAttribute("value", choice);
        //
        choiceBtn.textContent = i + 1 + ". " + choice;
        // The onclick event allows the programmer to execute a JavaScript's function when an element gets clicked.
        // "Clickable"
        choiceBtn.onclick = questionClick;
        // The appendChild() method appends a node (element) as the last child of an element
        choicesEl.appendChild(choiceBtn);
    });
}

//  Conditional to check for right answers (else) deduct time for wrong answer, go to next question
function questionClick() {
    // this.something is used to take an input and use it for “this” when running a function in relation to an Object.
    if (this.value !== questions[liveQuestionIndex].answer) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      feedbackEl.textContent = `Oops, not quite! The correct answer is ${questions[liveQuestionIndex].answer}.`;
      feedbackEl.style.color = 'red';
    } else {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = 'green';
    }
    // Class attribute is set to be updated to feedback
    feedbackEl.setAttribute("class", "feedback");

    setTimeout(function() {
        // Class attribute is set to be updated to feedback
        feedbackEl.setAttribute("class", "feedback hide");
    }, 2000);

    // If all questions have been answered, end quiz (else) get next question
    liveQuestionIndex++;
    if (liveQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}

// When quiz ends: stop timer, hiding the questions, and showing the final score
function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("score-final");
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
        // Analyze (parse) highscores from window.localStorage and return an empty array
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

// Calls function checkForEnter when the user releases a key (onkeyup)
nameEl.onkeyup = checkForEnter;


// Start quiz after clicking start quiz
// Add.Event Listener vs onclick
startBtn.onclick = quizStart;