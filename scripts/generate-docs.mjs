import { generateFiles } from 'fumadocs-openapi';

void generateFiles({
  // the OpenAPI schema, you can also give it an external URL.
  input: ['./content/docs/api/spec.yaml'],
  output: './content/docs/api/node',
  // we recommend to enable it
  // make sure your endpoint description doesn't break MDX syntax.
  includeDescription: true,
}); 