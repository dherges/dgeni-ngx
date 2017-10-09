import { ResourceResolver } from 'ngast';
import { readFile, readFileSync } from 'fs';

export class NgAstResourceResolver implements ResourceResolver {

  get(name: string): Promise<string> {

    return new Promise((resolve: any, reject: any) => {
      readFile(name, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.toString());
        }
      });
    });
  }

  getSync(name: string): string {
    return readFileSync(name, { encoding: 'utf-8' });
  }

}
