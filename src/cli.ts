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

if (program.angular) {
  console.log('angular');
}

if (program.react) {
  console.log('react');
}

if (program.vue) {
  console.log('vue');
}

runDilay();
