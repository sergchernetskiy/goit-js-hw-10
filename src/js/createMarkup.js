import { refs } from './refs';

export function createMarkupCountriesList(countries) {
  const markup = countries
    .map(({ flags, name }) => {
      return `<li class="country-list__item">
      <img class="country-list__image" src="${flags.svg}" alt="Flag of country" width="40" height="30">
      <p class="country-list__text">${name.official}</p>
    </li>`;
    })
    .join('');

  return refs.countryList.insertAdjacentHTML('beforeend', markup);
}

/* export function createMarkupOfCountry({
  flags,
  name,
  capital,
  population,
  languages,
}) {
  const langStr = Object.values(languages).join(', ');
  const markupInfoOfCountry = `<div class="country-info__box">
  <img class="country-info__image" src="${flags.svg}" alt="Flag of country" width="60" height="50">
      <p class="country-info__text">${name.official}</p>
      </div>
      <p class="country-info__text"><span class="country-info__name-text">Capital: </span>${capital}</p>
      <p class="country-info__text"><span class="country-info__name-text">Population: </span>${population}</p>
      <p class="country-info__text"><span class="country-info__name-text">Languages: </span>${langStr}</p>`;

  return refs.countryInfo.insertAdjacentHTML('beforeend', markupInfoOfCountry);
} */

export function createMarkupOfCountry([country]) {
  const langStr = Object.values(country.languages).join(', ');
  const markupInfoOfCountry = `<div class="country-info__box">
  <img class="country-info__image" src="${country.flags.svg}" alt="Flag of country" width="60" height="40">
      <p class="country-info__text">${country.name.official}</p>
      </div>
      <p class="country-info__text"><span class="country-info__name-text">Capital: </span>${country.capital}</p>
      <p class="country-info__text"><span class="country-info__name-text">Population: </span>${country.population}</p>
      <p class="country-info__text"><span class="country-info__name-text">Languages: </span>${langStr}</p>`;

  return refs.countryInfo.insertAdjacentHTML('beforeend', markupInfoOfCountry);
}
