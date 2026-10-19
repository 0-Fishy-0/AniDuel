export class Card{
    constructor(cardDetes){
        this.name = cardDetes.name;
        this.description = cardDetes.description;
        this.category = cardDetes.category;
        this.rarity = cardDetes.rarity;
    }
    play(applier, reciever, game){
        throw new Error(`${this.name} has no play() defined`);
    }
}

// -------------------------------------------------

export class DamageCard extends Card{
    constructor(cardDetes){
        super(cardDetes);
        this.damageAmount = cardDetes.damageAmount;
    }
    play(applier, reciever, game){
        game.takeDamage(reciever, this.damageAmount, applier);
    }
}

export class HealCard extends Card{
    constructor(cardDetes){
        super(cardDetes);
        this.healAmount = cardDetes.healAmount;
    }
    play(applier, reciever, game){
        game.heal(applier, this.healAmount);
    }
}

export class BuffCard extends Card{
    play(applier, reciever, game){
        throw new Error("No buff defined for BuffCard");
    }
}

export class DeathPreventCard extends Card{
    play(applier, reciever, game){
        game.addEffect(applier, 'deathShield', 1);
    }
}

export class MiscCard extends Card{}

// -------------------------------------------------

export class TodoCard extends MiscCard{
    play(applier, reciever, game){
        let temp = applier.hp;
        applier.hp = reciever.hp;
        reciever.hp = temp;
    }
}

export class SubaruCard extends DeathPreventCard{}

export class BakugoCard extends DamageCard{}

export class NazunaCard extends DamageCard{
    constructor(cardDetes){
        super(cardDetes);
        this.healAmount = cardDetes.healAmount;
    }
    play(applier, reciever, game){
        super.play(applier, reciever, game);
        game.heal(applier, this.healAmount);
    }
}

export class RamenCard extends HealCard{}

export class GigaDrillBreakCard extends DamageCard{}

export class DioCard extends MiscCard{
    play(applier, reciever, game){
        game.addEffect(reciever, 'skipTurn', 1)
    }
}

export class DavidMartinezCard extends MiscCard{
    play(applier, reciever, game){
        game.addEffect(reciever, 'skipTurn', 1)
    }
}

export class HakariCard extends MiscCard{
    constructor(cardDetes){
        super(cardDetes);
        this.lowerHP = cardDetes.lowerHP;
        this.upperHP = cardDetes.upperHP;
    }
    play(applier, reciever, game){
        let randomHP = game.getRandomValue(this.lowerHP, this.upperHP);
        reciever.hp = randomHP;
    }
}

export class AllMightCard extends BuffCard{
    constructor(cardDetes){
        super(cardDetes);
        this.buffedPunchDamage = cardDetes.buffedPunchDamage;
    }
    play(applier, reciever, game){
        game.addEffect(applier, 'punchDMG50', 1);
    }
}

export class GojoInfCard extends MiscCard{
    play(applier, reciever, game){
        game.addEffect(applier, 'infinity', 1);
    }
}