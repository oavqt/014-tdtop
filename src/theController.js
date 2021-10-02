import { theDOMGet, theDOMGetValue, theDOMTemplate } from './theDOMTools';
import { theEventHandler } from './theHandler';
import { theProjectStorage } from './theList';

const theEvents = () => {
  theSidebarButtonEvent();
  addProjectListTaskNoteEvent();
  removeProjectListTaskNoteEvent();
};

//Sidebar Button Events
const theSidebarButtonEvent = () => {
  theDOMGet.theSidebarAutomaticButtons().forEach((button) => {
    button.addEventListener('click', theCurrentProjectEvent);
  });

  theDOMGet.theSidebarCustomButtons().forEach((button) => {
    button.addEventListener('click', theCurrentProjectEvent);
  });
};

//Project-List-Task-Note Button Events
//Add Events
const addProjectButtonEvent = () => {
  theDOMGet.theAddProject().addEventListener('click', addProject);
};

const addListButtonEvent = () => {
  theDOMGet.theAddList().addEventListener('click', addList);
};

const addTaskButtonEvent = () => {
  theDOMGet.theAddTask().forEach((task) => {
    task.addEventListener('click', addTask);
    task.addEventListener('click', theDOMGetValue.cached.add);
  });
};

const addNoteButtonEvent = () => {
  theDOMGet.theAddNote().forEach((note) => {
    note.addEventListener('click', addNote);
    note.addEventListener('click', theDOMGetValue.cached.add);
  });
};

// Remove Events
const removeProjectButtonEvent = () => {
  theDOMGet.theCurrentProjectRemove().addEventListener('click', removeProject);
  theDOMGet
    .theCurrentProjectRemove()
    .addEventListener('click', theDOMGetValue.cached.add);
};

const removeListButtonEvent = () => {
  theDOMGet.theRemoveList().forEach((list) => {
    list.addEventListener('click', removeList);
    list.addEventListener('click', theDOMGetValue.cached.add);
  });
};

const removeTaskButtonEvent = () => {
  theDOMGet.theRemoveTask().forEach((task) => {
    task.addEventListener('click', removeTask);
    task.addEventListener('click', theDOMGetValue.cached.add);
  });
};

// const removeNoteButtonEvent = () => {
//   theDOMGet.theRemoveNote().forEach((note) => {
//     note.addEventListener('click', removeNote);
//   });
// };

//Form Events
//Add Events
const addProjectFormEvent = () => {
  theDOMGet.theFormButtonCancel().addEventListener('click', theFormCancel);
  theDOMGet
    .theFormButtonAdd()
    .addEventListener('click', addProjectListTaskNote.project);
};

const addListFormEvent = () => {
  theDOMGet.theFormButtonCancel().addEventListener('click', theFormCancel);
  theDOMGet
    .theFormButtonAdd()
    .addEventListener('click', addProjectListTaskNote.list);
};

const addTaskFormEvent = () => {
  theDOMGet.theFormButtonCancel().addEventListener('click', theFormCancel);
  theDOMGet
    .theFormButtonAdd()
    .addEventListener('click', addProjectListTaskNote.task);
};

const addNoteFormEvent = () => {
  theDOMGet.theFormButtonCancel().addEventListener('click', theFormCancel);
  theDOMGet
    .theFormButtonAdd()
    .addEventListener('click', addProjectListTaskNote.note);
};
//Remove Events
const removeProjectFormEvent = () => {
  theDOMGet.theFormButtonCancel().addEventListener('click', theFormCancel);
  theDOMGet
    .theFormButtonRemove()
    .addEventListener('click', removeProjectListTaskNote.project);
};

const removeListFormEvent = () => {
  theDOMGet.theFormButtonCancel().addEventListener('click', theFormCancel);
  theDOMGet
    .theFormButtonRemove()
    .addEventListener('click', removeProjectListTaskNote.list);
};

const removeTaskFormEvent = () => {
  theDOMGet.theFormButtonCancel().addEventListener('click', theFormCancel);
  theDOMGet
    .theFormButtonRemove()
    .addEventListener('click', removeProjectListTaskNote.task);
};

// const removeNoteFormEvent = () => {
//   theDOMGet.theFormButtonCancel().addEventListener('click', theFormCancel);
//   theDOMGet
//     .theFormButtonRemove()
//     .addEventListener('click', removeProjectListTaskNote.note);
// };

