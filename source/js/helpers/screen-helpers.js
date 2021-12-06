/** @enum {string} */
const ScreenId = {
  PRIZES: `prizes`,
};

/** @enum {string} */
const ScreenState = {
  HIDDEN: `hidden`,
  CURRENT: `current`,
  ACTIVE: `active`,
  DEACTIVATED: `deactivated`,
};

/** @enum {string} */
const ScreenEventType = {
  SCREEN_CHANGE: `screenchange`,
  PREVIOUS_SCREEN_HIDDEN: `previousscreenhidden`,
  CURRENT_SCREEN_ACTIVE: `currentscreenactive`,
};

/**
 * @param {{element: Element}} screen
 * @param {ScreenState} state
 */
const setScreenState = (screen, state) => {
  if (!screen) {
    return;
  }
  switch (state) {
    case ScreenState.HIDDEN:
      screen.element.classList.remove(`active`, `deactivated`);
      screen.element.classList.add(`screen--hidden`);
      break;

    case ScreenState.CURRENT:
      screen.element.classList.remove(`active`, `deactivated`, `screen--hidden`);
      break;

    case ScreenState.ACTIVE:
      screen.element.classList.add(`active`);
      break;

    case ScreenState.DEACTIVATED:
      screen.element.classList.add(`deactivated`);
      break;
  }
};

const getScreenIdByLocation = () => {
  return window.location.hash.substring(1);
};

export {
  ScreenId,
  ScreenState,
  ScreenEventType,
  setScreenState,
  getScreenIdByLocation,
};
