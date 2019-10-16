const fs = require('fs');

function makeDirectoryReferences(dir, ...lines) {
  let fulldir = `_source/${dir}`;
  let files = fs.readdirSync(fulldir);
  files = files.filter(x => x.endsWith('.ts'));
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
