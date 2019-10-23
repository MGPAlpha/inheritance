processor = {};
window = {
  innerHeight: 0,
  console: {
    log: function(x, y) {
      processor[x] = y;
    }
  }
};
require('./built.js');
const fs = require('fs');

function concatenator(acc, x) {
  return acc.concat(x);
}

function generateLines(header, pool, func) {
  const items = pool.getAll();
  const lines = items.map(x => func(x));
  //lines is an array of arrays, so...
  return [`# ${header}`].concat(lines.reduce(concatenator));
}

function writeLines(lines, filename) {
  fs.writeFileSync(filename, lines.join('\n\n')); //double newlines for markdown reasons
}

function writeTool(tool, header = true) {
  return [
    header ? `## ${tool._name}` : `**${tool.name}**`,
    `Cost: ${tool.cost.toString()}`,
    `${tool.effectsString()}`,
    (tool.usesPerTurn < Infinity) ? `Usable ${tool.usesPerTurn} time(s) per turn` : null,
  ].filter(x => !!x);
}

function writeModifier(modifier) {
  return [`## ${modifier.name}`].concat(modifier.describe().split('\n'));
}

function writeCombatant(combatant) {
  return [
    `## ${combatant.name}`,
    `Health: ${combatant.maxHealth}`,
    `Energy: ${combatant.maxEnergy}`,
    `Tools:`
  ].concat(combatant.tools.map(x => writeTool(x, false)).reduce(concatenator).map(x => `* ${x}`));
}

console.log('Assembling Markdown descriptions...');

writeLines(generateLines('Tools', processor.tools, writeTool), '_tools.md');
writeLines(generateLines('Modifiers', processor.modifiers, writeModifier), '_modifiers.md');
writeLines(generateLines('Characters', processor.characters, writeCombatant), '_characters.md');
writeLines(generateLines('Enemies', processor.enemies, writeCombatant), '_enemies.md');

console.log('Descriptions assembled!');