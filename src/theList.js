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
  //Storage
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

  //Add
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

      sort.date([tList, tList.task.at(-1)]);
    },
    note: ([type, idTask, idList, idProject], title, description) => {
      const tTask = get.task(type, idTask, idList, idProject);

      tTask.addNote(tTask.note, title, description);

      //Events
      notes++;

      idTypeCategoryIndexUpdateData([storage(type), type]);

      tagData.note(notes, tTask.note.at(-1));

      sort.date([get.list(type, idList, idProject), tTask, tTask.note.at(-1)]);
    },
  };

  //Edit
  const edit = {
    project: ([type, id], title, description) => {
      const tProject = get.project(type, id);

      editUpdateProperties([tProject], title, description);
      copy.edit.properties([tProject]);

      //Events
      theEventHandler.publish('theDisplayUpdate', [type, id]);

      theEventHandler.publish(type, [storage(type), type]);
    },
    list: ([type, id, idProject], title, description) => {
      const tList = get.list(type, id, idProject);

      editUpdateProperties([tList], title, description);
      copy.edit.properties([tList]);

      //Events
      theEventHandler.publish('theDisplayUpdate', [type, idProject]);
    },
    task: ([type, id, idList, idProject], title, description, date) => {
      const tTask = get.task(type, id, idList, idProject);

      editUpdateProperties([tTask], title, description, date);
      copy.edit.properties([tTask]);

      //Events
      theEventHandler.publish('theDisplayUpdate', [type, idProject]);
    },
    note: ([type, id, idTask, idList, idProject], title, description) => {
      const tNote = get.note(type, id, idTask, idList, idProject);

      editUpdateProperties([tNote], title, description);
      copy.edit.properties([tNote]);

      //Events
      theEventHandler.publish('theDisplayUpdate', [type, idProject]);
    },
  };

  //Remove
  const remove = {
    project: (type, id) => {
      if (id) {
        copy.remove.project([get.project(type, id)]);
        storage(type).splice(id, 1);
      } else {
        storage(type).splice(0);
      }

      //Events
      idUpdateDataIndex(storage(type));
      theEventHandler.publish(type, [storage(type), type]);
    },
    list: ([type, id, idProject]) => {
      copy.remove.list([get.list(type, id, idProject)]);
      const tProject = get.project(type, idProject);

      tProject.list.splice(id, 1);

      //Events
      idUpdateDataIndex(storage(type));
      theEventHandler.publish('theDisplayUpdate', [type, idProject]);
    },
    task: ([type, id, idList, idProject]) => {
      copy.remove.task([get.task(type, id, idList, idProject)]);
      const tList = get.list(type, idList, idProject);

      tList.task.splice(id, 1);

      //Events
      idUpdateDataIndex(storage(type));
      theEventHandler.publish('theDisplayUpdate', [type, idProject]);
    },
    note: ([type, id, idTask, idList, idProject]) => {
      copy.remove.note([get.note(type, id, idTask, idList, idProject)]);
      const tTask = get.task(type, idTask, idList, idProject);

      tTask.note.splice(id, 1);

      //Events
      idUpdateDataIndex(storage(type));
      theEventHandler.publish('theDisplayUpdate', [type, idProject]);
    },
  };

  //Project Sort
  const sort = {
    date: ([tList, tTask, tNote]) => {
      const clonedList = objectProtoClone('list', tList);
      const clonedTask = objectProtoClone('task', tTask);

      let clonedNote;
      if (tNote) {
        clonedNote = objectProtoClone('note', tNote);
      }

      if (date.today(tTask.date)) {
        sort.today([clonedList, clonedTask, clonedNote]);
      } else if (date.upcoming(tTask.date)) {
        sort.upcoming([clonedList, clonedTask, clonedNote]);
      }
    },
    today: ([tList, tTask, tNote]) => {
      const today = automaticProject[1];

      copy.add([today, tList, tTask, tNote]);
    },
    upcoming: ([tList, tTask, tNote]) => {
      const upcoming = automaticProject[2];

      copy.add([upcoming, tList, tTask, tNote]);
    },
  };

  //Misc Functions
  const tagLookup = ([tag]) => {
    let projectStorage = automaticProject;
    let tagMatched = [];

    for (let u = 0; u <= 1; u++) {
      projectStorage.forEach((project) => {
        if (project.tag === tag) {
          tagMatched.push(project);
        }
        project.list.forEach((list) => {
          if (list.tag === tag) {
            tagMatched.push(list);
          }
          list.task.forEach((task) => {
            if (task.tag === tag) {
              tagMatched.push(task);
            }
            task.list = list.id;
            task.note.forEach((note) => {
              if (note.tag === tag) {
                tagMatched.push(note);
              }
            });
          });
        });
      });
      projectStorage = customProject;
    }
    return tagMatched;
  };

  //Copy Functions
  const copy = {
    add: ([target, tList, tTask, tNote]) => {
      const project = target;
      const projectList = project.list.find((list) => list.tag === tList.tag);

      copy.clean[project.title.toLowerCase()](tList);

      let projectListTask;
      if (tNote) {
        projectListTask = projectList.task.find(
          (task) => task.tag === tTask.tag
        );
      }

      if (projectList) {
        if (projectListTask) {
          tTask.note.splice(-1, 1);
          tTask.note.push(tNote);
          projectListTask.note.push(tNote);
        } else {
          projectList.task.push(tTask);
        }
      } else {
        tList.task.splice(-1, 1);
        tList.task.push(tTask);
        project.list.push(tList);
      }

      copy.clean[project.title.toLowerCase()](projectList);

      idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
    },
    edit: {
      properties: ([object]) => {
        const tagMatched = tagLookup([object.tag]);

        if (object.date) {
          tagMatched.forEach((tag) => {
            editUpdateProperties(
              [tag],
              object.title,
              object.description,
              object.date
            );
          });
        } else {
          tagMatched.forEach((tag) => {
            editUpdateProperties([tag], object.title, object.description);
          });
        }
      },
    },
    remove: {
      project: ([object]) => {
        const tagMatched = tagLookup([object.tag]);

        tagMatched.forEach((tag) => {
          if (tag.project !== object.project) {
            get.storage(tag.type).splice(tag.id, 1);
          }
        });
      },
      list: ([object]) => {
        const tagMatched = tagLookup([object.tag]);

        tagMatched.forEach((tag) => {
          if (tag.project !== object.project) {
            get.project(tag.type, tag.project).list.splice(tag.id, 1);
          }
        });
      },
      task: ([object]) => {
        const tagMatched = tagLookup([object.tag]);

        tagMatched.forEach((tag) => {
          if (tag.project !== object.project) {
            get.list(tag.type, tag.list, tag.project).task.splice(tag.id, 1);
          }
        });
      },
      note: ([object]) => {
        const tagMatched = tagLookup([object.tag]);

        tagMatched.forEach((tag) => {
          if (tag.project !== object.project) {
            get
              .task(tag.type, tag.task, tag.list, tag.project)
              .note.splice(tag.id, 1);
          }
        });
      },
    },
    clean: {
      today: (list) => {
        if (list) {
          list.task.forEach((task) => {
            if (!date.today(task.date)) {
              list.task.splice(task.id, 1);
              console.log(list);
            }
          });
        }
      },
      upcoming: (list) => {
        if (list) {
          list.task.forEach((task) => {
            if (!date.upcoming(task.date)) {
              list.task.splice(task.id, 1);
              console.log(list);
            }
          });
        }
      },
    },
  };

  //Edit Functions
  const editUpdateProperties = ([object], title, description, date) => {
    object.title = title;
    object.description = description;

    if (date) {
      object.date = date;
    }
  };

  //Sort Functions
  const date = {
    today: (date) => {
      const current = new Date().toISOString().slice(0, 10);

      if (date === current) {
        return true;
      }
    },
    upcoming: (date) => {
      const current = new Date();
      const tDate = new Date(date);

      const fortnight = new Date(current);
      fortnight.setDate(fortnight.getDate() + 14);

      if (tDate > current && tDate <= fortnight) {
        return true;
      }
    },
  };

  //Display
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
  theProjectStorage.add.project(automatic, 'Upcoming', 'Upcoming');
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
