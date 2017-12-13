'use strict'
const TextLintTester = require('textlint-tester')
const tester = new TextLintTester()
// rule
const rule = require('../src/index')
// ruleName, rule, { valid, invalid }
tester.run('rule', rule, {
  valid: [
    // no problem
    'text',
    // not hex number
    '1234 abcd ABCD',
    '0xghq 0xGHQ',
    'http://example.com/0xa',
    'http://example.com/0xA',
    // valid expression
    '0x0 is correct',
    '0x0A and 0x9B00 are also correct',
    {
      text: 'capitalize options works like this : 0x0a',
      options: {
        capitalize: false
      }
    }
  ],
  invalid: [
    // single match
    {
      text: '0xa',
      output: '0xA',
      errors: [
        {
          message: '0xa => 0xA',
          line: 1,
          column: 1
        }
      ]
    },
    {
      text: '0x9A',
      output: '0x9a',
      options: {
        capitalize: false
      },
      errors: [
        {
          message: '0x9A => 0x9a',
          line: 1,
          column: 1
        }
      ]
    },
    {
      text: '(0xa) is not 0xb0.',
      output: '(0xA) is not 0xB0.',
      errors: [
        {
          message: '0xa => 0xA',
          line: 1,
          column: 2
        },
        {
          message: '0xb0 => 0xB0',
          line: 1,
          column: 14
        }
      ]
    },
    // multiple match
    {
      text: `Red is 0xff0000.
      
Blue is 0x0000ff.`,
      output: `Red is 0xFF0000.
      
Blue is 0x0000FF.`,
      errors: [
        {
          message: '0xff0000 => 0xFF0000',
          line: 1,
          column: 8
        },
        {
          message: '0x0000ff => 0x0000FF',
          line: 3,
          column: 9
        }
      ]
    }
  ]
})
