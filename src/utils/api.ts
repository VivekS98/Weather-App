const KEY = "4103f32e36affa7f132a4c76882fec30";

export const getCoordinatesByLocation = async (place: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=25&appid=${KEY}`
  );
  return response.json();
};

export const getWeatherInfo = async (
  latitiude: number,
  longitude: number,
  isCelcius: boolean
) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitiude}&lon=${longitude}&appid=${KEY}&units=${
      isCelcius ? "metric" : "imperial"
    }`
  );
  return response.json();
};
