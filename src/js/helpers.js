import moment from 'moment/moment.js';

// Funtion to get the (Day, Date Month)
export const todayDate = function (timestamp) {
	let today = timestamp * 1000;
	today = new Date(today);

	//(Day, Date Mon)
	const day = today.toLocaleString('default', { weekday: 'short' });
	const date = today.toLocaleString('default', { day: 'numeric' });
	const month = today.toLocaleString('default', { month: 'short' });

	return `${day}, ${date} ${month}`;
};

// Funtion to get the time (5:51 AM or PM) Sunrise and Sunset
export const time = function (timestamp, timezone) {
	//https://stackoverflow.com/questions/70721356/how-to-display-sunrise-and-sunset-time-in-the-local-time-of-the-city-that-is-bei
	let time = moment.utc(timestamp, 'X').add(timezone, 'seconds').format('LT');
	return time;
};

// Function to get the hour time for threeHourForecast (12pm)
export const threeHourForecastTime = function (timestamp) {
	let time = timestamp * 1000;
	time = new Date(time).toLocaleString('default', { hour: 'numeric', hour12: 'true' });
	return time;
};

// Function to use my svg icons based on the open weather api icon
export const weatherIcon = function (weather) {
	let iconId;
	switch (weather.icon) {
		case '01d':
			iconId = '#d-clear-sky';
			break;

		case '01n':
			iconId = '#n-clear-sky';
			break;

		case '02d':
			iconId = '#d-few-clouds';
			break;

		case '02n':
			iconId = '#n-few-clouds';
			break;

		case '03d':
		case '03n':
			iconId = '#c-scattered-clouds';
			break;

		case '04d':
		case '04n':
			iconId = '#c-broken-clouds';
			break;

		case '09d':
		case '09n':
			iconId = '#c-shower-rain';
			break;

		case '10d':
		case '10n':
			iconId = '#c-rain';
			break;

		case '11d':
		case '11n':
			iconId = '#c-thunderstorm';
			break;

		case '13d':
		case '13n':
			iconId = '#c-snow';
			break;

		case '50d':
		case '50n':
			iconId = '#c-mist';
			break;
		default:
			console.log('Not a valid icon');
	}
	return iconId;
};

// Function to get the country name from the country code
export const getRegionName = function (code) {
	const regionName = new Intl.DisplayNames(['en'], { type: 'region' });
	return regionName.of(`${code}`);
};
