import * as fs from "fs";

const parse = require('parse-gitignore');

console.log(parse(fs.readFileSync(process.cwd() + '/' + '.gitignore')));
