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

  task: (projectStorage, title, description, date) => {
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
        objectCreate.task(title, description, date),
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

//Add Objects
//Project Data
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
  task: (title, description, date) => {
    return {
      title,
      description,
      date,
    };
  },
};

//Clone Objects
const objectProtoClone = (type, object) => {
  return Object.assign(
    Object.create(objectOption.addProtoOption('proto', type)),
    JSON.parse(JSON.stringify(object))
  );
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
    project: {
      addList: objectTemplate.list,
      addDOMAutomaticProject: theDOMTemplate.sidebarAutomaticProject,
      addDOMCustomProject: theDOMTemplate.sidebarCustomProject,
      addDOMProject: theDOMTemplate.project,
      addDOMTask: theDOMTemplate.task,
    },
    list: { addDOMList: theDOMTemplate.list, addTask: objectTemplate.task },
    task: {
      addDOMTask: theDOMTemplate.task,
      addNote: objectTemplate.note,
    },
    note: { addDOMNote: theDOMTemplate.note },
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

  let projects = 0;
  let lists = 0;
  let tasks = 0;
  let notes = 0;

  const storage = (type) => {
    if (type === 'automaticProject') {
      return automaticProject;
    } else {
      return customProject;
    }
  };

  const get = {
    storage: (type) => {
      return storage(type);
    },
    project: (type, idProject) => {
      return storage(type)[idProject];
    },
    list: (type, idList, idProject) => {
      return storage(type)[idProject].list[idList];
    },
    task: (type, idTask, idList, idProject) => {
      return storage(type)[idProject].list[idList].task[idTask];
    },
    note: (type, idNote, idTask, idList, idProject) => {
      return storage(type)[idProject].list[idList].task[idTask].note[idNote];
    },
  };

  const add = {
    project: (type, title, description) => {
      objectTemplate.project(storage(type), title, description);

      //Events
      projects++;

      theEventHandler.publish(type, [
        storage(type),
        type,
        storage(type).at(-1),
      ]);

      tagData.project(projects, storage(type).at(-1));
    },
    list: ([type, idProject], title, description) => {
      const tProject = get.project(type, idProject);

      tProject.addList(tProject.list, title, description);

      //Events
      lists++;

      idTypeCategoryIndexUpdateData([storage(type), type]);

      tagData.list(lists, tProject.list.at(-1));
    },
    task: ([type, idList, idProject], title, description, date) => {
      const tList = get.list(type, idList, idProject);

      tList.addTask(tList.task, title, description, date);

      //Events
      tasks++;

      idTypeCategoryIndexUpdateData([storage(type), type]);

      tagData.task(tasks, tList.task.at(-1));

      dateProjectSort(tList, tList.task.at(-1));
    },
    note: ([type, idTask, idList, idProject], title, description) => {
      const tTask = get.task(type, idTask, idList, idProject);

      tTask.addNote(tTask.note, title, description);

      //Events
      notes++;

      idTypeCategoryIndexUpdateData([storage(type), type]);

      tagData.note(notes, tTask.note.at(-1));

      dateProjectSort(
        get.list(type, idList, idProject),
        tTask,
        tTask.note.at(-1)
      );
    },
  };

  const edit = {
    project: ([type, id], title, description) => {
      const tProject = get.project(type, id);

      editUpdateProperties([tProject], title, description);
      editCopyProperties([tProject]);

      //Events
      theEventHandler.publish('theDisplayUpdate', [type, id]);

      theEventHandler.publish(type, [storage(type), type]);
    },
    list: ([type, id, idProject], title, description) => {
      const tList = get.list(type, id, idProject);

      editUpdateProperties([tList], title, description);
      editCopyProperties([tList]);

      //Events
      theEventHandler.publish('theDisplayUpdate', [type, idProject]);
    },
    task: ([type, id, idList, idProject], title, description, date) => {
      const tTask = get.task(type, id, idList, idProject);

      editUpdateProperties([tTask], title, description, date);
      editCopyProperties([tTask]);

      //Events
      theEventHandler.publish('theDisplayUpdate', [type, idProject]);
    },
    note: ([type, id, idTask, idList, idProject], title, description) => {
      const tNote = get.note(type, id, idTask, idList, idProject);

      editUpdateProperties([tNote], title, description);
      editCopyProperties([tNote]);

      //Events
      theEventHandler.publish('theDisplayUpdate', [type, idProject]);
    },
  };

  const remove = {
    project: (type, id) => {
      if (id) {
        storage(type).splice(id, 1);
      } else {
        storage(type).splice(0);
      }

      //Events
      idUpdateDataIndex(storage(type));
      theEventHandler.publish(type, [storage(type), type]);
    },
    list: ([type, id, idProject]) => {
      const tProject = get.project(type, idProject);

      tProject.list.splice(id, 1);

      //Events
      idUpdateDataIndex(storage(type));
      theEventHandler.publish('theDisplayUpdate', [type, idProject]);
    },
    task: ([type, id, idList, idProject]) => {
      const tList = get.list(type, idList, idProject);

      tList.task.splice(id, 1);

      //Events
      idUpdateDataIndex(storage(type));
      theEventHandler.publish('theDisplayUpdate', [type, idProject]);
    },
    note: ([type, id, idTask, idList, idProject]) => {
      const tTask = get.task(type, idTask, idList, idProject);

      tTask.note.splice(id, 1);

      //Events
      idUpdateDataIndex(storage(type));
      theEventHandler.publish('theDisplayUpdate', [type, idProject]);
    },
  };

  //Project Sort
  const dateProjectSort = (list, task, note) => {
    const date = new Date().toISOString().slice(0, 10);
    const tList = objectProtoClone('list', list);
    const tTask = objectProtoClone('task', task);
    let tNote;
    if (note) {
      tNote = objectProtoClone('note', note);
    }

    if (tTask.date === date) {
      dateTodayProjectSort(tList, tTask, tNote);
    }
  };

  //Edit Functions
  const editUpdateProperties = ([object], title, description, date) => {
    object.title = title;
    object.description = description;

    if (date) {
      object.date = date;
    }
  };

  const editCopyProperties = ([object]) => {
    const objectTag = object.tag;
    let projectStorage = automaticProject;

    for (let u = 0; u <= 1; u++) {
      projectStorage.forEach((project) => {
        if (project.tag === objectTag) {
          editUpdateProperties([project], object.title, object.description);
        }
        project.list.forEach((list) => {
          if (list.tag === objectTag) {
            editUpdateProperties([list], object.title, object.description);
          }
          list.task.forEach((task) => {
            if (task.tag === objectTag) {
              editUpdateProperties(
                [task],
                object.title,
                object.description,
                object.date
              );
            }
            task.list = list.id;
            task.note.forEach((note) => {
              if (note.tag === objectTag) {
                editUpdateProperties([note], object.title, object.description);
              }
            });
          });
        });
      });
      projectStorage = customProject;
    }
  };

  //Project Sort Functions
  const dateTodayProjectSort = (tList, tTask, tNote) => {
    const today = automaticProject[1];
    const todayList = today.list.find((list) => list.tag === tList.tag);

    let todayListTask;
    if (tNote) {
      todayListTask = todayList.task.find((task) => task.tag === tTask.tag);
    }

    if (todayList) {
      if (todayListTask) {
        tTask.note.splice(-1, 1);
        tTask.note.push(tNote);
        todayListTask.note.push(tNote);
      } else {
        todayList.task.push(tTask);
      }
    } else {
      tList.task.splice(-1, 1);
      tList.task.push(tTask);
      today.list.push(tList);
    }

    idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
  };

  const display = {
    project: (type, id) => {
      if (!id) {
        id = storage(type).length - 1;
      }
      const displayProject = storage(type)[id];

      theEventHandler.publish('displayProject', [displayProject]);
    },
    formValue: {
      project: (type, id) => {
        const tProject = get.project(type, id);

        return [tProject.title, tProject.description];
      },
      list: ([type, id, idProject]) => {
        const tList = get.list(type, id, idProject);

        return [tList.title, tList.description];
      },
      task: ([type, id, idList, idProject]) => {
        const tTask = get.task(type, id, idList, idProject);

        return [tTask.title, tTask.description, tTask.date];
      },
      note: ([type, id, idTask, idList, idProject]) => {
        const tNote = get.note(type, id, idTask, idList, idProject);

        return [tNote.title, tNote.description];
      },
    },
  };

  return {
    add,
    edit,
    remove,
    display,
  };
})();

