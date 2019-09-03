import {readFileSync} from "fs";
import * as ts from "typescript";

function getExternalModuleName(node: ts.Node): ts.Expression | any {
  if (node.kind === ts.SyntaxKind.ImportDeclaration) {
    return (<ts.ImportDeclaration>node).moduleSpecifier;
  }
  if (node.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
    let reference = (<ts.ImportEqualsDeclaration>node).moduleReference;
    if (reference.kind === ts.SyntaxKind.ExternalModuleReference) {
      return (<ts.ExternalModuleReference>reference).expression;
    }
  }
}

export function delint(sourceFile: ts.SourceFile, checker: ts.TypeChecker) {
  delintNode(sourceFile);

  function delintNode(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.ImportDeclaration:
      case ts.SyntaxKind.ImportEqualsDeclaration:
        let moduleNameExpr = getExternalModuleName(node);
        if (moduleNameExpr && moduleNameExpr.kind === ts.SyntaxKind.StringLiteral) {
          let moduleSymbol = checker.getSymbolAtLocation(moduleNameExpr);
          if (moduleSymbol) {
            let declarations = moduleSymbol.getDeclarations();
            if (declarations) {
              console.log(declarations[0])
            }
          }
        }
        break;
      case ts.SyntaxKind.InterfaceDeclaration:
        console.log((node as any)['name']['escapedText']);
        break;
      case ts.SyntaxKind.FunctionDeclaration:
        console.log((node as any)['name']['escapedText']);
        break;
      case ts.SyntaxKind.ClassDeclaration:
        console.log((node as any)['name']['escapedText']);
        break;

    }

    ts.forEachChild(node, delintNode);
  }

  return ""
}

const fileNames = process.argv.slice(2);
fileNames.forEach(fileName => {
  // Parse a file

  let program = ts.createProgram([fileName], { module: ts.ModuleKind.CommonJS });
  const sourceFile = ts.createSourceFile(
    fileName,
    readFileSync(fileName).toString(),
    ts.ScriptTarget.ES2015,
    /*setParentNodes */ true
  );

  delint(sourceFile, program.getTypeChecker());
});
