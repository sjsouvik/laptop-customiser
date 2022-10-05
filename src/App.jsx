import { useState, useEffect } from "react";
import { Header, Description, Container, Price } from "./common/components";
import { segregateBasedOnType } from "./common/helper/utils";
import { getDefaultPrice } from "./service";

const App = () => {
  const [loading, setLoading] = useState(false);

  const [configList, setConfigList] = useState({});
  const [selectedConfigs, setSelectedConfigs] = useState({});

  const [error, setError] = useState(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const [priceError, setPriceError] = useState(null);

  useEffect(() => {
    const getMacComponents = () => {
      return fetch(`/components`)
        .then((response) => response.json())
        .then((data) => {
          const configs = data.reduce((formattedData, config) => {
            if (config.type === "proe") {
              return segregateBasedOnType(config, formattedData, "Processor");
            } else if (config.type === "mem") {
              return segregateBasedOnType(config, formattedData, "Memory");
            } else if (config.type === "gfx") {
              return segregateBasedOnType(config, formattedData, "Graphics");
            } else if (config.type === "stg") {
              return segregateBasedOnType(config, formattedData, "Storage");
            }
          }, {});

          setConfigList(configs);

          setSelectedConfigs({
            Processor: configs["Processor"][0],
            Memory: configs["Memory"][0],
            Graphics: configs["Graphics"][0],
            Storage: configs["Storage"][0],
          });
          setLoading(false);
        })
        .catch(() => {
          setError(new Error("could not fetch the customisable components"));
          setLoading(false);
        });
    };

    setLoading(true);
    getMacComponents();
    setPriceLoading(true);

    getDefaultPrice()
      .then((data) => {
        setPrice(data.value);
      })
      .catch((error) => {
        setPriceError(error);
      })
      .finally(() => {
        setPriceLoading(false);
      });
  }, []);

  const setSelectedVariant = ({ title, serialNo, variant, addOnPrice }) => {
    setSelectedConfigs((configs) => ({
      ...configs,
      [title]: { serialNo, variant, addOnPrice },
    }));
  };

  return (
    <>
      <Header />
      <main>
        <div className="main__container">
          <div className="main__content">
            <section>
              <img
                className="macbook-img"
                alt="macbook pro"
                src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16touch-space-select-201911?wid=1808&hei=1686&fmt=jpeg&qlt=80&.v=1572825197207"
              />
            </section>
            <section className="configuration">
              {loading && <h1>loading...</h1>}
              {error && <h1>Something went wrong. Please try again later</h1>}

              {!(loading || error) && (
                <>
                  <Description selectedConfigs={selectedConfigs} />
                  {Object.entries(configList).map(
                    ([configTitle, configOptions]) => (
                      <Container
                        key={configTitle}
                        title={configTitle}
                        list={configOptions}
                        selectedConfigs={selectedConfigs}
                        setSelectedVariant={setSelectedVariant}
                      />
                    )
                  )}
                </>
              )}
            </section>
          </div>
        </div>
        <Price
          price={price}
          priceLoading={priceLoading}
          priceError={priceError}
          selectedConfigs={selectedConfigs}
        />
      </main>
    </>
  );
};

export default App;
