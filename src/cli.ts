#!/usr/bin/env node

import runDilay from "./index";

const program = require('commander');

let version = require('../../package.json').version;

program
  .version(version)
  .option('-p, --path <path>', 'relative path')
  .option('-a, --angular', 'angular style')
  .option('-r, --react', 'react style')
  .option('-v, --vue', 'vue style')

  .parse(process.argv);

let projectType = '';
let relativePath;

if (program.angular) {
  projectType = 'angular';
}

if (program.react) {
  projectType = 'react';
}

if (program.vue) {
  projectType = 'vue';
}

if (program.path) {
  relativePath = program.path;
}

runDilay(projectType, relativePath);
