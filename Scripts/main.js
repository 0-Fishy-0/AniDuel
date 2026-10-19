
// function getCard(cls){
//     const data = cardDetes.find(card => card.class == cls)
//     return new (getCardClass(data))(data)
// }
// const Fishy = new Player(playerDetes[0])
// const Claude = new Player(playerDetes[1])
// const game = new Game(Fishy, Claude, cardDetes)
// console.log(game.players[0].name) // should be Fishy
// console.log(game.players[1].name) // should be Claude
// console.log(game.player1.name)    // should be Fishy
// console.log(game.turn.name)       // should be Fishy
// Fishy.hp = 100
// Claude.hp = 100
// Fishy.ki = 5
// Claude.ki = 5
// Fishy.hand = []
// Claude.hand = []
// console.log(`Fishy = ${Fishy.hp}, ki = ${Fishy.ki} Alive = ${Fishy.isAlive}`);
// console.log(Fishy.hand);
// console.log(Fishy.activeEffects);
// console.log(`Claude = ${Claude.hp}, ki = ${Claude.ki} Alive = ${Claude.isAlive}`);
// console.log(Claude.hand);
// window.game = game
// window.Fishy = Fishy
// window.Claude = Claude
// window.getCard = getCard
// import * as Cards from './cards.js';


import { Player } from "./player.js";
import { cardDetes } from "./cardData.js";
import { Game } from "./game.js";
import { renderAll } from "./ui.js";

const playerNames = JSON.parse(localStorage.getItem("playerNames"));
const p1 = new Player({name: playerNames.player1, team: 1, ID: 1});
const p2 = new Player({name: playerNames.player2, team: 2, ID: 2});
const game = new Game(p1, p2, cardDetes);
const initalCards = 3;
p1.ki = initalCards;
p2.ki = initalCards;
for (let i = 0; i < initalCards; i++) {
    game.spin(p1);
    game.spin(p2);
}
renderAll(game);

const btnSpin = document.getElementById('btn-spin');
const btnPunch = document.getElementById('btn-punch');
const btnBoosted = document.getElementById('btn-boosted');

btnSpin.addEventListener('click', () => {
    game.spin(game.turn);
    renderAll(game)
})
btnPunch.addEventListener('click', () => {
    game.punch();
    renderAll(game);
})
btnBoosted.addEventListener('click', () => {
    game.spin(game.turn, true);
    renderAll(game);
})

const cardArea1 = document.getElementById('cards-p1');
const cardArea2 = document.getElementById('cards-p2');

cardArea1.addEventListener('click', e => {
    if (game.turn !== game.player1) return;

    const card = /** @type {HTMLElement} */ (e.target).closest('.card');
    if (!card) return;
    const index = parseInt(/** @type {HTMLElement} */(card).dataset.index);
    
    game.playCard(index);

    const cardPos = card.getBoundingClientRect();
    const zone = /** @type {HTMLElement} */(document.getElementById('played-p1')); 
    const zonePos = zone.getBoundingClientRect();
    const scale = zonePos.width * 0.25 / cardPos.width;
    const x = zonePos.left + zonePos.width / 2 - (cardPos.left + cardPos.width / 2);
    const y = zonePos.top + zonePos.height / 2 - (cardPos.top + cardPos.height / 2);
    const randRot = `${game.player1.lastPlayed[0].rotation}deg`;
    
    const cardMoveAnime = card.animate([
        { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
        { transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${randRot})` }
    ],  { duration: 400, easing: 'ease-out', fill: 'forwards' })
    cardMoveAnime.onfinish = () => renderAll(game);
})
    

cardArea2.addEventListener('click', e => {
    if (game.turn !== game.player2) return;
    
    const card = /** @type {HTMLElement} */ (e.target).closest('.card');
    if (!card) return;
    const index = parseInt(/** @type {HTMLElement} */(card).dataset.index);
    game.playCard(index);

    const cardPos = card.getBoundingClientRect();
    const zone = /** @type {HTMLElement} */(document.getElementById('played-p2')); 
    const zonePos = zone.getBoundingClientRect();
    const scale = zonePos.width * 0.25 / cardPos.width;
    const x = zonePos.left + zonePos.width / 2 - (cardPos.left + cardPos.width / 2);
    const y = zonePos.top + zonePos.height / 2 - (cardPos.top + cardPos.height / 2);
    const randRot = `${game.player2.lastPlayed[0].rotation}deg`;

    const cardMoveAnime = card.animate([
        { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
        { transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${randRot})` }
    ],  { duration: 400, easing: 'ease-out', fill: 'forwards' })
    cardMoveAnime.onfinish = () => renderAll(game);
})

const deadScreenMainMenuBtn = document.querySelector('.btn-game-over-menu');
const deadScreenPlayAgainBtn = document.querySelector('.btn-game-over-again');

deadScreenMainMenuBtn.addEventListener('click', () => {
    window.location.href = './mainMenu.html';
})
deadScreenPlayAgainBtn.addEventListener('click', () => {
    window.location.reload();
})


// window.game = game;
// window.render = ()=> renderAll(game);
renderAll(game);