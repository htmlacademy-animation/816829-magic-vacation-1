import {addClassToken, isPortrait as calculateIsPortrait} from '../helpers/document-helpers';
import {ScreenId, ScreenEventType} from '../helpers/screen-helpers';

export default () => {
  const prizesScreen = document.querySelector(`.screen--prizes`);
  const journeysLandscapeIconTemplate = document.querySelector(`#journeys-landscape-icon-template`);
  const journeysPortraitIconTemplate = document.querySelector(`#journeys-portrait-icon-template`);
  const journeysIconContainer = document.querySelector(`.prizes__item--journeys .prizes__icon`);

  const state = {
    isPortrait: undefined,
  };

  const renderJourneysIcon = () => {
    const isPortrait = calculateIsPortrait();
    if (state.isPortrait === isPortrait) {
      return;
    }
    state.isPortrait = isPortrait;

    const iconTemplate = isPortrait
      ? journeysPortraitIconTemplate
      : journeysLandscapeIconTemplate;

    journeysIconContainer.replaceChild(iconTemplate.content.cloneNode(true), journeysIconContainer.firstElementChild);

    addClassToken(prizesScreen, `first-glance`);
  };

  const onScreenChange = (evt) => {
    const {currentScreen} = evt.detail;

    if (currentScreen.id === ScreenId.PRIZES) {
      renderJourneysIcon();

      window.addEventListener(`resize`, onWindowResize);
    }
  };

  const onPreviousScreenHidden = (evt) => {
    const {previousScreen} = evt.detail;

    if (previousScreen && previousScreen.id === ScreenId.PRIZES) {
      window.removeEventListener(`resize`, onWindowResize);
    }
  };

  const onWindowResize = (_evt) => {
    renderJourneysIcon();
  };

  document.body.addEventListener(ScreenEventType.SCREEN_CHANGE, onScreenChange);
  document.body.addEventListener(ScreenEventType.PREVIOUS_SCREEN_HIDDEN, onPreviousScreenHidden);
};
