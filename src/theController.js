import { theDOMGet, theDOMGetValue, theDOMTemplate } from './theDOMTools';
import { theEventHandler } from './theHandler';
import { theProjectStorage } from './theList';

const theEvents = () => {
  theLogoButtonEvent();
  theSidebarButtonEvent();
  addProjectListTaskNoteEvent();
  editProjectListTaskNoteEvent();
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

//Logo Buttton Events
const theLogoButtonEvent = () => {
  theDOMGet.theLogo().addEventListener('click', theSidebarCollapse);
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
    task.addEventListener('click', theDOMGetValue.cached.add);
    task.addEventListener('click', addTask);
  });
};

const addNoteButtonEvent = () => {
  theDOMGet.theAddNote().forEach((note) => {
    note.addEventListener('click', theDOMGetValue.cached.add);
    note.addEventListener('click', addNote);
  });
};

//Edit Events
const editProjectButtonEvent = () => {
  theDOMGet
    .theCurrentProjectEdit()
    .addEventListener('click', theDOMGetValue.cached.add);
  theDOMGet.theCurrentProjectEdit().addEventListener('click', editProject);
};

const editListButtonEvent = () => {
  theDOMGet.theEditList().forEach((button) => {
    button.addEventListener('click', theDOMGetValue.cached.add);
    button.addEventListener('click', editList);
  });
};

const editTaskButtonEvent = () => {
  theDOMGet.theEditTask().forEach((button) => {
    button.addEventListener('click', theDOMGetValue.cached.add);
    button.addEventListener('click', editTask);
  });
};

const editNoteButtonEvent = () => {
  theDOMGet.theEditNote().forEach((button) => {
    button.addEventListener('click', theDOMGetValue.cached.add);
    button.addEventListener('click', editNote);
  });
};

// Remove Events
const removeProjectButtonEvent = () => {
  theDOMGet
    .theCurrentProjectRemove()
    .addEventListener('click', theDOMGetValue.cached.add);
  theDOMGet.theCurrentProjectRemove().addEventListener('click', removeProject);
};

const removeListButtonEvent = () => {
  theDOMGet.theRemoveList().forEach((list) => {
    list.addEventListener('click', theDOMGetValue.cached.add);
    list.addEventListener('click', removeList);
  });
};

const removeTaskButtonEvent = () => {
  theDOMGet.theRemoveTask().forEach((task) => {
    task.addEventListener('click', theDOMGetValue.cached.add);
    task.addEventListener('click', removeTask);
  });
};

const removeNoteButtonEvent = () => {
  theDOMGet.theRemoveNote().forEach((note) => {
    note.addEventListener('click', theDOMGetValue.cached.add);
    note.addEventListener('click', removeNote);
  });
};

//Form Events
//Add Events
const addProjectFormEvent = () => {
  theDOMGet.theFormCancel().addEventListener('click', theFormCancel);
  theDOMGet
    .theFormAdd()
    .addEventListener('click', addProjectListTaskNote.project);
};

const addListFormEvent = () => {
  theDOMGet.theFormCancel().addEventListener('click', theFormCancel);
  theDOMGet.theFormAdd().addEventListener('click', addProjectListTaskNote.list);
};

const addTaskFormEvent = () => {
  theDOMGet.theFormCancel().addEventListener('click', theFormCancel);
  theDOMGet.theFormAdd().addEventListener('click', addProjectListTaskNote.task);
};

const addNoteFormEvent = () => {
  theDOMGet.theFormCancel().addEventListener('click', theFormCancel);
  theDOMGet.theFormAdd().addEventListener('click', addProjectListTaskNote.note);
};

//Edit Events
const editProjectFormEvent = () => {
  theDOMGet.theFormCancel().addEventListener('click', theFormCancel);
  theDOMGet
    .theFormEdit()
    .addEventListener('click', editProjectListTaskNote.project);
};

const editListFormEvent = () => {
  theDOMGet.theFormCancel().addEventListener('click', theFormCancel);
  theDOMGet
    .theFormEdit()
    .addEventListener('click', editProjectListTaskNote.list);
};

const editTaskFormEvent = () => {
  theDOMGet.theFormCancel().addEventListener('click', theFormCancel);
  theDOMGet
    .theFormEdit()
    .addEventListener('click', editProjectListTaskNote.task);
};

