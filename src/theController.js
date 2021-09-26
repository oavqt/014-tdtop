import { theDOMGet, theDOMTemplate } from './theDOMTools';
import { theProjectStorage } from './theList';

const theEvents = () => {
  addEventSideBar();
  addEventDisplay();
};

//Sidebar Button Events
const addEventSideBar = () => {
  theDOMGet.theSidebarAutomaticButtons().forEach((button) => {
    button.addEventListener('click', theDisplayProjectEvent);
  });

  theDOMGet.theSidebarCustomButtons().forEach((button) => {
    button.addEventListener('click', theDisplayProjectEvent);
  });

  theDOMGet.theAddProject().addEventListener('click', addProject);
};

const theDisplayProjectEvent = function () {
  theButtonClear();
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

const theDisplayShow = (type, id) => {
  theProjectStorage.display.project(type, id);

  if (type === 'customProject') {
    addActiveClass.setDisplayFlex(theDOMGet.theDisplayBodyButtonEdit());
    addActiveClass.setDisplayFlex(theDOMGet.theDisplayBodyButtonDelete());
    addActiveClass.setDisplayBlock(theDOMGet.theDisplayBodyCheckbox());
  }
};

//Display Button Events
const addEventDisplay = () => {
  theDOMGet.theAddList().addEventListener('click', addList);
};

//Form Events
const theProjectFormEvents = () => {
  theDOMGet.theFormButtonCancel().addEventListener('click', theFormCancel);
  theDOMGet.theFormButtonAdd().addEventListener('click', theFormAdd.project);
};

const theListFormEvents = () => {
  theDOMGet.theFormButtonCancel().addEventListener('click', theFormCancel);
  theDOMGet.theFormButtonAdd().addEventListener('click', theFormAdd.list);
};

const theFormCancel = function () {
  theDOMGet.theForm().remove();
};

const theFormAdd = {
  project: () => {
    const type = 'customProject';
    const title = theDOMGet.theFormTitle().value;
    const description = theDOMGet.theFormDescription().value;

    theProjectStorage.add.project(type, title, description);

    addEventSideBar();
    theFormCancel();
  },
  list: () => {
    const type = theDOMGet.theDisplayProject().dataset.type;
    const idProject = theDOMGet.theDisplayProject().dataset.id;
    const title = theDOMGet.theFormTitle().value;
    const description = theDOMGet.theFormDescription().value;

    theProjectStorage.add.list([type, idProject], title, description);

    dClear();
    theDisplayShow(type, idProject);
    addEventSideBar();
    theFormCancel();
  },
  task: () => {},
  note: () => {},
};

//Controller Tools
const addProject = function () {
  theDOMTemplate.form('Project');
  theProjectFormEvents();
};

const addList = function () {
  theDOMTemplate.form('List');
  theListFormEvents();
};

const dClear = () => {
  while (theDOMGet.theDisplayBody().firstChild) {
    theDOMGet
      .theDisplayBody()
      .removeChild(theDOMGet.theDisplayBody().lastChild);
  }
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
