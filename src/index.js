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
  const amountCountries = data.length;

  if (amountCountries > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    clearCountryList();
    clearCountryInfo();
    return;
  } else if (amountCountries > 2 && amountCountries <= 10) {
    clearCountryInfo();
    createMarkupCountriesList(data);
    return;
  } else if (amountCountries === 1) {
    clearCountryList();
    createMarkupOfCountry(data);
  }
}

function clearCountryList() {
  countryList.innerHTML = '';
}

function clearCountryInfo() {
  countryInfo.innerHTML = '';
}

function onError() {
  Notiflix.Notify.failure('Oops, there is no country with that name.');
}
