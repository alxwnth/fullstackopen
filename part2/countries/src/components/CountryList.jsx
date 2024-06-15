import Country from "./Country";

const CountryList = ({ countries }) => {
  if (countries.length === 0) {
    return null;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    return (
      <ul>
        {countries.map((c) => (
          <li key={c.name.official}>{c.name.common}</li>
        ))}
      </ul>
    );
  }
};

export default CountryList;
