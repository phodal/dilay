import * as fs from "fs";
import tree from "./tree";

const parse = require('parse-gitignore');


// @ts-ignore
function check() {
  console.log(parse(fs.readFileSync(process.cwd() + '/' + '.gitignore')));
}

function getDir() {
  return process.cwd();
}

export default function runDilay() {
  const dir = getDir();
  console.log(dir);
  check();
  tree('', dir)
  // console.log(tree('', dir));
}
