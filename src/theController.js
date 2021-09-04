import { theDOMGet } from './theDOMTools';

const theEvents = () => {
  addEventSideBar();
};

const addEventSideBar = () => {
  theDOMGet.theSidebarAutomaticButtons().forEach((button) => {
    button.addEventListener('click', theDisplayProjectEvent);
  });
};

const theDisplayProjectEvent = function () {
  theButtonClear();
  theDisplayClear();
  theButtonActive(this);
  theDisplayShow(this.dataset.id);
};

const theButtonActive = (button) => {
  button.classList.add('button--active');
};

const theButtonClear = () => {
  theDOMGet.theSidebarAutomaticButtons().forEach((button) => {
    button.classList.remove('button--active');
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

export { theEvents };
