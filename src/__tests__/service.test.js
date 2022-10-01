import { getDefaultPrice, getCustomisableComponents } from "../service";

describe("Tests services", () => {
  it("should test get the default price of the laptop", async () => {
    const price = await getDefaultPrice();

    expect(price).toEqual({ value: 239900 });
  });
});
