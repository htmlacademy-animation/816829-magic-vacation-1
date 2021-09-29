import {findAncestor} from '../helpers/document-helpers';

export default () => {
  document.querySelectorAll(`.js-footer-toggler`).forEach((footerTogglerElement) => {
    footerTogglerElement.addEventListener(`click`, () => {
      const footer = findAncestor(footerTogglerElement, `.screen__footer`);
      footer.classList.toggle(`screen__footer--full`);
    });
  });
};
