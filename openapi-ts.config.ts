import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'http://localhost:8080/v3/api-docs', // ← URL 即可

  output: 'src/api',

  client: 'axios',

  services: {
    // reactQuery: true,
  },
})
