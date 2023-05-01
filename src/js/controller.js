import * as model from './model.js';
import View from './views/view.js';
import { pageMainContainer } from './views/view.js';
import weatherDataOne from './views/weatherDataOne.js';
import weatherDataTwo from './views/weatherDataTwo.js';
import searchView from './views/searchView.js';

import 'core-js/stable'; // This is for polyfilling everything else
import 'regenerator-runtime'; // This is for polyfilling async await
import { async } from 'regenerator-runtime';

//Control current location weather infor
const controlCLWI = async function () {
	try {
		pageMainContainer.renderSpinner(); // Rendering the spinner on the page main container
		await model.currentLocation();
		await model.currentWeather(model.state.currentLocation.city);
		await model.threeHourForecast(model.state.currentLocation.city);
		weatherDataOne.render(model.state.weatherInfo);
		weatherDataTwo.render(model.state.weatherInfo);
		pageMainContainer.clearSpinner();
	} catch (err) {
		err.message === 'User denied Geolocation' ? pageMainContainer.renderError((err.message = `${err.message}: Please Allow location from your browser! and reload the page`)) : pageMainContainer.renderError(err.message);
	}
};

// Controler for city auto complete
const controlCityAutocomplete = async function () {
	try {
		const query = searchView.getQuery();

		await model.citySearch(query);

		searchView.renderCityAutocomplete(model.state.search.cities);
	} catch (err) {
		searchView.renderError(err.message);
	}
};

// Search to get the weather information
const controlSelectResults = async function (city) {
	try {
		pageMainContainer.renderSpinner();
		await model.currentWeather(city);
		await model.threeHourForecast(city);
		weatherDataOne.render(model.state.weatherInfo);
		weatherDataTwo.render(model.state.weatherInfo);
		pageMainContainer.clearSpinner();
	} catch (err) {
		pageMainContainer.renderError(err.message);
	}
};

// Controller for C / F button
const controlCFButtons = async function (unit) {
	try {
		pageMainContainer.renderSpinner();
		await model.currentWeather(model.state.weatherInfo.currentWeatherD.city, unit);
		await model.threeHourForecast(model.state.weatherInfo.currentWeatherD.city, unit);
		weatherDataOne.render(model.state.weatherInfo);
		weatherDataTwo.render(model.state.weatherInfo);
		pageMainContainer.clearSpinner();
	} catch (err) {
		pageMainContainer.renderError(err.message);
	}
};

const init = function () {
	controlCLWI();
	searchView.addHandlerkeyPress(controlCityAutocomplete);
	searchView.addHandlerSelect(controlSelectResults);
	searchView.addHandlerEnter();
	searchView.addHandlerCFbutton(controlCFButtons);
	searchView.changeplaceholderText();
};

init();
