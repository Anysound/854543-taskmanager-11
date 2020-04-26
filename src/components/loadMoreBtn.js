import {createElement} from '../utils.js';
import {createLoadMoreBtnTemplate} from '../templates/loadMoreBtn.js';

class LoadMoreBtn {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createLoadMoreBtnTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default LoadMoreBtn;
