import { effectDetes } from "./effects.js";
function updateNames(game) {
    document.getElementById('player-name-p1').textContent = game.player1.name;
    document.getElementById('player-name-p2').textContent = game.player2.name;
}

function updateHP(playerID, game) {
    const hpBar = document.getElementById(`hp-bar-p${playerID}`);
    const hpValue = document.getElementById(`hp-value-p${playerID}`);
    const playerHealth = game[`player${playerID}`].hp;
    const formattedHP = Math.round(Math.max(0, Math.min(100, ( playerHealth / game.maxHP) * 100)));
    hpBar.style.width = `${formattedHP}%`;
    hpValue.textContent = `${formattedHP}`;
}

function updateKi(playerID, game) {
    const pips = document.querySelectorAll(`#ki-pips-p${playerID} .pip`);
    const ki = game[`player${playerID}`].ki;
    pips.forEach((pip, index) => {
        if (index < ki) pip.classList.add("filled");
        else pip.classList.remove("filled");
    })
}

function updateHand(playerID, game) {
    // Define
    const handEl = document.getElementById(`hand-p${[playerID]}`);
    const cardArea = document.getElementById(`cards-p${playerID}`);
    const cardTooltip = /** @type {HTMLElement} */ (document.querySelector('.card-tooltip-container'));
    const cardName = document.querySelector('.card-tooltip-name');
    const cardCategoryDmg = document.querySelector('.card-tooltip-dmg');
    const cardCategoryHeal = document.querySelector('.card-tooltip-heal');
    const cardCategoryMisc = document.querySelector('.card-tooltip-misc');
    const cardDesc = document.querySelector('.card-tooltip-desc');
    const cardRarity3 = document.querySelector('.card-tooltip-rarity-3');
    const cardRarity4 = document.querySelector('.card-tooltip-rarity-4');
    const cardRarity5 = document.querySelector('.card-tooltip-rarity-5');
    
    // Show cards in hands
    cardArea.innerHTML = ``;
    game[`player${playerID}`].hand.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.classList.add('card');
        cardEl.textContent = card.name;
        cardEl.dataset.index = index;
        cardArea.appendChild(cardEl);
        
        // Show tooltip
        cardEl.addEventListener('mouseenter', (e) => {
            cardTooltip.classList.remove('hidden');
            cardName.textContent = card.name;
            card.category.forEach(category => {
                if (category === 'Damage') {
                    cardCategoryDmg.classList.remove('hidden');
                    cardCategoryDmg.textContent = card.damageAmount;
                }
                if (category === 'Heal') {
                    cardCategoryHeal.classList.remove('hidden');
                    cardCategoryHeal.textContent = card.healAmount;
                }
                if (category === 'Misc') {
                    cardCategoryMisc.classList.remove('hidden');
                }
            });
            cardDesc.textContent = card.description;
            if (card.rarity == 3) cardRarity3.classList.remove('hidden');
            else if (card.rarity == 4) cardRarity4.classList.remove('hidden');
            else if (card.rarity == 5)  cardRarity5.classList.remove('hidden');
            
            // Position it
            const handPos = handEl.getBoundingClientRect();
            cardTooltip.style.left = `${handPos.left + (cardArea.offsetWidth / 2) - (cardTooltip.offsetWidth / 2)}px`;
            cardTooltip.style.top = `${handPos.top - cardTooltip.offsetHeight}px`;
        })
        
        // Remove tooltip
        cardEl.addEventListener('mouseleave', () => {
            cardCategoryDmg.classList.add('hidden');
            cardCategoryHeal.classList.add('hidden');
            cardCategoryMisc.classList.add('hidden');
            cardRarity3.classList.add('hidden');
            cardRarity4.classList.add('hidden');
            cardRarity5.classList.add('hidden');
            cardTooltip.classList.add('hidden');
        })
    });
}

