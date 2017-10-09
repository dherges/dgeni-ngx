import { Package } from 'dgeni';
import * as path from 'path';
import ngxPackage from '../ngx/src/index';

const packages = [
  ngxPackage
];

const SAMPLE_PATH = path.resolve(__dirname, '..', 'sample');

export default new Package('my-package', packages)
  .config((log) => {
    log.level = 'debug';
  })
  // Where do we get the source files?
  .config((readFilesProcessor) => {

    // Specify the base path used when resolving relative paths to source and output files
    readFilesProcessor.basePath = SAMPLE_PATH;
    readFilesProcessor.$enabled = true;

    if (!readFilesProcessor.sourceFiles) {
      readFilesProcessor.sourceFiles = [];
    }

    // Specify collections of source files that should contain the documentation to extract
    readFilesProcessor.sourceFiles.push(
      {
        include: 'src/**/*.ts',
        exclude: 'src/{main,test,polyfills,typings.d,environments/*}.ts',
        basePath: SAMPLE_PATH,
        fileReader: 'ngFileReader'
      },
      {
        include: 'package.json',
        basePath: SAMPLE_PATH,
        fileReader: 'ngFileReader'
      }
    );

  })
  // Where do we write the doc files?
  .config((writeFilesProcessor) => {

    writeFilesProcessor.outputFolder = path.resolve(__dirname, 'docs');

  })
  // Configure ids
  .config((computeIdsProcessor) => {

    computeIdsProcessor.idTemplates.push({
      docTypes: ['ng'],
      getId: function(doc) {
          return doc.fileInfo.relativePath;
      },
      getAliases: function(doc) {
        return [doc.id];
      }
    });

  })
  // Configure the output path for written files (i.e., file names).
  .config((computePathsProcessor) => {

      computePathsProcessor.pathTemplates.push({
        docTypes: ['ng'],
        pathTemplate: '${id}',
        outputPathTemplate: '${id}.html',
      });

  })
