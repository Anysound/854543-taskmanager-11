import {createNoTasksTemplate} from '../templates/noTasks.js';
import AbstractComponent from './abstractComponent.js';

class NoTasks extends AbstractComponent {
  getTemplate() {
    return createNoTasksTemplate();
  }
}

export default NoTasks;
