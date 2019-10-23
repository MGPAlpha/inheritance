/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../AiUtilityFunctions.ts" />

enemies.add('goldfish',
    new Enemy('Goldfish', 10, 10, AiUtilityFunctions.cautiousUtility, tools.get('splash')!, tools.get('wrench')!)
);
