import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[myButton]'
})
export class ButtonDirective {

  @HostBinding('class.btn')
  public hostCssClassButton = true;

  @HostBinding('class')
  _variant: string;

  @Input()
  public set variant(which: string) {
    this._variant = `btn-${which}`;
  }

}
