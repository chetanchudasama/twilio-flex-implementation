module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "@typescript-eslint", "jest"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
    project: ["./tsconfig.eslint.json", "./**/tsconfig.json"],
  },
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],

    // import and export rules
    // we want to have our project exports to be named (not default) unless necessary
    "import/prefer-default-export": "off",
    "import/no-default-export": "warn",
    // project specific - it resolves common/components, so we will treat this as a warning
    "import/no-extraneous-dependencies": "warn",

    // standard extensions shouldn't be named with file extensions, but unusual ones (eg JS/css) should be.
    "import/extensions": [
      "error",
      {
        ts: "never",
        tsx: "never",
      },
    ],

    // linebreak settings - turn them off as windows git usually handles this
    "linebreak-style": "off",
    // prettier options
    "prettier/prettier": [
      "error",
      {
        // prettier rules that we'd like to enforce
        endOfLine: "auto",
        trailingComma: "es5",
        printWidth: 80,
        tabWidth: 2,
        semi: true,
        singleQuote: false,
        jsxSingleQuote: false,
        jsxBracketSameLine: false,
        arrowParens: "always",
        parser: "typescript",
      },
      {
        // this turns off the .prettierrc config file. you can use it,
        // but it's easier if we just have all our config in here
        usePrettierrc: false,
      },
    ],
    // these mess with prettier - turn them off
    "arrow-body-style": "off",
    "prefer-arrow-callback": "warn",

    // react specific

    // prop type validation - doesn't play nicely with typescript, so let's disable it
    "react/prop-types": "off",
    // prefer destructuring but don't enforce it
    "react/destructuring-assignment": "warn",
    // react/no-array-index-key: we use this fairly often and it's safe to use uuid instead of an index key
    "react/no-array-index-key": "error",
    // react/jsx-props-no-spreading: used in tests, easier to ignore

    "@typescript-eslint/no-useless-constructor": "warn",
  },
  overrides: [
    {
      files: ["**/__tests__/*.spec.ts", "**/__tests__/*.spec.tsx"],
      rules: {
        "react/jsx-props-no-spreading": "off",
        "jest/no-mocks-import": "off",
        "prefer-promise-reject-errors": "off",
      },
    },
    {
      files: ["**/__mocks__/*.ts", "**/__mocks__/*.tsx"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["**/*.Props.ts", "**/*.props.ts"],
      rules: {
        "@typescript-eslint/no-empty-interface": "warn",
      },
    },
    {
      files: ["**/*.Container.ts", "**/*.Container.ts"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
