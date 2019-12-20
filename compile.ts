import * as ts from 'typescript';
import { ioTsTransformer } from '@derivate/io-ts-deriver/lib/io-ts-transformer';


console.log("got:", ts.version)

const program = ts.createProgram(['./index.ts'], {
  outDir: 'lib/',
  target: ts.ScriptTarget.ESNext,// ts.ScriptTarget.ES2016,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.NodeJs
  // include: ["./test.ts"]
});

const emitResult = program.emit(
  undefined,
  undefined,
  undefined,
  undefined,
  {
    before: [
      ioTsTransformer(program)
    ]
  }
)

console.log('emmitted: ', !emitResult.emitSkipped, emitResult.emittedFiles)



// Couldn't derive instance for type: User,
// No Type<Date> found for path:
// User
//  └─image
//    └─src

