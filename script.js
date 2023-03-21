'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const player = document.querySelectorAll('.player');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores, activePlayer, current, playing;

const __init__ = function () {
    scores = [0, 0];
    activePlayer = 0;
    current = 0;
    playing = true;
    activePlayer = activePlayer === 0 ? 0 : 0;
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
    
    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
}
__init__()

const __changePlayer__ = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    current = 0;
    document.querySelector('.player--0').classList.toggle('player--active')
    document.querySelector('.player--1').classList.toggle('player--active')
}


btnRoll.addEventListener('click', () => {
    if (playing) {
        
        let randomNumber = Math.trunc(Math.random() * 6) + 1;
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${randomNumber}.png`;
        
        if (randomNumber !== 1) {
            current += randomNumber;
            document.getElementById(`current--${activePlayer}`).textContent = current;
        } else {
            __changePlayer__();
            current = 0
        }
    }
})

btnHold.addEventListener("click", () => {
    if (playing) { 
        scores[activePlayer] += current
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
        
        if (scores[activePlayer] >= 10) {
            
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        
        } else{
            __changePlayer__()
        
        }
    }

})

btnNew.addEventListener('click', __init__)

