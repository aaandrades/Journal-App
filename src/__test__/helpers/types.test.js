import { types } from "../../Redux/Types/types";
import { typesMock } from "./types.mock";

describe("Types - Helper", () => {
  test("should match type with types of redux", () => {
    expect(types).toEqual(typesMock);
  });
});
