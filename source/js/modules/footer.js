import {findAncestor} from 'helpers/document-helpers';

export default () => {
  const footerTogglers = document.querySelectorAll(`.js-footer-toggler`);
  footerTogglers.forEach((footerToggler) => {
    footerToggler.addEventListener(`click`, () => {
      const footer = findAncestor(footerToggler, `.screen__footer`);
      footer.classList.toggle(`screen__footer--full`);
    });
  });
};
