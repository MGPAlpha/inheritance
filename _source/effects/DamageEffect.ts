/// <reference path="../AbstractEffect.ts" />

class DamageEffect extends AbstractEffect {

  damage: number;
  constructor(damage: number) {
    super();
    this.damage = damage;
  }

  effect(user: Combatant, target: Combatant): void {
    target.wound(user.statusFold(StatusFolds.DAMAGE_DEALT, this.damage));
  }

  toString(): string {
    return `do ${this.damage} damage`;
  }

  clone(): DamageEffect {
    return new DamageEffect(this.damage);
  }

}
