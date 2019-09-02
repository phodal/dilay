import tree from "./tree";
import * as path from "path";
import ProjectHelper from "./helper/project.helper";

function getDir() {
  return process.cwd();
}

export default function runDilay(projectType: string) {
  const dir = getDir();

  if (!projectType) {
    projectType = ProjectHelper.parseProject(dir);
  }
  let filename = path.basename(path.join(dir, '.'));

  console.log(projectType);
  console.log(tree(filename, dir));
}
