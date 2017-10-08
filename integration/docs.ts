import { Dgeni, Package } from 'dgeni';
import * as dgeni from 'dgeni';
import ngxPackage from '../ngx/src/index';

const packages = [
  ngxPackage
];

new Dgeni(packages)
  .generate()
  .then((docs) => {
  console.log(docs.length, 'docs generated');
  });
