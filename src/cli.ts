#!/usr/bin/env node

import runDilay from "./index";

const program = require('commander');

let version = require('../../package.json').version;

program
  .version(version)
  .option('-a, --angular', 'angular style')
  .option('-r, --react', 'react style')
  .option('-v, --vue', 'vue style')

  .parse(process.argv);

let projectType = '';

if (program.angular) {
  projectType = 'angular';
}

if (program.react) {
  projectType = 'react';
}

if (program.vue) {
  projectType = 'vue';
}

runDilay(projectType);
