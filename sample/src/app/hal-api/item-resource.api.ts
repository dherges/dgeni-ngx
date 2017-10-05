import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class ItemResourceApi<T> {

  constructor(
    private http: HttpClient,
    private href: string
  ) {}

  public get(): Observable<T> {

    return this.http.get<T>(this.href);
  }

  public head(): Observable<boolean> {

    return this.http.head(this.href, { observe: 'response' })
      .map((res) => res.ok);
  }

  public put<T>(entity: T): Observable<T> {

    return this.http.put<T>(this.href, entity);
  }

}
