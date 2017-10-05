import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/map';

export type SortDirection = 'asc' | 'desc';

export interface Sort {
  propertyName: string;
  direction?: SortDirection;
}

export interface CollectionResource<T> {

  _links: {
    self: { href: string },
    [key: string]: any;
  };

  _embedded: {
    items: T[];
  };

  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };

}

export class CollectionResourceApi<T> {

  constructor(
    private http: HttpClient,
    private href: string
  ) {}

  public findAll(page?: number, size?: number, sort?: Sort[]): Observable<CollectionResource<T>> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', `${page}`);
    }
    if (size) {
      params = params.set('size', `${size}`);
    }
    if (sort && sort.length > 0) {
      params = sort.reduce(
        (prev, curr) => prev.append(
          'sort',
          curr.propertyName + (curr.direction ? `,${curr.direction}` : '')
        ),
        params);
    }

    return this.http.get<CollectionResource<T>>(this.href, { });
  }

  public createOne(entity: T): Observable<T> {

    return this.http.post<T>(this.href, entity);
  }

  public head(): Observable<boolean> {

    return this.http.head(this.href, { observe: 'response'})
      .map((res) => res.ok);
  }

}
