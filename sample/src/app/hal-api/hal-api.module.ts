import { ModuleWithProviders, NgModule } from '@angular/core';
import { HalApiService } from './hal-api.service';

const providers = [
  HalApiService
];

@NgModule({})
export class HalApiModule {

  public static forRoot(): ModuleWithProviders {

    return { ngModule: HalApiModule, providers };
  }

}
