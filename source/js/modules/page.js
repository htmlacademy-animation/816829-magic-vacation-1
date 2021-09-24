import {applyAccentTypography} from 'js/helpers/animation-helpers';

export default () => {
  window.addEventListener(`load`, () => {
    document.body.classList.add(`loaded`);
  });

  applyAccentTypography(document.querySelector(`.intro__title`));
  applyAccentTypography(document.querySelector(`.intro__date`));
  applyAccentTypography(document.querySelector(`.slider__item-title`));
  applyAccentTypography(document.querySelector(`.prizes__title`));
  applyAccentTypography(document.querySelector(`.rules__title`));
  applyAccentTypography(document.querySelector(`.game__title`));
};
