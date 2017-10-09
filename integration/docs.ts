import { Dgeni, Package } from 'dgeni';
import * as dgeni from 'dgeni';
import myPackage from './my-package';

new Dgeni([myPackage])
  .generate()
  .then((docs) => {
    console.log(docs.length, 'docs generated');
  });
