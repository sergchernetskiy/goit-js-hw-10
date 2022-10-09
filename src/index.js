import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { refs } from './js/refs';
import { fetchCountries } from './js/fetchCountries';
import {
  createMarkupCountriesList,
  createMarkupOfCountry,
} from './js/createMarkup';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const inputValue = event.target.value.trim();
  //console.log(inputValue);

  if (!inputValue) {
    clearCountryList();
    clearCountryInfo();
    return;
  }

  fetchCountries(inputValue).then(addMarkup).catch(onError);
}

function addMarkup(data) {
  const numberOfCountries = data.length;

  if (numberOfCountries > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    clearCountryList();
    clearCountryInfo();
  } else if (numberOfCountries <= 10 && numberOfCountries >= 2) {
    clearCountryInfo();
    createMarkupCountriesList(data);
  } else if (numberOfCountries === 1) {
    clearCountryList();
    createMarkupOfCountry(data);
  }
}

function clearCountryList() {
  refs.countryList.innerHTML = '';
}

function clearCountryInfo() {
  refs.countryInfo.innerHTML = '';
}

function onError() {
  Notiflix.Notify.failure('Oops, there is no country with that name.');
}
