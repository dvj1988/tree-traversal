# tree-traversal

> Tree Traversal - Traverse through nested collections with ease.

1 KB _(minified & gzipped)_, one file, and no dependencies.

## Install

```
$ npm i @diljitvj/tree-traversal
```

## Usage

## 1. findOne

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

### API

#### findOne(data, obj, childrenKey)

##### data

Type: `Array<Object>`

##### obj

Type: `Object`

##### childrenKey

Type: `String`

---

## 2. convertToLinkedList

```js
const { convertToLinkedList } = require("@diljitvj/tree-traversal");

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

console.log(convertToLinkedList(data, ["id", "name"], "children"));
//=>  [
  { id: 1, name: "John Doe", parent: null },
  { id: 2, name: "Jane Doe", parent: { id: 1, name: "John Doe" } },
  { id: 3, name: "Mary Jane", parent: { id: 2, name: "Jane Doe" } },
  { id: 4, name: "Elon Musk", parent: { id: 3, name: "Mary Jane" } },
  { id: 5, name: "Graham Bell", parent: { id: 3, name: "Mary Jane" } },
  { id: 6, name: "Nikola Tesla", parent: { id: 5, name: "Graham Bell" } }
];
```

---

## 3. findAll

```js
const { findAll } = require("@diljitvj/tree-traversal");

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
                children: [{ id: 6, name: "Nikola Tesla", children: [] }]
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

console.log(findAll(data, { id: 6, name: "Nikola Tesla" }, "children"));
//=>  [ [ 0, 0, 0, 0, 0 ], [ 0, 0, 0, 1, 0 ] ]
```

### API

#### findAll(data, obj, childrenKey)

##### data

Type: `Array<Object>`

##### obj

Type: `Object`

##### childrenKey

Type: `String`

## Maintainers

- [Diljit VJ](https://github.com/diljitvj)

## License

MIT
