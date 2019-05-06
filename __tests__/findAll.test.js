const { findAll } = require("../lib/index.js");

describe("findAll method :", () => {
  test("Invalid data should throw an error", () => {
    const passInvalidDataFn = () => {
      findAll();
    };

    const passNullDataFn = () => {
      findAll(null);
    };

    const passInvalidObjFn = () => {
      findAll([], {});
    };

    const passInvalidChildrenKeyFn = () => {
      findAll([], { key: 1 }, 1);
    };

    expect(passInvalidDataFn).toThrowError(TypeError);
    expect(passNullDataFn).toThrowError(TypeError);
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

    expect(findAll(data, { id: 6, name: "Nikola Tesla" }, "children")).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0]
    ]);
  });
});
