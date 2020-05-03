import SortComponent from '../components/sort.js';
import TaskComponent from '../components/task.js';
import TasksComponent from '../components/tasks.js';
import TaskEditComponent from '../components/taskEdit.js';
import LoadMoreBtnComponent from '../components/loadMoreBtn.js';
import NoTasksComponent from '../components/noTasks.js';
import {render, replace, remove, RenderPosition} from '../utils/render.js';
import {SortType} from '../templates/sort.js';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

// рендеринг
const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new TaskComponent(task);
  taskComponent.setEditBtnClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task);
  taskEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

// const renderTasks = (taskListElement, tasks) => {
//   tasks.forEach((task) => {
//     renderTask(taskListElement, task);
//   });
// };

const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;

    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;

    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(from, to);
};

class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreBtnComponent = new LoadMoreBtnComponent();
  }

  renderTasks(taskListElement, tasks) {
    tasks.forEach((task) => {
      renderTask(taskListElement, task);
    });
  }

  renderLoadMoreBtn(tasks) {
    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    const container = this._container.getElement();

    if (showingTasksCount >= tasks.length) {
      return;
    }

    render(container, this._loadMoreBtnComponent, RenderPosition.BEFOREEND);

    this._loadMoreBtnComponent.setClickHandler(() => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;
      const taskListElement = this._tasksComponent.getElement();

      const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, showingTasksCount);
      this.renderTasks(taskListElement, sortedTasks);

      if (showingTasksCount >= tasks.length) {
        remove(this._loadMoreBtnComponent);
      }
    });
  }

  render(tasks) {
    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    this.renderTasks(taskListElement, tasks.slice(0, showingTasksCount));
    this.renderLoadMoreBtn(tasks);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

      const sortedTasks = getSortedTasks(tasks, sortType, 0, showingTasksCount);

      taskListElement.innerHTML = ``;

      this.renderTasks(taskListElement, sortedTasks);
      this.renderLoadMoreBtn(tasks);
    });
  }
}

export default BoardController;
