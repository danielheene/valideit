# valideit
__validate__ /ˈvalɪdeɪt/

[![CircleCI](https://circleci.com/gh/danielheene/valideit/tree/master.svg?style=shield)](https://circleci.com/gh/danielheene/valideit/tree/master)
[![codecov](https://codecov.io/gh/danielheene/valideit/branch/master/graph/badge.svg)](https://codecov.io/gh/danielheene/valideit)
[![GitHub issues](https://img.shields.io/github/issues/danielheene/valideit.svg)](https://github.com/danielheene/valideit/issues)
[![GitHub license](https://img.shields.io/github/license/danielheene/valideit.svg)](https://github.com/danielheene/valideit/blob/master/LICENSE)

This package can be used to validate if all defined engine versions in the package.json file are matched.

## How to use
There are different ways to use this package.

#### As preinstall hook
You can use this package by adding the following entry to your 
`package.json` and force `npm` or `yarn` to ensure that all 
engine requirements are matched before it starts installing 
your dependencies. There's no need to add this package to your 
dependencies.
```json
{
    "scripts": {
        "preinstall": "npx valideit"
    }  
}
```

#### As dependency in your project
It is also possible to use this package as dependency in your
project and use its functionality inside your code like the 
following example is showing.
```javascript
const valideit = require('valideit');

valideit.validate();
```

#### As command-line tool
By installing this package globally it is possible use it as cli tool
as described in the following example.
```bash
$ npm install -g valideit 
$ valideit
```

## Options
#### CLI arguments
The following arguments can be passed via CLI or also to the preinstall hook.
```
  --path, -p     file to check engines from                             [string]
  --warn, -w     doesn't abort on error                                [boolean]
```

#### Function call
You can also pass those arguments as a Javascript object to the function call.
```javascript
const valideit = require('valideit');

valideit.validate({
  level: 'warn',
  path: '/path/to/package.json'
});
```

----
## License
[MIT](LICENSE)
