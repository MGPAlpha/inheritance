/// <reference path="../AbstractStatus.ts" />

class PoisonStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount);
    }

    endTurn(affected: Combatant, other: Combatant) {
        affected.directDamage(this.amount);
        this.amount--;
    }

    add(other: AbstractStatus): boolean {
        if (other instanceof PoisonStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    clone(): PoisonStatus {
        return new PoisonStatus(this.amount);
    }

    getName(): string {
        return 'poison';
    }

    getSortingNumber(): number {
        return 0;
    }

}