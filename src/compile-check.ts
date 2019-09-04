/*
 * copy from https://github.com/yangshun/tree-node-cli
 * MIT License Copyright (c) 2018 Yangshun Tay
 *
 */

import * as fs from "fs";
import * as path from "path";
import ignore from 'ignore'

const colors = require('colors/safe');

import FrameworkHelper from "./helper/framework.helper";
import FileUtil from "./helper/file.util";

const parseIgnore = require('parse-gitignore');

let ignoreFiles = parseIgnore(fs.readFileSync(process.cwd() + '/' + '.gitignore'));
const ig = ignore().add(ignoreFiles);

function compileCheck(filename: string, filePath: string, options: { projectType: string; program: any }) {
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
    if (options.projectType === 'angular') {
      FrameworkHelper.testAngular(filePath, errors, options.program);
    }

    if (errors.length > 0) {
      console.log(colors.red(errors));
    }

    return lines;
  }

  // Handle current file.
  const line = [];
  line.push(filename);
  lines.push(line.join(''));

  let contents = fs.readdirSync(filePath);
  contents = contents.filter(content => !FileUtil.isHiddenFile(content));

  contents.forEach((content) => {
    const linesForFile = compileCheck(content, path.join(filePath, content), options);

    lines.push.apply(lines, linesForFile);
  });

  return lines;
}

export default compileCheck;
