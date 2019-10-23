/// <reference path="Combatant.ts" />
/// <reference path="Random.ts" />

class Enemy extends Combatant {

  utilityFunction: (Enemy, Player) => number;
  
  constructor(name: string, health: number, energy: number, defaultUtilityFunction: (Enemy, Human) => number, ...tools: Tool[]) {
    super(name, health, energy, ...tools);

    if (defaultUtilityFunction == undefined) {
        this.utilityFunction = AiUtilityFunctions.cautiousUtility;
    } else {
      this.utilityFunction = defaultUtilityFunction;
    }
  }

  clone(): Enemy {
    let copy = new Enemy(this.name, this.health, this.energy, this.utilityFunction, ...this.tools.map(x => x.clone()));
    copy.statuses = this.statuses.map(x => x.clone());
    copy.utilityFunction = this.utilityFunction;
    return copy;
  }
}
