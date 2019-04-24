# tree-traversal
> Tree Traversal - Traverse through nested collections with ease.

1 KB _(minified & gzipped)_, one file, and no dependencies.

## Install

```
$ npm i @diljitvj/tree-traversal
```

## Usage

```js
const { findOne } = require("@diljitvj/tree-traversal");

const data = [
    {
      id: 1,
      name: "John Doe",
      children: [
        {
          id: 2,
          name: "Jane Doe",
          children: [
            {
              id: 3,
              name: "Mary Jane",
              children: [
                {
                  id: 4,
                  name: "Elon Musk",
                  children: []
                },
                {
                  id: 5,
                  name: "Graham Bell",
                  children: [{ id: 6, name: "Nikola Tesla", children: [] }]
                }
              ]
            }
          ]
        }
      ]
    }
  ];

console.log(findOne(data, { id: 6, name: "Nikola Tesla" }, "children"));
//=> [ 0, 0, 0, 1, 0 ]
```

## API

### findOne(data, obj, [childrenKey])

#### data

Type: `Array`

#### obj

Type: `Object`

##### childrenKey

Type: `string`<br>

## Maintainers

- [Diljit VJ](https://github.com/diljitvj)

## License

MIT
