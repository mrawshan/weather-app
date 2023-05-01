import icons from 'url:../../img/icons.svg';

// Parent class
export default class View {
	// Private fields //
	_data;
	_errorMessage = 'We could not find weather detailes. Please try after sometimes!';
	_parentElement = document.querySelector('.main-container');

	// Private methods //
	_clear() {
		this._parentElement.innerHTML = '';
	}

	// Public methods //
	render(data) {
		if (!data) return;

		this._data = data;
		const markup = this._generateMarkup();

		this._clear();
		this._parentElement.insertAdjacentHTML('afterbegin', markup); // Adding the html to the DOM
	}

	// Loading spinner
	renderSpinner() {
		const markup = `
			<div class="spinner-wrapper">
				<div class="overlay"></div>
				<div class="main-spinner spinner">
					<svg>
						<use href="${icons}#icon-loader"></use>
					</svg>
				</div>
			</div>
        `;

		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}

	// To clear the spinner
	clearSpinner() {
		document.querySelector('.spinner-wrapper').remove();
	}

	// Render the error
	renderError(message = this._errorMessage) {
		const markup = `
		<div class="overlay"></div>
            <div class="error">
                <p>${message}</p>
            </div>
        `;
		this.clearSpinner();
		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}
}

export const pageMainContainer = new View(); // pageMainContainer instance of the View class
