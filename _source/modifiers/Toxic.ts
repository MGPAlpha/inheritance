/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
modifiers.add('toxic',
  new Modifier('Toxic', new GiveOtherStatusEffect(new PoisonStatus(2)), new GiveSelfStatusEffect(new PoisonStatus(1)))
);
