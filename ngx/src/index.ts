import { Document, Package, Processor } from 'dgeni';
import ngFileReader from './file-readers/ng-file-reader';
import { collectSymbolsProcessor } from './processors/collect-symbols.processor';
import TAGS from './tag-defs'

const basePackage = require('dgeni-packages/base');
const jsdocPackage = require('dgeni-packages/jsdoc');
const nunjucksPackage = require('dgeni-packages/nunjucks');

export default new Package('ngx', [ basePackage, jsdocPackage, nunjucksPackage ])
  .factory(ngFileReader)
  .processor(collectSymbolsProcessor)
  .config(function(readFilesProcessor: any, ngFileReader: any) {
    if (!readFilesProcessor.fileReaders) {
      readFilesProcessor.fileReaders = [];
    }

    readFilesProcessor.fileReaders.push(ngFileReader);
  })
  // Configure tag definitions
  .config(function(parseTagsProcessor: any, getInjectables: any) {
    parseTagsProcessor.tagDefinitions = getInjectables(TAGS);
  })
