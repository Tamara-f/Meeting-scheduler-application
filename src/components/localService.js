class LocalServ {
  getEvents() {
    return JSON.parse(localStorage.getItem('events'));
  }

  setEvents(localArr) {
    localStorage.setItem('events', JSON.stringify(localArr));
  }

  changeEvent(cellTxt) {
    const title = cellTxt.childNodes[0].childNodes[1].childNodes[1];
    const eventsArr = this.getEvents();
    const currentEv = eventsArr.find(el => el.title !== title);
    const newEvArr = eventsArr.filter(el => el.title !== title);

    newEvArr.push(currentEv);
    this.setEvents(newEvArr);
  }
}

const localServ = new LocalServ();
export default localServ;
