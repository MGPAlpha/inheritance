/// <reference path="../AbstractEffect.ts" />

//TODO: how should this work with multipliers?

class ChanceEffect extends AbstractEffect {
  chance: number;
  next: AbstractEffect;
  otherwise?: AbstractEffect;

  constructor(chance: number, next: AbstractEffect, otherwise?: AbstractEffect) {
    super();
    this.chance = chance;
    this.next = next;
    this.otherwise = otherwise;
  }

  effect(user: Combatant, foe: Combatant): void {
    if (Random.bool(this.chance)) {
        this.next.effect(user, foe);
    } else if (this.otherwise) {
        this.otherwise.effect(user, foe);
    }
  }

  toString(): string {
    let chance = (this.chance * 100).toFixed(0);
    if (this.otherwise) {
        let otherChance = (100 - this.chance * 100).toFixed(0);
        return `${chance}% chance to ${this.next.toString()}; ${otherChance}% chance to ${this.otherwise.toString()} instead`;
    } else {
        return `${chance}% chance to ${this.next.toString()}`;
    }
  }

  clone(): ChanceEffect {
    return new ChanceEffect(this.chance, this.next.clone(), this.otherwise ? this.otherwise.clone() : undefined);
  }
}