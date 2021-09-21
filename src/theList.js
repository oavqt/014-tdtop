import { theDOMTemplate } from './theDOMTools';

//Application Tools
//Object Templates
const objectTemplate = {
  project: (projectStorage, title, description) => {
    const proto = {
      addList: objectTemplate.list,
      addDOMAutomaticProject: theDOMTemplate.sidebarAProject,
      addDOMCustomProject: theDOMTemplate.sidebarCProject,
      addDOMProject: theDOMTemplate.project,
      addDOMTask: theDOMTemplate.task,
    };

    objectAdd(
      projectStorage,
      Object.assign(
        Object.create(
          Object.assign(objectOption.addProtoOption('proto', 'project'), proto)
        ),
        objectCreate.projectListNote(title, description),
        objectOption.addOption('object', 'project'),
        { list: [] }
      )
    );
  },

  list: (projectStorage, title, description) => {
    const proto = {
      addDOMList: theDOMTemplate.list,
      addTask: objectTemplate.task,
    };

    objectAdd(
      projectStorage,
      Object.assign(
        Object.create(
          Object.assign(objectOption.addProtoOption('proto', 'list'), proto)
        ),
        objectCreate.projectListNote(title, description),
        objectOption.addOption('object', 'list'),
        { task: [] }
      )
    );
  },

  task: (projectStorage, title, description, category, date) => {
    const proto = {
      addDOMTask: theDOMTemplate.task,
      addNote: objectTemplate.note,
    };

    objectAdd(
      projectStorage,
      Object.assign(
        Object.create(
          Object.assign(objectOption.addProtoOption('proto', 'task'), proto)
        ),
        objectCreate.task(title, description, category, date),
        objectOption.addOption('object', 'task'),
        { note: [] }
      )
    );
  },

  note: (projectStorage, title, description) => {
    const proto = {
      addDOMNote: theDOMTemplate.note,
    };

    objectAdd(
      projectStorage,
      Object.assign(
        Object.create(
          Object.assign(objectOption.addProtoOption('proto', 'note'), proto)
        ),
        objectCreate.projectListNote(title, description),
        objectOption.addOption('object', 'note')
      )
    );
  },
};

//Add Objects to Project Data
const objectAdd = (project, object) => {
  project.push(object);
  object.id = project.indexOf(object);
};

//Create Objects
const objectCreate = {
  projectListNote: (title, description) => {
    return {
      title,
      description,
    };
  },
  task: (title, description, category, date) => {
    return {
      title,
      description,
      category,
      date,
    };
  },
};

//Object Options
const objectOption = (() => {
  let objectStorage = {
    project: { type: 'project', test: 'object' },
    list: { type: 'list' },
    task: { type: 'task' },
    note: { type: 'note' },
  };

  let objectProtoStorage = {
    project: { type: 'project', test: 'proto' },
    list: { type: 'list' },
    task: { type: 'task' },
    note: { type: 'note' },
  };

  const objectType = (proto, type) => {
    let tStorage;

    if (proto === 'proto') tStorage = objectProtoStorage;
    else tStorage = objectStorage;

    if (type === 'project') return tStorage.project;
    else if (type === 'list') return tStorage.list;
    else if (type === 'task') return tStorage.task;
    else return tStorage.note;
  };

  //Manipulate the Storage Data
  const setOption = (proto, type, object) => {
    for (let key in object) {
      objectType(proto, type)[key] = object[key];
    }
  };

  const getOptionSet = (proto, type) => {
    let object = objectType(proto, type);
    let option = {};
    for (let key in object) {
      option[key] = key;
    }
    return option;
  };

  const rmOption = (proto, type, property) => {
    let object = objectType(proto, type);
    for (let key in object) {
      if (key.toString() === property) {
        delete object[key];
      }
    }
  };

  //Add Options to an Object
  const addOption = (proto, type) => {
    return JSON.parse(JSON.stringify(objectType(proto, type)));
  };

  const addProtoOption = (proto, type) => {
    return objectType(proto, type);
  };

  return { setOption, getOptionSet, rmOption, addOption, addProtoOption };
})();

/* 
project
  -list track its task 
    -task track its notes
      -notes
      -notes
      -notes
    -taks
      -notes
project
  -list 
    -task
      -notes
      -notes
      -note
*/

