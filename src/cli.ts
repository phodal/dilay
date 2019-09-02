#!/usr/bin/env node

import runDilay from "./index";

const program = require('commander');

let version = require('../../package.json').version;

program
  .version(version)
  .parse(process.argv);


runDilay();
