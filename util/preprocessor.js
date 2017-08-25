#!/usr/bin/env node

/**
 * simple text preprocessor for solidity files
 * extends https://www.npmjs.com/package/preprocessor with inline includes.
 *
 * Attention: preprocessor does not create subdirs in the destination folder,
 * these have to be created manually.
 * 
 */

const fs = require('fs');
const Preprocessor = require('preprocessor');
const optimist = require('optimist');

const solProcessor = (inputfile, outputfile, defines) => {
  let content = fs.readFileSync(inputfile).toString();

  const matches = content.match(/@@include\('[^)]*'\)/g);
  const includes = [];
  for (const idx in matches) {
    const filename = matches[idx].slice(11, -2);
    if (typeof includes[filename] === 'undefined') {
      includes[filename] = fs.readFileSync(filename).toString();
    }
    content = content.replace(matches[idx], includes[filename]);
  }

  fs.writeFileSync(outputfile, new Preprocessor(content).process(defines));
};


const walk = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

const preprocessContracts = (sourceDir, destinationDir, defines) => {
  console.log(`Defines: ${JSON.stringify(defines)}`);

  walk(sourceDir, function (err, result) {
    const contracts = result.filter(elem => elem.match(/.sol$/));
    console.log(contracts);

    for (var idx in contracts) {
      console.log(`Processing ${contracts[idx]} ...`);
      solProcessor(
        contracts[idx],
        destinationDir + contracts[idx].slice(sourceDir.length),
        defines
      );
    }
  });
};

const cmdline = () => {
  const argv = optimist
    .usage('Simple text preprocessor. \nUsage: $0')
    .options('s', {
      alias: 'source',
      description: 'Source Dir',
      demand: true,
    })
    .options('d', {
      alias: 'destination',
      description: 'Destination Dir',
      demand: true,
    })
    .argv;

  let sourceDir = argv.source;
  // if (sourceDir.slice(-1) !== '/') sourceDir += '/';
  let destinationDir = argv.destination;
  // if (destinationDir.slice(-1) !== '/') destinationDir += '/';
  delete argv._;
  delete argv.$0;
  delete argv.source;
  delete argv.destination;
  console.log(argv);
  preprocessContracts(sourceDir, destinationDir, argv);
};

if (typeof process.argv !== 'undefined') cmdline();
