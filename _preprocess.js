const fs = require('fs');

const totals = {};

function makeDirectoryReferences(dir, ...lines) {
  let fulldir = `_source/${dir}`;
  let files = fs.readdirSync(fulldir);
  files = files.filter(x => x.endsWith('.ts'));
  totals[dir] = files.length;
  lines = lines.concat(files.map(x => `/// <reference path="${dir}/${x}" />`));
  let file = lines.join('\n');
  fs.writeFileSync(fulldir + '.ts', file + '\n');
}

makeDirectoryReferences('effects');
makeDirectoryReferences('tools');
makeDirectoryReferences('modifiers');
makeDirectoryReferences('characters');
makeDirectoryReferences('enemies');
makeDirectoryReferences('statuses');

console.log('The game contains:');
const keys = Object.keys(totals);
keys.forEach(x => console.log(`    ${totals[x]} ${x}.`));
console.log(`There are ${Math.pow(2, totals.modifiers) * totals.tools} possible tools.`);