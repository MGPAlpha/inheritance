/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('confusionray',
  new Tool('Confusion Ray', new Cost([5, CostTypes.Energy]), new GiveOtherStatusEffect(new ConfusionStatus(2)), new UsesMod(1))
);
