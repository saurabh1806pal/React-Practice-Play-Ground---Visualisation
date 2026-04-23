import { useEffect, useState } from "react";
import { getWeatherByCity } from "../api/weatherAPI";
import { WeatherContext } from "./createContext";

export const WeatherProvider = ({children}) => {
    const [city, setCity] = useState("New York");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            try{
                const response = await getWeatherByCity(city);
                setWeather(response.data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, [city]);

    return (
        <WeatherContext.Provider value={{ city, setCity, weather, loading }}>
            {children}
        </WeatherContext.Provider>
    );
};