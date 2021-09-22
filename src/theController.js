import { theDOMGet, theDOMTemplate } from './theDOMTools';
import { theDOMDisplay } from './theList';

const theEvents = () => {
  addEventSideBar();
};

//The Sidebar Events
const addEventSideBar = () => {
  theDOMGet.theSidebarAutomaticButtons().forEach((button) => {
    button.addEventListener('click', theDisplayProjectEvent);
  });

  theDOMGet.theSidebarCustomButtons().forEach((button) => {
    button.addEventListener('click', theDisplayProjectEvent);
  });

  theDOMGet.theSidebarButtonAdd().addEventListener('click', addProject);
};

const theDisplayProjectEvent = function () {
  theButtonClear();
  theDisplayClear();
  theButtonActive(this);
  theDisplayShow(this.dataset.type, this.dataset.id);
};

const theButtonActive = (button) => {
  button.classList.add('button--active');
};

const theButtonClear = () => {
  while (theDOMGet.theDisplayBody().firstChild) {
    theDOMGet
      .theDisplayBody()
      .removeChild(theDOMGet.theDisplayBody().lastChild);
  }

  theDOMGet.theSidebarAutomaticButtons().forEach((button) => {
    button.classList.remove('button--active');
  });

  theDOMGet.theSidebarCustomButtons().forEach((button) => {
    button.classList.remove('button--active');
  });
};

const theDisplayClear = () => {
  theDOMGet.theDisplayProject().forEach((project) => {
    project.classList.remove('body__project--active');
  });
};

const theDisplayShow = (type, id) => {
  theDOMDisplay(type, id);
};

const addProject = function () {
  theDOMTemplate.form('Project');
  theFormEvents();
};

//The Form Events
const theFormEvents = () => {
  theDOMGet.theFormButtonCancel().addEventListener('click', theFormCancel);
};

const theFormCancel = function () {
  theDOMGet.theForm().remove();
};

export { theEvents };
