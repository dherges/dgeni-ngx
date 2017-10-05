import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CollectionResourceApi } from './collection-resource.api';

export class HalIndexApi {

  constructor(
    protected http: HttpClient,
    protected href: string
  ) {}

  public index(): Observable<any> {

    return this.http.get(this.href);
  }

}