//Create Application
//Application Data
const theProjectStorage = (() => {
  let automaticProject = [];
  let customProject = [];

  const addProject = (type, title, description) => {
    objectTemplate.project(type, title, description);
  };

  const getProject = (type, index) => {
    if (type === 'automatic') return automaticProject[index];
    else return customProject[index];
  };

  return { automaticProject, customProject, addProject, getProject };
})();

//Automatic Projects
const theAutomaticProject = () => {
  theProjectStorage.automaticProject = []; //Temporary Server HMR

  const automatic = theProjectStorage.automaticProject;
  objectTemplate.project(automatic, 'Inbox', 'Inbox');
  objectTemplate.project(automatic, 'Today', 'Today');
  objectTemplate.project(automatic, 'Upcoming ', 'Upcoming ');
  objectTemplate.project(automatic, 'Someday', 'Someday ');
  objectTemplate.project(automatic, 'Never', 'Never');
  objectTemplate.project(automatic, 'Logbook', 'Logbook');
};

//Temporary Demos

const theCustomProjectDemo = () => {
  const custom = theProjectStorage.customProject;
  objectTemplate.project(custom, 'test', 'test');
};

const theAutomaticListDemo = () => {
  theProjectStorage.automaticProject[1].addList(
    theProjectStorage.automaticProject[1].list,
    'title',
    'description'
  );
  theProjectStorage.automaticProject[1].addList(
    theProjectStorage.automaticProject[1].list,
    'title2',
    'description2'
  );
  theProjectStorage.automaticProject[4].addList(
    theProjectStorage.automaticProject[4].list,
    'title',
    'description'
  );
};

const theAutomaticTaskDemo = () => {
  theProjectStorage.automaticProject[1].list[0].addTask(
    theProjectStorage.automaticProject[1].list[0].task,
    'title',
    'description',
    'category',
    'date'
  );
};

const theAutomaticNoteDemo = () => {
  theProjectStorage.automaticProject[1].list[0].task[0].addNote(
    theProjectStorage.automaticProject[1].list[0].task[0].note,
    'title',
    'description'
  );
};

//Application DOM Data
const theUpdateIDData = (projectStorage) => {
  theProjectStorage[projectStorage].forEach((project) => {
    project.type = projectStorage;
    project.list.forEach((list) => {
      list.project = project.id;
      list.task.forEach((task) => {
        task.project = project.id;
        task.list = list.id;
        task.note.forEach((note) => {
          note.project = project.id;
          note.list = list.id;
          note.task = task.id;
        });
      });
    });
  });
};

const theUpdateIDAll = () => {
  theUpdateIDData('automaticProject');
  theUpdateIDData('customProject');
};

const theDOMSidebarProjectData = () => {
  theProjectStorage.automaticProject.forEach((project) => {
    project.addDOMAutomaticProject(
      project.title.toLowerCase(),
      project.type,
      project.id
    );
  });
  theProjectStorage.customProject.forEach((project) => {
    project.addDOMCustomProject(
      project.title.toLowerCase(),
      project.type,
      project.id
    );
  });
};

const theDOMDisplay = (type, id) => {
  const tProject = theProjectStorage[type][id];

  tProject.addDOMProject(
    tProject.title,
    tProject.description,
    tProject.type,
    tProject.id
  );
  tProject.list.forEach((list) => {
    list.addDOMList(
      tProject.id,
      list.title,
      list.description,
      list.type,
      list.id
    );
    list.task.forEach((task) => {
      task.addDOMTask(
        list.id,
        task.title,
        task.description,
        task.category,
        task.date,
        task.type,
        task.id,
        tProject.id
      );
      task.note.forEach((note) => {
        note.addDOMNote(
          task.id,
          note.title,
          note.description,
          note.type,
          note.id,
          tProject.id,
          list.id
        );
      });
    });
  });
};

const theAutomaticApplication = () => {
  theAutomaticProject();
  theCustomProjectDemo();
  theAutomaticListDemo();
  theAutomaticTaskDemo();
  theAutomaticNoteDemo();
  theUpdateIDAll();
  theDOMSidebarProjectData();
};

export { theAutomaticApplication, theDOMDisplay };
