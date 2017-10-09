import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'my-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent {

  @Input()
  public label: string;

  @Output()
  public click: EventEmitter<any> = new EventEmitter();

}
