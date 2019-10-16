/// <reference path="Player.ts" />
/// <reference path="Fight.ts" />

class Run {

    player: Player;
    seenEnemies: string[];
    seenModifiers: string[];
    numEvents: number;
    currentFloor: Floor;

    constructor(player: Player) {
        this.player = player;
        this.player.setDeathFunc(() => Game.showGameOver(this));
        this.numEvents = 0;
        this.seenEnemies = [];
        this.seenModifiers = [];
    }

    start(): void {
        this.currentFloor = new Floor(0, this);
        this.nextEvent();
    }

    nextEvent(): void {
        this.numEvents++;
        UI.fillScreen(UI.renderFloor(this.currentFloor));
        // switch (this.numEvents % 2) {
        //     case 0:
        //         return this.offerModifier();
        //     case 1:
        //         return this.startFight();
        // }
    }

    offerModifier(): void {
        // TODO: don't do an unsafe assertion here
        let m = modifiers.selectRandomUnseen(this.seenModifiers)!;
        UI.fillScreen(UI.renderModifier(m, this.player, () => this.nextEvent()));
    }

    startFight(): void {
        // TODO: don't do an unsafe assertion here
        let enemy = enemies.selectRandomUnseen(this.seenEnemies)!;
        let f = new Fight(this.player, enemy);
        f.setEndCallback(() => this.nextEvent());
    }

}
