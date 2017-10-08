import { Document } from 'dgeni';

export default function ngFileReader() {

  return {
    name: 'ngFileReader',
    getDocs: function (fileInfo: any): Document[] {
      return [
        {
          docType: 'ng',
          content: fileInfo.content,
          startingLine: 1
        }
      ];
    }
  };
}
