/// <reference path="Combatant.ts" />

abstract class AbstractStatus {

    static readonly sorting: number = 0;
    static readonly _name: string;
    amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    //A lot of the methods here have the parameters "affected" and "other." The affected is the one with the status effect, and the other is their opponent.

    //Called at the start the affected's turn.
    startTurn(affected: Combatant, other: Combatant): void {

    }

    //Called at the end of the affected's turn.
    //If the status decrements itself in some way, this is where that should go.
    endTurn(affected: Combatant, other: Combatant): void {

    }

    //Called whenever the affected uses a tool.
    useTool(affected: Combatant, other: Combatant): void {

    }

    //Called whenever the affected takes damage.
    takeDamage(affected: Combatant, other: Combatant): void {

    }

    //These functions are used for reducing over certain values - damage taken, amount healed, etc.

    damageTakenFold(acc: number): number {
        return acc;
    }

    damageDealtFold(acc: number): number {
        return acc;
    }

    amountHealedFold(acc: number): number {
        return acc;
    }

    //This method tries to add some other status to this status. It's important to get this right!
    //This should return false if the add hasn't been completed and true if it has.
    abstract add(other: AbstractStatus): boolean;

    abstract clone(): AbstractStatus;

}