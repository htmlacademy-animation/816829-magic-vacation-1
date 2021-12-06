export default () => {
  const socialBlock = document.querySelector(`.js-social-block`);
  socialBlock.addEventListener(`mouseenter`, () => {
    socialBlock.classList.add(`social-block--active`);
  });
  socialBlock.addEventListener(`mouseleave`, () => {
    socialBlock.classList.remove(`social-block--active`);
  });
};
