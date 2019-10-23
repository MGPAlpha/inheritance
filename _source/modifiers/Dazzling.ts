/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
modifiers.add('dazzling',
  new Modifier('Dazzling', new ChanceEffect(0.15, new GiveOtherStatusEffect(new ConfusionStatus(2))))
);
