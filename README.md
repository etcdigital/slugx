# slugx

A package that generate CPF, CNPJ and brazilian names to use in forms.

## How to use

`npm install slugx --save-dev` or `yarn add -D slugx`.

### Generate Slug

```js
const slugx = require('slugx');
const newSlug = slugx.create('Hello world')
// slugx = 'hello-world'
```

### Validate Slug

```js
const slugx = require('slugx');
const isValid = slugx.validate('hello-world')
// isValid = true
```