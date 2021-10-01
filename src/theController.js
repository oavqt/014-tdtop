import { theDOMGet, theDOMGetValue, theDOMTemplate } from './theDOMTools';
import { theProjectStorage } from './theList';

const theEvents = () => {
  theSidebarButtonEvent();
  theAddProjectListTaskNoteEvent();
};

//Sidebar Button Events
const theSidebarButtonEvent = () => {
  theDOMGet.theSidebarAutomaticButtons().forEach((button) => {
    button.addEventListener('click', theDisplayProjectEvent);
  });

  theDOMGet.theSidebarCustomButtons().forEach((button) => {
    button.addEventListener('click', theDisplayProjectEvent);
  });
};

const theDisplayProjectEvent = function () {
  theSidebarButtonStyleRemove();
  theSidebarButtonStyleAdd(this);
  theDisplayRemove();
  theDisplayAdd(this.dataset.type, this.dataset.id);
};

//ProjectListTaskNote Button Events
const theAddProjectListTaskNoteEvent = () => {
  theProjectButtonEvent();
  theListButtonEvent();
  theTaskButtonEvent();
};

const theProjectButtonEvent = () => {
  theDOMGet.theAddProject().addEventListener('click', addProject);
};

const theListButtonEvent = () => {
  theDOMGet.theAddList().addEventListener('click', addList);
};

const theTaskButtonEvent = () => {
  theDOMGet.theAddTask().forEach((task) => {
    task.addEventListener('click', addTask);
    task.addEventListener('click', theDOMGetValue.cached.add);
  });
};

const theNoteButtonEvent = () => {
  theDOMGet.theAddNote().forEach((note) => {
    note.addEventListener('click', addNote);
  });
};

//Form Events
const theProjectFormEvent = () => {
  theDOMGet.theFormButtonCancel().addEventListener('click', theFormCancel);
  theDOMGet.theFormButtonAdd().addEventListener('click', theFormAdd.project);
};

const theListFormEvent = () => {
  theDOMGet.theFormButtonCancel().addEventListener('click', theFormCancel);
  theDOMGet.theFormButtonAdd().addEventListener('click', theFormAdd.list);
};

const theTaskFormEvent = () => {
  theDOMGet.theFormButtonCancel().addEventListener('click', theFormCancel);
  theDOMGet.theFormButtonAdd().addEventListener('click', theFormAdd.task);
};

const theNoteFormEvent = () => {
  theDOMGet.theFormButtonCancel().addEventListener('click', theFormCancel);
  theDOMGet.theFormButtonAdd().addEventListener('click', theFormAdd.note);
};

//Controller Tools
//Controller Event Functions
const addProject = function () {
  theDOMTemplate.form('Project');
  theProjectFormEvent();
};

const addList = function () {
  theDOMTemplate.form('List');
  theListFormEvent();
};

const addTask = function () {
  theDOMTemplate.form('Task');
  theTaskFormEvent();
};

const addNote = function () {
  theDOMTemplate.form('Note');
  theNoteFormEvent();
};

const theDisplayAdd = (type, idProject) => {
  theProjectStorage.display.project(type, idProject);

  if (type === 'customProject') {
    TheCustomProjectStyleAdd();
  }
};

const theDisplayUpdate = (type, idProject) => {
  theDisplayRemove();
  theDisplayAdd(type, idProject);
};

const theDisplayRemove = () => {
  while (theDOMGet.theDisplayBody().firstChild) {
    theDOMGet
      .theDisplayBody()
      .removeChild(theDOMGet.theDisplayBody().lastChild);
  }
};

const theFormAdd = {
  project: () => {
    const type = 'customProject';

    theProjectStorage.add.project(
      type,
      theDOMGetValue.input.title(),
      theDOMGetValue.input.description()
    );

    theEvents();
    theFormCancel();
  },
  list: () => {
    theProjectStorage.add.list(
      [theDOMGetValue.type.project(), theDOMGetValue.id.project()],
      theDOMGetValue.input.title(),
      theDOMGetValue.input.description()
    );

    theDisplayUpdate(
      theDOMGetValue.type.project(),
      theDOMGetValue.id.project()
    );
    theEvents();
    theFormCancel();
  },
  task: () => {
    theProjectStorage.add.task(
      theDOMGetValue.id.list(),
      theDOMGetValue.input.title(),
      theDOMGetValue.input.description(),
      theDOMGetValue.input.date()
    );

    theEvents();
    theFormCancel();
  },
  note: () => {
    theEvents();
    theFormCancel();
  },
};

const theFormCancel = function () {
  theDOMGet.theForm().remove();
};

//Add HTMLCSS Classes
//CSS Options
const theHTMLClass = {
  add: {
    displayFlex: (element) => {
      element.classList.add('--flex');
    },
    displayBlock: (element) => {
      element.classList.add('--block');
    },
    backgroundWhite: (element) => {
      element.classList.add('--background-white');
    },
    backgroundHoverBlue: (element) => {
      element.classList.add('--background-hover-blue');
    },
  },
  remove: {
    backgroundWhite: (element) => {
      element.classList.remove('--background-white');
    },
    backgroundHoverBlue: (element) => {
      element.classList.remove('--background-hover-blue');
    },
  },
};

//Add CSS
const theSidebarButtonStyleAdd = (button) => {
  theHTMLClass.add.backgroundWhite(button);
  theHTMLClass.add.backgroundHoverBlue(button);
};

const theSidebarButtonStyleRemove = () => {
  theDOMGet.theSidebarAutomaticButtons().forEach((button) => {
    theHTMLClass.remove.backgroundWhite(button);
    theHTMLClass.remove.backgroundHoverBlue(button);
  });

  theDOMGet.theSidebarCustomButtons().forEach((button) => {
    theHTMLClass.remove.backgroundWhite(button);
    theHTMLClass.remove.backgroundHoverBlue(button);
  });
};

const TheCustomProjectStyleAdd = () => {
  theHTMLClass.add.displayFlex(theDOMGet.theDisplayProjectEdit());
  theHTMLClass.add.displayFlex(theDOMGet.theDisplayProjectDelete());
  theHTMLClass.add.displayBlock(theDOMGet.theDisplayProjectCheckbox());
};

export { theEvents };