const editNoteFormEvent = () => {
  theDOMGet.theFormCancel().addEventListener('click', theFormCancel);
  theDOMGet
    .theFormEdit()
    .addEventListener('click', editProjectListTaskNote.note);
};

//Remove Events
const removeProjectFormEvent = () => {
  theDOMGet.theFormCancel().addEventListener('click', theFormCancel);
  theDOMGet
    .theFormRemove()
    .addEventListener('click', removeProjectListTaskNote.project);
};

const removeListFormEvent = () => {
  theDOMGet.theFormCancel().addEventListener('click', theFormCancel);
  theDOMGet
    .theFormRemove()
    .addEventListener('click', removeProjectListTaskNote.list);
};

const removeTaskFormEvent = () => {
  theDOMGet.theFormCancel().addEventListener('click', theFormCancel);
  theDOMGet
    .theFormRemove()
    .addEventListener('click', removeProjectListTaskNote.task);
};

const removeNoteFormEvent = () => {
  theDOMGet.theFormCancel().addEventListener('click', theFormCancel);
  theDOMGet
    .theFormRemove()
    .addEventListener('click', removeProjectListTaskNote.note);
};

//Controller Tools
//Default Project
const theDefaultProjectStyle = () => {
  theSidebarButtonStyleAdd(theDOMGet.theSidebarDefaultProject());
};

//Controller Event Functions
const theSidebarCollapse = function () {
  theSidebarSlide();
  theSidebarFade();
};

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

const editProjectListTaskNoteEvent = () => {
  editProjectButtonEvent();
  editListButtonEvent();
  editTaskButtonEvent();
  editNoteButtonEvent();
};

const removeProjectListTaskNoteEvent = () => {
  removeProjectButtonEvent();
  removeListButtonEvent();
  removeTaskButtonEvent();
  removeNoteButtonEvent();
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

const theSidebarSlide = () => {
  const sidebar = theDOMGet.theSidebar();

  if (sidebar.classList.contains('--animation-slide-out')) {
    theSidebarSlideStyleRemove(sidebar);
  } else {
    theSidebarSlideStyleAdd(sidebar);
  }
};

const theSidebarFade = () => {
  const automatic = theDOMGet.theSidebarAutomatic();
  const add = theDOMGet.theSidebarAdd();
  const custom = theDOMGet.theSidebarCustom();

  if (automatic.classList.contains('--animation-fade-out')) {
    theSidebarFadeStyleRemove(automatic);
    theSidebarFadeStyleRemove(add);
    theSidebarFadeStyleRemove(custom);
  } else {
    theSidebarFadeStyleAdd(automatic);
    theSidebarFadeStyleAdd(add);
    theSidebarFadeStyleAdd(custom);
  }
};

const theSidebarCustomRemove = () => {
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

    //Events
    theDisplayRemove();
    theProjectStorage.display.project(type);

    theSidebarButtonStyleRemove();
    theSidebarButtonStyleAdd(
      theDOMGet.theSidebarCustomButton(theDOMGetValue.id.project())
    );
    TheCustomProjectStyleAdd();

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

    //Events
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

    //Events
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

    //Events
    theEvents();
    theFormCancel();
  },
};

const theFormCancel = function () {
  theDOMGet.theForm().remove();
};

//Edit Functions
const editProject = function () {
  theDOMTemplate.editForm('Project');

  theFormSetValue(
    theProjectStorage.display.formValue.project(
      theDOMGetValue.type.project(),
      theDOMGetValue.id.project()
    )
  );
  editProjectFormEvent();
};

const editList = function () {
  theDOMTemplate.editForm('List');

  theFormSetValue(
    theProjectStorage.display.formValue.list(theDOMGetValue.id.list())
  );

  editListFormEvent();
};

const editTask = function () {
  theDOMTemplate.editForm('Task');

  theFormSetValue(
    theProjectStorage.display.formValue.task(theDOMGetValue.id.task())
  );

  editTaskFormEvent();
};

const editNote = function () {
  theDOMTemplate.editForm('Note');

  theFormSetValue(
    theProjectStorage.display.formValue.note(theDOMGetValue.id.note())
  );

  editNoteFormEvent();
};

