import * as fs from "fs";
import * as path from "path";
import ignore from "ignore";


const parseIgnore = require('parse-gitignore');

let ignoreFiles = parseIgnore(fs.readFileSync(process.cwd() + '/' + '.gitignore'));
const ig = ignore().add(ignoreFiles);

function parseProject() {

}

function walk(filename: string, filePath: string) {
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
    return [filePath];
  }

  // Handle current file.
  const line = [];
  line.push(filename);

  let contents = fs.readdirSync(filePath);
  contents = contents.filter(content => !isHiddenFile(content));

  contents.forEach((content) => {
    const linesForFile = walk(content, path.join(filePath, content));

    lines.push.apply(lines, linesForFile);
  });

  return lines;
}

function walkDir(fileName: string, dir: string) {
  let dirLength = dir.length;
  let files = walk(fileName, dir);
  files = files.map(file => {
    return file.substr(dirLength + 1, file.length);
  });

  return files;
}

function isHiddenFile(filename: string) {
  return filename[0] === '.';
}

function filterBySuffixes(files: string[], suffixes: string[]) {
  return files.filter(function (file) {
    let equal = false;
    for (let i = 0; i < suffixes.length; i++) {
      const ext = suffixes[0];
      if (path.extname(file).toLowerCase() === ext) {
        return true;
      }
    }
    return equal;
  });
}

const FileUtil = {
  parseProject: parseProject,
  walkDir: walkDir,
  isHiddenFile: isHiddenFile,
  filterBySuffix: filterBySuffixes
};

export default FileUtil;
