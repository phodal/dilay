import * as ts from "typescript";

// @ts-ignore
export function analysisAngularImport(sourceFile: ts.SourceFile, checker: ts.TypeChecker) {
  let nodeNames: string[] = [];
  delintNode(sourceFile);

  function delintNode(node: ts.Node) {
    switch (node.kind) {
      /*
       import * as foo from './foo'; // ts.ImportDeclaration
       as foo --> ts.ImportDeclaration.importClause
        './foo' --> ts.ImportDeclaration.moduleSpecifier
       */
      case ts.SyntaxKind.ImportDeclaration:
      case ts.SyntaxKind.ImportEqualsDeclaration:
        let escapedText: string = '';
        let importClause = (<ts.ImportDeclaration>node).importClause;
        if (importClause && importClause.name) {
          escapedText = importClause.name.escapedText.toString();
        }
        let moduleSpecifier = (<ts.ImportDeclaration>node).moduleSpecifier;
        const importPathWithQuotes = moduleSpecifier.getText(sourceFile);
        const importPath = importPathWithQuotes.substr(1, importPathWithQuotes.length - 2);

        if (importPath.startsWith("./") || importPath.startsWith("../")) {
          console.log(escapedText, importPath);
        }
        break;
      case ts.SyntaxKind.InterfaceDeclaration:
        // console.log((node as any)['name']['escapedText']);
        break;
      case ts.SyntaxKind.FunctionDeclaration:
        // console.log((node as any)['name']['escapedText']);
        break;
      case ts.SyntaxKind.ClassDeclaration:
        let nodeName = (node as any)['name'];
        if (nodeName && nodeName['escapedText']) {
          nodeNames.push(nodeName['escapedText']);
        }
        break;

    }

    ts.forEachChild(node, delintNode);
  }

  if (nodeNames.length >= 1) {
    return nodeNames
  }

  return [""]
}