const editProjectListTaskNote = {
  project: () => {
    theSidebarCustomRemove();

    theProjectStorage.edit.project(
      [theDOMGetValue.type.project(), theDOMGetValue.id.project()],
      theDOMGetValue.input.title(),
      theDOMGetValue.input.description()
    );

    //Events
    theEvents();
    theFormCancel();
  },
  list: () => {
    theProjectStorage.edit.list(
      theDOMGetValue.id.list(),
      theDOMGetValue.input.title(),
      theDOMGetValue.input.description()
    );

    //Events
    theEvents();
    theFormCancel();
  },
  task: () => {
    theProjectStorage.edit.task(
      theDOMGetValue.id.task(),
      theDOMGetValue.input.title(),
      theDOMGetValue.input.description(),
      theDOMGetValue.input.date()
    );

    //Events
    theEvents();
    theFormCancel();
  },
  note: () => {
    theProjectStorage.edit.note(
      theDOMGetValue.id.note(),
      theDOMGetValue.input.title(),
      theDOMGetValue.input.description()
    );

    //Events
    theEvents();
    theFormCancel();
  },
};

//Set Form Value Function
const theFormSetValue = ([title, description, date]) => {
  theDOMGet.theFormTitle().value = title;
  theDOMGet.theFormDescription().value = description;
  if (date) {
    theDOMGet.theFormDate().value = date;
  }
};

//Remove Functions
const removeProject = function () {
  theDOMTemplate.removeForm('Project');
  removeProjectFormEvent();
};

const removeList = function () {
  theDOMTemplate.removeForm('List');
  removeListFormEvent();
};

const removeTask = function () {
  theDOMTemplate.removeForm('Task');
  removeTaskFormEvent();
};

const removeNote = function () {
  theDOMTemplate.removeForm('Note');
  removeNoteFormEvent();
};

const removeProjectListTaskNote = {
  project: () => {
    theSidebarCustomRemove();

    theProjectStorage.remove.project(
      theDOMGetValue.type.project(),
      theDOMGetValue.id.project()
    );

    //Events
    theDisplayRemove();
    theEventHandler.publish('theDefaultProject', true);
    theEvents();
    theFormCancel();
  },
  list: () => {
    theProjectStorage.remove.list(theDOMGetValue.id.list());

    //Events
    theEvents();
    theFormCancel();
  },
  task: () => {
    theProjectStorage.remove.task(theDOMGetValue.id.task());

    //Events
    theEvents();
    theFormCancel();
  },
  note: () => {
    theProjectStorage.remove.note(theDOMGetValue.id.note());

    //Events
    theEvents();
    theFormCancel();
  },
};

//Add HTMLCSS Classes
//CSS Options
const theHTMLClass = {
  add: {
    animation: {
      inFade: (element) => {
        element.classList.add('--animation-fade-in');
      },
      outFade: (element) => {
        element.classList.add('--animation-fade-out');
      },
      inSlide: (element) => {
        element.classList.add('--animation-slide-in');
      },
      outSlide: (element) => {
        element.classList.add('--animation-slide-out');
      },
    },
    displayFlex: (element) => {
      element.classList.add('--display-flex');
    },
    displayBlock: (element) => {
      element.classList.add('--display-block');
    },
    backgroundWhite: (element) => {
      element.classList.add('--background-white');
    },
    backgroundHoverBlue: (element) => {
      element.classList.add('--background-hover-blue');
    },
  },
  remove: {
    animation: {
      inFade: (element) => {
        element.classList.remove('--animation-fade-in');
      },
      outFade: (element) => {
        element.classList.remove('--animation-fade-out');
      },
      inSlide: (element) => {
        element.classList.remove('--animation-slide-in');
      },
      outSlide: (element) => {
        element.classList.remove('--animation-slide-out');
      },
    },
    backgroundWhite: (element) => {
      element.classList.remove('--background-white');
    },
    backgroundHoverBlue: (element) => {
      element.classList.remove('--background-hover-blue');
    },
  },
};

//Add CSS
const theSidebarSlideStyleAdd = (sidebar) => {
  theHTMLClass.add.animation.outSlide(sidebar);
  theHTMLClass.remove.animation.inSlide(sidebar);
};

const theSidebarSlideStyleRemove = (sidebar) => {
  theHTMLClass.remove.animation.outSlide(sidebar);
  theHTMLClass.add.animation.inSlide(sidebar);
};

const theSidebarFadeStyleAdd = (element) => {
  theHTMLClass.remove.animation.inFade(element);
  theHTMLClass.add.animation.outFade(element);
};

const theSidebarFadeStyleRemove = (element) => {
  theHTMLClass.remove.animation.outFade(element);
  theHTMLClass.add.animation.inFade(element);
};

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
