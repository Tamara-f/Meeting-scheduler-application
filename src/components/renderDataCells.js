import swal from 'sweetalert';
import localServ from './localService';
const tableRef = document.querySelector('#table');

export default async function renderDataCells(data) {
  const cells = Array.from(document.getElementsByTagName('td'));
  if (!data) {
    swal('There is no saved events yet');
    return;
  }

  data.map(event => {
    const foundCell = cells.find(cell => {
      return cell.className == `${event.day} ${event.time}`;
    });

    if (foundCell.textContent !== '') {
      swal('This time is already taken');
      return;
    }
    const newDiv = document.createElement('div');
    const names = event.participants.join(', ');
    const markup = (newDiv.innerHTML = `<div class="cellTxt"><p><span>title: </span>${event.title}</p>
  <p><span>participants:</span> ${names} </p> <div class="del"></div> </div>`);

    foundCell.insertAdjacentHTML('afterbegin', markup);

    tableRef.addEventListener('click', onDelete);
  });
}

function onDelete(e) {
  if (e.target.className === 'del') {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this event',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        swal('Poof! Your event has been deleted!', {
          icon: 'success',
        });

        let events = localServ.getEvents();
        const evClass = e.path[2].className;
        const filteredEv = events.filter(ev => ev.class !== evClass);
        localServ.setEvents(filteredEv);
        e.target.parentNode.innerHTML = '';
      } else {
        swal('Your event is safe!');
      }
    });
  }
  return;
}
