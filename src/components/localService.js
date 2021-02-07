class LocalServ {
  getEvents() {
    return JSON.parse(localStorage.getItem('events'));
  }

  setEvents(localArr) {
    localStorage.setItem('events', JSON.stringify(localArr));
  }

  changeEvent(cellTxt) {
    const newClass = cellTxt.className.slice(0, -9);
    const newDay = newClass.slice(0, -3).split(' ').join('');
    const newTime = newClass.slice(-3).split(' ').join('');
    const title = cellTxt.childNodes[0].childNodes[1].childNodes[1].textContent;
    const eventsArr = this.getEvents();
    const currentEv = eventsArr.find(ev => {
      return ev.title === title;
    });
    const participants = currentEv.participants;
    const newEvArr = eventsArr.filter(el => el !== currentEv);

    const dataEvent = {
      class: newClass,
      title: title,
      participants: participants,
      day: newDay,
      time: newTime,
    };

    newEvArr.push(dataEvent);
    this.setEvents(newEvArr);
  }
}

const localServ = new LocalServ();
export default localServ;
