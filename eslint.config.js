// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ["*.config.js"]
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
);