import {readFileSync} from "fs";
import * as ts from "typescript";

import {ImportAnalysisCompiler} from "../compilers/import-analysis-compiler";

function checkDirectory(filepath: string, errors: string[]) {
  const fileSplitArray = filepath.split('/');
  let fileName = fileSplitArray[fileSplitArray.length - 1];
  let fileDirectory = fileSplitArray[fileSplitArray.length - 2];

  if (filepath.includes('components') ||
    filepath.includes('containers') ||
    filepath.includes('pages')) {
    fileDirectory = fileSplitArray[fileSplitArray.length - 3];
  }

  switch (fileDirectory) {
    case 'container':
      if (!fileName.includes('component')) {
        errors.push(`error filename: ${filepath}`);
      }
      break;
    case 'components':
      if (!fileName.includes('component')) {
        errors.push(`error filename: ${filepath}`);
      }
      break;
    case 'pages':
      if (!fileName.includes('component')) {
        errors.push(`error filename: ${filepath}`);
      }
      break;
    case 'utils':
      if (!(fileName.includes('util') || !fileName.includes('helper'))) {
        errors.push(`error filename: ${filepath}`);
      }
      break;
    case 'helpers':
      if (!(fileName.includes('util') || fileName.includes('helper'))) {
        errors.push(`error filename: ${filepath}`);
      }
      break;
    default:
      break;
  }
}

function checkDependency(filepath: string, errors: string[], program: any) {
  const sourceFile = ts.createSourceFile(
    filepath,
    readFileSync(filepath).toString(),
    ts.ScriptTarget.ES2015,
    /*setParentNodes */ true
  );

  let lintResult = ImportAnalysisCompiler(sourceFile, program.getTypeChecker());
  if (lintResult) {
    errors.push(lintResult);
  }
}

function testAngular(filepath: string, errors: string[], program: any) {
  checkDirectory(filepath, errors);
  checkDependency(filepath, errors, program);
}

const FrameworkHelper = {
  testAngular: testAngular
};

export default FrameworkHelper;
