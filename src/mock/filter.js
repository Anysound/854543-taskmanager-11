const filtersTitles = [`all`, `overdue`, `today`, `favorites`, `repeating`, `archive`];

const generateFilters = () => {
  return filtersTitles.map((it, i) => {
    return {
      name: it,
      count: Math.round(Math.random() * 10),
      isChecked: i === 0
    };
  });
};

export {generateFilters};
