export const effects = {

    onDeath: {
        deathShield: (target) => {
            target.hp = 1;
        },

    },
    onDamage: {
        doubleDamage: {type: 'damageChange', fn: (amount) => amount * 2},
    },
    onRecieveDamage: {
        infinity: {type: 'damageChange', fn: (amount) => 0}
    },
    onPunch: {
        punchDMG50: { type: 'damageChange', fn: (amount) => 50 },
    },
    // On Turn Effects need to remove themselves before switching!!!
    onTurnStart: {
        skipTurn: (game) => {
            const effect = game.turn.activeEffects.find(e => e.name === 'skipTurn');
            game.consumeEffect(game.turn, effect);
            game.switchTurn();

            const skipped = game.turn === game.player1 ? game.player2 : game.player1;
            if (skipped.ki > 0) skipped.ki -=1;
        }

    }
}
export const effectDetes = {
    deathShield: { 
        displayName: 'Death Prevent',
        desc: 'Prevents death once, leaving you at 1 HP instead.',
        icon: '🛡'
    },
    skipTurn: { 
        displayName: 'SKIP',
        desc: "Your turn is skipped. Courtesy of your opponent's cruelty.",
        icon: '⏭'
    },
    punchDMG50: { 
        displayName: 'United States of Smash',
        desc: 'Your next punch deals 50 damage instead of the usual amount.',
        icon: '💥'
    },
    infinity: { 
        displayName: 'Infinity',
        desc: 'Negates 1 instance of incoming damage per charge.',
        icon: '♾'
    },
    doubleDamage: { 
        displayName: '2x Damage',
        desc: 'Your next damage instance is doubled.',
        icon: '⚔️'
    },
}