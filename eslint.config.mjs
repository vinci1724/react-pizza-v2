import antfu from '@antfu/eslint-config';

export default antfu({
  react: true,
  stylistic: {
    semi: true,
    braceStyle: '1tbs',
    jsx: true,
    quotes: 'single',
  },
  rules: {
    'antfu/top-level-function': 'off',
  },
});
