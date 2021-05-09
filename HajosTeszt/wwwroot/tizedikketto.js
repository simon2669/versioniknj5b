var hotList = [];           
var questionsInHotList = 3; 
var displayedQuestion;      
var numberOfQuestions;      
var nextQuestion = 1; 

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0,

        }
        hotList[i] = q;
    }

    
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
    console.log(hotList);
    fetch("questions/count").then(
        result => { return result.text() }).then(
            result2 => {
                numberOfQuestions = parseInt(result2);

            }

        )

}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`);
                if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
                myStorage.setItem(destination, q);
            }
        );
};
function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    g.style.pointerEvents = "none";

    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;
    document.getElementById("válasz1").style.pointerEvents = "auto";
    document.getElementById("válasz2").style.pointerEvents = "auto";
    document.getElementById("válasz3").style.pointerEvents = "auto";

};