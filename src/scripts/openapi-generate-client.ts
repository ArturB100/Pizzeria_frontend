const execSync = require('child_process').execSync;

const generatePath = '/libs/openapi-client/src';

// console.log('removing generated/openapi directory...');
// execSync(`rm -rf ${generatePath}`);

const output = execSync(
  `npx @openapitools/openapi-generator-cli generate -g typescript-angular -i src/openapi.yaml -o ./target --additional-properties=usePromises=true --additional-properties=ngVersion=16.2.14`,
  { encoding: 'utf-8' }
);

console.log(output);
