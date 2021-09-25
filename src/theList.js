import { theDOMTemplate } from './theDOMTools';
import { theEventHandler } from './theHandler';

//Application Tools
//Object Templates
const objectTemplate = {
  project: (projectStorage, title, description) => {
    const proto = {
      addList: objectTemplate.list,
      addDOMAutomaticProject: theDOMTemplate.sidebarAutomaticProject,
      addDOMCustomProject: theDOMTemplate.sidebarCustomProject,
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

  const removeOption = (proto, type, property) => {
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

  return { setOption, getOptionSet, removeOption, addOption, addProtoOption };
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

  const getStorage = (type) => {
    if (type === 'automaticProject') {
      return automaticProject;
    } else {
      return customProject;
    }
  };

  const addProject = (type, title, description) => {
    objectTemplate.project(getStorage(type), title, description);

    //Events
    theEventHandler.publish(type, [
      getStorage(type),
      type,
      getStorage(type).at(-1),
    ]);
  };

  const getProject = (type, index) => {
    return getStorage(type)[index];
  };

  const getProjects = (type) => {
    return getStorage(type);
  };

  const removeProject = (type, index) => {
    if (index) {
      getStorage(type).splice(index, 1);
    } else {
      getStorage(type).splice(0);
    }
  };

  const displayProject = (type, id) => {
    const displayProject = getStorage(type)[id];

    theEventHandler.publish('displayProject', [displayProject]);
  };

  const idUpdate = (projectStorage, type) => {
    idUpdateData(getStorage(projectStorage), type);
  };

  return {
    addProject,
    getProject,
    getProjects,
    removeProject,
    displayProject,
    idUpdate,
  };
})();

//Automatic Projects
const theAutomaticProject = () => {
  const automatic = 'automaticProject';
  theProjectStorage.addProject(automatic, 'Inbox', 'Inbox');
  theProjectStorage.addProject(automatic, 'Today', 'Today');
  theProjectStorage.addProject(automatic, 'Upcoming ', 'Upcoming ');
  theProjectStorage.addProject(automatic, 'Someday', 'Someday ');
  theProjectStorage.addProject(automatic, 'Never', 'Never');
  theProjectStorage.addProject(automatic, 'Logbook', 'Logbook');
};

//Application DOM Data
const idUpdateData = ([projectStorage, type]) => {
  projectStorage.forEach((project) => {
    project.type = type;
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

const theDOMDisplaySidebar = ([projectStorage, type, project]) => {
  const tProjectStorage = projectStorage;
  let addDOMAutoCutomProject;

  if (type === 'automaticProject') {
    addDOMAutoCutomProject = 'addDOMAutomaticProject';
  } else {
    addDOMAutoCutomProject = 'addDOMCustomProject';
  }

  if (project) {
    project[addDOMAutoCutomProject](project.title, project.type, project.id);
  } else {
    tProjectStorage.forEach((project) => {
      project[addDOMAutoCutomProject](project.title, project.type, project.id);
    });
  }
};

const theDOMDisplay = ([project]) => {
  project.addDOMProject(
    project.title,
    project.description,
    project.type,
    project.id
  );
  project.list.forEach((list) => {
    list.addDOMList(
      project.id,
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
        project.id
      );
      task.note.forEach((note) => {
        note.addDOMNote(
          task.id,
          note.title,
          note.description,
          note.type,
          note.id,
          project.id,
          list.id
        );
      });
    });
  });
};

const theAutomaticApplication = () => {
  theProjectStorage.removeProject('automaticProject');
  theAutomaticProject();
};

//Events
theEventHandler.subscribe('automaticProject', idUpdateData);
theEventHandler.subscribe('automaticProject', theDOMDisplaySidebar);
theEventHandler.subscribe('customProject', idUpdateData);
theEventHandler.subscribe('customProject', theDOMDisplaySidebar);
theEventHandler.subscribe('displayProject', theDOMDisplay);

export { theAutomaticApplication, theProjectStorage };
