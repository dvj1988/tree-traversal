const { convertToLinkedList } = require("../lib/index.js");

describe("convertToLinkedList method :", () => {
  test("Invalid data should throw an error", () => {
    const passNoDataFn = () => {
      convertToLinkedList();
    };

    const passNullUniqueKeysFn = () => {
      convertToLinkedList([], null);
    };

    const passInvalidUniqueKeysArrFn = () => {
      convertToLinkedList([], [null]);
    };

    const passInvalidChildrenKeyFn = () => {
      convertToLinkedList([], ["id"], null);
    };

    expect(passNoDataFn).toThrowError(TypeError);
    expect(passNullUniqueKeysFn).toThrowError(TypeError);
    expect(passInvalidUniqueKeysArrFn).toThrowError(TypeError);
    expect(passInvalidChildrenKeyFn).toThrowError(TypeError);
  });

  test("convert to linkedList", () => {
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
    const uniqueKeys = ["id", "name"];

    const expectedResult = [
      { id: 1, name: "John Doe", parent: null },
      { id: 2, name: "Jane Doe", parent: { id: 1, name: "John Doe" } },
      { id: 3, name: "Mary Jane", parent: { id: 2, name: "Jane Doe" } },
      { id: 4, name: "Elon Musk", parent: { id: 3, name: "Mary Jane" } },
      { id: 5, name: "Graham Bell", parent: { id: 3, name: "Mary Jane" } },
      { id: 6, name: "Nikola Tesla", parent: { id: 5, name: "Graham Bell" } }
    ];

    expect(convertToLinkedList(data, uniqueKeys, "children")).toEqual(
      expectedResult
    );
  });
});
