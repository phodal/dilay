import compileCheck from "./compile-check";
import * as path from "path";
import ProjectHelper from "./helper/project.helper";
import FileUtil from "./helper/file.util";

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
  console.log(files);
  let treeData = compileCheck(fileName, dir, projectType);
  console.log(treeData);
}
