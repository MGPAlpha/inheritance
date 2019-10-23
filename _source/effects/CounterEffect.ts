/// <reference path="../AbstractEffect.ts" />

//TODO: how should this work with multipliers?

class CounterEffect extends AbstractEffect {
  currentCounter: number;
  maxCounter: number;
  next: AbstractEffect;

  constructor(next: AbstractEffect, count: number) {
    super();
    this.next = next;
    this.maxCounter = count;
    this.currentCounter = count;
  }

  effect(user: Combatant, foe: Combatant): void {
    this.currentCounter--;
    if (this.currentCounter <= 0) {
      this.next.activate(user, foe);
      this.currentCounter = this.maxCounter;
    }
  }

  toString(): string {
    if (this.currentCounter === 1) {
      return `next use, ${this.next.toString()}`;
    } else {
      return `in ${this.currentCounter} uses, ${this.next.toString()}`
    }
  }

  clone(): CounterEffect {
    return new CounterEffect(this.next.clone(), this.maxCounter);
  }
}