const getLetterHTML = (letter) => {
  return letter
    .replace(` `, `&nbsp;`)
    .replace(`<`, `&lt;`);
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
        <span class="${lineClassName}">
            ${Array.from(line).map((letter) => `<span>${getLetterHTML(letter)}</span>`).join(``)}
        </span>
      `);
    })
    .join(``);
};

export {
  applyAccentTypography,
};
