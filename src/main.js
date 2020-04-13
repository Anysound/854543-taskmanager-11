// импорт
import {createMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createSortTemplate} from './components/sort.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskEditTemplate} from './components/taskEdit.js';
import {createLoadMoreBtnTemplate} from './components/loadMoreBtn.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';

// константы
const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

// рендеринг
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.main__control`);

// моки
const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();

render(siteHeaderElement, createMenuTemplate(), `beforeend`);

render(siteMainElement, createFilterTemplate(filters), `beforeend`);

render(siteMainElement, createSortTemplate(), `beforeend`);

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTasksCount)
  .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

render(boardElement, createLoadMoreBtnTemplate(), `beforeend`);

// добавление обработчика клика
const loadMoreBtn = boardElement.querySelector(`.load-more`);

loadMoreBtn.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreBtn.remove();
  }
});
