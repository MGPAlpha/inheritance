/// <reference path="../AbstractStatus.ts" />

class SurviveStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount);
    }

    die(affected: Combatant, other: Combatant): void {
        affected.health = 1;
    }

    add(other: AbstractStatus): boolean {
        if (other instanceof SurviveStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    clone(): SurviveStatus {
        return new SurviveStatus(this.amount);
    }

    getName(): string {
        return 'survive';
    }

    getDescription(): string {
        if (this.amount === 1) {
            return `Survive the next killing blow.`;
        } else {
            return `Survive the next ${this.amount} killing blows.`;
        }
    }

    getSortingNumber(): number {
        return 0;
    }

    getUtility(): number {
        return 10 * this.amount;
    }

}