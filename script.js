const emojis = [
    "🐶", "🐱", "🐭", "🐹", "🐰", 
    "🦊", "🐻", "🐼", "🐨", "🐯", 
    "🦁", "🐮", "🐷", "🐸", "🐵", 
    "🙈", "🙉", "🙊", "🦓", "🐴", 
    "🦒", "🐘", "🐙", "🐚", "🦈", 
    "🐬", "🐳", "🌸", "🌼", "🌻", 
    "🚀", "⚽️", "🏀", "🎨", "🎊", 
    "🎆", "🐦", "🐞", "🐢", 
    "🦋", "🍀", "🐣", "🦄", "🍉", 
    "🍓", "🥭", "🍍", "🦩", "🦚", 
    "🐧", "🐉", "🌈", "⭐️"
];

let numberOfCards
let firstCard = null
let secondCard = null
let lockBoard = false

function startGame() {
    const width = parseInt(document.getElementById('get-width').value);
    const height = parseInt(document.getElementById('get-height').value);

    reset()
    setupBoard(width, height)
}

function setupBoard(width, height) {
    const board = document.getElementById('board');
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${height}, 1fr)`;

    numberOfCards = width * height;
    const selectedEmojis = shuffleArray(emojis).slice(0, numberOfCards / 2)
    const doubleEmojis = [...selectedEmojis, ...selectedEmojis]

    if(numberOfCards % 2 === 1) {
        doubleEmojis.push('')
    }

    const gameEmogis = shuffleArray(doubleEmojis);

    gameEmogis.forEach((emoji) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;

        const emojiElement = document.createElement('span');
        emojiElement.textContent = emoji;
        emojiElement.style.visibility = 'hidden'
        card.appendChild(emojiElement)

        card.addEventListener('click', () => flipCard(card, emojiElement));

        board.appendChild(card)
    });
}

function flipCard(card, emojiElement) {
    if(lockBoard === true || card === firstCard || card.classList.contains('matched')) {
        return
    }

    card.classList.add('flipped');
    emojiElement.style.visibility = 'visible';

    if(firstCard === null) {
        firstCard = card;
    } else {
        secondCard = card;
        checkForMatch();
    }
}

function checkForMatch() {
    const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

    if(isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched')
    secondCard.classList.add('matched')

    if(document.querySelectorAll(".matched").length === numberOfCards) {
        setTimeout(() => {
            alert('Поздравляем! Вы выиграли!')
        }, 1000);
    }
    reset()
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        firstCard.firstChild.style.visibility = 'hidden';
        secondCard.firstChild.style.visibility = 'hidden';

        reset()
    }, 1000)
}

function reset() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function isOutOfRange(val, minVal, maxVal) {
    return val < minVal || val > maxVal
}

function shuffleArray(array) {
    for(let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array
}

document.getElementById('start-button')
    .addEventListener('click', startGame);
