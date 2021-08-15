export default () => {
  let socialBlock = document.querySelector(`.js-social-block`);
  socialBlock.addEventListener(`mouseover`, function () {
    socialBlock.classList.add(`social-block--active`);
  });
  socialBlock.addEventListener(`mouseleave`, function () {
    socialBlock.classList.remove(`social-block--active`);
  });

  const socialItems = socialBlock.querySelectorAll(`.social-block__list li`);
  socialItems.forEach((socialItem, socialItemIndex) => {
    socialItem.style.setProperty(`--transition-delay`, `${(socialItemIndex + 1) * 0.1}s`);
  });
};
