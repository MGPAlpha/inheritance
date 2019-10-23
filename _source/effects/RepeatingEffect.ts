/// <reference path="../AbstractEffect.ts" />

class RepeatingEffect extends AbstractEffect {

  times: number;
  next: AbstractEffect;

  constructor(next: AbstractEffect, times: number) {
    super();
    this.next = next;
    this.times = times;
  }

  effect(user: Combatant, foe: Combatant): void {
    for (let i = 0; i < this.times; i++) {
      this.next.activate(user, foe);
    }
  }

  toString(): string {
    return `${this.next.toString()} ${this.times} times`;
  }

  clone(): RepeatingEffect {
    return new RepeatingEffect(this.next.clone(), this.times);
  }

}
