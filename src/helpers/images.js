import clear from 'images/Clear.png';
import hail from 'images/Hail.png';
import heavyCloud from 'images/HeavyCloud.png';
import heavyRain from 'images/HeavyRain.png';
import lightCloud from 'images/LightCloud.png';
import lightRain from 'images/LightRain.png';
import shower from 'images/Shower.png';
import sleet from 'images/Sleet.png';
import snow from 'images/Snow.png';
import thunderstorm from 'images/Thunderstorm.png';

export const weatherImages = [
  clear,
  hail,
  heavyCloud,
  heavyRain,
  lightCloud,
  lightRain,
  shower,
  sleet,
  snow,
  thunderstorm,
];

export const getWeatherImage = (weather) => {
  switch (weather) {
    case 'c':
      return clear;
    case 'h':
      return hail;
    case 'hc':
      return heavyCloud;
    case 'hr':
      return heavyRain;
    case 'lc':
      return lightCloud;
    case 'lr':
      return lightRain;
    case 's':
      return shower;
    case 'sl':
      return sleet;
    case 'sn':
      return snow;
    case 't':
      return thunderstorm;
    default:
      break;
  }
};
