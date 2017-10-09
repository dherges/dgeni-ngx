import { Document } from 'dgeni';
import { DirectiveSymbol } from 'ngast';

export type DirectiveDoc = Document & {
  fileInfo: any,
  docType: 'ng',
  symbol: DirectiveSymbol,
  symbolType: 'Directive'
};
