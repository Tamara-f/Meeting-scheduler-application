import renderDataCells from './renderDataCells';
import tableTpl from '../templates/table.hbs';

const tableRef = document.querySelector('#table');

export default function firstRender(events) {
  const spinnerLoader = document.querySelector('div.spinner');

  spinnerLoader.classList.remove('notactive');
  setTimeout(() => {
    tableRef.insertAdjacentHTML('afterbegin', tableTpl());
    renderDataCells(events);
    spinnerLoader.classList.add('notactive');
  }, 1000);
}
