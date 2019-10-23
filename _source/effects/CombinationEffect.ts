/// <reference path="../AbstractEffect.ts" />

class CombinationEffect extends AbstractEffect { //combine multiple effects

  effects: AbstractEffect[];

  constructor(...effects: AbstractEffect[]) {
    super();
    this.effects = effects;
  }

  effect(user: Combatant, foe: Combatant): void {
    for (let i = 0; i < this.effects.length; i++) {
      this.effects[i].activate(user, foe);
    }
  }

  toString(): string {
    let acc = [];
    for (let i = 0; i < this.effects.length; i++) {
      acc.push(this.effects[i].toString());
    }
    return acc.join(' ');
  }

  clone(): CombinationEffect {
    return new CombinationEffect(...this.effects.map(x => x.clone()));
  }

}