/// <reference path="../AbstractEffect.ts" />

class GiveSelfStatusEffect extends AbstractEffect {

  status: AbstractStatus;
  constructor(status: AbstractStatus) {
    super();
    this.status = status;
  }

  effect(user: Combatant, target: Combatant): void {
    user.addStatus(this.status.clone());
  }

  toString(): string {
    return `gain ${this.status.amount} ${Strings.capitalize(this.status.getName())}`;
  }

  clone(): GiveSelfStatusEffect {
    return new GiveSelfStatusEffect(this.status.clone());
  }

}
