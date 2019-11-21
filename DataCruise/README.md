# Cruise Diary Dataset

## General description

The aim is to build a narrative tool that tells the story of a sea cruise using the data collected during the cruise. Optional integration with additional, external data is welcome: for example, weather data from external stations (this is how we collected this type of data for the mockup csv), astronomical data (sunset/sunrise, sun height during the day, moon rising/setting and phases).

Right now, we are giving you a mockup dataset, because the system for collecting data from the ship is not yet live and running. We will provide real data as it becomes available, and we might expand the mockup data if possible (right now it's just a subset of all possible data fields that we are envisioning). In particular, the mock up dataset still misses: water depth and the cruise guests biometric data.

## Mockup Dataset (available now)

### entries.csv header
appWindDir,appWindSpeed,computedWindDir,computedWindSpeed,distance,elevation,humidity,lat,lon,pressure,shipDirection,shipSpeed,solarRadiation,temperature,time,UVIndex,waterTemperature

### units of measure
ship_direction (deg)
wind_speed (knots)
wind_direction (deg)
elevation (m) 
humidity (%)
ship_speed (knots)
UV_index
solar_radiation (w/m^2)
pressure (hPa)
temperature (deg)
distance_traveled (km)
apparent_wind_speed (knots)
apparent_wind_direction (deg)
longitude
latitude
current_time

## Data Fields that may be present in the future

### from the boat itself:
- boat position/speed
- wind
- sea depth (tbd)
- humidity, water and air temperature (tbd)
- air quality sensors (gases, co2) (tbd)
### From weather stations
- UV/solar exposition,
- temperature, humidity
- sunny/cloudy/rain (tbd)
- sea waves (tbd)
### Cruise passengers biometric data
- heart rate, temperature (tbd)
- at rest / exhertion (tbd)
- raw accelerometer data (tbd)

