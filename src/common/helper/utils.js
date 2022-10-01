export const getAddOnPrice = (selectedConfigs) => {
  return Object.entries(selectedConfigs).reduce(
    (totalPrice, [config, configDetails]) =>
      totalPrice + configDetails.addOnPrice,
    0
  );
};

export const segregateBasedOnType = (config, acc, title) => {
  if (!acc[title]) {
    acc[title] = [config];
  } else {
    acc[title].push(config);
  }

  return acc;
};
