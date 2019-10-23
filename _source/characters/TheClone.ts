/// <reference path="../Player.ts" />
/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />

characters.addSorted('clone', new Player('The Clone', 10, 10,
    tools.get('windupraygun')!,
    tools.get('confusionray')!,
    tools.get('thermocouple')!,
    tools.get('energizer')!,
), 1);
