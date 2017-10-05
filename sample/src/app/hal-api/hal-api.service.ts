import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { LinksRelation, DjungleBook, Animal } from './djungle-book';
import { THE_DJUNGLE_BOOK } from './fake-data';
import { CollectionResourceApi, CollectionResource } from './collection-resource.api';
import { ItemResourceApi } from './item-resource.api';
import { HalIndexApi } from './hal-index.api';

@Injectable()
export class HalApiService extends HalIndexApi {

  constructor(
    http: HttpClient
  ) {
    super(http, '/api');
  }

  public index(): Observable<{ _links: LinksRelation }> {
    return Observable.of({
      _links: {
        self: { href: '#' },
        metadata: { href: '/the-djungle-book' },
        animals: { href: '/the-djungle-book/animals' }
      }
    });
  }

  public fetch(what: 'metadata'): Observable<DjungleBook>;
  public fetch<T>(what: string): Observable<T>;
  fetch<T>(what: string): Observable<T> {

    return this.index()
      .map(() => THE_DJUNGLE_BOOK as any);
  }

  public collection(what: 'animals'): Observable<CollectionResourceApi<Animal>>;
  public collection<T>(what: string): Observable<CollectionResourceApi<T>>;
  collection<T>(what: string): Observable<CollectionResourceApi<T>> {

    return this.index()
      .map((idx) => new CollectionResourceApi<T>(this.http, idx._links[what].href));
  }


  public item<T>(what: string): Observable<ItemResourceApi<T>> {

    return this.index()
      .map((idx) => new ItemResourceApi<T>(this.http, idx._links[what].href));
  }

}
