// импорт
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import BoardComponent from './components/board.js';
import SortComponent from './components/sort.js';
import TaskComponent from './components/task.js';
import TasksComponent from './components/tasks.js';
import TaskEditComponent from './components/taskEdit.js';
import LoadMoreBtnComponent from './components/loadMoreBtn.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition} from './utils.js';

// константы
const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

// рендеринг
const renderTask = (taskListElement, task) => {
  const onEditBtnClick = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const onEditFormSubmit = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      onEditFormSubmit();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new TaskComponent(task);
  const editBtn = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editBtn.addEventListener(`click`, () => {
    onEditBtnClick();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);

  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    onEditFormSubmit();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {
  render(boardComponent.getElement(), new SortComponent().getElement(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new TasksComponent().getElement(), RenderPosition.BEFOREEND);

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

  const loadMoreBtnComponent = new LoadMoreBtnComponent();
  render(boardComponent.getElement(), loadMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreBtnComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasks.length) {
      loadMoreBtnComponent.getElement().remove();
      loadMoreBtnComponent.removeElement();
    }
  });
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();

render(siteHeaderElement, new MenuComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
renderBoard(boardComponent, tasks);
