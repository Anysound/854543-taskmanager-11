import moment from "moment";

// вспомогательные функции для вывода времени
const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

export {formatTime, formatDate};
