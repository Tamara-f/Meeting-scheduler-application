class LocalServ {
  getEvents() {
    return JSON.parse(localStorage.getItem('events'));
  }

  setEvents(localArr) {
    localStorage.setItem('events', JSON.stringify(localArr));
  }
}

const localServ = new LocalServ();
export default localServ;
