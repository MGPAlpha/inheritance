/// <reference path="../AbstractEffect.ts" />

class GiveOtherStatusEffect extends AbstractEffect {

  status: AbstractStatus;
  constructor(status: AbstractStatus) {
    super();
    this.status = status;
  }

  effect(user: Combatant, target: Combatant): void {
    target.addStatus(this.status.clone());
  }

  toString(): string {
    return `give opponent ${this.status.amount} ${Strings.capitalize(this.status.getName())}`;
  }

  clone(): GiveOtherStatusEffect {
    return new GiveOtherStatusEffect(this.status.clone());
  }

}
