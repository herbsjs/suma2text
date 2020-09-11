 <p align='center'><img src='https://raw.githubusercontent.com/herbsjs/suma2Text/master/docs/logo.png' height='220'></p>

![CI Build](https://github.com/herbsjs/suma2Text/workflows/Node.js%20CI/badge.svg?branch=master) [![codecov](https://codecov.io/gh/herbsjs/suma2Text/branch/master/graph/badge.svg)](https://codecov.io/gh/herbsjs/suma2Text)

# suma2Text

suma2Text it's a tool to parse error codes to string, you can use in all your solution.

Suma and suma2Text native, you can translate all suma error codes, one by one or all entity error array.

### Installing

    $ npm install suma2Text

### Using

If your use is simple, you can just require suma2Text, and execute this configure function, by default the language will be English from the united states (ISO CODE en-US).

```javascript
const suma2Text = require('suma2Text')()

const suma2Text.toText({ notDefined: true })
/*
    Not defined
*/
```

You also can add a different language or customize the existing, just pass the following parameters on require function.

```javascript
const suma2Text = require('suma2Text')({
    useDefault: 'ts-ME',
    languages: [{
            name: 'ts-ME',
            definitions: {
                types: [
                    { key: 'Number',  translation: 'Numeric' },
                    { key: 'String',  translation: 'Characters'}
                ]
                codes: [
                    { key: 'cantBeEmpty', translation: 'Wont should be empty' },
                    { key: 'wrongType', translation: 'Please the value correct is {0}' }
                ]
            }
        },
        {
            name: 'en-US',
            definitions: {
                types: [
                    { key: 'Number', translation: 'Digit' },
                    { key: 'String', translation: 'Char Array' }
                ],
                codes: [
                    { key: 'cantBeEmpty', translation: 'Wont should be empty' },
                    { key: 'wrongType', translation: 'The value correct is {0}'}
                ]
            }
        }
    ]
})

//fully custumized language
const suma2Text.toText({ wrongType: String }, 'ts-ME')
/*
   Please the value correct is Characters
*/
const suma2Text.toText({ notGreaterThan: 10 }, 'ts-ME')
/*
   Will be thrown a not implemented code exception
*/

//existing language, but some custumization
const suma2Text.toText({ wrongType: String }, 'en-US')
/*
   The value correct is Char Array
*/
const suma2Text.toText({ notGreaterThan: 10 }, 'en-US')
/*
   Not greater than 10
*/

```
But, the perfect choice is to use whit herbs.js, all suma codes are integrated into here, and we made for it, you can pass all your validation in a suma2Text class, validate, and just show the results in your presentation layer, let's see how.
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
user.errors // { name: [ {wrongType: 'String'} ], plan: { monthlyCost: [ {wrongType: 'Number'}  } }

const suma2Text = require('suma2Text')()

const englishUserErrors = suma2Text.errorsToText(user.errors)
/*
    {
        name: ['Wrong type, the correct type is String']
        plan: {
            monthlyCost: ['Wrong type, the correct type is Plan']
        }
    }
*/
const portugueseUserErrors = suma2Text.errorsToText(user.errors, 'pt-BR')
/*
    {
        name: ['Foi definido um tipo incorreto, o valor esperado era Texto']
        plan: {
            monthlyCost: ['Foi definido um tipo incorreto, o valor esperado era Plan']
        }
    }
*/
```

## TODO

Language localisation:
- [ ] Arabic
- [ ] Bangla
- [ ] Chinese
- [ ] Dutch
- [x] English ('en-US')
- [ ] French
- [ ] German
- [ ] Italian
- [ ] Korean
- [X] Portuguese ('pt-BR')
- [ ] Spanish
- [ ] Swedish   
- [ ] Tamil


Text Formatting:
- [X] Primitive types
- [X] Strings types
- [X] Number types 
- [ ] Date Type and formating style
- [ ] User Class instances types


### Contribute
Come with us to make an awesome *suma2Text*.

Now, if you do not have the technical knowledge and also have intended to help us, do not feel shy, [click here](https://github.com/herbsjs/suma2Text/issues) to open an issue and collaborate their ideas, the contribution may be a criticism or a compliment (why not?)

We have some conventions to contribute to the *suma2Text* project, see more information in our [CONTRIBUTING.md](CONTRIBUTING.md). So please, read this before send to us a [pull requests](https://github.com/herbsjs/suma2Text/pulls).

### The Herb

suma2Text suma2Text has been used historically to relieve congestion from upper respiratory infections and colds and for wound healing. It is very popular for treating varicose veins and memory loss.


https://www.herbslist.net/

https://en.wikipedia.org/wiki/Centella_asiatica

### License

**suma2Text** is released under the
[MIT license](https://github.com/herbsjs/suma2Text/blob/development/LICENSE.md).