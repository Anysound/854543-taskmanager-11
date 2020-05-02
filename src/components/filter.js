import {createFilterTemplate} from '../templates/filter.js';
import AbstractComponent from './abstractComponent.js';

class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}

export default Filter;
