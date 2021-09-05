/** @enum {string} */
const ScreenState = {
  HIDDEN: `hidden`,
  CURRENT: `current`,
  ACTIVE: `active`,
  DEACTIVATED: `deactivated`,
};

/**
 * @param {DOMElement} element
 * @param {ScreenState} state
 */
const setScreenState = (element, state) => {
  if (!element) {
    return;
  }
  switch (state) {
    case ScreenState.HIDDEN:
      element.classList.remove(`active`, `deactivated`);
      element.classList.add(`screen--hidden`);
      break;

    case ScreenState.CURRENT:
      element.classList.remove(`active`, `deactivated`, `screen--hidden`);
      break;

    case ScreenState.ACTIVE:
      element.classList.add(`active`);
      break;

    case ScreenState.DEACTIVATED:
      element.classList.add(`deactivated`);
      break;
  }
};

export {
  ScreenState,
  setScreenState,
};
