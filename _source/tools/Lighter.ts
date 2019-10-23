/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('lighter',
  new Tool('Lighter', new Cost([1, CostTypes.Energy]),
    new GiveSelfStatusEffect(new BurnStatus(1)),
    new GiveSelfStatusEffect(new StrengthStatus(1))
  )
);
