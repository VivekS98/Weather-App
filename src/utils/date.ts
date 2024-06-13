export function isNightAtDate(data: any): boolean {
  const sunrise = new Date(data.sys.sunrise * 1000);
  const sunset = new Date(data.sys.sunset * 1000);

  // Get the current time (in UTC)
  const currentTime = new Date();

  // Determine if it's day or night
  if (currentTime >= sunrise && currentTime < sunset) {
    return false;
  } else {
    return true;
  }
}
