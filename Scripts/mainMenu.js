const btn_1 = document.getElementById("btn-1v1");
const btn_2 = document.getElementById("btn-2v2");
const btn_3 = document.getElementById("btn-3v3");
const AniDuel = document.getElementById('AniDuel');

AniDuel.addEventListener('click', () => {
    AniDuel.animate([
        { rotate: '0deg' },
        { rotate: '360deg' }
    ],  { duration: 300 })
})

btn_1.addEventListener('click', (e) => {
    const leaveAnim = /**@type {HTMLElement}*/(document.querySelector('.page-leave-anim'));
    leaveAnim.classList.remove('hidden');    
    leaveAnim.style.left = `${window.innerWidth / 2}px`;
    leaveAnim.style.top = `${window.innerHeight / 2}px`;
    const animOver = leaveAnim.animate([
        { transform: 'scale(1)'},
        { transform: 'scale(200)' }
    ],  { duration: 1600, easing: 'ease', fill: 'forwards'});
    
    animOver.onfinish = () => window.location.href = './1v1.html';
})

btn_2.addEventListener('click', () => {
    window.location.href = './2v2.html';
})

btn_3.addEventListener('click', () => {
    window.location.href = './3v3.html';
})