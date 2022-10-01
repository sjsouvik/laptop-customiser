import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import App from "../App";
import data from "../../server/db.json";

const mockFetchCall = jest.spyOn(global, "fetch");

describe("Laptop customiser", () => {
  beforeEach(() => {
    mockFetchCall
      .mockResolvedValueOnce({
        json: () => Promise.resolve(data.components),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(data.price),
      });
  });

  it("should show the correct price when processor a is selected", async () => {
    const { getByTestId } = render(<App />);
    await waitFor(() => {
      fireEvent.click(getByTestId(`Processor_a`));
    });
    expect(getByTestId("Processor-details")).toHaveTextContent(
      "2.3GHz 8-core 9th-generation Intel Core processor, Turbo Boost up to 4.8GHz"
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
    mockFetchCall.mockRejectedValue().mockRejectedValue();

    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(
        getByText(`Something went wrong. Please try again later`)
      ).toBeTruthy();
    });
  });
});
