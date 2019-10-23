/// <reference path="../AbstractEffect.ts" />

class CycleEffect extends AbstractEffect {

    effects: AbstractEffect[];
    index: number;

    constructor(...effects: AbstractEffect[]) {
        super();
        this.effects = effects;
        this.index = 0;
    }

    effect(user: Combatant, target: Combatant) {
        this.effects[this.index].effect(user, target);
        this.index = (this.index + 1) % this.effects.length;
    }

    clone(): CycleEffect {
        let clone: CycleEffect = new CycleEffect(...this.effects.map(x => x.clone()));
        clone.index = this.index;
        return clone;
    }

    toString(): string {
        return `${this.effects[this.index].toString()}. Cycle effects`;
    }

}