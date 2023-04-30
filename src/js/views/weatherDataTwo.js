import View from './view.js';
import icons from 'url:../../img/icons.svg';

class WeatherDataTwo extends View {
	// Private fields //
	_parentElement = document.querySelector('.weather-d-2');

	// Private methods //
	_generateMarkup() {
		return `
        <h4>Weather Details</h4>
        <div class="weather-d-container">
            <div class="card-wrapper">
                <div class="content-wrapper">
                    <span class="heading">sunrise</span>
                    <span class="w-detailes">${this._data.currentWeatherD.sunrise}</span>
                    <svg class="icon-sunrise">
                        <use href="${icons}#icon-sunrise"></use>
                    </svg>
                </div>
            </div>
            <div class="card-wrapper">
                <div class="content-wrapper">
                    <span class="heading">sunset</span>
                    <span class="w-detailes">${this._data.currentWeatherD.sunset}</span>
                    <svg class="icon-sunset">
                        <use href="${icons}#icon-sunset"></use>
                    </svg>
                </div>
            </div>
            <div class="card-wrapper">
                <div class="content-wrapper">
                    <span class="heading">precipitation</span>
                    <span class="w-detailes">${this._data.threeHourForecastD[0].precipitation} %</span>
                    <svg class="icon-precipitation">
                        <use href="${icons}#icon-precipitation"></use>
                    </svg>
                </div>
            </div>
            <div class="card-wrapper">
                <div class="content-wrapper">
                    <span class="heading">humidity</span>
                    <span class="w-detailes">${this._data.currentWeatherD.humidity} %</span>
                    <svg class="icon-humidity">
                        <use href="${icons}#icon-humidity"></use>
                    </svg>
                </div>
            </div>
            <div class="card-wrapper">
                <div class="content-wrapper">
                    <span class="heading">wind</span>
                    <span class="w-detailes">${this._data.currentWeatherD.wind} km/h</span>
                    <svg class="icon-wind">
                        <use href="${icons}#icon-wind"></use>
                    </svg>
                </div>
            </div>
            <div class="card-wrapper">
                <div class="content-wrapper">
                    <span class="heading">pressure</span>
                    <span class="w-detailes">${this._data.currentWeatherD.pressure} hPa</span>
                    <svg class="icon-pressure">
                        <use href="${icons}#icon-pressure"></use>
                    </svg>
                </div>
            </div>
            <div class="card-wrapper">
                <div class="content-wrapper">
                    <span class="heading">feels like</span>
                    <span class="w-detailes feels-like" style="display: inline">${this._data.currentWeatherD.feelslike}</span><span class="unit-secondary-w-d-2" style="display: inline">${this._data.currentWeatherD.unit}</span>
                    <svg class="icon-feels-like">
                        <use href="${icons}#icon-feelslike"></use>
                    </svg>
                </div>
            </div>
            <div class="card-wrapper">
                <div class="content-wrapper">
                    <span class="heading">visibility</span>
                    <span class="w-detailes">${this._data.currentWeatherD.visibility} km</span>
                    <svg class="icon-visibility">
                        <use href="${icons}#icon-visibility"></use>
                    </svg>
                </div>
            </div>
        </div>
        `;
	}
}

export default new WeatherDataTwo();
