import TaskComponent from '../components/task.js';
import TaskEditComponent from '../components/taskEdit.js';
import {render, replace, RenderPosition} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`
};

class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onviewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._taskComponent = null;
    this.taskEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);

    this._taskComponent.setEditBtnClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._taskComponent.setArchiveBtnClickHandler(() => {

      // newData = Object.assign()
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive
      }));
    });

    this._taskComponent.setFavoritesBtnClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite
      }));
    });

    this._taskEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
    });

    if (oldTaskComponent && oldTaskEditComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._taskEditComponent, oldTaskEditComponent);
    } else {
      render(this._container, this._taskComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTask();
    }
  }

  _replaceEditToTask() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._taskEditComponent.reset();
    replace(this._taskComponent, this._taskEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _replaceTaskToEdit() {
    this._onviewChange();
    replace(this._taskEditComponent, this._taskComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

export default TaskController;
