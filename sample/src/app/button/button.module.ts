import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from './button.directive';
import { ButtonComponent } from './button.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    ButtonDirective,
    ButtonComponent
  ],
  exports: [
    ButtonDirective,
    ButtonComponent
  ]
})
export class ButtonModule {}
