/// <reference path="../AbstractEffect.ts" />

class LoseEnergyEffect extends AbstractEffect {

  amount: number;
  constructor(amount: number) {
    super();
    this.amount = amount;
  }

  effect(user: Combatant, target: Combatant): void {
    user.loseEnergy(this.amount);
  }

  toString(): string {
    return `lose ${this.amount} energy`;
  }

  clone(): LoseEnergyEffect {
    return new LoseEnergyEffect(this.amount);
  }

}
