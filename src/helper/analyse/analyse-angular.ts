import {readFileSync} from "fs";
import * as ts from "typescript";

import {analysisAngularImport} from "../../compilers/analysis-angular-import";

function isMatchAngularComponentRules(fileName: string) {
  return (fileName.includes('component') || fileName.includes('module'));
}

function isMatchHelperFileRules(fileName: string) {
  return (fileName.includes('util') || fileName.includes('helper'));
}

interface AnalyseNode {
  node: string[];
  componentName: string;
  isComponent: boolean
}

function checkDirectory(filepath: string, errors: string[], node: AnalyseNode) {
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
      if (!isMatchAngularComponentRules(fileName)) {
        errors.push(`error filename: ${filepath}`);
      }
      break;
    case 'components':
      if (!isMatchAngularComponentRules(fileName)) {
        errors.push(`error filename: ${filepath}`);
      }
      break;
    case 'pages':
      if (!isMatchAngularComponentRules(fileName)) {
        errors.push(`error filename: ${filepath}`);
      }
      break;
    case 'utils':
      if (!isMatchHelperFileRules(fileName)) {
        errors.push(`error filename: ${filepath}`);
      }
      break;
    case 'helpers':
      if (!isMatchHelperFileRules(fileName)) {
        errors.push(`error filename: ${filepath}`);
      }
      break;
    default:
      if (node.isComponent) {
        if (!isMatchAngularComponentRules(fileName)) {
          errors.push(`error filename: ${filepath}`);
        }
      }
      break;
  }
}

function checkDependency(filepath: string, errors: string[], program: any) {
  let isComponent = false;
  let componentName = '';

  const sourceFile = ts.createSourceFile(
    filepath,
    readFileSync(filepath).toString(),
    ts.ScriptTarget.ES2015,
    /*setParentNodes */ true
  );

  let nodeInfo = analysisAngularImport(sourceFile, program.getTypeChecker());
  for (const node of nodeInfo) {
    if (node.includes('Component')) {
      componentName = node;
      isComponent = true;
    }
  }

  if (isComponent && nodeInfo.length > 1) {
    let error = `${componentName} has multiple class ${nodeInfo}`;
    errors.push(error);
  }

  return {
    node: nodeInfo,
    componentName: componentName,
    isComponent: isComponent
  };
}

export function analyseAngular(filepath: string, errors: string[], program: any) {
  const node = checkDependency(filepath, errors, program);
  checkDirectory(filepath, errors, node);
}
