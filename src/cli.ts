#!/usr/bin/env node

const program = require('commander');

let version = require('../../package.json').version;

program
  .version(version)
  .parse(process.argv);

