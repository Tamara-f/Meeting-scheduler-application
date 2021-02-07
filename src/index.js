import renderWithFilter from './components/renderWithFilter';
import renderFirst from './components/firstRender';
import localServ from './components/localService';
import formNewEvent from './components/formNewEvent';

import './styles.scss';

let events = localServ.getEvents();

let filter = '';
document.querySelector('select.filter').addEventListener('change', event => {
  filter = event.target.value;
  events = localServ.getEvents();
  renderWithFilter(filter, events);
});

renderFirst(events);

formNewEvent(events);
