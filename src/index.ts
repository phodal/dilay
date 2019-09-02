import tree from "./tree";
import * as path from "path";

function getDir() {
  return process.cwd();
}

export default function runDilay() {
  const dir = getDir();
  let filename = path.basename(path.join(process.cwd(), '.'));

  console.log(tree(filename, dir));
}
