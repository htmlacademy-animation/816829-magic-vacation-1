export default () => {
  const hideResult = (result) => {
    result.classList.replace(`screen--show`, `screen--hidden`);
  };

  const showResult = (result) => {
    result.classList.remove(`screen--hidden`);
    requestAnimationFrame(() => {
      result.classList.add(`screen--show`);
    });
  };

  const initResults = () => {
    showResultButtons.forEach((button) => {
      button.addEventListener(`click`, () => {
        results.forEach(hideResult);

        const targetResult = results.find((result) => result.id === button.dataset.target);
        showResult(targetResult);
      });
    });
  };

  const initPlayButton = () => {
    playButton.addEventListener(`click`, () => {
      results.forEach(hideResult);
      messagesContainer.innerHTML = ``;
      messageField.focus();
    });
  };

  const showResultButtons = Array.from(document.querySelectorAll(`.js-show-result`));
  const results = Array.from(document.querySelectorAll(`.screen--result`));
  const playButton = document.querySelector(`.js-play`);
  const messagesContainer = document.getElementById(`messages`);
  const messageField = document.getElementById(`message-field`);

  initResults();
  initPlayButton();
};
