import { MoonIcon, SunIcon } from "@/assets";
import { getWeatherInfo } from "@/utils/api";
import { Position } from "@/utils/common.types";
import { isNightAtDate } from "@/utils/date";
import { Switch } from "@material-tailwind/react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface Props {
  position: Position;
}

const WeatherInfo: FC<Props> = ({ position }) => {
  const [weather, setWeather] = useState<any>({});
  const [isCelsius, setIsCelsius] = useState(true);
  const [isNight, setIsNight] = useState(false);

  // Fetch weather info on position change
  useEffect(() => {
    const getWeather = () => {
      getWeatherInfo(position.lat, position.lng, isCelsius)
        .then((data) => {
          setWeather(data);
          setIsNight(isNightAtDate(data));
        })
        .catch((err) => console.error(err));
    };
    getWeather();
  }, [isCelsius, position, weather?.dt]);

  return (
    <div
      className={`my-20 p-8 lg:p-20 w-full flex justify-center bg-gradient-to-br ${
        isNight ? "from-deep-purple-900" : "from-blue-800"
      } to-transparent rounded-2xl`}
    >
      <div className="flex flex-col items-start">
        <div className="flex flex-wrap justify-center items-center">
          <h3 className="text-lg lg:text-2xl font-bold">Weather Info:</h3>
          <h4 className="ml-2 text-lg lg:text-2xl font-light flex items-center">
            {weather?.name}
            <Image
              className="h-12 w-12 lg:h-16 lg:w-16"
              src={isNight ? MoonIcon : SunIcon}
              alt={"sun"}
            />
          </h4>
        </div>

        <div className="w-full mt-10 p-4 ring-2 ring-blue-gray-700 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg lg:text-xl font-semibold mr-6">
              Temperature{" "}
            </h3>

            <div className="flex items-center">
              <h3 className="text-lg lg:text-xl font-light">F</h3>
              <div className="mx-2 mt-0.5">
                <Switch
                  checked={isCelsius}
                  crossOrigin={undefined}
                  onChange={() => setIsCelsius(!isCelsius)}
                />
              </div>
              <h3 className="text-lg lg:text-xl font-light">C</h3>
            </div>
          </div>

          <h3 className="m-5 w-full text-center text-2xl font-semibold">
            {weather?.main?.temp_min}° {isCelsius ? "C" : "F"}
          </h3>

          <div className="mt-3 flex items-center">
            <h4 className="text-lg lg:text-xl font-semibold">Min: </h4>
            <h4 className="ml-2 text-lg lg:text-xl font-light">
              {weather?.main?.temp_min}° {isCelsius ? "C" : "F"}
            </h4>
          </div>
          <div className="mt-3 flex items-center">
            <h4 className="text-lg lg:text-xl font-semibold">Max: </h4>
            <h4 className="ml-2 text-lg lg:text-xl font-light">
              {weather?.main?.temp_max}° {isCelsius ? "C" : "F"}
            </h4>
          </div>
        </div>
        <div className="mt-8 flex items-center">
          <h3 className="text-lg lg:text-xl font-semibold">Humidity: </h3>
          <h3 className="ml-2 text-lg lg:text-xl font-light">
            {weather?.main?.humidity}%
          </h3>
        </div>

        <div className="mt-8 flex items-center">
          <h3 className="text-lg lg:text-xl font-semibold">Wind speed: </h3>
          <h3 className="ml-2 text-lg lg:text-xl font-light">
            {weather?.wind?.speed} {isCelsius ? "meter/sec" : "meter/hr"}
          </h3>
        </div>

        <div className="mt-8 flex items-center">
          <h3 className="text-lg lg:text-xl font-semibold">Rain: </h3>
          <h3 className="ml-2 text-lg lg:text-xl font-light">
            {weather?.rain?.["1h"] || 0} mm
          </h3>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
