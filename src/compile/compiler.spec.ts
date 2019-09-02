import test from 'ava';
import * as ts from "typescript";
import {delint} from './compiler';


test('delint', async t => {
  const sourceFile = ts.createSourceFile(
    'delint.helper.ts',
    `import * as fs from "fs"`,
    ts.ScriptTarget.ES2015
  );

  t.deepEqual(delint(sourceFile), "");
});
