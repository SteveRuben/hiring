/* module.exports = require("config/eslint-preset");
 */
module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
    }
  };