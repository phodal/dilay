import * as path from "path";
import * as fs from "fs";
import {IPackageJSON} from "../types/package-json";

function parseProject(dir: string) {
  let packageJson = path.join(dir, 'package.json');
  if (!fs.existsSync(packageJson)) {
    return "";
  }

  let json: IPackageJSON = JSON.parse(fs.readFileSync(packageJson).toString());
  if ((json.dependencies && json.dependencies['react']) ||
    (json.devDependencies && json.devDependencies['react'])) {
    return "react";
  }

  if ((json.dependencies && json.dependencies['@angular/core'])) {
    return "angular";
  }

  if ((json.dependencies && json.dependencies['vue'])) {
    return "vue";
  }


  return ""
}

const ProjectHelper = {
  parseProject: parseProject
};

export default ProjectHelper;
