'use strict'
import { RuleHelper } from 'textlint-rule-helper'

const defaultOptions = {
  // capitalize or not
  capitalize: true
}

const PREFIX = '0x'

const reporter = (context, options = {}) => {
  const { Syntax, RuleError, fixer, report, getSource } = context
  const helper = new RuleHelper(context)
  const capitalize =
    options.capitalize === undefined ? defaultOptions.capitalize : options.capitalize

  return {
    [Syntax.Str](node) {
      if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote])) {
        return
      }

      const text = getSource(node)
      const regexp = new RegExp(`(?<=${PREFIX})[0-9a-fA-F]+`, 'g') // /(?<=0x)[0-9a-fA-F]+/g
      let matches
      while ((matches = regexp.exec(text)) !== null) {
        const target = matches[0]
        const valid = capitalize ? target.toUpperCase() : target.toLowerCase()
        if (target !== valid) {
          const indexOfBugs = matches.index - PREFIX.length
          const replace = fixer.replaceTextRange(
            [indexOfBugs, indexOfBugs + target.length + PREFIX.length],
            `${PREFIX}${valid}`
          )
          const ruleError = new RuleError(`${PREFIX}${target} => ${PREFIX}${valid}`, {
            index: indexOfBugs, // padding of index
            fix: replace
          })
          report(node, ruleError)
        }
      }
    }
  }
}

module.exports = {
  linter: reporter,
  fixer: reporter
}
