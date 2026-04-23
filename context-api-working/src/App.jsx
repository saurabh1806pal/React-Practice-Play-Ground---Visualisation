import { WeatherProvider } from "./context/WeatherContext";

import WeatherDisplay from "./components/weatherDisplay";
import CitySelector from "./components/citySelector";

export default function App() {
  return (
    <WeatherProvider>
      <CitySelector />
      <WeatherDisplay />
    </WeatherProvider>
  );
}