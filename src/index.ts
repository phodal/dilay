import * as path from "path";
import * as ts from "typescript";

import ProjectHelper from "./helper/project.helper";
import FileUtil from "./helper/file.util";
import compileCheck from "./compile-check";

function getDir() {
  return process.cwd();
}

export default function runDilay(projectType: string, relativePath: any) {
  let dir = getDir();
  if (relativePath) {
    dir = path.join(dir, relativePath);
  }

  if (!projectType) {
    projectType = ProjectHelper.parseProject(dir);
  }

  let fileName = path.basename(path.join(dir, '.'));
  let files, program;

  if (projectType === 'react') {
    fileName = path.basename(path.join(dir, 'src'));

    files = FileUtil.walkDir(fileName, dir);
    files = FileUtil.filterBySuffix(files, ['.tsx', '.ts']);
    program = ts.createProgram(files, {module: ts.ModuleKind.CommonJS});
  }

  if (projectType === 'angular') {
    fileName = path.basename(path.join(dir, 'src'));
    files = FileUtil.walkDir(fileName, dir);
    files = FileUtil.filterBySuffix(files, ['.ts']);
    program = ts.createProgram(files, {module: ts.ModuleKind.CommonJS});
  }

  compileCheck(fileName, dir, {
    projectType,
    program
  });
}
