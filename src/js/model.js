import { async } from 'regenerator-runtime';
import { CURRENT_WEATHER_URL, THREE_HOUR_FORECAST_URL, WEATHER_ICON_URL, WEATHER_ICON_SIZE, KEY, TEMP_IN_C, TEMP_IN_F } from './config.js';
import { reverseGeocoding, todayDate, time, threeHourForecastTime, weatherIcon, getRegionName } from './helpers.js';

export const state = {
	currentLocation: {},
	weatherInfo: {
		// currentWeatherD: {},
		// threeHourForecastD: {},
	},
	search: {
		query: '',
		// cities: [],
	},
};

// Get the current location lat and lng
const getPosition = function () {
	return new Promise(function (resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
};

// Reverse Geocoding using let and lng to get the country name
export const currentLocation = async function () {
	try {
		const pos = await getPosition();
		const { latitude: lat, longitude: lng } = pos.coords;
		const responce = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
		const data = await responce.json();

		if (!responce.ok) throw new Error(`${data.message} (${responce.status})`);
		state.currentLocation.city = data.city;
		state.currentLocation.countryCode = data.countryCode;
	} catch (err) {
		throw err;
	}
};

// Get the current weather info
export const currentWeather = async function (city, countryCode, unit = TEMP_IN_C) {
	try {
		// Get the current weather detiles
		const responce = await fetch(`${CURRENT_WEATHER_URL}${city},${countryCode}${KEY}${unit}`);
		const data = await responce.json();

		// Creating the currentWeatherD object based on the data
		state.weatherInfo.currentWeatherD = {
			date: todayDate(data.dt),
			temp: Math.round(data.main.temp),
			city: data.name,
			country: getRegionName(data.sys.country),
			icon: weatherIcon(data.weather[0]),
			sunrise: time(data.sys.sunrise, data.timezone),
			sunset: time(data.sys.sunset, data.timezone),
			humidity: Math.round(data.main.humidity),
			wind: Math.round(data.wind.speed * 3.6), // m/s to km/h (multiply the speed value by 3.6)
			pressure: data.main.pressure,
			feelslike: Math.round(data.main.feels_like),
			visibility: Math.round(data.visibility / 1000),
			unit: unit === TEMP_IN_C ? '&#x2103;' : '&#x2109;',
		};
	} catch (err) {
		throw err;
	}
};

// Get the three hour forecast weather info
export const threeHourForecast = async function (city, countryCode, unit = TEMP_IN_C) {
	try {
		const responce = await fetch(`${THREE_HOUR_FORECAST_URL}${city},${countryCode}${KEY}${unit}`);
		const data = await responce.json();

		// Creating the threeHourForecastD array of object based on the data.list
		state.weatherInfo.threeHourForecastD = data.list
			.filter((_, i) => i < 7) // From here we are getting the 7 array elements only
			.map((forecast) => {
				return {
					time: threeHourForecastTime(forecast.dt),
					icon: weatherIcon(forecast.weather[0]),
					temp: Math.round(forecast.main.temp),
					precipitation: forecast.pop,
				};
			});
	} catch (err) {
		throw err;
	}
};

// search the city's based on the user type (For city suggestion Autocomplete)
export const citySearch = async function (query) {
	try {
		state.search.query = query;
		const queryStartWith = query.toUpperCase()[0];

		const responce = await fetch(`https://api.api-ninjas.com/v1/city?name=${query}&limit=5`, {
			method: 'GET',
			headers: { 'X-Api-Key': 'ldZBfJ2XvLjLe+sbVqVbEw==XrR7maLjwNPhbNX8' },
			contentType: 'application/json',
		});

		const data = await responce.json();

		const cityNameStartWith = data.some((city) => city.name.startsWith(queryStartWith));
		if (data.length === 0 || !cityNameStartWith) throw new Error(`There are no cities for your search!`);

		// const cityNameStartWith = data.some((city) => city.name.startsWith(queryStartWith));
		// if (!cityNameStartWith) throw new Error(`There are no cities for your search!`);

		state.search.cities = data
			.filter(function (city) {
				return city.name.startsWith(queryStartWith);
			})
			.map((city) => {
				return {
					name: city.name,
					country: getRegionName(city.country),
				};
			});
	} catch (err) {
		throw err;
	}
};
