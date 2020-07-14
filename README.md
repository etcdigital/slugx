# slugx 🐌

A lightweight Slug generator/validator.

## How to use

`npm install slugx --save-dev` or `yarn add -D slugx`.

### Generate Slug

```js
const slugx = require('slugx');
const newSlug = slugx.create('Hello world');
// slugx = 'hello-world'
```

### Remove accents

Removes the accents from a string, converting them to their corresponding non-accented ASCII characters.

```js
const slugx = require('slugx');
const newSlug = slugx.removeAccents('àéîõü');
// slugx = 'aeiou'

console.log(slugx.removeAccents('ÀÁÂÃÄÅ')); // AAAAAA
```

### Validate Slug

```js
const slugx = require('slugx');
const isValid = slugx.validate('hello-world');
// isValid = true
```

## Options

### For Create Slug

**separator** _(optional)_: Change separator between words:

```js
const slugx = require('slugx');
const newSlug = slugx.create('Hello world, Slugx', { separator: '.' });
// slugx = 'hello.world.slugx'
```

**lowercase** _(optional)_: By default, lowercase is enable. This means that will uppercase letters will be changed to lowercase.

```js
const slugx = require('slugx');
const newSlug = slugx.create('Hello world, SlugX', { lowercase: 'false' });
// slugx = 'Hello-world-SlugX'
```

**strict** _(optional)_: The strict only accepts letters and numbers in the generated slug

```js
const slugx = require('slugx');
const newSlug = slugx.create('Hello world, SlugX $1', { strict: 'true' });
// slugx = 'hello-world-Slugx-1'
```

### For Validate Slug

**min** _(optional)_: The minimum acceptable characters for validating slug

```js
const slugx = require('slugx');

const isValidCase1 = slugx.validate('Hello world, Slugx', { min: 3 });
// isValidCase1 = true

const isValidCase2 = slugx.validate('Hi', { min: 3 });
// isValidCase2 = false
```

**max** _(optional)_: The maximum acceptable characters for validating slug

```js
const slugx = require('slugx');

const isValidCase1 = slugx.validate('Hello world, Slugx', { min: 32 });
// isValidCase1 = true

const isValidCase2 = slugx.validate('Hello world, Slugx', { min: 3 });
// isValidCase2 = false
```

**allowOnlyNumbers** _(optional)_: By default, the allowOnlyNumbers is disabled, but you can change to false to invalidate slug with without letters.

```js
const slugx = require('slugx');

const isValidCase1 = slugx.validate('12312312', { allowOnlyNumbers: true });
// isValidCase1 = true

const isValidCase2 = slugx.validate('12312312', { allowOnlyNumbers: false });
// isValidCase2 = false
```

**slugConfig** _(optional)_: The slugConfig will set options of **slugx.create** to compare and validate

```js
const slugx = require('slugx');

const isValidCase1 = slugx.validate('isValid-Hello-World', { slugOptions: { lowercase: false } });
// isValidCase1 = true

const isValidCase2 = slugx.validate('isValid-Hello-World', { slugOptions: { lowercase: true } });
// isValidCase2 = false
```
