import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**', '**/.angular/**', '.artifacts/**', '.husky/_/**', 'projects/angular17-demo/**'] },
  {
    files: ['**/*.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@angular-eslint/component-class-suffix': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
  },
  { files: ['**/*.mjs', '**/*.cjs', '**/*.js'], ...js.configs.recommended,
    languageOptions: { globals: { process: 'readonly', console: 'readonly', Buffer: 'readonly', URL: 'readonly', setTimeout: 'readonly', clearTimeout: 'readonly', fetch: 'readonly', require: 'readonly', module: 'readonly', __dirname: 'readonly' } },
  },
  { files: ['projects/extra-pipe/**/*.ts'], rules: {
    // Constructor parameters remain a supported programmatic pipe API.
    '@angular-eslint/prefer-inject': 'off',
  } },
  prettier,
);
