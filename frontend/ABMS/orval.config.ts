import { defineConfig } from 'orval';
import { environment } from './src/app/environments/environment';

export default defineConfig({
  BedFind: {
    input: {
      target: `${environment.apiConfig.uri}/swagger/v1/swagger.json`,
    },
    output: {
      headers: false,
      mode: 'tags-split',
      target: './endpoints/BedFind.ts',
      schemas: './model',
      client: 'angular',
      workspace: 'src/api',
      tsconfig: './tsconfig.app.json',
      override: {
        header: () => ['Generated by orval 7.3.0'],
        title: (title) => `${title}Api`,
      },
    },
  },
});
