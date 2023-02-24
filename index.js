let cards = [];

//создает упорядоченный массив со всеми картами
function createCards(array){
    for(let i = 6; i <= 14; i++){
        for(let j = 0; j < 4; j++){
            array.push(i);
        }
    }
}

//перемешивает колоду карт
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

createCards(cards)
shuffle(cards);

console.log(cards);

let firstDeck = [];
let secondDeck = [];

//распределяет карты по колодам
function createDecks(firstDeck, secondDeck){
    for(let i = 0; i < cards.length; i++){
        if(i % 2 !== 0){
            firstDeck.push(cards[i]);
        }else{
            secondDeck.push(cards[i]);
        }
    }
}

//конвертирует числовые значения некоторых карт 
function numberToCard(number){
    if(number === 11){
        return "J";
    }else if(number === 12){
        return "Q";
    }else if(number === 13){
        return "K";
    }else if(number === 14){
        return "A";
    }else{
        return number;
    }
}

function printDecks(){
    console.log(firstDeck);
    console.log(secondDeck);
}

createDecks(firstDeck, secondDeck);

printDecks();


const startButton = document.querySelector(".start");
const toEndButton = document.querySelector(".to-end");
const firstDeckBlock = document.querySelector(".first-deck");
const secondDeckBlock = document.querySelector(".second-deck");
const firstCard = document.querySelector(".first-card");
const secondCard = document.querySelector(".second-card");
const steps = document.querySelector(".steps");
const gamesQuantity = document.querySelector(".games-quantity");
const winner = document.querySelector(".winner");
const statistics = document.querySelector(".statistics");
const minStepsLi = document.querySelector(".min-steps");
const maxStepsLi = document.querySelector(".max-steps");
const firstPlayerWinsLi = document.querySelector(".first-player-wins");
const secondPlayerWinsLi = document.querySelector(".second-player-wins");

//выводит результаты раунда и скрывает лишние элементы
function toResultWindow(){
    startButton.textContent = "Рестарт"
    firstCard.classList.add("hidden");
    secondCard.classList.add("hidden");
    toEndButton.classList.add("hidden");
    firstDeckBlock.classList.add("hidden");
    secondDeckBlock.classList.add("hidden");
    gamesQuantity.classList.add("hidden");
    winner.classList.remove("hidden");
    steps.textContent = `Ходов: ${stepsCounter}`;
    if(secondDeck[0] === undefined){
        winner.textContent = `Победил: Игрок 1`;
    }else{
        winner.textContent = `Победил: Игрок 2`;
    }
}

//извлекает сравниваемые элементы из колоды и пушит их в массив для сравнения
function comparisonArrPush(){
    comparisonArr.push(firstDeck.at(-1), secondDeck.at(-1));
    firstDeck.pop();
    secondDeck.pop();
}

function stepsPrint(){
    stepsCounter++;
    console.log(`${stepsCounter} step`);
    steps.textContent = `${stepsCounter} ход`;
}

//массив содержащий сравниваемые элементы
let comparisonArr = [];

let stepsCounter = 0;

const doStep = () => {
    console.log(firstDeck.at(-1));
    console.log(secondDeck.at(-1));
    
    comparisonArrPush();

    let length = comparisonArr.length;
    firstCard.textContent = numberToCard(comparisonArr[length - 2]); 
    secondCard.textContent = numberToCard(comparisonArr[length - 1]);  

    
    if(comparisonArr[length - 2] === 6 && comparisonArr[length - 1] === 14){
        firstDeck.unshift(...comparisonArr);
        comparisonArr = []; 
        stepsPrint();
        printDecks();
    }else if(comparisonArr[length - 1] === 6 && comparisonArr[length - 2] === 14){
        comparisonArr = comparisonArr.reverse();
        secondDeck.unshift(...comparisonArr);
        comparisonArr = [];
        stepsPrint();
        printDecks();
    }else if((comparisonArr[length - 2] > comparisonArr[length - 1])){
        firstDeck.unshift(...comparisonArr);
        comparisonArr = []; 
        stepsPrint();
        printDecks();
    }else if(comparisonArr[length - 1] > comparisonArr[length - 2]){
        comparisonArr = comparisonArr.reverse();
        secondDeck.unshift(...comparisonArr);
        comparisonArr = [];
        stepsPrint();
        printDecks();
    }else{
        steps.textContent = `Спор`;
        comparisonArrPush();
        printDecks();
    }
}


startButton.addEventListener('click', (event) => {
    if(startButton.textContent === "Рестарт"){
        location.reload();
    }
    
    if(firstDeck[0] === undefined || secondDeck[0] === undefined){
        toResultWindow();
    }else{
        toEndButton.classList.remove('hidden');
        startButton.textContent = "Следующий ход";
        firstCard.classList.remove("hidden");
        secondCard.classList.remove("hidden");
        toEndButton.classList.remove("hidden");
        steps.classList.remove("hidden");
        firstDeckBlock.classList.remove("hidden");
        secondDeckBlock.classList.remove("hidden");
        gamesQuantity.classList.add("hidden");
        statistics.classList.add("hidden");

        firstDeckBlock.textContent = firstDeck.length; 
        secondDeckBlock.textContent = secondDeck.length;  
    
        doStep();
    }
});


toEndButton.addEventListener('click', (event) => {
    while(firstDeck[0] !== undefined && secondDeck[0] !== undefined){
        doStep();
    }
    toResultWindow();
});

gamesQuantity.addEventListener('keyup', (event) => {
    let value = gamesQuantity.value;
    if(event.code === "Enter"){
        let maxSteps = 0;
        let minSteps = 1000000;
        let firstPlayerWinsCounter = 0;
        let secondPlayerWinsCounter = 0;
        
        for(let i = 0; i < value; i++){
            while(firstDeck[0] !== undefined && secondDeck[0] !== undefined){
                doStep();
            }
            if(stepsCounter > maxSteps){
                maxSteps = stepsCounter;
            }
            if(stepsCounter < minSteps){
                minSteps = stepsCounter;
            }
            
            if(secondDeck[0] === undefined){
                firstPlayerWinsCounter++;
            }else{
                secondPlayerWinsCounter++;
            }
            
            stepsCounter = 0;
            cards = [];
            firstDeck = [];
            secondDeck = [];
            createCards(cards)
            shuffle(cards);
            createDecks(firstDeck, secondDeck);
        }
        maxStepsLi.textContent = `Максимальное количество ходов:${maxSteps}`;
        minStepsLi.textContent = `Минимальное количество ходов:${minSteps}`;
        firstPlayerWinsLi.textContent = `Процент побед Игрока 1:${firstPlayerWinsCounter / value * 100}%`;
        secondPlayerWinsLi.textContent = `Процент побед Игрока 2:${secondPlayerWinsCounter / value * 100}%`;
        statistics.classList.remove("hidden");
    }
});
