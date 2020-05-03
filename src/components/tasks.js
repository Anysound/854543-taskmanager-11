import {createTasksTemplate} from '../templates/tasks.js';
import AbstractComponent from './abstractComponent.js';

class Tasks extends AbstractComponent {
  getTemplate() {
    return createTasksTemplate();
  }
}

export default Tasks;
