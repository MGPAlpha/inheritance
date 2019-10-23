/// <reference path="../AbstractEffect.ts" />

class NothingEffect extends AbstractEffect { //does nothing
  effect(user: Combatant, foe: Combatant): void {
    return;
  }

  toString(): string {
    return 'do nothing';
  }

  clone(): NothingEffect {
    return new NothingEffect();
  }

}