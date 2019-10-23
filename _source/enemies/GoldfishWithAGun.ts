/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../AiUtilityFunctions.ts" />

enemies.add('goldfishwithagun',
    new Enemy('Goldfish With A Gun', 10, 5, AiUtilityFunctions.aggressiveUtility, tools.get('sixshooter')!)
);
