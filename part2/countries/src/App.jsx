import { useEffect } from "react";
import { useState } from "react";
import countryService from "./services/countries";
import CountryList from "./components/CountryList";

function App() {
  const [country, setCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then((countries) => {
      setFilteredCountries(
        countries.filter((c) => c.name.common.match(new RegExp(country, "gi")))
      );
    });
    console.log(filteredCountries);
  }, [country]);

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  const handleShowClick = (countryName) => {
    setCountry(countryName);
  };

  return (
    <div>
      <label htmlFor="countryFinder">find countries </label>
      <input value={country} onChange={handleChange} id="countryFinder" />
      <CountryList
        countries={filteredCountries}
        showHandler={handleShowClick}
      />
    </div>
  );
}

export default App;
