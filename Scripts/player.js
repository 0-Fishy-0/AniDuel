export class Player{
    constructor(playerDetes){
        this.name = playerDetes.name;
        this.ID = playerDetes.ID;
        this.team = playerDetes.team;
        this.hp = 100;
        this.ki = 0;
        this.hand = [];
        this.activeEffects = [];
        this.isAlive = true;
        this.lastPlayed = [];
    }
}

export const playerDetes = [
    {
        name: 'Fishy',
        team: 1
    },
    {
        name: 'Claude',
        team: 2
    }
] // this will be auto generated using UI later