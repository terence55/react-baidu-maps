var restrictedGlobals = require('confusing-browser-globals');

module.exports = {
  extends: ['eslint-config-airbnb'],
  parser: 'babel-eslint',
  plugins: ['import', 'jsx-a11y', 'react'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    }
  },
  rules: {
    // common
    'no-undef': 'error', // Disallow Undeclared Variables
    'comma-dangle': ['error', 'never'], // require or disallow trailing commas
    'no-else-return': 'error', // Disallow return before else
    'no-trailing-spaces': 'error', // disallow trailing whitespace at the end of lines
    'keyword-spacing': 'error', // enforce consistent spacing before and after keywords 
    'indent': ['error', 2], // enforce consistent indentation
    'max-len': ['error', 200], // enforce a maximum line length
    'no-script-url': 'off', // Disallow Script URLs
    'radix': ['error', 'as-needed'], // Require Radix Parameter
    'space-before-function-paren': ['warn', 'never'], // Require or disallow a space before function parenthesis 
    'no-underscore-dangle': ['error', {'allowAfterThis': true}], // disallow dangling underscores in identifiers
    'object-curly-spacing': ['error', 'never'], // enforce consistent spacing inside braces
    'no-useless-constructor': 'error', // Disallow unnecessary constructor
    'object-shorthand': ['error', 'always', {'avoidQuotes': true}], // Require Object Literal Shorthand Syntax
    'arrow-body-style': ['error', 'as-needed'], // Require braces in arrow function body
    'no-param-reassign': ['error', { 'props': false }], // Disallow Reassignment of Function Parameters
    'no-console': 'off', // disallow the use of console
    'jsx-quotes': ['error', 'prefer-single'], // enforce the consistent use of either double or single quotes in JSX attributes
    'func-names': 'off', // Require or disallow named function expressions
    'prefer-destructuring': 'off', // Prefer destructuring from arrays and objects
    'consistent-return': 'off', // require return statements to either always or never specify values
    'function-paren-newline': 'off', // enforce consistent line breaks inside function parentheses 
    'object-curly-newline': 'off', // enforce consistent line breaks inside braces
    'no-restricted-globals': ['error'].concat(restrictedGlobals), // Disallow specific global variables
    'no-plusplus': 'off', // disallow the unary operators ++ and --
    'no-use-before-define': 'off', // Disallow Early Use
    'semi': ['error', 'always'], // require or disallow semicolons instead of ASI
    'class-methods-use-this': 'off', // Enforce that class methods utilize this
    'global-require': 'off', // Enforce require() on the top-level module scope
    'strict': 'off', // require or disallow strict mode directives

    // import
    'import/no-unresolved': 'off', // Ensure imports point to a file/module that can be resolved
    'import/extensions': 'off', // Ensure consistent use of file extension within the import path
    'import/no-dynamic-require': 'off', // Forbid require() calls with expressions
    'import/prefer-default-export': 'off', // Prefer a default export if module exports a single name
    'react/destructuring-assignment': 'off', // Enforce consistent usage of destructuring assignment of props, state, and context
    'react/button-has-type': 'off', // Forbid "button" element without an explicit "type" attribute

    // react
    'react/jsx-indent': ['error', 2], // Validate JSX indentation
    'react/jsx-first-prop-new-line': ['error', 'multiline'], // Enforce position of the first prop in JSX
    'react/jsx-indent-props': ['error', 2], //  Validate props indentation in JSX
    'react/jsx-no-bind': 'off', // Prevent usage of .bind() and arrow functions in JSX props
    'react/prop-types': 'off', // Prevent missing props validation in a React component definition
    'react/no-multi-comp': 'off', // Prevent multiple component definition per file
    'react/jsx-boolean-value': ['error', 'never'], // Enforce boolean attributes notation in JSX
    'react/sort-comp': 'off', // Enforce component methods order
    'react/jsx-filename-extension': ['warn', { 'extensions': ['.js', '.jsx'] }], // Restrict file extensions that may contain JSX
    'react/no-danger': 'off', // Prevent usage of dangerous JSX properties
    'react/prefer-stateless-function': 'off', // Enforce stateless React Components to be written as a pure function
    'react/no-array-index-key': 'off', // Prevent using Array index in key props,
    "react/require-default-props": "off", // Enforce a defaultProps definition for every prop that is not a required prop
    "react/forbid-prop-types": "off", // Forbid certain propTypes
    "react/jsx-props-no-spreading": "off", // Disallow JSX props spreading
    "react/static-property-placement": "off",
    
    // jsx-a11y
    'jsx-a11y/no-static-element-interactions': 'off', // Enforce that non-interactive, visible elements (such as <div>) that have click handlers use the role attribute
    'jsx-a11y/click-events-have-key-events': 'off', // Enforce a clickable non-interactive element has at least one keyboard event listener
    'jsx-a11y/anchor-is-valid': 'off', // Enforce all anchors are valid, navigable elements
    'jsx-a11y/media-has-caption': 'off', // Enforces that <audio> and <video> elements must have a <track> for captions.
  },
};