import { Document } from 'dgeni';
import { ModuleSymbol } from 'ngast';

export type NgModuleDoc = Document & {
  fileInfo: any,
  docType: 'ng',
  symbol: ModuleSymbol,
  symbolType: 'NgModule'
};
