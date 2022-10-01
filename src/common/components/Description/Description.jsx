export const Description = ({ selectedConfigs }) => {
  return (
    <>
      <h1 className="mt-0">Customise your 16‑inch MacBook Pro - Space Grey</h1>
      <ul className="summary-list">
        {Object.keys(selectedConfigs).map((selectedConfig) => (
          <li key={selectedConfig} data-testid={`${selectedConfig}-details`}>
            {selectedConfigs[selectedConfig].variant}
          </li>
        ))}
        <li>Backlit Magic Keyboard - US English</li>
      </ul>
    </>
  );
};
