import icons from 'url:../../img/icons.svg';
import { debounce } from 'lodash';
import { TEMP_IN_C, TEMP_IN_F } from '../config';

class SearchView {
	// Private fields //
	_data;
	_parentElement = document.querySelector('.search');
	_cityAutocompleteTable = document.querySelector('.city-autocomplete-table');
	_debounceHnadler = debounce((handler) => {
		handler();
	}, 2000);

	// Private methods //
	_clearInput() {
		this._parentElement.querySelector('.search-field').value = '';
	}

	_clear() {
		this._cityAutocompleteTable.innerHTML = '';
	}

	_generateMarkup() {
		return `
		${this._data
			.map(
				(city) =>
					`
				<div class="city-wrapper">
					<li class="city">${city.name}</li>
					<span class="city-country">- ${city.country}</span>
				</div>
			`
			)
			.join(' ')}
	`;
	}

	_regenerateSpinner() {
		const markup = `
			<div class="spinner-wrapper">
				<div class="spinner">
					<svg>
						<use href="${icons}#icon-loader"></use>
					</svg>
				</div>
			</div>
		`;

		this._clear();
		this._cityAutocompleteTable.insertAdjacentHTML('afterbegin', markup);
	}

	// Public methods //
	renderCityAutocomplete(data) {
		if (!data) return;

		this._data = data;
		const markup = this._generateMarkup();

		this._clear();
		this._cityAutocompleteTable.insertAdjacentHTML('afterbegin', markup); // Adding the html to the DOM
	}

	addHandlerkeyPress(handler) {
		this._parentElement.querySelector('.search-field').addEventListener('input', () => {
			this.addHandlerDebounce(handler);
		});
	}

	addHandlerDebounce(handler) {
		const input = this.getQuery();

		if (input.length >= 3) {
			this._cityAutocompleteTable.children[0].className === 'city-wrapper' || 'city-autocomplete-error' ? this._regenerateSpinner() : null;
			this._cityAutocompleteTable.classList.remove('hidden');
			this._debounceHnadler(handler);
		} else {
			this._cityAutocompleteTable.classList.add('hidden');
			this._debounceHnadler.cancel();
		}
	}

	getQuery() {
		const query = this._parentElement.querySelector('.search-field').value;
		return query;
	}

	addHandlerSelect(handler) {
		this._cityAutocompleteTable.addEventListener('click', (e) => {
			let city;
			const clickedElement = e.target.classList.contains('city-wrapper') || e.target.classList.contains('city') || e.target.classList.contains('city-country');
			if (!clickedElement) return;

			switch (e.target.className) {
				case 'city-wrapper':
					city = e.target.firstElementChild.textContent;
					break;
				case 'city':
					city = e.target.textContent;
					break;
				case 'city-country':
					city = e.target.previousElementSibling.textContent;
					break;
			}

			this._clearInput();
			this._cityAutocompleteTable.classList.add('hidden');
			handler(city);
		});
	}

	addHandlerEnter() {
		this._parentElement.addEventListener('keypress', (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				alert('Please select the city name from the search!');
			}
		});
	}

	addHandlerCFbutton(handler) {
		const CFWrapper = this._parentElement.closest('.container-wrapper').querySelector('.c-f-wrapper');
		CFWrapper.addEventListener('click', (e) => {
			if (e.target.classList.contains('button')) {
				const buttons = CFWrapper.querySelectorAll('.button');
				for (const el of buttons) {
					el.classList.remove('active');
				}
				e.target.classList.toggle('active');
				const unit = e.target.textContent === 'C' ? TEMP_IN_C : TEMP_IN_F;
				handler(unit);
			}
		});
	}

	renderError(message) {
		const markup = `
			<div class="city-autocomplete-error">
				<p>${message}</p>
			</div>
		`;
		this._clear();
		this._cityAutocompleteTable.insertAdjacentHTML('afterbegin', markup);
	}

	// Change placeholder text in screen size 500px
	changeplaceholderText = function () {
		let mql = window.matchMedia('(max-width: 500px)');
		if (mql.matches) this._parentElement.querySelector('.search-field').placeholder = 'Type city name here';
	};
}

export default new SearchView();
