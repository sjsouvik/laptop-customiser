export const Container = (props) => {
  const { title, list, selectedConfigs, setSelectedVariant } = props;

  return (
    <div className="component">
      <h3 className="component__name">{title}</h3>
      <ul>
        {list.map(({ serialNo, variant, addOnPrice }) => (
          <li
            key={`${title}_${serialNo}`}
            className={`variant ${
              selectedConfigs[title].serialNo === serialNo
                ? "variant--selected"
                : ""
            }`}
            data-testid={`${title}_${serialNo}`}
            onClick={() =>
              setSelectedVariant({ title, serialNo, variant, addOnPrice })
            }
          >
            <p className="variant__name">
              <strong>{variant}</strong>
            </p>
            {addOnPrice > 0 && <p>+ ₹{addOnPrice}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};
