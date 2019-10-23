/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
tools.add('energizer',
    new Tool('Energizer',
        new Cost(),
        new CycleEffect(
            new GainEnergyEffect(1),
            new GainEnergyEffect(1),
            new GainEnergyEffect(1),
            new LoseEnergyEffect(4)
        )
    )
);
