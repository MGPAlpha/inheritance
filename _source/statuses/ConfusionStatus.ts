/// <reference path="../AbstractStatus.ts" />
/// <reference path="../AiUtilityFunctions.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../Player.ts" />

class ConfusionStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount);
    }

    endTurn(affected: Combatant, other: Combatant) {
        this.amount--;
    }

    overridenUtilityFunction(bot: Enemy, human: Player) {
        return AiUtilityFunctions.blindUtility(bot, human);
    }

    add(other: AbstractStatus): boolean {
        if (other instanceof ConfusionStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    clone(): ConfusionStatus {
        return new ConfusionStatus(this.amount);
    }

    getName(): string {
        return 'confused';
    }

    getDescription(): string {
        return 'Make random moves instead of thinking strategically';
    }

    getSortingNumber(): number {
        return 10;
    }

    getUtility(): number {
        return -5 * this.amount;
    }

}