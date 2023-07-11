module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-param-reassign': [2, { props: false }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
