import {createTaskEditTemplate} from '../templates/taskEdit.js';
import AbstractComponent from './abstractComponent.js';

class TaskEdit extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createTaskEditTemplate(this._task);
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);
  }
}

export default TaskEdit;
