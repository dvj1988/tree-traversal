const { findOne } = require("./lib/index.js");

test("Invalid data should throw an error", () => {
  const passInvalidDataFn = () => {
    findOne({});
  };

  const passNullDataFn = () => {
    findOne(null);
  };

  const passInvalidObjFn = () => {
    findOne([], {});
  };

  const passInvalidChildrenKeyFn = () => {
    findOne([], { key: 1 }, 1);
  };

  expect(passInvalidDataFn).toThrowError(TypeError);
  expect(passInvalidObjFn).toThrowError(TypeError);
  expect(passInvalidChildrenKeyFn).toThrowError(TypeError);
});

test("find object in a nested collection of degree 4", () => {
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

  expect(findOne(data, { id: 6, name: "Nikola Tesla" }, "children")).toEqual([
    0,
    0,
    0,
    1,
    0
  ]);
});

test("find first occurance of object", () => {
  const sameObjInSameLevelData = [
      { id: 1, name: "John Doe" },
      { id: 1, name: "John Doe" }
    ],
    sameObjInDifferentLevelData = [
      { id: 1, name: "John Doe", children: [{ id: 2, name: "Jane Doe" }] },
      { id: 2, name: "Jane Doe" }
    ];

  expect(
    findOne(sameObjInSameLevelData, { id: 1, name: "John Doe" }, "children")
  ).toEqual([0]);
  expect(
    findOne(
      sameObjInDifferentLevelData,
      { id: 2, name: "Jane Doe" },
      "children"
    )
  ).toEqual([1]);
});
