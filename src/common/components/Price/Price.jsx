import { getAddOnPrice } from "../../helper/utils";

export const Price = (props) => {
  const { priceLoading, priceError, price, selectedConfigs } = props;

  return (
    <div className="price container">
      <div className="price__content">
        <h1 className="price__value">
          Total:
          {priceLoading ? (
            <>{` loading...`}</>
          ) : priceError ? (
            "Something went wrong. Please try again later"
          ) : (
            <span data-testid="total-price">{` ₹${
              price + getAddOnPrice(selectedConfigs)
            }`}</span>
          )}
        </h1>
      </div>
    </div>
  );
};