//Controller Tools
//Default Project
const theDefaultProjectStyle = () => {
  theSidebarButtonStyleAdd(theDOMGet.theSidebarDefaultProject());
};

//Controller Event Functions
const theCurrentProjectEvent = function () {
  theSidebarButtonStyleRemove();
  theSidebarButtonStyleAdd(this);
  theDisplayRemove();
  theDisplayAdd(this.dataset.type, this.dataset.id);
  theEvents();
};

const addProjectListTaskNoteEvent = () => {
  addProjectButtonEvent();
  addListButtonEvent();
  addTaskButtonEvent();
  addNoteButtonEvent();
};

const removeProjectListTaskNoteEvent = () => {
  removeProjectButtonEvent();
  removeListButtonEvent();
  removeTaskButtonEvent();
  //   // removeNoteButtonEvent();
};

//Display Functions
const theDisplayAdd = (type, idProject) => {
  theProjectStorage.display.project(type, idProject);

  if (type === 'customProject') {
    TheCustomProjectStyleAdd();
  }
};

const theDisplayUpdate = ([type, idProject]) => {
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

const theDisplaySidebarRemove = () => {
  while (theDOMGet.theSidebarCustom().firstChild) {
    theDOMGet
      .theSidebarCustom()
      .removeChild(theDOMGet.theSidebarCustom().lastChild);
  }
};

//Add Functions
const addProject = function () {
  theDOMTemplate.addForm('Project');
  addProjectFormEvent();
};

const addList = function () {
  theDOMTemplate.addForm('List');
  addListFormEvent();
};

const addTask = function () {
  theDOMTemplate.addForm('Task');
  addTaskFormEvent();
};

const addNote = function () {
  theDOMTemplate.addForm('Note');
  addNoteFormEvent();
};

const addProjectListTaskNote = {
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

    theDisplayUpdate([
      theDOMGetValue.type.project(),
      theDOMGetValue.id.project(),
    ]);

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

    theDisplayUpdate([
      theDOMGetValue.type.project(),
      theDOMGetValue.id.project(),
    ]);

    theEvents();
    theFormCancel();
  },
  note: () => {
    theProjectStorage.add.note(
      theDOMGetValue.id.task(),
      theDOMGetValue.input.title(),
      theDOMGetValue.input.description()
    );

    theDisplayUpdate([
      theDOMGetValue.type.project(),
      theDOMGetValue.id.project(),
    ]);

    theEvents();
    theFormCancel();
  },
};

const theFormCancel = function () {
  theDOMGet.theForm().remove();
};

//Remove Functions
const removeProject = function () {
  theDOMTemplate.removeForm('Project');
  removeProjectFormEvent();

  //Events
  theDisplayRemove();
  theEventHandler.publish('theDefaultProject', true);
};

const removeList = function () {
  theDOMTemplate.removeForm('List');
  removeListFormEvent();
};

const removeTask = function () {
  theDOMTemplate.removeForm('Task');
  removeTaskFormEvent();
};

// const removeNote = function () {
//   theDOMTemplate.form('Note');
//   theNoteFormEvent();
// };

const removeProjectListTaskNote = {
  project: () => {
    theDisplaySidebarRemove();

    theProjectStorage.remove.project(
      theDOMGetValue.type.project(),
      theDOMGetValue.id.project()
    );

    theEvents();
    theFormCancel();
  },
  list: () => {
    theProjectStorage.remove.list(theDOMGetValue.id.list());

    theEvents();
    theFormCancel();
  },
  task: () => {
    theProjectStorage.remove.task(theDOMGetValue.id.task());

    theEvents();
    theFormCancel();
  },
  // note: () => {
  //   theEvents();
  //   theFormCancel();
  // },
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
  theHTMLClass.add.displayFlex(theDOMGet.theCurrentProjectEdit());
  theHTMLClass.add.displayFlex(theDOMGet.theCurrentProjectRemove());
  theHTMLClass.add.displayBlock(theDOMGet.theCurrentProjectCheckbox());
};

//Events
theEventHandler.subscribe('theDefaultProjectStyle', theDefaultProjectStyle);
theEventHandler.subscribe('theDisplayUpdate', theDisplayUpdate);

export { theEvents };
