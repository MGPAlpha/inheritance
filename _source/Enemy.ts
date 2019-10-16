/// <reference path="Combatant.ts" />
/// <reference path="Random.ts" />

class Enemy extends Combatant {

  constructor(name: string, health: number, energy: number, ...tools: Tool[]) {
    super(name, health, energy, ...tools);
  }

  clone(): Enemy {
    let copy = new Enemy(this.name, this.health, this.energy, ...this.tools.map(x => x.clone()));
    copy.statuses = this.statuses.map(x => x.clone());
    copy.utilityFunction = this.utilityFunction;
    return copy;
  }

  utilityFunction(simulatedBot: Enemy, simulatedHuman: Player): number {
    if (simulatedBot.health == 0) {
      return Number.MIN_VALUE; // 3rd law of robotics
    }
    if (simulatedHuman.health == 0) {
      return Number.MAX_VALUE;
    }

    // TODO make a more complex scoring function
    return simulatedBot.health - simulatedHuman.health;
    }

}
