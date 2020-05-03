import {createLoadMoreBtnTemplate} from '../templates/loadMoreBtn.js';
import AbstractComponent from './abstractComponent.js';

class LoadMoreBtn extends AbstractComponent {
  getTemplate() {
    return createLoadMoreBtnTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}

export default LoadMoreBtn;
