const fs = require('fs');
const path = require('path');
process.env.DEBUG = true;

// @see https://github.com/TypeStrong/ts-node#programmatic-usage
require('ts-node').register({
  project: path.join(__dirname, 'tsconfig.dgeni.json')
});

// run dgeni docs
require('./docs');
