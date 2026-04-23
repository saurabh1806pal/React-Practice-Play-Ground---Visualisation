import { WeatherContext } from "../context/createContext";
import { useContext } from "react";

const CitySelector = () => {
  const { city, setCity } = useContext(WeatherContext);

  return (
    <select value={city} onChange={(e) => setCity(e.target.value)}>
      <option value="new-york">New York</option>
      <option value="delhi">Delhi</option>
    </select>
  );
};

export default CitySelector;