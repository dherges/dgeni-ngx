import { Document } from 'dgeni';
import { DirectiveSymbol } from 'ngast';

export type ComponentDoc = Document & {
  fileInfo: any,
  docType: 'ng',
  symbol: DirectiveSymbol,
  symbolType: 'Component'
};
