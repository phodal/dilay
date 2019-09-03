import tree from "./tree";
import * as path from "path";
import ProjectHelper from "./helper/project.helper";
import * as ts from "typescript";
import {readFileSync} from "fs";
import {delint} from "./compile/compiler";

function getDir() {
  return process.cwd();
}

export default function runDilay(projectType: string) {
  const dir = getDir();

  if (!projectType) {
    projectType = ProjectHelper.parseProject(dir);
  }
  let fileName = path.basename(path.join(dir, '.'));
  let treeData = tree(fileName, dir);

  if (projectType === 'angular') {
    let program = ts.createProgram([fileName + '/src/main.ts'], {module: ts.ModuleKind.CommonJS});
    const sourceFile = ts.createSourceFile(
      fileName,
      readFileSync(fileName).toString(),
      ts.ScriptTarget.ES2015,
      /*setParentNodes */ true
    );

    delint(sourceFile, program.getTypeChecker());
  }
  console.log(treeData);
}
