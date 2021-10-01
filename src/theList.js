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

  const add = {
    project: (type, title, description) => {
      objectTemplate.project(getStorage(type), title, description);

      //Events
      theEventHandler.publish(type, [
        getStorage(type),
        type,
        getStorage(type).at(-1),
      ]);
    },
    list: ([type, idProject], title, description) => {
      const tProject = get.project(type, idProject);
      tProject.addList(tProject.list, title, description);

      //Events
      idTypeUpdateData([getStorage(type), type]);
    },
    task: ([type, idList, idProject], title, description, category, date) => {
      get
        .list(type, idList, idProject)
        .addTask(title, description, category, date);
    },
    note: ([type, idTask, idList, idProject], title, description) => {
      get.task(type, idTask, idList, idProject).addNote(title, description);
    },
  };

  const get = {
    project: (type, idProject) => {
      return getStorage(type)[idProject];
    },
    list: (type, idList, idProject) => {
      return getStorage(type)[idProject][idList];
    },
    task: (type, idTask, idList, idProject) => {
      return getStorage(type)[idProject].list[idList].task[idTask];
    },
    note: (type, idNote, idList, idTask, idProject) => {
      return getStorage(type)[idProject].list[idList].task[idTask].note[idNote];
    },
  };

  const remove = {
    project: (type, id) => {
      if (id) {
        getStorage(type).splice(id, 1);
      } else {
        getStorage(type).splice(0);
      }
    },
  };

  const display = {
    project: (type, id) => {
      const displayProject = getStorage(type)[id];

      theEventHandler.publish('displayProject', [displayProject]);
    },
  };

  return {
    add,
    remove,
    display,
  };
})();

//Automatic Projects
const theAutomaticProject = () => {
  const automatic = 'automaticProject';
  theProjectStorage.add.project(automatic, 'Inbox', 'Inbox');
  theProjectStorage.add.project(automatic, 'Today', 'Today');
  theProjectStorage.add.project(automatic, 'Upcoming ', 'Upcoming ');
  theProjectStorage.add.project(automatic, 'Someday', 'Someday ');
  theProjectStorage.add.project(automatic, 'Never', 'Never');
  theProjectStorage.add.project(automatic, 'Logbook', 'Logbook');
};

//Application DOM Data
const idTypeUpdateData = ([projectStorage, type]) => {
  projectStorage.forEach((project) => {
    project.type = type;
    project.list.forEach((list) => {
      list.type = type;
      list.project = project.id;
      list.task.forEach((task) => {
        task.type = type;
        task.project = project.id;
        task.list = list.id;
        task.note.forEach((note) => {
          note.type = type;
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
  theProjectStorage.remove.project('automaticProject');
  theAutomaticProject();
};

//Events
theEventHandler.subscribe('automaticProject', idTypeUpdateData);
theEventHandler.subscribe('automaticProject', theDOMDisplaySidebar);
theEventHandler.subscribe('customProject', idTypeUpdateData);
theEventHandler.subscribe('customProject', theDOMDisplaySidebar);
theEventHandler.subscribe('displayProject', theDOMDisplay);

export { theAutomaticApplication, theProjectStorage };
