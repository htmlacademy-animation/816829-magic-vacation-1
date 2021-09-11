import {escape} from 'he';

const getLetterHTML = (letter) => {
  return letter === ` `
    ? `&nbsp;`
    : escape(letter);
};

const applyAccentTypography = (element, lineClassName = `accent-line`) => {
  if (!element) {
    return;
  }
  element.innerHTML = element.textContent
    .trim()
    .split(`\n`)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      return (`
        <span class="${escape(lineClassName)}">
            ${Array.from(line).map((letter) => `<span>${getLetterHTML(letter)}</span>`).join(``)}
        </span>
      `);
    })
    .join(``);
};

export {
  applyAccentTypography,
};
