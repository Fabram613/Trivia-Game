/* 
GAME INSTRUCTIONS:
===============
1. The game starts when the player hits the START button.
2. The clock begins to countdown once the game starts.
3. The time given is the total amount of time to answer each question.
4. The game ends if the time runs out.
5. Player can only select one answer per question.
6. Show countdown timer so player knows how much time is left.
7. All of the questions are displayed at once for each question asked.
8. Once the answer is selected or time runs out, there is a small delay before the next question.
9. At the end of the 10 questions, displays player's overall score and allows user to reset and play again.
*/

//IMPORTANT!
$(document).ready(function(){

    // GLOBAL VARIABLES
    // ================
    
        //Define all global variables and objects
        var currentQuestion; 
        var correctAnswer; 
        var incorrectAnswer; 
        var unanswered; 
        var seconds; 
        var time; 
        var answered; 
        var userSelect;
        var messages = {
            correct: "Correct! Like Tyrion, you drink AND know things!",
            incorrect: "Wrong!" + "<br>" + "Looks like someone needs to brush up on Westerosi history!",
            endTime: "You ran out of time, like the showrunners did for Season 8!",
            finished: "So, how'd you do?"
        };
    
        //All questions inside an array of objects
        var triviaQuestions = [
            {	question: "What does Jon Snow know?",
                answerList: [   "Nothing",
                            "Everything",
                            "Some things",
                            "A good amount of things",
                            "Probably something, maybe"],
                answer: 0,
                image: "assets/images/ygritte.gif",
                answerText: "'You know nothing, Jon Snow' -Ygritte"
            },
    
            {	question: "What is the name of Eddard Stark's Valyrian-steel sword?",
                answerList: [	"Wolfbane",
                            "Frostmourne",
                            "Ice",
                            "Doomblade",
                            "Gorehowl"],
                answer: 2,
                image: "assets/images/eddard.gif",
                answerText: "The name of the ancestral Valyrian-steel sword of House Stark is 'Ice'."
            },
    
            {	question: "Which of the Stark children gets pushed from a tower by Jamie Lannister?",
                answerList: [	"Sansa",
                            "Robb",
                            "Rickon",
                            "Arya",
                            "Bran"],
                answer: 4,
                image: "assets/images/bran.gif",
                answerText: "Bran Stark's love of climbing leads to him seeing something he shouldn't have, thus resulting in Jamie pushing him off of the tower and setting the whole series in motion."
            },
    
            {	question: "How many kingdoms are there in Westeros?",
                answerList: [	"Seven",
                            "Four",
                            "Eight",
                            "Two",
                            "Five"],
                answer: 0,
                image: "assets/images/westeros.gif",
                answerText: "There are Seven Kingdoms in Westeros."
            },
    
            {	question: "What is the Hound's real name?",
                answerList: [	"Uther",
                            "Aragorn",
                            "Sandor",
                            "Jaqen",
                            "Tomlin"],
                answer: 2,
                image: "assets/images/thehound.gif",
                answerText: "The Hound's real name is Sandor Clegane, brother of Gregor Clegane, aka The Mountain."
            },
    
            {	question: "The proper response to 'Valar Morghulis' is...",
                answerList: [	"Valar Essos",
                            "Valar Lordaeron",
                            "Valar Dohaeris",
                            "Valar Crutiatus",
                            "Valar Mojache"],
                answer: 2,
                image: "assets/images/valar.gif",
                answerText: "Valar Morghulis translates to 'All Men Must Die' in High Valyrian. It is a customary saying in Essos that is traditionally answered with 'Valar Dohaeris', meaning 'All Men Must Serve'."
            },
    
            {	question: "After fleeing King's Landing and heading to Essos, who finishes training Arya?",
                answerList: [	"Allerio",
                            "Rhaegar",
                            "Jamie",
                            "Jaqen",
                            "Brianne"],
                answer: 3,
                image: "assets/images/arya.gif",
                answerText: "Arya heads to Essos in search of the 'Faceless Men', a death cult of assassins lead by Jaqen Haqar.He blinds her and forces her to learn to adapt, thus turning her into the badass we all know and love."
            },		
    
            {	question: "Tyrion Lannister kills his father and ex lover and is forced to flee Westeros. After being captured by Ser Jorah Mormont and used as a bargaining chip, who does he become advisor to?",
                answerList: [	"Melissandre",
                            "Cersei",
                            "Ellia",
                            "Daenerys",
                            "Katlyn"],
                answer: 3,
                image: "assets/images/tyrion.gif",
                answerText: "Ser Jorah believes that he can win the favor of Daenerys Targaryen by handing over Tyrion to be executed, but instead Daenerys sees the value in Tyrion's knowledge of the enemy and decides to spare him and make him her advisor."
            },		
    
            {	question: "Daenerys has many titles, one of which is 'Mother of Dragons'. She has three dragons: Rhaegal, Viserion, and...?",
                answerList: [	"Draco",
                            "Dondarion",
                            "Drakkaseth",
                            "Delero",
                            "Drogon"],
                answer: 4,
                image: "assets/images/dany.gif",
                answerText: "Her three dragons are named after the closest people in her life: Rhaegal after her brother Rhaegar, Viserion after her brother Viserys, and Drogon after her love Khal Drogo."
            },		
    
            {	question: "What is coming?",
                answerList: [	"Spring",
                            "Summer",
                            "Fall",
                            "Winter"],
                answer: 3,
                image: "assets/images/winter.gif",
                answerText: "'Winter is coming' - Literally every character"
            },		
    
        ];
    
    
        // FUNCTIONS
        // =========
    
        //This hides the game area on page load
        $("#gameCol").hide();
        
        //This captures user click on start button to create a new game
        $("#startBtn").on("click", function(){
            $(this).hide();
            newGame();
        });
    
        //This captures the user's click on the reset button to create a new game
        $("#startOverBtn").on("click", function(){
            $(this).hide();
            newGame();
        });
    
        //This function sets up the page for a new game emptying all areas and showing game area
        function newGame(){
            $("#gameCol").show();
            $("#finalMessage").empty();
            $("#correctAnswers").empty();
            $("#incorrectAnswers").empty();
            $("#unanswered").empty();
            $("#gif").hide();
            $("#gifCaption").hide();
            currentQuestion = 0;
            correctAnswer = 0;
            incorrectAnswer = 0;
            unanswered = 0;
            newQuestion();
        }
    
        //This function displays the next question
        function newQuestion(){
            $("#message").empty();
            $("#correctedAnswer").empty();
            $("#gif").hide();
            $("#gifCaption").hide();
            answered = true;
            
            //This function displays the new question
            $("#currentQuestion").html("Question " + (currentQuestion+1) + " of " + triviaQuestions.length);
            $(".question").html(triviaQuestions[currentQuestion].question);
    
            //This function displays the new question's answer options in multiple choice type
            for(var i = 0; i <= 5; i++){
    
                var choices = $("<div>");
                choices.text(triviaQuestions[currentQuestion].answerList[i]);
                choices.attr({"data-index": i });
                choices.addClass("thisChoice");
                $(".answerList").append(choices);
            }
    
            //This sets the timer
            countdown();
    
            //When user clicks on an answer this will pause the time and display the correct answer to the question 
            $(".thisChoice").on("click",function(){
                    userSelect = $(this).data("index");
                    clearInterval(time);
                    answerPage();
                });
            }
    
        //This function is for the timer countdown
        function countdown(){
            seconds = 20;
            $("#timeLeft").html("00:" + seconds);
            answered = true;
            //Sets a delay of one second before the timer starts
            time = setInterval(showCountdown, 1000);
        }
    
        //This function displays the countdown
        function showCountdown(){
            seconds--;
    
            if(seconds < 10) {
                $("#timeLeft").html("00:0" + seconds);	
            } else {
                $("#timeLeft").html("00:" + seconds);	
            }
            
            if(seconds < 1){
                clearInterval(time);
                answered = false;
                answerPage();
            }
        }
    
        //This function takes the user to the answer page after the user selects an answer or timer runs out
        function answerPage(){
            $("#currentQuestion").empty();
            $(".thisChoice").empty(); //Clears question page
            $(".question").empty();
            $("#gif").show();
            $("#gifCaption").show();
    
            var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
            var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    
            //This adds the gif that corresponds to this question
            var gifImageLink = triviaQuestions[currentQuestion].image;
            var newGif = $("<img>");
            newGif.attr("src", gifImageLink);
            newGif.addClass("gifImg");
            $("#gif").html(newGif);
    
            //This adds a line of text below the gif that talks about why the answer is correct.
            var gifCaption = triviaQuestions[currentQuestion].answerText;
                newCaption = $("<div>");
                newCaption.html(gifCaption);
                newCaption.addClass("gifCaption");
                $("#gifCaption").html(newCaption);
            
            //This checks to see if user choice is correct, incorrect, or unanswered
            if((userSelect == rightAnswerIndex) && (answered === true)){
                correctAnswer++;
                $('#message').html(messages.correct);
            } else if((userSelect != rightAnswerIndex) && (answered === true)){
                incorrectAnswer++;
                $('#message').html(messages.incorrect);
                $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
            } else{
                unanswered++;
                $('#message').html(messages.endTime);
                $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
                answered = true;
            }
            
            if(currentQuestion == (triviaQuestions.length-1)){
                setTimeout(scoreboard, 7000);
            } else{
                currentQuestion++;
                setTimeout(newQuestion, 7000);
            }	
        }
    
        //This function displays all the game stats
        function scoreboard(){
            $('#timeLeft').empty();
            $('#message').empty();
            $('#correctedAnswer').empty();
            $('#gif').hide();
            $("#gifCaption").hide();
    
            $('#finalMessage').html(messages.finished);
            $('#correctAnswers').html("Correct Answers: " + correctAnswer);
            $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
            $('#unanswered').html("Unanswered: " + unanswered);
            $('#startOverBtn').addClass('reset');
            $('#startOverBtn').show();
            $('#startOverBtn').html("PLAY AGAIN");
        }
    
    
    
    }); 

    //CODE ENDS HERE