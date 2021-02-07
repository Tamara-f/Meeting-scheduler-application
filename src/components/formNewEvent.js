import swal from 'sweetalert';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import localServ from './localService';
import renderDataCells from './renderDataCells';
const events = localServ.getEvents();

function onInput(e) {
  const checkTitle = events.find(ev => ev.title === e.target.value);
  if (checkTitle) {
    swal('This title already exists in the Calendar');
    return;
  }
}

export default function formNewEvent() {
  const instance = basicLightbox.create(document.querySelector('#modal'), {
    onShow: instance => {
      instance
        .element()
        .querySelector('#title')
        .addEventListener('input', onInput);
      instance.element().querySelector('button').onclick = () => {
        form.addEventListener('submit', onSubmit);
      };
    },
  });
  document.querySelector('button.AddBtn').onclick = instance.show;

  function onSubmit(e) {
    e.preventDefault();
    const elements = e.target.elements;
    const arrParticipants = Array.from(elements.team.selectedOptions);
    const participants = arrParticipants.map(i => i.value);

    if (
      elements.time.value === '' ||
      elements.day.value === '' ||
      elements.title.value === '' ||
      elements.team.value === ''
    ) {
      swal('All fields are required');
      return;
    }

    const dataEvent = [
      {
        class: `${elements.day.value} ${elements.time.value}`,
        title: elements.title.value,
        participants: participants,
        day: elements.day.value,
        time: elements.time.value,
      },
    ];

    renderDataCells(dataEvent);
    let events = localServ.getEvents();
    let eventsArr = events || [];
    eventsArr.push(dataEvent[0]);
    localServ.setEvents(eventsArr);

    instance.close(() => {
      console.log('close modal');
    });
    form.reset();
  }
}
