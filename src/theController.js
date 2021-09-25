import { theDOMGet, theDOMTemplate } from './theDOMTools';
import { theProjectStorage } from './theList';

const theEvents = () => {
  addEventSideBar();
};

//Sidebar Button Events
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
  theProjectStorage.displayProject(type, id);

  if (type === 'customProject') {
    addActiveClass.setDisplayFlex(theDOMGet.theDisplayBodyButtonEdit());
    addActiveClass.setDisplayFlex(theDOMGet.theDisplayBodyButtonDelete());
    addActiveClass.setDisplayBlock(theDOMGet.theDisplayBodyCheckbox());
  }
};

const addProject = function () {
  theDOMTemplate.form('Project');
  theFormEvents();
};

//Form Events
const theFormEvents = () => {
  theDOMGet.theFormButtonCancel().addEventListener('click', theFormCancel);
  theDOMGet.theFormButtonAdd().addEventListener('click', theFormProjectAdd);
};

const theFormCancel = function () {
  theDOMGet.theForm().remove();
};

const theFormProjectAdd = function () {
  const type = 'customProject';
  const title = theDOMGet.theFormTitle().value;
  const description = theDOMGet.theFormDescription().value;

  theProjectStorage.addProject(type, title, description);

  addEventSideBar();
  theFormCancel();
};

const addActiveClass = {
  setDisplayFlex: (element) => {
    element.classList.add('--flex');
  },
  setDisplayBlock: (element) => {
    element.classList.add('--block');
  },
};

export { theEvents };