function updateCardZone(playerID, game) {
    const cardZone = document.getElementById(`played-p${playerID}`);
    cardZone.innerHTML = '';
    game[`player${playerID}`].lastPlayed.forEach((cardObj, index) => {
        const cardEl = document.createElement('div');
        cardEl.classList.add('card-played');
        cardEl.textContent = cardObj.card.name;
        cardEl.style.transform = `rotate(${cardObj.rotation}deg)`;
        cardEl.style.zIndex = `${game[`player${playerID}`].lastPlayed.length - index}`;
        cardEl.style.setProperty('--played-card-opacity', `${index * 0.15}`)
        cardZone.appendChild(cardEl);
    });
}

function updateEffects(playerID, game) {
    // define
    const effectArea = document.getElementById(`effect-p${playerID}`);
    effectArea.innerHTML = ``;
    const effects = game[`player${playerID}`].activeEffects;
    const visible = effects.slice(0, 3);
    const overflow = effects.length > 3;
    const tooltip = document.querySelector('.tooltip-effect');
    const tooltipOverflow = document.querySelector('.tooltip-effect-overflow');
    const tooltipOverflowList = document.querySelector('.tooltip-effect-overflow-list');
    // handle each effect
   visible.forEach(effect => {
        const effectEl = document.createElement('div');
        effectEl.classList.add('effect');
        if (effectDetes[effect.name]){ // if exist
            effectEl.textContent = effectDetes[effect.name].icon;
        }
        else {
            effectEl.textContent = '?'; // if unknown
            effectEl.classList.add('effect-unknown')
        }

        // Handle charges
        if (effect.charges > 1) effectEl.dataset.charges = effect.charges;
        else effectEl.dataset.charges = '';
        effectArea.appendChild(effectEl);

        // Add Tooltips
        effectEl.addEventListener('mouseenter', (e) => {
            tooltip.querySelector('.tooltip-effect-name').textContent = effectDetes[effect.name]?.displayName ?? 'Unkown';
            tooltip.querySelector('.tooltip-effect-charges').textContent = effect.charges;
            tooltip.querySelector('.tooltip-effect-desc').textContent = effectDetes[effect.name]?.desc ?? 'No description';
            tooltip.classList.remove('hidden');
            //position it
            /**@type {HTMLElement} */ (tooltip).style.left = `${e.clientX + 10}px`;
            /**@type {HTMLElement} */ (tooltip).style.top = `${e.clientY + 10}px`;
        })
        // Remove tooltip
        effectEl.addEventListener('mouseleave', () => {
            tooltip.classList.add('hidden');
        })
    });

    // Handle overflow
    if (overflow) {
        const more = document.createElement('div');
        more.classList.add('effect');
        more.textContent = '...';
        effectArea.appendChild(more);

        // Add Tooltip
        more.addEventListener('mouseenter', e => {
            tooltipOverflow.classList.remove('hidden');
            tooltipOverflowList.innerHTML = ``;
            effects.forEach(effect => {
                const effectItem = document.createElement('div');
                effectItem.classList.add('tooltip-effect-overflow-list-item');
                
                const effectItemIcon = document.createElement('span');
                effectItemIcon.classList.add('effect-overflow-icon');
                effectItemIcon.textContent = effectDetes[effect.name]?.icon ?? '?';
                
                const effectItemName = document.createElement('div');
                effectItemName.classList.add('effect-overflow-name');
                const nameSpan = document.createElement('span');
                nameSpan.textContent = effectDetes[effect.name]?.displayName ?? 'Unknown';
                effectItemName.appendChild(nameSpan)
                
                const effectItemCharges = document.createElement('span');
                effectItemCharges.classList.add('effect-overflow-charges');
                effectItemCharges.textContent = effect.charges;
                
                
                effectItem.appendChild(effectItemIcon);
                effectItem.appendChild(effectItemName);
                effectItem.appendChild(effectItemCharges);
                tooltipOverflowList.appendChild(effectItem);
            });


            // Position
            /**@type {HTMLElement}*/ (tooltipOverflow).style.left = `${e.clientX + 10}px`;
            /**@type {HTMLElement}*/ (tooltipOverflow).style.top = `${e.clientY + 10}px`;
            
        })
        // Remove tooltip
        more.addEventListener('mouseleave', e => {
            tooltipOverflow.classList.add('hidden');

        })
    }
}

