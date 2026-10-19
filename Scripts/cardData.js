import * as Cards from './cards.js'

export function getCardClass(cardData){
    return Cards[cardData.class] ?? Cards.MiscCard;
}
export const cardDetes = [
    {
        name: 'Bakugo',
        description: 'Deal 15 damag',
        class: 'BakugoCard',
        category: ['Damage'],
        rarity: 3,
        damageAmount: 15
    },
    {
        name: 'Ramen',
        description: 'Heal 15 HP',
        class: 'RamenCard',
        category: ['Heal'],
        rarity: 3,
        healAmount: 15
    },
    {
        name: 'Nazuna',
        description: 'Lifesteal - Damage and heal for 20 hp',
        class: 'NazunaCard',
        category: ['Damage', 'Heal'],
        rarity: 4,
        damageAmount: 20,
        healAmount: 20
    },
    {
        name: 'Dio',
        description: 'ZA WARUDO - Freeze opponent - Skips their turn',
        class: 'DioCard',
        category: ['Misc'],
        rarity: 4,
    },
    {
        name: 'David Martinez',
        description: 'Opponent is busy crying after watching Cyberpunk - skips their turn',
        class: 'DavidMartinezCard',
        category: ['Misc'],
        rarity: 4,
    },
    {
        name: 'Todo',
        description: "Swaps any 2 player's healths",
        class: 'TodoCard',
        category: ['Misc'],
        rarity: 4
    },
    {
        name: "Hakari's Gamble",
        description: `Jackpot - set opponent's HP randomly between 20 and 100`,
        class: 'HakariCard',
        category: ['Misc'],
        rarity: 4,
        lowerHP: 20,
        upperHP: 100
    },
    {
        name: "Gojo's Infinity",
        description: "Activate Gojo's Infinity - Negate 1 instance of damage",
        class: 'GojoInfCard',
        category: ['Misc'],
        rarity: 4
    },
    {
        name: 'Subaru',
        description: 'Prevent death 1 time',
        class: 'SubaruCard',
        category: ['Misc'],
        rarity: 5
    },
    {
        name: 'Giga Drill Break',
        description: 'Deal Massive (50) damage',
        class: 'GigaDrillBreakCard',
        category: ['Damage'],
        rarity: 5,
        damageAmount: 50
    },   
    {
        name: "All Might",
        description: "United States of Smash - next punch deals 50 damage",
        class: "AllMightCard",
        category: ['Buff'],
        rarity: 5,
        buffedPunchDamage: 50
    }
]