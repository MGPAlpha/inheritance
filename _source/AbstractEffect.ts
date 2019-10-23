abstract class AbstractEffect {

  activate(user: Combatant, foe: Combatant): void {
    this.effect(user, foe);
  }

  abstract effect(user: Combatant, foe: Combatant): void;

  abstract toString(): string;

  abstract clone(): AbstractEffect;

}
