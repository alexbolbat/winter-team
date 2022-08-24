module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: ['prettier'],
  rules: {
    'arrow-spacing': ['error', { before: true, after: true }],
    'brace-style': 'warn', // Require Brace Style
    'comma-spacing': ['error', { before: false, after: true }],
    complexity: 'warn', // Limit Cyclomatic Complexity
    curly: 'warn', // Enforce Usage of Spacing in Template Strings
    'default-case': 'warn', // Require Default Case in Switch Statements
    'lines-between-class-members': [
      // require or disallow an empty line between class members
      'error',
      'always',
      { exceptAfterSingleLine: true }
    ],
    'max-classes-per-file': ['warn', 1], // enforce a maximum number of classes per file
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'no-bitwise': 'warn', // disallow bitwise operators
    'no-cond-assign': 'warn', // disallow assignment operators in conditional statements
    'no-empty': 'warn', // disallow empty block statements
    'newline-before-return': 'off', // require an empty line before
    'no-new-wrappers': 'warn', // Disallow Primitive Wrapper Instances
    'no-var': 'warn',
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    'object-shorthand': 'warn', // Require Object Literal Shorthand Syntax
    'one-var': ['error', 'never'], // enforce variables to be declared either together or separately in functions
    'prefer-const': 'warn', // Suggest using const
    'quote-props': ['warn', 'as-needed'], // require quotes around object literal property names
    radix: 'warn', // Require Radix Parameter
    semi: [2, 'always'],
    'space-before-blocks': 1,
    'space-before-function-paren': 'off', // Require or disallow a space before function parenthesis
    'space-infix-ops': 'error',
    'spaced-comment': [
      // Requires or disallows a whitespace (space or tab) beginning a comment
      'warn',
      'always',
      {
        markers: ['/']
      }
    ],
    'use-isnan': 'warn', // require calls to isNaN() when checking for NaN
    'max-len': ['error', { code: 140 }], // enforce a maximum line length
    indent: ['error', 2], // enforce consistent indentation
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'only-multiline'], // require or disallow trailing commas
    'object-curly-spacing': ['error', 'always'], // enforce consistent spacing inside braces
    'arrow-parens': ['error', 'as-needed'], // Require parens in arrow function arguments
    'newline-per-chained-call': ['error'], // require a newline after each call in a method chain

    'vue/attributes-order': [
      'warn',
      {
        order: [
          'CONDITIONALS',
          'LIST_RENDERING',
          'DEFINITION',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'CONTENT',
          'EVENTS'
        ],
        alphabetical: false
      }
    ],
    'vue/html-self-closing': [
      'warn',
      {
        // Enforce self-closing style
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/html-closing-bracket-newline': [
      'warn',
      {
        // Require or disallow a line break before tag's closing brackets
        singleline: 'never',
        multiline: 'always'
      }
    ],
    'vue/html-indent': [
      'error',
      2,
      {
        // Enforce consistent indentation in <template>
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'vue/no-template-shadow': 'warn', // Disallow variable declarations from shadowing variables
    // declared in the outer scope
    'vue/prop-name-casing': 'warn', // Enforce specific casing for the Prop name in Vue components
    'vue/no-use-v-if-with-v-for': [
      // Disallow use v-if on the same element as v-for
      'error',
      {
        allowUsingIterationVar: false
      }
    ],
    'vue/this-in-template': 'error', // Disallow usage of this in template
    'vue/padding-line-between-blocks': ['error', 'always'], // Require or disallow padding lines between blocks
    'vue/component-name-in-template-casing': [
      // Enforce specific casing for the component naming style in template
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: true,
        ignores: []
      }
    ],
    'vue/v-slot-style': [
      // vue/v-slot-style
      'error',
      {
        atComponent: 'longform',
        default: 'longform',
        named: 'longform'
      }
    ],
    'vue/component-definition-name-casing': ['error', 'PascalCase'], // Enforce specific casing for component definition name
    'vue/no-spaces-around-equal-signs-in-attribute': ['error'], // Disallow spaces around equal signs in attribute
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1
      },      
      multiline: {
        max: 1
      }
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      startTag: 'never',
      endTag: 'never',
      selfClosingTag: 'always'
    }],
    'vue/multiline-html-element-content-newline': ['error', {
      ignoreWhenEmpty: true,
      ignores: ['pre', 'textarea'],
      allowEmptyLines: false
    }],
    'vue/singleline-html-element-content-newline': ['error', {
      ignoreWhenNoAttributes: true,
      ignoreWhenEmpty: true,
      ignores: ['pre', 'textarea']
    }]
  }
};
