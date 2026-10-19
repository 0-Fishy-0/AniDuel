const createGame = document.querySelector(".start");
const p1_inp = document.getElementById("name-p1");
const p2_inp = document.getElementById("name-p2");

createGame.addEventListener('click', (e) => {
    // @ts-ignore
    const p1 = p1_inp.value || 'Player 1';
    // @ts-ignore
    const p2 = p2_inp.value || 'Player 2';
    let playerNames = {
        player1: p1,
        player2: p2
    }
    localStorage.setItem('playerNames', JSON.stringify(playerNames));
    
    const leaveAnim = /**@type {HTMLElement}*/(document.querySelector('.page-leave-anim'));
    leaveAnim.classList.remove('hidden');    
    leaveAnim.style.left = `${window.innerWidth / 2}px`;
    leaveAnim.style.top = `${window.innerHeight / 2}px`;
    const animOver = leaveAnim.animate([
        { transform: 'scale(1)'},
        { transform: 'scale(200)' }
    ],  { duration: 1600, easing: 'ease', fill: 'forwards'});
    
    animOver.onfinish = () => window.location.href = './game.html';
})