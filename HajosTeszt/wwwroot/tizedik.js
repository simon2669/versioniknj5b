var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában
const g = document.querySelector(".gomb");
const valaszok = Array.from(document.querySelectorAll(".kerdes"));

fetch(`/questions/count`).then(x =>
    x).then(x => {
        questionNumber = Number(x);
    });
var timeoutHandler;
let myStorage = window.localStorage;
//function előre() {
//    clearTimeout(timeoutHandler)
//    displayedQuestion++;
//    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
//    kérdésMegjelenítés()
//}

valaszok.forEach((i, index) => i.addEventListener('click', () => {

    document.getElementById("válasz1").style.pointerEvents = "none";
    document.getElementById("válasz2").style.pointerEvents = "none";
    document.getElementById("válasz3").style.pointerEvents = "none";
    document.getElementById("válasz1").classList.add("rossz");
    document.getElementById("válasz2").classList.add("rossz");
    document.getElementById("válasz3").classList.add("rossz");
    if (hotList[displayedQuestion].question.correctAnswer == index + 1) {
        document.getElementById(`válasz${index + 1}`).classList.remove("rossz");
        document.getElementById(`válasz${index + 1}`).classList.add("jó");
        hotList[displayedQuestion].goodAnswers = hotList[displayedQuestion].goodAnswers + 1;
        console.log(hotList[displayedQuestion].goodAnswers);
        if (hotList[displayedQuestion].goodAnswers === 3) {
            hotList[displayedQuestion] = {
                question: {},
                goodAnswers: 0,

            };
            kérdésBetöltés(nextQuestion, displayedQuestion);
            console.log(hotList);
            
        }
    } else {
        hotList[displayedQuestion].goodAnswers = 0;
    }

    g.style.pointerEvents = "auto";
    timeoutHandler = setTimeout(elore, 3000);


}));
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
                //myStorage.setItem(destination, q);
            }
    );
    
    
}

function init() {
    document.addEventListener("DOMContentLoaded", () => {
        for (var i = 0; i < questionsInHotList; i++) {
            let q = {
                question: {},
                goodAnswers: 0,

            }
            hotList[i] = q;
        }

        //Első kérdések letöltése
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
    });
    myStorage.setItem("listam", JSON.stringify(hotList));
    console.log(myStorage.getItem("listam"))
   
    

}



function kérdésMegjelenítés() {
    document.getElementById("válasz1").classList.remove("rossz", "jó");
    document.getElementById("válasz2").classList.remove("rossz", "jó");
    document.getElementById("válasz3").classList.remove("rossz", "jó");
    let kérdés = hotList[displayedQuestion].question;
    console.log(hotList[displayedQuestion].question);
    g.style.pointerEvents = "none";

    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;
    document.getElementById("válasz1").style.pointerEvents = "auto";
    document.getElementById("válasz2").style.pointerEvents = "auto";
    document.getElementById("válasz3").style.pointerEvents = "auto";
    if (kérdés.image) {
        document.getElementById("kép1").src ="https://szoft1.comeback.hu/hajo/"+ kérdés.image;
        document.getElementById("kép1").style.display = "block";

    } else {
        document.getElementById("kép1").style.display = "none";
    }
    
};
function elore() {
    clearTimeout(timeoutHandler);
    
    if (numberOfQuestions === displayedQuestion) {
        alert("elérte az utolso kerdest!");
        return;
    }
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    
    kérdésMegjelenítés();
    
};





if (myStorage.getItem("listam") === numberOfQuestions
) {
    
    for (var i = 0; i < myStorage.length; i++) {
        hotList[i] = myStorage.getItem(i);
        console.log("localstoraget hasznaltam!");

    }

} else {
    init();
}