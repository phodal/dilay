import compileCheck from "./compile-check";
import * as path from "path";
import ProjectHelper from "./helper/project.helper";
import FileUtil from "./helper/file.util";
import * as ts from "typescript";

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
  if (projectType === 'angular') {
    fileName = path.basename(path.join(dir, 'src'));
  }

  let files = FileUtil.walkDir(fileName, dir);
  files = FileUtil.filterBySuffix(files, '.ts');
  let program = ts.createProgram(files, {module: ts.ModuleKind.CommonJS});

  let treeData = compileCheck(fileName, dir, {
    projectType,
    program
  });
}
