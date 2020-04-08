module.exports = {
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
      "comma-dangle": 2,
      "eol-last": 1,
      "func-names": 0,
      "react/react-in-jsx-scope": 0,
      "no-redeclare": 1,
      "jsx-a11y/anchor-is-valid": 0,
      "import/no-unresolved": ["error", { "ignore": ["^@"] }],
      "import/no-extraneous-dependencies": 0,
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index"
          ],
          "newlines-between": "always"
        }
      ],
      "no-use-before-define": ["error", { "functions": false }],
      "jsx-a11y/label-has-for": [
        2,
        {
          "required": {
            "every": ["id"]
          }
        }
      ],
      "jsx-a11y/label-has-associated-control": [
        2,
        {
          "labelComponents": ["label"],
          "labelAttributes": ["htmlFor"],
          "controlComponents": ["input"]
        }
      ],
      "react/jsx-filename-extension": [2, { "extensions": [".jsx", ".tsx"] }],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/no-extraneous-dependencies': [2, { devDependencies: ['**/test.tsx', '**/test.ts'] }],
    '@typescript-eslint/indent': [2, 2],
    "import/extensions": ["error", "ignorePackages", {
      "js": "never",
      "jsx": "never",
      "ts": "never",
      "tsx": "never",
      "mjs": "never"
    }]
  },
};