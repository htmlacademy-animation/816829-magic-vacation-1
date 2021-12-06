import {isMobileOrPortrait} from '../helpers/document-helpers';

export default () => {
  const emailInputs = document.querySelectorAll(`input[type="email"]`);

  const setEmailPlaceholders = () => {
    emailInputs.forEach((emailInput) => {
      emailInput.placeholder = isMobileOrPortrait()
        ? `e-mail`
        : `e-mail для регистации результата и получения приза`;
    });
  };

  window.addEventListener(`resize`, setEmailPlaceholders);
  setEmailPlaceholders();
};
