$(document).ready(function () {

    var tracking = 0;

    // $("#target").submit(function (event) {

    var myRules =
        {
            letter:
                {
                    required: true
                }

        };

    // Object containing the error messages
    var myMessages =
        {
            letter:
                {
                    required: "Must be a single letter"
                }

        };

    // Pass the configuration to the form's validate() method
    // Needs submitHandler, rules, and messages properties
    $("form").validate(
        {
            submitHandler: program,
            rules: myRules,
            messages: myMessages
        }
    );

    /////////////////////////////////////////////////////////////////////////////////////////////
    function selectWord() {
//Create an array that contains at least a dozen words.

        var words = ["existence", "survival", "being", "consciousness", "sentience", "continuance",
            "essence", "aliveness", "animation", "continued", "existence", "personage", "subsistence",
            "viability", "breath", "creation", "presence", "growth", "reality", "living", "actuality",
            "livelihood", "sustenance", "existing", "entity", "vital", "force", "vitality", "lifeblood",
            "lifeforms", "creatures", "ecosystems", "living", "mortal", "sentient", "wildlife", "entities"];

        //generate a random valid index to pick one of the words.
        return words[Math.floor(Math.random() * words.length)];

    }

/////////////////////////////////////////////////////////////////////////////////////////////


    var cCounter = 0;
    var word;
    var answer = [];
    var wrongCount;
    wrongCount = parseInt(wrongCount);
    wrongCount = 0;

    function clickCounter() {

        if (typeof (Storage) !== "undefined") {
            if (sessionStorage.clickcount) {
                sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
            } else {
                sessionStorage.clickcount = 1;
            }
            cCounter = sessionStorage.clickcount;
        }
    }

    if (cCounter < 50) {

        if (cCounter === 0) {
            clickCounter();
            word = selectWord();

            //Display one dash for each unguessed letter.

            for (var i = 0; i < word.length; i++) {
                answer[i] = '_';
            }

            var letterLeft = word.length;

            program();
        } else {
            clickCounter();
            program();
        }

    }

    function checkForWin (){
        var underCount = 0;
        for (var i = 0; i < answer.length; i++) {
            if(answer[i] === '_') underCount++;
        }
        if(underCount === 0) $("#winner").html("WINNER").fadeOut(4000,"swing");
    }


    function program() {

//The playing loop

        var guess;

        guess = $("#userEnter").val();

        $("#currentLetter").text("Current letter being considered is " + guess);
        $("#passCount").text('Count value of passing ' + letterLeft);


        //   $("#target").trigger("reset");


        while (letterLeft > 0) {
            checkForWin();

            guess = $("#userEnter").val();

            if (word.indexOf(guess) > -1) {
                letterLeft++;
                $("#showWrong").text("");

                for (var i = 0; i < word.length; i++) {
                    if ((word[i] === guess))
                        answer[i] = guess;
                }
                checkForWin();

                $("#line").text(answer.join(" "));

                clickCounter();
                break;
            } else if (word.indexOf(guess) < 0 || word.indexOf(guess) === undefined) {
                /////////////////////////////
                $("#showWrong").text("WRONG LETTER");
                $("#wordGuessing").text('Word to guess: ' + word);
                $("#hanging").html("Classic Stick Man");
                wrongCount++;
                switch (wrongCount) {
                    case 1:
                        $("#man2").html('0');
                        break;
                    case 2:
                        $("#man4").html('--');
                        break;
                    case 3:
                        $("#man5").html('|');
                        break;
                    case 4:
                        $("#man6").html('--');
                        break;
                    case 5:
                        $("#man7").html('}');
                        break;
                    case 6:
                        $("#man9").html('{');
                        break;
                    default:
                    // code block
                }

                if (wrongCount === 6) {
                    $("#gameOver").html("GAME OVER");
                    $("#reStart").text("PLAY AGAIN!").click(function () {
                        window.location.reload();
                    });
                }

                ////////////////////////

                //   $("#target").trigger("reset");

                letterLeft--;

                clickCounter();
                break;
            }
        }

        //End of playing loop

        //Show answer and congratulate the player


        $("#reStart").text("PLAY AGAIN!").click(function () {
            window.location.reload();
        });

    }

    program();

});  //top














