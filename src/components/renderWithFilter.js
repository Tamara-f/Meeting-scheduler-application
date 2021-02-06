import renderDataCells from './renderDataCells';
import tableTpl from '../templates/table.hbs';
const tableRef = document.querySelector('#table');

export default function renderWithTimeout(filterValue, events) {
  tableRef.innerHTML = tableTpl();
  if (!filterValue) {
    renderDataCells(events);
  }
  const filteredEvents = events.filter(
    el =>
      el.participants.find(participant => participant === filterValue) !==
      undefined,
  );
  renderDataCells(filteredEvents);
}
