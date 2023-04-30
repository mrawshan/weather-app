import View from './view.js';
import icons from 'url:../../img/icons.svg';

class WeatherDataOne extends View {
	// Private fields //
	_parentElement = document.querySelector('.weather-d-1');

	// Private methods //
	_generateMarkup() {
		return `
            <div class="row">
                <div class="col-md-4 col1">
                    <div class="wrapper">
                        <p>Today</p>
                        <span class="date">${this._data.currentWeatherD.date}</span>
                        <svg class="icon-weather">
                            <use href="${icons}${this._data.currentWeatherD.icon}"></use>
                        </svg>

                        <h1 class="degree">${this._data.currentWeatherD.temp}<span class="unit-main">${this._data.currentWeatherD.unit}</span></h1>
                        <svg class="icon-location">
                            <use href="${icons}#icon-location"></use>
                        </svg>
                        <span class="country">${this._data.currentWeatherD.city}, ${this._data.currentWeatherD.country}</span>
                    </div>
                </div>

                <!-- Column two -->
                <div class="col-md-8 col2">
                    <div class="wrapper">
                        <p class="time">Now</p>
                        <span class="circle circle-now">
                            <svg class="icon-weather">
                                <use href="${icons}${this._data.currentWeatherD.icon}"></use>
                                <span class="degree">${this._data.currentWeatherD.temp}<span class="unit-secondary">${this._data.currentWeatherD.unit}</span></span>
                            </svg>
                        </span>
                    </div>

                    ${this._data.threeHourForecastD
								.map(
									(forecast) =>
										`
                    <div class="wrapper">
                        <p class="time">${forecast.time}</p>
                        <span class="circle">
                            <svg class="icon-weather">
                                <use href="${icons}${forecast.icon}"></use>
                                <span class="degree">${forecast.temp}<span class="unit-secondary">${this._data.currentWeatherD.unit}</span></span>
                            </svg>
                        </span>
                    </div>
                  `
								)
								.join(' ')}
                </div>
            </div>
        `;
	}
}

export default new WeatherDataOne();
