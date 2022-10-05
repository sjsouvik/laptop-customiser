import { fireEvent, render, waitFor } from "@testing-library/react";
import App from "../App";
import { server, rest } from "../testServer";

describe("Laptop customiser", () => {
  it("should show the correct price when processor a is selected", async () => {
    const { getByTestId } = render(<App />);
    await waitFor(() => {
      fireEvent.click(getByTestId(`Processor_a`));
    });
    expect(getByTestId("Processor-details")).toHaveTextContent(
      /2.3GHz 8-core 9th-generation Intel Core processor, Turbo Boost up to 4.8GHz/i
    );
    expect(getByTestId("total-price")).toHaveTextContent(`₹239900`);
  });

  it("should show the correct price when processor b is selected", async () => {
    const { getByTestId } = render(<App />);
    await waitFor(() => {
      fireEvent.click(getByTestId(`Processor_b`));
    });
    expect(getByTestId("Processor-details")).toHaveTextContent(
      "2.4GHz 8-core 9th-generation Intel Core processor, Turbo Boost up to 5.0GHz"
    );
    expect(getByTestId("total-price")).toHaveTextContent(`₹259900`);
  });

  it("renders correctly", async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});

describe("Tests error scenarios", () => {
  it("should show error if getDefaultPrice service fails", async () => {
    server.use(
      rest.get("/components", (req, res, ctx) => {
        return res(ctx.status(404));
      }),

      rest.get("/price", (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(
        getByText(/Something went wrong. Please try again later/i)
      ).toBeTruthy();
    });
  });
});
