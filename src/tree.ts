/*
 * copy from https://github.com/yangshun/tree-node-cli
 * MIT License Copyright (c) 2018 Yangshun Tay
 *
 */

import * as fs from "fs";
import * as path from "path";
import ignore from 'ignore'
import FrameworkHelper from "./helper/framework.helper";

const parseIgnore = require('parse-gitignore');

function isHiddenFile(filename: string) {
  return filename[0] === '.';
}

let ignoreFiles = parseIgnore(fs.readFileSync(process.cwd() + '/' + '.gitignore'));

const ig = ignore().add(ignoreFiles);

function tree(filename: string, filePath: string, projectType: string) {
  const isDir = fs.lstatSync(filePath).isDirectory();
  const isFile = !isDir;

  const lines: string[] = [];

  // Do not show these regardless.

  if (filename) {
    let filteredPath = ig.filter([filename]);
    if (filteredPath.length === 0) {
      return lines;
    }
  }

  if (isFile) {
    let errors: string[] = [];
    if (projectType === 'angular') {
      FrameworkHelper.testAngular(filePath, errors);
    }

    if (errors.length > 0) {
      console.log(errors);
    }

    return lines;
  }

  // Handle current file.
  const line = [];
  line.push(filename);
  lines.push(line.join(''));

  let contents = fs.readdirSync(filePath);
  contents = contents.filter(content => !isHiddenFile(content));

  contents.forEach((content) => {
    const linesForFile = tree(content, path.join(filePath, content), projectType);

    lines.push.apply(lines, linesForFile);
  });

  return lines;
}

export default tree;
