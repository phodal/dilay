/*
 * copy from https://github.com/yangshun/tree-node-cli
 * MIT License Copyright (c) 2018 Yangshun Tay
 *
 */

import * as fs from "fs";
import * as path from "path";
import ignore from 'ignore'

const parseIgnore = require('parse-gitignore');

function isHiddenFile(filename: string) {
  return filename[0] === '.';
}

let ignoreFiles = parseIgnore(fs.readFileSync(process.cwd() + '/' + '.gitignore'));

const ig = ignore().add(ignoreFiles);

function tree(filename: string, filePath: string) {
  const isDir = fs.lstatSync(filePath).isDirectory();
  const isFile = !isDir;

  const lines: string[] = [];

  // Do not show these regardless.

  if (filename) {
    let filteredPath = ig.filter([filename]);
    if(filteredPath.length === 0) {
      return lines;
    }
  }

  if (isFile) {
    return lines;
  }

  // Handle current file.
  const line = [];
  line.push(filename);
  lines.push(line.join(''));

  if (isFile) {
    return lines;
  }

  let contents = fs.readdirSync(filePath);
  contents = contents.filter(content => !isHiddenFile(content));

  contents.forEach((content) => {
    const linesForFile = tree(
      content,
      path.join(filePath, content),
    );

    lines.push.apply(lines, linesForFile);
  });

  return lines;
}

export default tree;
