import { readFileSync } from "fs";
import * as ts from "typescript";

export function delint(sourceFile: ts.SourceFile) {
  delintNode(sourceFile);

  function delintNode(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.ImportDeclaration:
        console.log(node);
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
  const sourceFile = ts.createSourceFile(
    fileName,
    readFileSync(fileName).toString(),
    ts.ScriptTarget.ES2015,
    /*setParentNodes */ true
  );

  delint(sourceFile);
});
