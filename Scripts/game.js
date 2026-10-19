import { getCardClass } from "./cardData.js";
import { effects } from "./effects.js";
import { renderAll } from "./ui.js";

export class Game{
    constructor(player1, player2, cardDetes){
        this.players = [player1, player2];
        this.turn = this.player1;
        this.turnCounter = 1;
        this.maxHP = 100;
        this.maxCards = 10;
        this.cardPool = cardDetes;
        this.gameOver = false;
    }
    get player1() {return this.players[0]}
    get player2() {return this.players[1]}
    switchTurn(){
        if (this.turn.ki < 5) this.turn.ki += 1;
        //
        if (this.turn === this.player1) {
            this.turn = this.player2;
        }
        else {
            this.turn = this.player1;
            this.nextRound();
        }
        
        // Apply On Turn Switch Effects
        [...this.turn.activeEffects].forEach(effect => {
            if (!effects.onTurnStart[effect.name]) return;

            effects.onTurnStart[effect.name](this);
        });
    }
    addKi(players){
        players.forEach(player => {
            if (player.ki < 5) player.ki += 1
        });
    }
    nextRound(){
        this.turnCounter += 1;
    }
    playCard(index){
        let card = this.turn.hand[index];
        let opponent = this.players.find(player => player !== this.turn);
        card.play(this.turn, opponent, this);
        this.turn.hand.splice(index, 1);
        this.turn.lastPlayed.unshift({card, rotation: this.getRandomValue(-10, 10)});
        this.turn.lastPlayed = this.turn.lastPlayed.slice(0, 5);
        this.switchTurn()
    }
    punch(){
        let opponent = this.players.find(player => player !== this.turn);
        let punchDamage = this.getRandomValue(3, 5);
        
        // Block if blocked and no special effect present
        const blocked = opponent.activeEffects.find(e => e.name === 'infinity');
        const hasPunchEffect = this.turn.activeEffects.find(e => effects.onPunch[e.name]);
        console.log(hasPunchEffect);
        if (blocked && !hasPunchEffect) {
            this.switchTurn();
            return;
        }
        // Consume each effect
        [...this.turn.activeEffects].forEach(effect => {
            if (!effects.onPunch[effect.name]) return;
            
            const handler = effects.onPunch[effect.name];
            if (handler.type === 'damageChange') punchDamage = handler.fn(punchDamage);
            //else if (handler.type === '')
            //else
            
            this.consumeEffect(this.turn, effect);
        });
        // Punch if not blocked
        this.takeDamage(opponent, punchDamage, this.turn);
        this.switchTurn()
    }
    addEffect(player, effectName, charges = 1){
        const existing = player.activeEffects.find(e => e.name === effectName);
        if (existing) {

            // ADD CHANGES TO UNIQUE EFFECTS
            if (effectName === 'deathShield') return; // max 1

            
            existing.charges += charges;
        }
        else player.activeEffects.push({name: effectName, charges: charges});
    }
    consumeEffect(player, effect){
        effect.charges -= 1;
        if (effect.charges <= 0) {
            player.activeEffects.splice(player.activeEffects.indexOf(effect), 1);
        }
    }
    getRandomValue(lower = 0, upper = 99){
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        return Math.round(array[0] % (upper - lower + 1) + lower);
    }
    spin(player, boosted = false){
        if (player.hand.length >= this.maxCards) {
            console.log("Hand Full");
            return;
        }        
        let chances;
        let kiCost;

        if (boosted) {
            chances = {three: 20, four: 65};
            kiCost = 2
            
        }else {
            chances = {three: 60, four: 90};
            kiCost = 1
        }

        if (player.ki < kiCost){
            console.log("Not enough Ki");
            return
        }
        
        let rarity;
        const roll = this.getRandomValue();
        if (roll < chances.three) rarity = 3;
        else if (roll < chances.four) rarity = 4;
        else rarity = 5;

        let pool = this.cardPool.filter(card => card.rarity === rarity); 
        let randomIndex = this.getRandomValue() % pool.length;
        let selectedCard = pool[randomIndex];
        let selectedCardClass = getCardClass(selectedCard);

        const maxCopies = selectedCard.rarity === 5 ? 1 : 2;
        const copies = player.hand.filter(c => c.name === selectedCard.name).length;
        if (copies >= maxCopies){
            // if (attemots > 20) break; 
            
            return this.spin(player, boosted);
        }
        player.ki -= kiCost;
        player.hand.push(new selectedCardClass(selectedCard));
    }
    takeDamage(target, amount, applier){
        // apply onDamage effects
        [...applier.activeEffects].forEach(effect => {
            if (!effects.onDamage[effect.name]) return;
            let handler = effects.onDamage[effect.name];
            if (handler.type === 'damageChange') amount = handler.fn(amount);
            // else if (handler.type === '')
            // else

            this.consumeEffect(applier, effect);
        });
        [...target.activeEffects].forEach(effect => {
            if (!effects.onRecieveDamage[effect.name]) return;
            let handler = effects.onRecieveDamage[effect.name];
            if (handler.type === 'damageChange') amount = handler.fn(amount);
            // else if (handler.type === '')
            // else

            this.consumeEffect(target, effect);
        });

        target.hp = Math.round(target.hp - amount);

        // check onDeath effects
        if (target.hp <= 0){
            const deathEffect = target.activeEffects.find(e => effects.onDeath[e.name]);
            if (deathEffect){
                effects.onDeath[deathEffect.name](target);
                this.consumeEffect(target, deathEffect);
            }else {
                target.isAlive = false;
                this.gameOver = true;
            }
        }
    }
    heal(target, amount){
        target.hp = Math.round(target.hp + amount);
        if (target.hp > this.maxHP) target.hp = this.maxHP
    }
    // isGameOver(){
    //     console.log("Game Over!");
    // }
}