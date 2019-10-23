/// <reference path="../AbstractEffect.ts" />

class GainEnergyEffect extends AbstractEffect {

  amount: number;
  constructor(amount: number) {
    super();
    this.amount = amount;
  }

  effect(user: Combatant, target: Combatant): void {
    user.gainEnergy(this.amount);
  }

  toString(): string {
    return `gain ${this.amount} energy`;
  }

  clone(): GainEnergyEffect {
    return new GainEnergyEffect(this.amount);
  }

}
