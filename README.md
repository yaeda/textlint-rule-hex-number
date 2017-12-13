# textlint-rule-hex-number [![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)

textlint rule to check if hexadecimal is the upper/lower case.

**Default**

The hexadecimal should be capitalized.

**OK**

```
0x0A
```

**NG**

```
0x0a
```

## Install

Install with [npm](https://www.npmjs.com/):

```
npm install textlint-rule-hex-number
```

## Usage

Via `.textlintrc`(Recommended)

```json
{
  "rules": {
    "hex-number": true
  }
}
```

Via CLI

```
textlint --rule hex-number README.md
```

### Options

```json
{
  // capitalize or not
  "capitalize": true
}
```

### Example

```json
{
  "rules": {
    "hex-number": {
      "capitalize": false
    }
  }
}
```

**Before**

```
Red is 0xFF0000. Blue is 0x0000FF.
```

**After**
`textlint --fix` fixes this.

```
Red is 0xff0000. Blue is 0x0000ff.
```

### Build

Builds source codes for publish to the `lib` folder. You can write ES2015+ source codes in `src/`
folder.

    npm run build

### Tests

Run test code in `test` folder. Test textlint rule by
[textlint-tester](https://github.com/textlint/textlint-tester "textlint-tester").

    npm test

## License

MIT © Takeshi Yaeda
