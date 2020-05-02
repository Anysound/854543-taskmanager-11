import {createBoardTemplate} from '../templates/board.js';
import AbstractComponent from './abstractComponent.js';

class Board extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}

export default Board;
