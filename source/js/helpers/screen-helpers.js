/** @enum {string} */
const ScreenState = {
  HIDDEN: `hidden`,
  CURRENT: `current`,
  ACTIVE: `active`,
  DEACTIVATED: `deactivated`,
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
  ScreenState,
  setScreenState,
  getScreenIdByLocation,
};
