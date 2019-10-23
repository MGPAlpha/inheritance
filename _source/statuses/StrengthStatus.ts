/// <reference path="../AbstractStatus.ts" />

class StrengthStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount);
    }

    damageDealtFold(acc: number): number {
        return Math.max(1, acc + this.amount);
    }

    add(other: AbstractStatus): boolean {
        if (other instanceof StrengthStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    clone(): StrengthStatus {
        return new StrengthStatus(this.amount);
    }

    getName(): string {
        return 'strength';
    }

    getDescription(): string {
        if (this.amount > 0) {
            return `Deal ${this.amount} more damage whenever you attack.`;
        } else {
            return `Deal ${this.amount} less damage whenever you attack.`;
        }
    }

    getSortingNumber(): number {
        return 0;
    }

    getUtility(): number {
        return -5 * this.amount;
    }

}