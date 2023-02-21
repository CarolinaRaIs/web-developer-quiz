// Variables
var highscoresBtn = document.querySelector("#view-high-scores");

// Retrieve scores from local storage
// Highest score listed at top of list

function printHighscores() {
    // Analyze (parse) highscores from window.localStorage and return an empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    // "Sorting an array with two factors"
    highscores.sort(function(a, b) {
        return a.score - b.score;
    });

    // The forEach() method calls a function for each element in an array.
    // Calls function(score) for each element in the array highscores
    highscores.forEach(function(score) {
        // Create li element in html
        var liTag = document.createElement("li");
        // li tag will read as: (score.name value)+ "-" + (score.score value)
        liTag.textContent = score.name + " - " + score.score;
        // Call ol element by its ID referenced as "highscores"
        var olEl = document.getElementById("highscores");
        // Attach il element to ol element
        olEl.appendChild(liTag);
      });
}

printHighscores();

// Clear all scores when users click clear button
function clearHighscores() {
    // Clears highscores items from local storage
    window.localStorage.removeItem("highscores");
    // The reload() method does the same as the reload button in your browser.
    // reloads highscore.html page
    window.location.reload();
    // Called clear button (by ID) amd make it clickable so that it would trigger the function clearHighscores() 
    // object.addEventListener("event", function);           
    // object/target = document.getElementById("clear-highscore-button") 
} document.getElementById("clear-highscore-button").addEventListener("click", clearHighscores);   
