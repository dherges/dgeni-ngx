import { Document } from 'dgeni';
import { PipeSymbol } from 'ngast';

export type PipeDoc = Document & {
  fileInfo: any,
  docType: 'ng',
  symbol: PipeSymbol,
  symbolType: 'Pipe'
};
