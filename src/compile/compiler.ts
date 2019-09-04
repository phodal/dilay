import * as ts from "typescript";

// @ts-ignore
export function delint(sourceFile: ts.SourceFile, checker: ts.TypeChecker) {
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

        console.log(escapedText, importPath);
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
//
// const fileNames = process.argv.slice(2);
// fileNames.forEach(fileName => {
//   // Parse a file
//
//   let program = ts.createProgram([fileName], {module: ts.ModuleKind.CommonJS});
//   const sourceFile = ts.createSourceFile(
//     fileName,
//     readFileSync(fileName).toString(),
//     ts.ScriptTarget.ES2015,
//     /*setParentNodes */ true
//   );
//
//   delint(sourceFile, program.getTypeChecker());
// });
