const createFilterMarkup = (filter) => {
  const {name, count, isChecked} = filter;

  return (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label
    >`
  );
};

const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it)).join(``);

  return `<section class="main__filter filter container">
    ${filtersMarkup}
  </section>`;
};

export {createFilterTemplate};
