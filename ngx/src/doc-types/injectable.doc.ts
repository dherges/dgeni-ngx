import { Document } from 'dgeni';
import { ProviderSymbol } from 'ngast';

export type InjectableDoc = Document & {
  fileInfo: any,
  docType: 'ng',
  symbol: ProviderSymbol,
  symbolType: 'Injectable'
};
