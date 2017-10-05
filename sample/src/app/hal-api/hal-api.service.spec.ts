import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HalApiService } from './hal-api.service';

describe(`HalApi`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HalApiService
      ]
    });
  });

  it(`should have an index() entrypoint`, async(inject([ HalApiService ], (api: HalApiService)  => {

    api.index().subscribe(
      (res) => console.log(res),
      (err) => console.error(err));
  })));

  it(`should hop to a collection() resource`, async(inject([ HalApiService ], (api: HalApiService) => {

    api.collection('books')
      .switchMap((books) => books.findAll())
      .subscribe();
  })));

  it(`should hop to collection('animals') resource`, async(inject([ HalApiService ], (api: HalApiService) => {

      api.collection('animals')
        .switchMap((animals) => animals.findAll())
        .subscribe(
          (res) => {
            // res typeof CollectionResource<Animal> automatically inferred (!)
            const animalNames = res._embedded.items.map((animal) => animal.name);
            console.log(`The animals are ${animalNames.join(', ')}`);
          }
        );
  })));

});
