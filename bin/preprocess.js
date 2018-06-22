#!/usr/bin/env node

const os = require('os');
const crypto = require('crypto');
const fs = require('fs-jetpack');
const log = require('../util/logger');
const chalk = require('chalk');

const compilerVersion = JSON.parse(fs.read('package.json')).config['solidity-compiler'];

const workingmode = process.argv[2];
const debug = !!process.argv[3];


/**
 * Preprocess input data with solidity compiler version
 *
 * @param {any} raw file input
 * @returns
 */
function setCompilerVersion(data) {

    return data.replace(/pragma solidity +.*;/, `pragma solidity ${compilerVersion};`);

}


/**
 * Preprocess input data for defined mode
 *
 * @param {any} source raw file input
 * @param {any} regexp regular expression for mode block lookup
 * @param {any} mode on/off defined mode
 * @param {any} label mode label
 * @returns
 */
function setMode(source, regexp, mode, label) {

    let output = source;
    const matches = source.match(regexp);

    if (matches) {

        matches.forEach((match) => {

            const particle = match.split(os.EOL).slice(1, -1);
            const comment = `//${' '.repeat(4)}`;

            let lines;
            if (mode === 'on') {

                lines = particle.map(line => line.replace(comment, ''));

            } else {

                lines = particle.map(line => `${comment}${line.replace(comment, '')}`);

            }

            const newLines = lines.join(os.EOL);

            output = output.replace(match, `--> ${label}-mode${os.EOL}${newLines}${os.EOL}// <-- ${label}-mode`);

        });

    }

    return output;

}

/**
 * Preprocess source with defined set of deplacements
 *
 * @param {any} input raw file input
 * @returns
 */
function preprocessData(input) {

    let data = input;

    const debugRegexp = /--> debug-mode[\s\S]+?<-- debug-mode/g;
    const devRegexp = /--> test-mode[\s\S]+?<-- test-mode/g;
    const prodRegexp = /--> prod-mode[\s\S]+?<-- prod-mode/g;

    // Set solc version
    data = setCompilerVersion(data);

    // Set defined mode
    if (workingmode === 'test') {

        data = setMode(data, devRegexp, 'on', 'test');
        data = setMode(data, prodRegexp, 'off', 'prod');

    } else if (workingmode === 'prod') {

        data = setMode(data, devRegexp, 'off', 'test');
        data = setMode(data, prodRegexp, 'on', 'prod');

    }

    if (debug) {

        data = setMode(data, debugRegexp, 'on', 'debug');

    } else {

        data = setMode(data, debugRegexp, 'off', 'debug');

    }

    return data;

}

/**
 * Preprocess directory with solidity contracts
 *
 * @param {any} dir
 */
function preprocess(dir) {

    log.info(`Processing folder: ${dir}`);
    fs.find(dir, { matching: '*.sol', })
        .forEach((contract) => {

            const input = fs.read(contract, 'utf8');
            const inputHash = crypto.createHash('md5').update(input).digest('hex');

            const output = preprocessData(input);
            const outputHash = crypto.createHash('md5').update(output).digest('hex');

            if (inputHash !== outputHash) {

                fs.write(contract, output);
                log.info(`${contract} ${chalk.green('preprocessed')}`);

            } else {

                log.info(`${contract}: ${chalk.gray('nothing to do!')}`);

            }

            fs.write(contract, output);

        });

}

/**
 * Main Routine.
 *
 */
function main() {

    log.info(`Working Mode: ${workingmode}`);
    log.info(`Debugging   : ${debug}`);
    preprocess('contracts');

}

main();
