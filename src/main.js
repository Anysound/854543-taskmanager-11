// импорт
import {createMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createSortTemplate} from './components/sort.js';
import {createTaskTemplate} from './components/task.js';
import {createTaskEditTemplate} from './components/taskEdit.js';
import {createLoadMoreBtnTemplate} from './components/loadMoreBtn.js';

// константы
const TASK_COUNT = 3;

// рендеринг
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.main__control`);

render(siteHeaderElement, createMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

render(taskListElement, createTaskEditTemplate(), `beforeend`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createTaskTemplate(), `beforeend`);
}

render(boardElement, createLoadMoreBtnTemplate(), `beforeend`);
