# valideit
__validate__ /ˈvalɪdeɪt/

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
