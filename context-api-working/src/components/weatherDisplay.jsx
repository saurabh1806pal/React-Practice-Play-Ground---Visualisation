import { WeatherContext } from "../context/createContext";
import { useContext } from "react";

const WeatherDisplay = () => {
  const { weather, loading } = useContext(WeatherContext);

  if (loading) return <p>Loading...</p>;
  if (!weather) return <p>No Data</p>;

  return (
    <div>
      <h2>{weather.city}</h2>
      <p>Temperature: {weather.temp}°C</p>
      <p>Condition: {weather.condition}</p>
    </div>
  );
};

export default WeatherDisplay;