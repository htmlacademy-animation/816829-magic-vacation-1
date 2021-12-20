import {addClassToken, isPortrait as calculateIsPortrait} from '../helpers/document-helpers';
import {ScreenId, ScreenEventType} from '../helpers/screen-helpers';

const PRIZE_KEYS = [`journeys`, `cases`, `codes`];

export default () => {
  const prizesScreen = document.querySelector(`.screen--prizes`);

  const icons = PRIZE_KEYS.map((prizeKey) => ({
    iconContainer: document.querySelector(`.prizes__item--${prizeKey} .prizes__icon`),
    portraitIconTemplate: document.querySelector(`#${prizeKey}-portrait-icon-template`),
    landscapeIconTemplate: document.querySelector(`#${prizeKey}-landscape-icon-template`),
  }));

  const state = {
    isPortrait: undefined,
  };

  const renderIcons = () => {
    const isPortrait = calculateIsPortrait();
    if (state.isPortrait === isPortrait) {
      return;
    }
    state.isPortrait = isPortrait;

    for (const {iconContainer, portraitIconTemplate, landscapeIconTemplate} of icons) {
      const adaptiveIconTemplate = isPortrait
        ? portraitIconTemplate
        : landscapeIconTemplate;

      iconContainer.replaceChild(adaptiveIconTemplate.content.cloneNode(true), iconContainer.firstElementChild);
    }

    addClassToken(prizesScreen, `first-glance`);
  };

  const onWindowResize = (_evt) => {
    renderIcons();
  };

  const onScreenChange = (evt) => {
    const {currentScreen} = evt.detail;

    if (currentScreen.id === ScreenId.PRIZES) {
      renderIcons();

      window.addEventListener(`resize`, onWindowResize);
    }
  };

  const onPreviousScreenHidden = (evt) => {
    const {previousScreen} = evt.detail;

    if (previousScreen && previousScreen.id === ScreenId.PRIZES) {
      window.removeEventListener(`resize`, onWindowResize);
    }
  };

  document.body.addEventListener(ScreenEventType.SCREEN_CHANGE, onScreenChange);
  document.body.addEventListener(ScreenEventType.PREVIOUS_SCREEN_HIDDEN, onPreviousScreenHidden);
};
