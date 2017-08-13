const path = require('path');
const fs = require('fs');
const sys = require('sys');
const L = require('partial.lenses');

const package = require('../package.json');

//

const MANIFEST_FILE = path.resolve(__dirname, '..', 'public/manifest.json');

const writeManifest = json => fs.writeFileSync(MANIFEST_FILE, json);

//

const baseManifest = L.get(L.pickIn({
  name: L.define('No name given'),
  description: L.define('No description given.'),
  version: L.define('No version given.')
}), package);

//

const MANIFEST = {
  manifest_version: 2,
  devtools_page: 'devtools.html',
  permissions: ['activeTab']
};

//

const manifest = Object.assign({}, MANIFEST, baseManifest);
const manifestJson = JSON.stringify(manifest);

// Save manifest to disk if it has changed

let file;
let result;

try {
  file = fs.statSync(MANIFEST_FILE);
}
catch (err) {
  if (err.code === 'ENOENT') {
    console.log('Manifest doesn\'t exist, writing a new one.');
    result = writeManifest(manifestJson);

    console.log('Manifest file written')
    sys.exit(0);
  }
}

const existingManifestContent = fs.readFileSync(MANIFEST_FILE).toString();

console.log({ existingManifestContent });

console.log(existingManifestContent === manifestJson);
