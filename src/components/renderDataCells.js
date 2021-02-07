import swal from 'sweetalert';
import localServ from './localService';
import dragAndDrop from './dragAndDrop';

const tableRef = document.querySelector('#table');

const events = localServ.getEvents();

export default async function renderDataCells(data) {
  const cells = Array.from(document.getElementsByTagName('td'));
  if (!data) {
    swal('There is no saved events yet');
    return;
  }

  await data.map(event => {
    const foundCell = cells.find(cell => {
      return (
        cell.className.split(' ', 2).join(' ') == `${event.day} ${event.time}`
      );
    });
    if (foundCell.textContent !== '') {
      swal('This time is already taken');
      return;
    }
    const newDiv = document.createElement('div');
    const names = event.participants.join(', ');
    const markup = (newDiv.innerHTML = `<div class="cellTxt" id="draggable" draggable="true" ondragstart="event.dataTransfer.setData('text/plain',null)">
    <p><span>title: </span>${event.title}</p>
  <p><span>participants:</span> ${names} </p> <div class="del"></div> </div>`);

    foundCell.insertAdjacentHTML('afterbegin', markup);

    tableRef.addEventListener('click', onDelete);

    setTimeout(() => {
      cells.map(cell => {
        if (cell.innerHTML === '') {
          const className = cell.getAttribute('class');
          const splitsClass = className.split(' ', 2).join(' ');
          cell.setAttribute('class', `${splitsClass} dropzone`);
        }
      });
    }, 2000);

    dragAndDrop();
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

        const evClass = e.path[2].className;
        const filteredEv = events.filter(ev => ev.class !== evClass);
        localStorage.setItem('events', JSON.stringify(filteredEv));
        e.target.parentNode.innerHTML = '';
      } else {
        swal('Your event is safe!');
      }
    });
  }
  return;
}
