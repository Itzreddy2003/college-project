import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoLocationSharp } from "react-icons/io5";
import { FaWind } from "react-icons/fa";
import { useDebounce } from "./components/Debounce";
import BackgroundVideo from "./components/BackgroundVideo";
// import { dateToDay } from "./components/days";

const App = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Changed query to searchTerm
  const [citySuggestions, setCitySuggestions] = useState([]); // Changed variable name
  const debouncedSearch = useDebounce(searchTerm, 800); // Adjusted debounce timing
  const [cityWeather, setCityWeather] = useState(null);
  // const day = dateToDay()
  useEffect(() => {
    if (!debouncedSearch) {
      setCitySuggestions([]);
      return;
    }

    const fetchCitySuggestions = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=bb101170b4d7467fb60130702252702&q=${debouncedSearch}`
        );
        const cityData = await response.json();

        if (Array.isArray(cityData)) {
          setCitySuggestions(cityData);
        } else {
          setCitySuggestions([]);
        }
      } catch (error) {
        console.warn("Failed to fetch city suggestions:", error);
        setCitySuggestions([]);
      }
    };

    fetchCitySuggestions();
  }, [debouncedSearch]);

  const fetchWeather = async (query) => {
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=bb101170b4d7467fb60130702252702&q=${query}&days=7`
      );
      const data = await res.json();
      // console.log(data)
      setCityWeather(data);
    } catch (error) {
      console.log("Error in fetcing the weather forcast", error);
      setCityWeather(null);
    }
  };
  console.log(cityWeather);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      {/* <img
        className="absolute w-full h-full object-cover -z-10"
        src="/assets/rainy.jpg"
      /> */}
      <BackgroundVideo />

      <div className="border-[3px] h-[550px] w-[750px] rounded-xl flex">
        {/* Left Panel */}
        <div className="w-[70%] p-[10px] flex flex-col justify-between">
          {/* Search Box */}
          <div className="flex flex-col items-center">
            <div className="flex w-[260px] items-center px-3 py-2 border border-gray-300 rounded-full bg-gray-400 bg-opacity-20 backdrop-blur-lg">
              <input
                type="text"
                className="flex-1 text-sm bg-transparent outline-none text-white px-2 placeholder-gray-300"
                placeholder="Enter city"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <CiSearch
                className="h-5 w-5 text-white cursor-pointer"
                onClick={() => fetchWeather(searchTerm)}
              />
            </div>

            {/* City Suggestions */}
            {citySuggestions.length > 0 && (
              <div className="w-[45%] bg-gray-700 bg-opacity-50 p-2 mt-2 rounded-lg">
                <ul className="text-white">
                  {citySuggestions.map((city) => (
                    <li
                      key={city.id}
                      className="p-1 hover:bg-gray-500 rounded-md cursor-pointer"
                      onClick={() => {
                        setSearchTerm(city.name);
                        fetchWeather(city.name);
                        setCitySuggestions([]);
                      }}
                    >
                      {city.name}, {city.country}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* condition & hourly cast */}
          {cityWeather && (
            <div className="w-full flex flex-col gap-1 h-[32%]">
              {/* condition */}
              <div className="text-right text-white w-full flex justify-end items-center gap-2">
                <img
                  className="size-10"
                  src={`${cityWeather?.current?.condition?.icon}`}
                  alt=""
                />
                <h1 className="text-[30px]">
                  {cityWeather?.current?.condition?.text}
                </h1>
              </div>
              <div className="w-full border-t-[1.5px] border-gray-600 p-1 overflow-x-auto scrollbar-hidden flex items-center gap-1">
                {cityWeather?.forecast?.forecastday?.map((day) =>
                  day?.hour?.slice(0, 24).map(
                    (
                      hour,
                      index 
                    ) => (
                      <div
                        key={index}
                        className="p-1 w-[20%] flex flex-col items-center gap-2 text-white rounded-md bg-gray-400 bg-opacity-30 backdrop-blur-lg"
                      >
                        <p>
                          {new Date(hour.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <div className="border-[1.5px] border-white rounded-md">
                          <img
                            src={hour.condition.icon}
                            className="h-7 w-7"
                            alt="Weather icon"
                          />
                        </div>
                        <p>{hour.temp_c}°C</p>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="flex flex-col items-center gap-3 w-[30%] border-gray-400 bg-opacity-30 backdrop-blur-xl rounded-r-lg py-[10px] border-l-[1.5px]">
          <div className="flex flex-col items-center gap-4 w-[100%] border-b-[1.5px] border-white py-2">
            {/* location */}
            <div className="w-[70%] p-[5px] border-[1.5px] border-gray-300 rounded-lg flex items-center gap-[10px] text-white">
              <IoLocationSharp />
              <p className="text-sm">{searchTerm || "Your city"}</p>
            </div>

            {/* Weather Forecast */}
            <div className="flex flex-col gap-0 text-white">
              <h1 className="text-[50px] tracking-tighter">
                {cityWeather?.current?.temp_c}&deg;C
              </h1>
              <p className="flex justify-center items-center gap-1">
                <FaWind />{" "}
                {cityWeather?.current?.wind_dir === "S" ? "South" : "North"} |{" "}
                {cityWeather?.current?.wind_kph}km/h
              </p>
            </div>
          </div>
          {/* 7 days forecast */}
          <h1 className="text-white">Next 7 days forecast</h1>
          <div className="flex flex-col items-center gap-3 w-[100%] text-white overflow-y-auto scrollbar-hidden">
            {console.log(cityWeather?.forecast?.forecastday[0]?.date)}
            {cityWeather?.forecast?.forecastday?.map((day) => (
              // console.log(day)
              <div className="flex items-center justify-around bg-transparent w-[90%] p-2 border-[1.5px] border-gray-400 rounded-lg gap-1 ">
                {/* icons */}
                <div className="flex items-center bg-transparent border-[1.5px] border-gray-400 rounded-md p-[1px]">
                  <img
                    src={`${day.day.condition.icon}`}
                    alt=""
                    className="h-7 w-7 "
                  />
                </div>
                {/* temperature | day */}
                <div className="flex flex-col items-center gap-2 text-sm">
                  <p>{day.date}</p>
                  <p>
                    min: {day.day.mintemp_c} max: {day.day.maxtemp_c}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
