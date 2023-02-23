let cards = [];

function createCards(array){
    for(let i = 6; i <= 14; i++){
        for(let j = 0; j < 4; j++){
            array.push(i);
        }
    }
}

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

function createDecks(firstDeck, secondDeck){
    for(let i = 0; i < cards.length; i++){
        if(i % 2 !== 0){
            firstDeck.push(cards[i]);
        }else{
            secondDeck.push(cards[i]);
        }
    }
}

createDecks(firstDeck, secondDeck);

console.log(firstDeck);
console.log(secondDeck);

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


let comparisonArr = [];

let counter = 0;

const doStep = () => {
    console.log(firstDeck.at(-1));
    console.log(secondDeck.at(-1));
    
    comparisonArr.push(firstDeck.at(-1), secondDeck.at(-1));
    firstDeck.pop();
    secondDeck.pop();
    let length = comparisonArr.length;
    console.log(comparisonArr);
    firstCard.textContent = comparisonArr[length - 2]; 
    secondCard.textContent = comparisonArr[length - 1];  
    
    
    if(comparisonArr[length - 2] === 6 && comparisonArr[length - 1] === 14){
        firstDeck.unshift(...comparisonArr);
        comparisonArr = []; 
        counter++;
        console.log(`${counter} step`);
        steps.textContent = `${counter} ход`;
        console.log(firstDeck);
        console.log(secondDeck);
    }else if(comparisonArr[length - 1] === 6 && comparisonArr[length - 2] === 14){
        comparisonArr = comparisonArr.reverse();
        secondDeck.unshift(...comparisonArr);
        comparisonArr = [];
        counter++;
        console.log(`${counter} step`);
        steps.textContent = `${counter} ход`;
        console.log(firstDeck);
        console.log(secondDeck);
    }else if((comparisonArr[length - 2] > comparisonArr[length - 1])){
        firstDeck.unshift(...comparisonArr);
        comparisonArr = []; 
        counter++;
        console.log(`${counter} step`);
        steps.textContent = `${counter} ход`;
        console.log(firstDeck);
        console.log(secondDeck);
    }else if(comparisonArr[length - 1] > comparisonArr[length - 2]){
        comparisonArr = comparisonArr.reverse();
        secondDeck.unshift(...comparisonArr);
        comparisonArr = [];
        counter++;
        console.log(`${counter} step`);
        steps.textContent = `${counter} ход`;
        console.log(firstDeck);
        console.log(secondDeck);
    }else{
        counter++;
        console.log(`${counter} step`);
        steps.textContent = `${counter} ход`;
        firstDeck.unshift(comparisonArr[length - 2]);
        secondDeck.unshift(comparisonArr[length - 1])
        comparisonArr = [];
        console.log(firstDeck);
        console.log(secondDeck);
    }
}


startButton.addEventListener('click', (event) => {
    if(startButton.textContent === "Рестарт"){
        location.reload();
    }
    if(firstDeck.length === 36 || secondDeck.length === 36){
        startButton.textContent = "Рестарт"
        firstCard.classList.add("hidden");
        secondCard.classList.add("hidden");
        toEndButton.classList.add("hidden");
        firstDeckBlock.classList.add("hidden");
        secondDeckBlock.classList.add("hidden");
        gamesQuantity.classList.add("hidden");
        winner.classList.remove("hidden");
        steps.textContent = `Ходов: ${counter}`;
        if(firstDeck.length === 36){
            winner.textContent = `Победил: Игрок 1`;
        }else{
            winner.textContent = `Победил: Игрок 2`;
        }
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

        firstDeckBlock.textContent = firstDeck.length; 
        secondDeckBlock.textContent = secondDeck.length;  
    
        doStep();
    }
});

toEndButton.addEventListener('click', (event) => {
    while(firstDeck[0] !== undefined && secondDeck[0] !== undefined){
        doStep();
    }
    startButton.textContent = "Рестарт"
    firstCard.classList.add("hidden");
    secondCard.classList.add("hidden");
    toEndButton.classList.add("hidden");
    firstDeckBlock.classList.add("hidden");
    secondDeckBlock.classList.add("hidden");
    gamesQuantity.classList.add("hidden");
    winner.classList.remove("hidden");
    steps.textContent = `Ходов: ${counter}`;
    if(firstDeck.length === 36){
        winner.textContent = `Победил: Игрок 1`;
    }else{
        winner.textContent = `Победил: Игрок 2`;
    }
});

gamesQuantity.addEventListener('keyup', (event) => {
    let value = gamesQuantity.value;
    if(event.code === "Enter"){
        for(let i = 0; i <= value; i++){
            while(firstDeck[0] !== undefined && secondDeck[0] !== undefined){
                doStep();
            }
        }
        statistics.classList.remove("hidden");
    }
});
