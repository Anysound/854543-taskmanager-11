import {createTaskTemplate} from '../templates/task.js';
import AbstractComponent from './abstractComponent.js';

class Task extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createTaskTemplate(this._task);
  }

  setEditBtnClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--edit`)
      .addEventListener(`click`, handler);
  }
}

export default Task;
