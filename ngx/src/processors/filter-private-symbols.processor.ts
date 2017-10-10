import { Processor, DocCollection, Document } from 'dgeni';

// TODO: make configurable
const HIDDEN = [
  // Lifecycle methods
  'ngOnInit',
  'ngOnChanges',
  'ngDoCheck',
  'ngAfterContentInit',
  'ngAfterContentChecked',
  'ngAfterViewInit',
  'ngAfterViewChecked',
  'ngOnDestroy',
  // ControlValueAccessor
  'writeValue',
  'registerOnChange',
  'registerOnTouched',
  'setDisabledState',
  // constructors
  'constructor'
];


export class FilterPrivateSymbolsProcessor implements Processor {

  name?: string | undefined;
  description?: string | undefined;
  $runBefore?: string[] | undefined;
  $runAfter?: string[] | undefined;
  $enabled?: boolean | undefined;
  $package?: string | undefined;

  $process(docs: any[]): void | any[] | PromiseLike<any[]> {
    throw new Error("Method not implemented.");
  }

}

/** Factory function returning a `CollectSymbolsProcessor` for `dgeni.processor()` */
export function filterPrivateSymbolsProcessor () {
  return new FilterPrivateSymbolsProcessor();
}
