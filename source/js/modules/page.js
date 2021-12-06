import {applyAccentTypography} from 'js/helpers/animation-helpers';

const ACCENT_TYPOGRAPHY_SELECTORS = [
  `.intro__title`,
  `.intro__date`,
  `.slider__item-title`,
  `.prizes__title`,
  `.rules__title`,
  `.game__title`,
];

export default () => {
  window.addEventListener(`load`, () => {
    document.body.classList.add(`loaded`);
  }, {once: true});

  ACCENT_TYPOGRAPHY_SELECTORS.forEach((selector) => {
    applyAccentTypography(document.querySelector(selector));
  });
};
