import { Document, Package, Processor } from 'dgeni';
import ngFileReader from './file-readers/ng-file-reader';
import { collectSymbolsProcessor } from './processors/collect-symbols.processor';

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
