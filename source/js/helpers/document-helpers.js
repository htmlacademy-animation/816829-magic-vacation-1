/**
 * @param {Element} element
 */
const scrollIntoViewIfNeeded = (element) => {
  if (!element) {
    return;
  }
  const clientRect = element.getBoundingClientRect();
  if (clientRect.top < 0 || clientRect.bottom >= window.innerHeight) {
    const centerDifference = {
      left: window.innerWidth > clientRect.width ? ((window.innerWidth - clientRect.width) / 2) : 0,
      top: window.innerHeight > clientRect.height ? ((window.innerHeight - clientRect.height) / 2) : 0,
    };
    window.scroll({
      left: window.scrollX + clientRect.left - centerDifference.left,
      top: window.scrollY + clientRect.top - centerDifference.top,
    });
  }
};

/**
 * @param {Element} element
 * @param {String} selector
 * @return {Element | null}
 */
const findAncestor = (element, selector) => {
  for (let ancestor = element; ancestor; ancestor = ancestor.parentNode) {
    if (ancestor.matches(selector)) {
      return ancestor;
    }
  }
  return null;
};

export {
  scrollIntoViewIfNeeded,
  findAncestor,
};
