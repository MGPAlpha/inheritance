/// <reference path="Player.ts" />
/// <reference path="Enemy.ts" />
/// <reference path="UI.ts" />

class Fight {

  player: Player;
  enemy: Enemy;
  playersTurn: boolean;
  div: HTMLElement;
  enemyButtons: HTMLElement[];
  endCallback: Function;
  inRoom: Room

  constructor(p: Player, e: Enemy, inRoom?: Room) {
    this.player = p;
    p.refresh();
    this.enemy = e;
    e.refresh();
    if (inRoom) this.inRoom = inRoom;
    this.endCallback = () => {};
    this.playersTurn = true;
    this.enemyButtons = [];
    UI.setRedrawFunction(() => { this.redraw(); });
    // this.player.setDeathFunc(() => { this.end(); });
    this.enemy.setDeathFunc(() => { this.end(); });
    this.div = document.createElement('div');
    this.draw();
  }

  setEndCallback(f: Function) {
    this.endCallback = f;
  }

  endTurn(): void {
    this.playersTurn = !this.playersTurn;
    this.player.refresh();
    this.enemy.refresh();
    this.enemyButtons = [];
    UI.redraw();
    if (!this.playersTurn) {
      let enemyMoveSequence = AI.bestMoveSequence(this.enemy, this.player, 2000);
      this.makeNextEnemyMove(enemyMoveSequence);
    }
  }

  makeNextEnemyMove(moveSequence: number[]): void {
    console.log(moveSequence);
    if(moveSequence.length <= 0) {
      UI.fakeClick(this.enemyButtons[this.enemyButtons.length - 1]);
      return;
    } else {
      let move = moveSequence.shift();
      if (move !== undefined) {
        console.log("Move: " + move);
        UI.fakeClick(this.enemyButtons[move]);
        window.setTimeout(() => {
          this.makeNextEnemyMove(moveSequence);
        }, 750);
      }
    }
  }

  endTurnButton(): HTMLElement {
    return UI.makeButton('End Turn', () => { this.endTurn(); }, !this.playersTurn, 'endturn');
  }

  draw(): void {
    this.div = UI.makeDiv('arena');
    UI.fillScreen(this.div);
    this.redraw();
  }

  redraw(): void {
    this.div.innerHTML = '';
    this.div.appendChild(UI.renderCombatant(this.player, this.enemy, this.playersTurn));
    this.div.appendChild(UI.renderCombatant(this.enemy, this.player, false, this.enemyButtons));
    let etb = this.endTurnButton();
    this.div.appendChild(etb);
    this.enemyButtons.push(etb);
  }

  end(): void {
    document.body.removeChild(this.div);
    if (this.inRoom) this.inRoom.containerFloor.currentRun.offerModifier();
    else this.endCallback();
  }

}
