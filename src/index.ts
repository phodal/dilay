import tree from "./tree";
import * as path from "path";
import ProjectHelper from "./helper/project.helper";
import * as ts from "typescript";
import {readFileSync} from "fs";
import {delint} from "./compile/compiler";

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

  let treeData = tree(fileName, dir);

  if (projectType === 'angular') {
    let file = dir + '/src/main.ts';
    let program = ts.createProgram([file], {module: ts.ModuleKind.CommonJS});
    const sourceFile = ts.createSourceFile(
      file,
      readFileSync(file).toString(),
      ts.ScriptTarget.ES2015,
      /*setParentNodes */ true
    );

    delint(sourceFile, program.getTypeChecker());
  }
  console.log(treeData);
}
