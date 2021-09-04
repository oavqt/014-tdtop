import { theDOMGet } from './theDom';

const addEventSideBar = () => {
  theDOMGet.theSidebarButtons().forEach((button) => {
    button.addEventListener('click', theDisplayProjectEvent);
  });
};

const theDisplayClear = () => {
  theDOMGet.theDisplayProject().forEach((project) => {
    project.classList.remove('body__project--active');
  });
};

const theDisplayShow = (idProject) => {
  theDOMGet.theProject(idProject).classList.add('body__project--active');
};

const theDisplayProjectEvent = function () {
  theDisplayClear();
  theDisplayShow(this.dataset.id);
};

const theEvents = () => {
  addEventSideBar();
};

export { theEvents };
