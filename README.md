 <p align="center"><img src="https://raw.githubusercontent.com/herbsjs/kola/master/docs/logo.png" height="220"></p>

![CI Build](https://github.com/herbsjs/kola/workflows/Node.js%20CI/badge.svg?branch=master) [![codecov](https://codecov.io/gh/herbsjs/kola/branch/master/graph/badge.svg)](https://codecov.io/gh/herbsjs/kola)

# Kola

Kola its a tool to translate suma error codes, and gotu error object.

### Installing

    $ npm install kola

### Using

You can translate just one error object
```javascript
const translator = require('kola')('en-US')

const translator.translate({ notDefined: true })
/*
    Not defined
*/

```

or translate an entire error object from gotu
```javascript
const User = 
    entity('User', {
        name: field(String),
        plan: field(Plan)
    })

const user = new User()
user.name = 42
user.plan.monthlyCost = true
user.validate() 
user.errors // { name: [ {wrongType: 'String'} ], plan: { monthlyCost: [ {wrongType: 'Number'} ] } }

const translator = require('kola')('pt-BR')

const translator.translateErrors(user.errors)
/*
    {
        name: ["Wrong type"]
        plan: { 
            monthlyCost: ["Wrong type"]
        }
    }
*/

```
