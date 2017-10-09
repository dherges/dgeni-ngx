import { Processor, DocCollection, Document } from 'dgeni';
import { ProjectSymbols, ErrorReporter, ModuleSymbol, Symbol, DirectiveSymbol } from 'ngast';
import Ast from 'ts-simple-ast';
import { SourceFile } from 'ts-simple-ast';
import { NgAstResourceResolver } from '../utils/ng-ast-resource-resolver';
import { NgModuleDoc } from '../doc-types/ng-module.doc';
import { ComponentDoc } from '../doc-types/component.doc';
import { DirectiveDoc } from '../doc-types/directive.doc';


// Document utils

const hasType = (doc: Document, type: string): boolean =>
  doc.docType === type;

const hasExtension = (doc: Document, ext: string): boolean =>
  doc.fileInfo.extension === ext;

const byTypeAndExtension = (type: string, ext: string): (doc: Document) => boolean =>
  (doc) => hasType(doc, type) && hasExtension(doc, ext);


// Symbol utils

const isSymbolInDocCollection = (symbol: Symbol, docs: DocCollection) =>
  docs.find((doc) => doc.fileInfo.filePath === symbol.symbol.filePath);

const byDocCollection = (docs: DocCollection): (symbol: Symbol) => boolean =>
  (symbol) => isSymbolInDocCollection(symbol, docs);

const isComponent = (symbol: DirectiveSymbol): boolean =>
  symbol.isComponent()

const byComponent = (): (symbol: DirectiveSymbol) => boolean =>
  isComponent;

const byDirective = (): (symbol: DirectiveSymbol) => boolean =>
  (symbol) => isComponent(symbol) !== true;

// ngast symbol mapper to docs

const ngModuleToDoc = (docs: DocCollection): (symbol: ModuleSymbol) => NgModuleDoc =>
  (modSymbol) => {
    return {
      docType: 'ng',
      fileInfo: docs.find((d) => d.fileInfo.filePath === modSymbol.symbol.filePath),
      symbol: modSymbol,
      symbolType: 'NgModule'
    };
  }

const ngComponentToDoc = (docs: DocCollection): (symbol: DirectiveSymbol) => ComponentDoc =>
  (component) => {
    return {
      docType: 'ng',
      fileInfo: docs.find((d) => d.fileInfo.filePath === component.symbol.filePath),
      symbol: component,
      symbolType: 'Component'
    }
  };

const ngDirectiveToDoc = (docs: DocCollection): (symbol: DirectiveSymbol) => DirectiveDoc =>
  (directive) => {
    return {
      docType: 'ng',
      fileInfo: docs.find((d) => d.fileInfo.filePath === directive.symbol.filePath),
      symbol: directive,
      symbolType: 'Directive'
    }
  };


export class CollectSymbolsProcessor implements Processor {
  $runAfter = ['files-read'];
  $runBefore = ['parsing-tags'];

  $validate = {
    /*
    basePath: {presence: true},
    hidePrivateMembers: {inclusion: [true, false]},
    ignoreExportsMatching: {},
    sortClassMembers: {inclusion: [true, false]},
    sourceFiles: {presence: true},
    */
  };

  $process(docs: DocCollection): DocCollection | PromiseLike<DocCollection> | void {

    const tsDocs = docs.filter(byTypeAndExtension('ng', 'ts'))


    // tsAst
    const tsAst = new Ast();

    tsDocs.forEach((doc) => {
      tsAst.addSourceFileFromText(doc.fileInfo.filePath, doc.content);
    });

    tsAst.getSourceFiles().forEach((file: SourceFile) => {

    });


    // ngAst
    const ngAst = new ProjectSymbols(
      tsAst.getProgram().compilerObject,
      new NgAstResourceResolver(),
      (error: any, path: string) => {
        debugger;
        console.error(error)
      }
    );

    // TODO: filter symbols
    const ngModules = ngAst.getModules()
      .filter(byDocCollection(tsDocs))
      .map(ngModuleToDoc(tsDocs))

    const ngComponents = ngAst.getDirectives()
      .filter(byDocCollection(tsDocs))
      .filter(byComponent())
      .map(ngComponentToDoc(tsDocs))

    const ngDirectives = ngAst.getDirectives()
      .filter(byDocCollection(tsDocs))
      .filter(byDirective())
      .map(ngDirectiveToDoc(tsDocs))

    // TODO / XXX: the `.forRoot()` pattern is not reflected in ngast's ModuleSymbol
    const ngInjectables = ngAst.getProviders()

    return docs;

  }

}


/** Factory function returning a `CollectSymbolsProcessor` for `dgeni.processor()` */
export function collectSymbolsProcessor () {
  return new CollectSymbolsProcessor();
}
