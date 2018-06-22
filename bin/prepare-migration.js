#!/usr/bin/env node

const yaml = require('js-yaml');
const fs = require('fs-jetpack');
const checksum = require('checksum');
const _ = require('lodash');
const inquirer = require('inquirer');
const log = require('../util/logger');


async function prepareMigration() {
    const migrationsFiles = fs.list('migrations-available');
    const resources = yaml.safeLoad(fs.read('resources.yml'));
    const newFiles = _.difference(migrationsFiles, resources.migrations);

    if (newFiles.length === 0) throw new Error('No new migrations');
    if (newFiles.length > 1) throw new Error('Please, deploy migrations one by one');

    const migrationFile = _.first(newFiles);
    const migrationChecksum = checksum(fs.read(`migrations-available/${migrationFile}`));

    const prompt = await inquirer.prompt([{
        type: 'input',
        name: 'checksum',
        message: `What checksum for ${migrationFile} you see in monitoring?`,
    }]);

    if (prompt.checksum !== migrationChecksum) throw new Error('Checksum doesn\'t match');

    resources.migrations.push(migrationFile);
    fs.write('resources.yml', yaml.safeDump(resources, { indent: 4 }));
}

prepareMigration().catch((err) => {
    log.error(err);
    process.exit(255);
});
