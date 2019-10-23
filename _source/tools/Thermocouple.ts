/// <reference path="../ItemPool.ts" />
/// <reference path="../Tool.ts" />
/// <reference path="../effects.ts" />
/// <reference path="../statuses.ts" />
tools.add('thermocouple',
    new Tool('Thermocouple',
        new Cost([2, CostTypes.Energy]),
        new CycleEffect(
            new GiveOtherStatusEffect(new BurnStatus(1)),
            new GiveOtherStatusEffect(new FreezeStatus(1)),
        )
    )
);
