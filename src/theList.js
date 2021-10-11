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
const objectSetProto = (type, object) => {
  return Object.setPrototypeOf(
    object,
    objectOption.addProtoOption('proto', type)
  );
};

const objectCloneProto = (type, object) => {
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

      clean.duplicate.projects([get.storage(type).at(-1)]);
    },
    list: ([type, idProject], title, description) => {
      const tProject = get.project(type, idProject);

      tProject.addList(tProject.list, title, description);

      //Events
      lists++;

      idTypeCategoryIndexUpdateData([storage(type), type]);

      tagData.list(lists, tProject.list.at(-1));

      clean.duplicate.list([tProject.list.at(-1)]);

      sort.inbox([tProject.list.at(-1)]);

      idTypeCategoryIndexUpdateData([storage(type), type]);
    },
    task: ([type, idList, idProject], title, description, date) => {
      const tList = get.list(type, idList, idProject);

      tList.addTask(tList.task, title, description, date);

      //Events
      tasks++;

      idTypeCategoryIndexUpdateData([storage(type), type]);

      tagData.task(tasks, tList.task.at(-1));

      sort.date([tList, tList.task.at(-1)]);
      copy.add.lookup.task([tList.task.at(-1)]);

      idTypeCategoryIndexUpdateData([storage(type), type]);

      clean.duplicate.list([tList]);
      clean.duplicate.task([tList.task.at(-1)]);

      clean.sort();

      idTypeCategoryIndexUpdateData([storage(type), type]);
    },
    note: ([type, idTask, idList, idProject], title, description) => {
      const tTask = get.task(type, idTask, idList, idProject);

      tTask.addNote(tTask.note, title, description);

      //Events
      notes++;

      idTypeCategoryIndexUpdateData([storage(type), type]);

      tagData.note(notes, tTask.note.at(-1));

      copy.add.lookup.note([tTask.note.at(-1)]);

      clean.duplicate.note([tTask.note.at(-1)]);

      idTypeCategoryIndexUpdateData([storage(type), type]);
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

  //Sort Functions
  const sort = {
    date: ([tList, tTask]) => {
      if (date.today([tTask.date])) {
        sort.today([tList]);
      } else if (date.upcoming([tTask.date])) {
        sort.upcoming([tList]);
      } else if (date.someday([tTask.date])) {
        sort.someday([tList]);
      } else if (date.never([tTask.date])) {
        sort.never([tList]);
      }
    },
    inbox: ([tList]) => {
      const inbox = automaticProject[0];
      const clonedList = objectCloneProto('list', tList);
      const tagMatched = inbox.list.find(
        (list) => list.tag === clonedList.tag && list.type === clonedList.type
      );

      if (tagMatched === undefined && clonedList.type === 'automaticProject') {
        inbox.list.push(clonedList);
      }
    },
    today: ([tList]) => {
      const today = automaticProject[1];

      copy.add.list([today, tList]);
    },
    upcoming: ([tList]) => {
      const upcoming = automaticProject[2];

      copy.add.list([upcoming, tList]);
    },
    someday: ([tList]) => {
      const someday = automaticProject[3];

      copy.add.list([someday, tList]);
    },
    never: ([tList]) => {
      const never = automaticProject[4];

      copy.add.list([never, tList]);
    },
  };

  //Copy Functions
  const copy = {
    add: {
      list: ([target, tList]) => {
        const project = target;
        const list = clone.object.list([tList]);

        clone.prototype.list([list]);
        project.list.push(list);

        idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
        idTypeCategoryIndexUpdateData([customProject, 'customProject']);
      },
      task: ([target, tTask]) => {
        const list = target;
        const task = clone.object.task([tTask]);

        clone.prototype.task([task]);
        list.task.push(task);

        idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
        idTypeCategoryIndexUpdateData([customProject, 'customProject']);
      },
      note: ([target, tNote]) => {
        const task = target;
        const note = clone.object.note([tNote]);

        task.note.push(note);

        idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
        idTypeCategoryIndexUpdateData([customProject, 'customProject']);
      },
      lookup: {
        task: ([object]) => {
          const tList = get.list(object.type, object.list, object.project);
          const tagMatched = tag.lookup.list([tList]);

          if (tagMatched.length > 1) {
            tagMatched.forEach((list) => {
              if (list.project !== tList.project) {
                copy.add.task([list, object]);
              }
            });
          }
        },
        note: ([object]) => {
          const tTask = get.task(
            object.type,
            object.task,
            object.list,
            object.project
          );
          const tagMatched = tag.lookup.task([tTask]);

          if (tagMatched.length > 1) {
            tagMatched.forEach((task) => {
              if (task.project !== tTask.project) {
                copy.add.note([task, object]);
              }
            });
          }
        },
      },
    },
    edit: {
      properties: ([object]) => {
        const tagMatched = tag.lookup.all([object]);

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
        object.list.forEach((list) => {
          copy.remove.list([list]);
        });

        const tagMatched = tag.lookup.all([object]);

        tagMatched.forEach((tag) => {
          if (tag.project !== object.project) {
            get.storage(tag.type).splice(tag.id, 1);
          }
        });

        idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
        idTypeCategoryIndexUpdateData([customProject, 'customProject']);
      },
      list: ([object]) => {
        object.task.forEach((task) => {
          copy.remove.task([task]);
        });

        const tagMatched = tag.lookup.all([object]);

        tagMatched.forEach((tag) => {
          if (tag.project !== object.project && tag.task.length === 0) {
            get.project(tag.type, tag.project).list.splice(tag.id, 1);
          }
        });

        idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
        idTypeCategoryIndexUpdateData([customProject, 'customProject']);
      },
      task: ([object]) => {
        const tagMatched = tag.lookup.all([object]);

        tagMatched.forEach((tag) => {
          if (tag.project !== object.project) {
            get.list(tag.type, tag.list, tag.project).task.splice(tag.id, 1);
          }
        });

        idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
        idTypeCategoryIndexUpdateData([customProject, 'customProject']);
      },
      note: ([object]) => {
        const tagMatched = tag.lookup.all([object]);

        tagMatched.forEach((tag) => {
          if (tag.project !== object.project) {
            get
              .task(tag.type, tag.task, tag.list, tag.project)
              .note.splice(tag.id, 1);
          }
        });

        idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
        idTypeCategoryIndexUpdateData([customProject, 'customProject']);
      },
    },
  };

  //Clean Functions
  const clean = {
    duplicate: {
      projects: ([object]) => {
        const tagMatched = tag.lookup.project([object]);

        let cached;

        if (tagMatched.length > 1) {
          for (let index = 0; index < tagMatched.length; index++) {
            if (cached) {
              if (cached.tag === tagMatched[index].tag) {
                get
                  .storage(tagMatched[index].type)
                  .project.splice(tagMatched[index].id, 1);
              }
            }
            cached = tagMatched[index];
          }
        }
      },
      list: ([object]) => {
        const tagMatched = tag.lookup.list([object]);

        let cached;

        if (tagMatched.length > 1) {
          for (let index = 0; index < tagMatched.length; index++) {
            if (cached) {
              if (cached.project === tagMatched[index].project) {
                get
                  .project(tagMatched[index].type, tagMatched[index].project)
                  .list.splice(tagMatched[index].id, 1);
              }
            }
            cached = tagMatched[index];
          }
        }
      },
      task: ([object]) => {
        const tagMatched = tag.lookup.task([object]);

        let cached;

        if (tagMatched.length > 1) {
          for (let index = 0; index < tagMatched.length; index++) {
            if (cached) {
              if (cached.project === tagMatched[index].project) {
                get
                  .list(
                    tagMatched[index].type,
                    tagMatched[index].list,
                    tagMatched[index].project
                  )
                  .task.splice(tagMatched[index].id, 1);

                tagMatched.splice(index, 1);
              }
            }
            cached = tagMatched[index];
          }
        }
      },
      note: ([object]) => {
        const tagMatched = tag.lookup.note([object]);

        let cached;

        if (tagMatched.length > 1) {
          for (let index = 0; index < tagMatched.length; index++) {
            if (cached) {
              if (cached.project === tagMatched[index].project) {
                get
                  .task(
                    tagMatched[index].type,
                    tagMatched[index].task,
                    tagMatched[index].list,
                    tagMatched[index].project
                  )
                  .note.splice(tagMatched[index].id, 1);

                tagMatched.splice(index, 1);
              }
            }
            cached = tagMatched[index];
          }
        }
      },
    },
    empty: {
      list: (project) => {
        project.list.forEach((list) => {
          if (!list.task.at(0)) {
            project.list.splice(list.id, 1);
          }
        });
      },
    },
    sort: () => {
      clean.today();
      clean.upcoming();
      clean.someday();
      clean.never();
    },
    today: () => {
      const today = automaticProject[1];
      let taskMatched = [];

      today.list.forEach((list) => {
        list.task.forEach((task) => {
          if (!date.today([task.date])) {
            taskMatched.push(task);
          }
        });
      });

      for (let index = 0; index < taskMatched.length; index++) {
        idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
        idTypeCategoryIndexUpdateData([customProject, 'customProject']);

        get
          .list(
            taskMatched[index].type,
            taskMatched[index].list,
            taskMatched[index].project
          )
          .task.splice(taskMatched[index].id, 1);
      }

      clean.empty.list(today);
    },
    upcoming: () => {
      const upcoming = automaticProject[2];
      let taskMatched = [];

      upcoming.list.forEach((list) => {
        list.task.forEach((task) => {
          if (!date.upcoming([task.date])) {
            taskMatched.push(task);
          }
        });
      });

      for (let index = 0; index < taskMatched.length; index++) {
        idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
        idTypeCategoryIndexUpdateData([customProject, 'customProject']);

        get
          .list(
            taskMatched[index].type,
            taskMatched[index].list,
            taskMatched[index].project
          )
          .task.splice(taskMatched[index].id, 1);
      }

      clean.empty.list(upcoming);
    },
    someday: () => {
      const someday = automaticProject[3];
      let taskMatched = [];

      someday.list.forEach((list) => {
        list.task.forEach((task) => {
          if (!date.someday([task.date])) {
            taskMatched.push(task);
          }
        });
      });

      for (let index = 0; index < taskMatched.length; index++) {
        idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
        idTypeCategoryIndexUpdateData([customProject, 'customProject']);

        get
          .list(
            taskMatched[index].type,
            taskMatched[index].list,
            taskMatched[index].project
          )
          .task.splice(taskMatched[index].id, 1);
      }
      clean.empty.list(someday);
    },
    never: () => {
      const never = automaticProject[4];
      let taskMatched = [];

      never.list.forEach((list) => {
        list.task.forEach((task) => {
          if (!date.never([task.date])) {
            taskMatched.push(task);
          }
        });
      });

      for (let index = 0; index < taskMatched.length; index++) {
        idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
        idTypeCategoryIndexUpdateData([customProject, 'customProject']);

        get
          .list(
            taskMatched[index].type,
            taskMatched[index].list,
            taskMatched[index].project
          )
          .task.splice(taskMatched[index].id, 1);
      }
      clean.empty.list(never);
    },
  };

  //Misc Functions

  //Edit Functions
  const editUpdateProperties = ([object], title, description, date) => {
    object.title = title;
    object.description = description;

    if (date) {
      object.date = date;
    }
  };

  //Project Sort
  //Date Functions
  const date = {
    today: ([date]) => {
      console.log(date);
      const current = new Date().toLocaleDateString();
      const tDate = new Date(date).toLocaleDateString();

      if (tDate === current) {
        return true;
      } else {
        return false;
      }
    },
    upcoming: ([date]) => {
      const current = new Date();
      const tDate = new Date(date);

      const fortnight = new Date(current);
      fortnight.setDate(fortnight.getDate() + 14);

      if (tDate > current && tDate <= fortnight) {
        return true;
      } else {
        return false;
      }
    },
    someday: ([date]) => {
      const current = new Date();
      const tDate = new Date(date);

      const fortnight = new Date(current);
      fortnight.setDate(fortnight.getDate() + 14);

      if (tDate > fortnight) {
        return true;
      } else {
        return false;
      }
    },
    never: ([date]) => {
      if (date === '???') {
        return true;
      } else {
        return false;
      }
    },
  };

  //Tag Functions
  const tag = {
    lookup: {
      all: ([object]) => {
        let storage = automaticProject;
        let tagMatched = [];

        for (let u = 0; u <= 1; u++) {
          storage.forEach((project) => {
            if (project.tag === object.tag) {
              tagMatched.push(project);
            }
            project.list.forEach((list) => {
              if (list.tag === object.tag) {
                tagMatched.push(list);
              }
              list.task.forEach((task) => {
                if (task.tag === object.tag) {
                  tagMatched.push(task);
                }
                task.note.forEach((note) => {
                  if (note.tag === object.tag) {
                    tagMatched.push(note);
                  }
                });
              });
            });
          });
          storage = customProject;
        }
        return tagMatched;
      },
      project: ([tProject]) => {
        let storage = automaticProject;
        let tagMatched = [];

        for (let u = 0; u <= 1; u++) {
          storage.forEach((project) => {
            if (project.tag === tProject.tag) {
              tagMatched.push(project);
            }
          });
          storage = customProject;
        }
        return tagMatched;
      },
      list: ([tList]) => {
        let storage = automaticProject;
        let tagMatched = [];

        for (let u = 0; u <= 1; u++) {
          storage.forEach((project) => {
            project.list.forEach((list) => {
              if (list.tag === tList.tag) {
                tagMatched.push(list);
              }
            });
          });
          storage = customProject;
        }
        return tagMatched;
      },
      task: ([tTask]) => {
        let storage = automaticProject;
        let tagMatched = [];

        for (let u = 0; u <= 1; u++) {
          storage.forEach((project) => {
            project.list.forEach((list) => {
              list.task.forEach((task) => {
                if (task.tag === tTask.tag) {
                  tagMatched.push(task);
                }
              });
            });
          });
          storage = customProject;
        }
        return tagMatched;
      },
      note: ([tNote]) => {
        let storage = automaticProject;
        let tagMatched = [];

        for (let u = 0; u <= 1; u++) {
          storage.forEach((project) => {
            project.list.forEach((list) => {
              list.task.forEach((task) => {
                task.note.forEach((note) => {
                  if (note.tag === tNote.tag) {
                    tagMatched.push(note);
                  }
                });
              });
            });
          });
          storage = customProject;
        }
        return tagMatched;
      },
    },
  };

  //Clone Functions
  const clone = {
    object: {
      project: ([project]) => {
        return objectCloneProto('project', project);
      },
      list: ([list]) => {
        return objectCloneProto('list', list);
      },
      task: ([task]) => {
        return objectCloneProto('task', task);
      },
      note: ([note]) => {
        return objectCloneProto('note', note);
      },
    },
    prototype: {
      all: ([storage]) => {
        storage.forEach((project) => {
          objectSetProto('project', project);
          project.list.forEach((list) => {
            objectSetProto('list', list);
            list.task.forEach((task) => {
              objectSetProto('task', task);
              task.note.forEach((note) => {
                objectSetProto('note', note);
              });
            });
          });
        });
      },
      project: ([project]) => {
        project.list.forEach((list) => {
          objectSetProto('list', list);
          list.task.forEach((task) => {
            objectSetProto('task', task);
            task.note.forEach((note) => {
              objectSetProto('note', note);
            });
          });
        });
      },
      list: ([list]) => {
        list.task.forEach((task) => {
          objectSetProto('task', task);
          task.note.forEach((note) => {
            objectSetProto('note', note);
          });
        });
      },
      task: ([task]) => {
        task.note.forEach((note) => {
          objectSetProto('note', note);
        });
      },
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
