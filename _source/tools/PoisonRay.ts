/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('poisonray',
  new Tool('Poison Ray', new Cost([1, CostTypes.Energy]), new GiveOtherStatusEffect(new PoisonStatus(1)))
);
