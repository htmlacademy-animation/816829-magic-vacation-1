import throttle from 'lodash/throttle';
import {ScreenState, setScreenState} from "../helpers/screen-helpers";

const Timeout = {
  THROTTLE: 1000,
  HIDDEN: 500,
};

export default class FullPageScroll {
  constructor() {
    this.scrollFlag = true;
    this.timeout = null;

    this.screenElements = Array.from(document.querySelectorAll(`.screen:not(.screen--result)`));
    this.menuElements = Array.from(document.querySelectorAll(`.page-header__menu .js-menu-link`));

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);

    this.onHidden = null;
    this.hiddenTimeoutId = 0;
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, Timeout.THROTTLE, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  onUrlHashChanged() {
    const newIndex = this.screenElements.findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    if (this.onHidden) {
      this.onHidden();
    }

    const currentScreenElement = this.screenElements[this.activeScreen];
    let previousScreenElement = this.screenElements.find((screen) => screen.classList.contains(`active`));

    if (previousScreenElement === currentScreenElement) {
      previousScreenElement = undefined;
    }

    setScreenState(currentScreenElement, ScreenState.CURRENT);

    requestAnimationFrame(() => {
      setScreenState(currentScreenElement, ScreenState.ACTIVE);
    });

    setScreenState(previousScreenElement, ScreenState.DEACTIVATED);

    this.onHidden = () => {
      clearTimeout(this.hiddenTimeoutId);
      this.onHidden = null;

      setScreenState(previousScreenElement, ScreenState.HIDDEN);
    };
    this.hiddenTimeoutId = setTimeout(this.onHidden, Timeout.HIDDEN);
  }

  changeActiveMenuItem() {
    const activeItem = this.menuElements.find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen],
      },
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