//Application Data
const idTypeCategoryIndexUpdateData = ([projectStorage, type]) => {
  typeUpdateData(projectStorage, type);
  categoryUpdateData(projectStorage);
  idUpdateDataIndex(projectStorage);
  idUpdateData(projectStorage);
};

const tagData = {
  project: (count, object) => {
    object.tag = `${count}${object.type}${object.id}`;
  },
  list: (count, object) => {
    object.tag = `${count}${object.type}${object.project}${object.id}`;
  },
  task: (count, object) => {
    object.tag = `${count}${object.type}${object.project}${object.list}${object.id}`;
  },
  note: (count, object) => {
    object.tag = `${count}${object.type}${object.project}${object.list}${object.task}${object.id}`;
  },
};

const idUpdateData = (projectStorage) => {
  projectStorage.forEach((project) => {
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

const idUpdateDataIndex = (projectStorage) => {
  projectStorage.forEach((project) => {
    project.id = projectStorage.indexOf(project);
    project.list.forEach((list) => {
      list.id = project.list.indexOf(list);
      list.task.forEach((task) => {
        task.id = list.task.indexOf(task);
        task.note.forEach((note) => {
          note.id = task.note.indexOf(note);
        });
      });
    });
  });
};

const typeUpdateData = (projectStorage, type) => {
  projectStorage.forEach((project) => {
    project.type = type;
    project.list.forEach((list) => {
      list.type = type;
      list.task.forEach((task) => {
        task.type = type;
        task.note.forEach((note) => {
          note.type = type;
        });
      });
    });
  });
};

const categoryUpdateData = (projectStorage) => {
  projectStorage.forEach((project) => {
    project.list.forEach((list) => {
      list.category = project.title.toLowerCase();
      list.task.forEach((task) => {
        task.category = list.title.toLowerCase();
        task.note.forEach((note) => {
          note.category = task.title.toLowerCase();
        });
      });
    });
  });
};

//Display Functions
const theDOMDisplaySidebar = ([projectStorage, type, project]) => {
  let addDOMAutoCutomProject;

  if (type === 'automaticProject') {
    addDOMAutoCutomProject = 'addDOMAutomaticProject';
  } else {
    addDOMAutoCutomProject = 'addDOMCustomProject';
  }

  if (project) {
    project[addDOMAutoCutomProject](project.title, project.type, project.id);
  } else {
    projectStorage.forEach((project) => {
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
      list.category,
      list.id
    );
    list.task.forEach((task) => {
      task.addDOMTask(
        list.id,
        task.title,
        task.description,
        task.date,
        task.type,
        task.category,
        task.id,
        project.id
      );
      task.note.forEach((note) => {
        note.addDOMNote(
          task.id,
          note.title,
          note.description,
          note.type,
          note.category,
          note.id,
          project.id,
          list.id
        );
      });
    });
  });
};

//Automatic Projects
const theAutomaticProject = () => {
  const automatic = 'automaticProject';
  theProjectStorage.add.project(automatic, 'Inbox', 'Inbox');
  theProjectStorage.add.project(automatic, 'Today', 'Today');
  theProjectStorage.add.project(automatic, 'Upcoming ', 'Upcoming ');
  theProjectStorage.add.project(automatic, 'Someday', 'Someday ');
  theProjectStorage.add.project(automatic, 'Never', 'Never');
  theProjectStorage.add.project(automatic, 'Logbook', 'Logbook');
  theDefaultProject();
};

//Default Project
const theDefaultProject = () => {
  theProjectStorage.display.project('automaticProject', '0');

  //Events
  theEventHandler.publish('theDefaultProjectStyle', true);
};

//Application Functions
const theAutomaticApplication = () => {
  theProjectStorage.remove.project('automaticProject');
  theAutomaticProject();
};

//Events
theEventHandler.subscribe('automaticProject', idTypeCategoryIndexUpdateData);
theEventHandler.subscribe('automaticProject', theDOMDisplaySidebar);
theEventHandler.subscribe('customProject', idTypeCategoryIndexUpdateData);
theEventHandler.subscribe('customProject', theDOMDisplaySidebar);
theEventHandler.subscribe('displayProject', theDOMDisplay);
theEventHandler.subscribe('theDefaultProject', theDefaultProject);

export { theAutomaticApplication, theProjectStorage };
