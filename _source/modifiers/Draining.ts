/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
modifiers.add('draining',
  new Modifier('Draining', [ModifierTypes.MultAdd, 1], new ChanceEffect(0.125, new LoseEnergyEffect(1)))
);
