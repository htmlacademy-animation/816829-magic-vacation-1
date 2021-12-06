export default () => {
  const header = document.querySelector(`.js-header`);
  const menuToggler = document.querySelector(`.js-menu-toggler`);
  const menuLinks = document.querySelectorAll(`.js-menu-link`);

  menuToggler.addEventListener(`click`, () => {
    header.classList.toggle(`page-header--menu-opened`);
    document.body.classList.toggle(`menu-opened`);
  });

  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener(`click`, () => {
      header.classList.remove(`page-header--menu-opened`);
      document.body.classList.remove(`menu-opened`);
    });
  });
};
