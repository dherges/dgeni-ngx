import { Document, Package, Processor } from 'dgeni';
import ngFileReader from './file-readers/ng-file-reader';

const basePackage = require('dgeni-packages/base');
const nunjucksPackage = require('dgeni-packages/nunjucks');

export default new Package('ngx', [ basePackage, nunjucksPackage ])
  .factory(ngFileReader)
  .config(function(readFilesProcessor: any, ngFileReader: any) {
    if (!readFilesProcessor.fileReaders) {
      readFilesProcessor.fileReaders = [];
    }

    readFilesProcessor.fileReaders.push(ngFileReader);
  })