function updateTurnIndicator(game) {
    const top1 = document.getElementById('player-info-p1');
    const top2 = document.getElementById('player-info-p2');
    const mid1 = document.getElementById('played-p1');
    const mid2 = document.getElementById('played-p2');
    const bottom1 = document.getElementById('hand-p1');
    const bottom2 = document.getElementById('hand-p2');
    // reset
    top1.classList.remove('turn-active-top');
    mid1.classList.remove('turn-active-mid');
    bottom1.classList.remove('turn-active-bottom');
    top2.classList.remove('turn-active-top');
    mid2.classList.remove('turn-active-mid');
    bottom2.classList.remove('turn-active-bottom');
    // add
    if (game.turn === game.player1) {
        top1.classList.add('turn-active-top');
        mid1.classList.add('turn-active-mid');
        bottom1.classList.add('turn-active-bottom');
    } else {
        top2.classList.add('turn-active-top');
        mid2.classList.add('turn-active-mid');
        bottom2.classList.add('turn-active-bottom');
    }
}
function updateRound(game) {
    const current = document.getElementById('round-number-current');
    const next = document.getElementById('round-number-next');
    
    // No change, skip
    if (current.textContent === String(game.turnCounter)) return;

    next.textContent = game.turnCounter;

    // Animate current out
    current.animate([
        { opacity: 1, transform: 'translateY(0px)' },
        { opacity: 0, transform: 'translateY(-20px)' }
    ], { duration: 300, easing: 'ease-in', fill: 'forwards' });

    // Animate next in
    const anim = next.animate([
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0px)' }
    ], { duration: 300, easing: 'ease-out', fill: 'forwards' });

    // On finish, swap values and reset
    anim.onfinish = () => {
        current.textContent = game.turnCounter;
        next.textContent = '';
        current.getAnimations().forEach(a => a.cancel());
        next.getAnimations().forEach(a => a.cancel());
    };
}

function checkGameOver(game) {
    const deathScreen = document.querySelector('.game-over-screen');
    const alive = game.players.find(player => player.isAlive === true);
    const dead = game.players.find(player => player.isAlive === false);
    if (game.gameOver) {
        deathScreen.classList.remove('hidden');
        deathScreen.animate([
            { opacity: 0 },
            { opacity: 1 }],
            { duration: 400, easing: 'linear', fill: 'forwards' }
        )
        deathScreen.querySelector('.game-over-container').animate([
            { transform: 'translateY(100px)' },
            { transform: 'translateY(0)' }],
            { duration: 800, easing: 'cubic-bezier(.23,.75,.38,.99)', fill: 'forwards' });

        document.querySelector('.game-over-win-label').textContent = `${alive.name} Wins!`;
        document.getElementById('game-over-p1-name').textContent = game.player1.name;
        document.getElementById('game-over-p1-hp').textContent = `${Math.max(0, game.player1.hp)} HP`;
        document.getElementById('game-over-p2-name').textContent = game.player2.name;
        document.getElementById('game-over-p2-hp').textContent = `${Math.max(0, game.player2.hp)} HP`;
        document.getElementById(`game-over-p${dead.ID}-hp`).classList.add('game-over-hp-dead');
        console.log(deathScreen);
    }
}

export function renderAll(game) {
    updateNames(game);
    updateHP(1, game);
    updateHP(2, game);
    updateKi(1, game);
    updateKi(2, game);
    updateHand(1, game);
    updateHand(2, game);
    updateCardZone(1, game)
    updateCardZone(2, game)
    updateEffects(1, game);
    updateEffects(2, game);
    updateTurnIndicator(game);
    updateRound(game);
    checkGameOver(game);
}