let time = 0;
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const state = {
    _score: 0,
    _flipped: [],
    get score() { return this._score },
    set score(s) {
        this._score = s
        scoreElement.innerHTML = this._score
        if (this.score == 18) {
            window.clearInterval(timer);
        }
    },
    get flippedCards() { return this._flipped },
    set flippedCards(n) {
        this._flipped = n
    },
    addFlippedCard(card) {
        // change last 2 cards to normal
        if (this.flippedCards.length >= 2) {
            resetCards()
        }
        
        // flip the new one
        this.flippedCards = [...this.flippedCards, card]
        
        // check if score increases
        if (state.flippedCards.length == 2) {
            if (state.flippedCards[0].id == state.flippedCards[1].id) {
                console.log('Hooray!, Score +1');
                state.score++;
                state.flippedCards = [];
            }
        }
    }
}
const icons = [
    new Icon('add'),
    new Icon('airplane'),
    new Icon('alarm'),
    new Icon('albums'),
    new Icon('alert'),
    new Icon('analytics'),
    new Icon('apps'),
    new Icon('archive'),
    new Icon('at'),
    new Icon('bandage'),
    new Icon('basket'),
    new Icon('battery-full'),
    new Icon('beaker'),
    new Icon('bed'),
    new Icon('bicycle'),
    new Icon('bonfire'),
    new Icon('book'),
    new Icon('briefcase')
]
function scramble(array) {
    return array.sort((a, b) => Math.random() >= 0.5 ? -1 : 1);
}

function createCards(board = []) {
    const parentElement = document.getElementById('container');
    let cards = [];

    for (let card of board) {
        let c = document.getElementById('flip-card-template').content.cloneNode(true);
        c.querySelector('img').src = card.src;
        c.children[0].id = card.name;
        c.children[0].children[0].children[0].addEventListener('click', event => {
            event.stopPropagation();
            let flipCard = event.target.parentElement.parentElement;
            if (!flipCard.classList.contains('flipped')) {
                flipCard.classList.toggle('flipped');
                state.addFlippedCard(flipCard);
            }
        });

        cards.push(c);
    }

    parentElement.append(...cards);
}

function resetCards() {
    state.flippedCards.forEach(card => {
        card.classList.toggle('flipped');
    })
    state.flippedCards = []
}
document.body.onload = function () {
    const board = scramble([...scramble(icons), ...scramble(icons)])
    createCards(board);

    // flip the cards to normal in 2s
    setTimeout(() => {
        Array.from(document.getElementsByClassName('flip-card')).forEach(card => {
            card.classList.remove('flipped');
        })
        timer = setInterval(() => {
            let minutes = Math.floor(time / 60);
            let seconds = (time % 60).toString().padStart(2, '0');
            timerElement.innerHTML = `${minutes}:${seconds}`
            time++
        }, 1000)
    }, 3000)
    
    scoreElement.innerHTML = state.score
}
document.body.onclick = function () {
    if (state.flippedCards.length >= 2) {
        resetCards()
    }
}