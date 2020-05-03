import {createMenuTemplate} from '../templates/menu.js';
import AbstractComponent from './abstractComponent.js';

class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }
}

export default Menu;
