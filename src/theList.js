import { theDOMTemplate } from './theDOMTools';
import { theEventHandler } from './theHandler';

//Application Tools
//Object Templates
const objectTemplate = {
  project: (storage, title, description) => {
    const proto = {
      addList: objectTemplate.list,
      addDOMAutomaticProject: theDOMTemplate.sidebarAutomaticProject,
      addDOMCustomProject: theDOMTemplate.sidebarCustomProject,
      addDOMProject: theDOMTemplate.project,
      addDOMTask: theDOMTemplate.task,
    };

    objectAdd(
      storage,
      Object.assign(
        Object.create(
          Object.assign(
            objectProperties.get.protoProperties('proto', 'project'),
            proto
          )
        ),
        objectCreate.projectListNote(title, description),
        objectProperties.get.objectProperties('object', 'project'),
        { list: [] }
      )
    );
  },

  list: (storage, title, description) => {
    const proto = {
      addDOMList: theDOMTemplate.list,
      addTask: objectTemplate.task,
    };

    objectAdd(
      storage,
      Object.assign(
        Object.create(
          Object.assign(
            objectProperties.get.protoProperties('proto', 'list'),
            proto
          )
        ),
        objectCreate.projectListNote(title, description),
        objectProperties.get.objectProperties('object', 'list'),
        { task: [] }
      )
    );
  },

  task: (storage, title, description, date) => {
    const proto = {
      addDOMTask: theDOMTemplate.task,
      addNote: objectTemplate.note,
    };

    objectAdd(
      storage,
      Object.assign(
        Object.create(
          Object.assign(
            objectProperties.get.protoProperties('proto', 'task'),
            proto
          )
        ),
        objectCreate.task(title, description, date),
        objectProperties.get.objectProperties('object', 'task'),
        { note: [] }
      )
    );
  },

  note: (storage, title, description) => {
    const proto = {
      addDOMNote: theDOMTemplate.note,
    };

    objectAdd(
      storage,
      Object.assign(
        Object.create(
          Object.assign(
            objectProperties.get.protoProperties('proto', 'note'),
            proto
          )
        ),
        objectCreate.projectListNote(title, description),
        objectProperties.get.objectProperties('object', 'note')
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
    objectProperties.get.protoProperties('proto', type)
  );
};

const objectCloneProto = (type, object) => {
  return Object.assign(
    Object.create(objectProperties.get.protoProperties('proto', type)),
    JSON.parse(JSON.stringify(object))
  );
};

//Object Options
const objectProperties = (() => {
  let objectProperties = {
    project: {
      type: 'project',
      lists: 0,
      tasks: 0,
      notes: 0,
      checkMark: false,
    },
    list: {
      type: 'list',
      tasks: 0,
      notes: 0,
      checkMark: false,
    },
    task: {
      type: 'task',
      notes: 0,
      checkMark: false,
    },
    note: {
      type: 'note',
      checkMark: false,
    },
  };

  let objectProtoProperties = {
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

  const objectPropertiesType = (proto, type) => {
    let storage;

    if (proto === 'proto') storage = objectProtoProperties;
    else storage = objectProperties;

    if (type === 'project') return storage.project;
    else if (type === 'list') return storage.list;
    else if (type === 'task') return storage.task;
    else return storage.note;
  };

  //Manipulate the Properties Data
  const add = (proto, type, object) => {
    for (let key in object) {
      objectPropertiesType(proto, type)[key] = object[key];
    }
  };

  const read = (proto, type) => {
    let object = objectPropertiesType(proto, type);
    let option = {};
    for (let key in object) {
      option[key] = key;
    }
    return option;
  };

  const remove = (proto, type, property) => {
    let object = objectPropertiesType(proto, type);
    for (let key in object) {
      if (key.toString() === property) {
        delete object[key];
      }
    }
  };

  //Add Properties to an Object
  const get = {
    objectProperties: (proto, type) => {
      return JSON.parse(JSON.stringify(objectPropertiesType(proto, type)));
    },
    protoProperties: (proto, type) => {
      return objectPropertiesType(proto, type);
    },
  };

  return { add, read, remove, get };
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

  //Number Of
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
    project: ([type], title, description) => {
      const storage = get.storage(type);
      objectTemplate.project(storage, title, description);

      //Events
      projects++;

      tagData.project(get.storage(type).at(-1), projects);

      clean.duplicate.projects(get.storage(type).at(-1));

      theEventHandler.publish(type, [
        get.storage(type),
        type,
        get.storage(type).at(-1),
      ]);
    },
    list: ([type, idProject], title, description) => {
      const tProject = get.project(type, idProject);

      tProject.addList(tProject.list, title, description);

      //Events
      lists++;

      idTypeCategoryIndexUpdateData([get.storage(type), type]);

      tagData.list(tProject.list.at(-1), lists);

      clean.duplicate.list(tProject.list.at(-1));

      sort.inbox(tProject.list.at(-1));

      idTypeCategoryIndexUpdateData([get.storage(type), type]);
    },
    task: ([type, idList, idProject], title, description, date) => {
      const tList = get.list(type, idList, idProject);

      tList.addTask(tList.task, title, description, date);

      //Events
      tasks++;

      idTypeCategoryIndexUpdateData([get.storage(type), type]);

      tagData.task(tList.task.at(-1), tasks);

      sort.date(tList, tList.task.at(-1));

      copy.add.lookup.task(tList.task.at(-1));

      sort.inbox(tList);

      idTypeCategoryIndexUpdateData([get.storage(type), type]);

      clean.duplicate.list(tList);

      clean.duplicate.task(tList.task.at(-1));

      clean.sort();

      display.count.value(automaticProject);

      display.count.value(customProject);

      idTypeCategoryIndexUpdateData([get.storage(type), type]);
    },
    note: ([type, idTask, idList, idProject], title, description) => {
      const tTask = get.task(type, idTask, idList, idProject);

      tTask.addNote(tTask.note, title, description);

      //Events
      notes++;

      idTypeCategoryIndexUpdateData([get.storage(type), type]);

      tagData.note(tTask.note.at(-1), notes);

      copy.add.lookup.note(tTask.note.at(-1));

      clean.duplicate.note(tTask.note.at(-1));

      idTypeCategoryIndexUpdateData([get.storage(type), type]);
    },
  };

  //Edit
  const edit = {
    project: ([type, id], title, description) => {
      const tProject = get.project(type, id);

      editUpdateProperties(tProject, title, description);

      copy.edit.objectProperties(tProject);

      //Events
      theEventHandler.publish('theDisplayUpdate', [type, id]);

      theEventHandler.publish(type, [get.storage(type), type]);
    },
    list: ([type, id, idProject], title, description) => {
      const tList = get.list(type, id, idProject);

      editUpdateProperties(tList, title, description);

      copy.edit.objectProperties(tList);

      //Events
      theEventHandler.publish('theDisplayUpdate', [type, idProject]);
    },
    task: ([type, id, idList, idProject], title, description, date) => {
      const tTask = get.task(type, id, idList, idProject);

      editUpdateProperties(tTask, title, description, date);

      copy.edit.objectProperties(tTask);

      //Events
      theEventHandler.publish('theDisplayUpdate', [type, idProject]);
    },
    note: ([type, id, idTask, idList, idProject], title, description) => {
      const tNote = get.note(type, id, idTask, idList, idProject);

      editUpdateProperties(tNote, title, description);

      copy.edit.objectProperties(tNote);

      //Events
      theEventHandler.publish('theDisplayUpdate', [type, idProject]);
    },
  };

  //Remove
  const remove = {
    project: ([type, id]) => {
      if (id) {
        copy.remove.project(get.project(type, id));

        log.sort.project(get.project(type, id));

        get.storage(type).splice(id, 1);
      } else {
        //Server HMR
        get.storage(type).splice(0);
      }

      //Events
      idTypeCategoryIndexUpdateData([get.storage(type), type]);

      theEventHandler.publish(type, [get.storage(type), type]);

      display.count.value(automaticProject);

      display.count.value(customProject);
    },
    list: ([type, id, idProject]) => {
      const tProject = get.project(type, idProject);

      copy.remove.list(get.list(type, id, idProject));

      log.sort.list(get.list(type, id, idProject));

      tProject.list.splice(id, 1);

      //Events
      idUpdateDataIndex(get.storage(type));

      display.count.value(automaticProject);

      display.count.value(customProject);

      theEventHandler.publish('theDisplayUpdate', [type, idProject]);
    },
    task: ([type, id, idList, idProject]) => {
      const tList = get.list(type, idList, idProject);

      copy.remove.task(get.task(type, id, idList, idProject));

      log.sort.task(get.task(type, id, idList, idProject));

      tList.task.splice(id, 1);

      //Events
      idUpdateDataIndex(get.storage(type));

      display.count.value(automaticProject);

      display.count.value(customProject);

      theEventHandler.publish('theDisplayUpdate', [type, idProject]);
    },
    note: ([type, id, idTask, idList, idProject]) => {
      const tTask = get.task(type, idTask, idList, idProject);

      copy.remove.note(get.note(type, id, idTask, idList, idProject));

      tTask.note.splice(id, 1);

      //Events
      idUpdateDataIndex(get.storage(type));

      theEventHandler.publish('theDisplayUpdate', [type, idProject]);
    },
  };

  const log = {
    sort: {
      project: (project) => {
        const logbook = automaticProject[5];

        project.list.forEach((list) => {
          let tagMatched = log.lookup.logbook(list);

          if (tagMatched) {
            list.task.forEach((task) => {
              copy.add.task(tagMatched, task);
            });
          } else {
            copy.add.list(logbook, list);
          }
        });
      },
      list: (tList) => {
        const logbook = automaticProject[5];
        const tagMatched = log.lookup.logbook(tList);

        if (tagMatched) {
          tList.task.forEach((task) => {
            copy.add.task(tagMatched, task);
          });
        } else {
          copy.add.list(logbook, tList);
        }
      },
      task: (tTask) => {
        const logbook = automaticProject[5];
        const tList = get.list(tTask.type, tTask.list, tTask.project);
        const tagMatched = log.lookup.logbook(tList);

        if (tagMatched) {
          copy.add.task(tagMatched, tTask);
        } else {
          const tempList = clone.object.list(tList);

          tempList.task.splice(0);

          tempList.task.push(tTask);

          copy.add.list(logbook, tempList);
        }
      },
    },
    lookup: {
      logbook: (tList) => {
        let logbook = automaticProject[5];
        let tagMatched;

        logbook.list.forEach((list) => {
          if (list.tag === tList.tag) {
            tagMatched = list;
          }
        });
        return tagMatched;
      },
    },
  };

  //Project Sort

  //Sort Functions
  const sort = {
    date: (tList, tTask) => {
      if (date.today(tTask.date)) {
        sort.today(tList);
      } else if (date.upcoming(tTask.date)) {
        sort.upcoming(tList);
      } else if (date.someday(tTask.date)) {
        sort.someday(tList);
      } else if (date.never(tTask.date)) {
        sort.never(tList);
      }
    },
    inbox: (tList) => {
      const inbox = automaticProject[0];
      const tempList = clone.object.list(tList);
      const tagMatched = inbox.list.find(
        (list) => list.tag === tempList.tag && list.type === tempList.type
      );

      if (tagMatched === undefined && tempList.category === 'logbook') {
        clone.prototype.list(tempList);

        inbox.list.push(tempList);
      } else if (
        tagMatched === undefined &&
        tempList.type === 'automaticProject' &&
        !/(customProject)/.test(tempList.tag)
      ) {
        clone.prototype.list(tempList);

        inbox.list.push(tempList);
      }
    },
    today: (tList) => {
      const today = automaticProject[1];

      copy.add.list(today, tList);
    },
    upcoming: (tList) => {
      const upcoming = automaticProject[2];

      copy.add.list(upcoming, tList);
    },
    someday: (tList) => {
      const someday = automaticProject[3];

      copy.add.list(someday, tList);
    },
    never: (tList) => {
      const never = automaticProject[4];

      copy.add.list(never, tList);
    },
  };

  //Copy Functions
  const copy = {
    add: {
      list: (target, tList) => {
        const project = target;
        const list = clone.object.list(tList);

        clone.prototype.list(list);
        project.list.push(list);

        idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
        idTypeCategoryIndexUpdateData([customProject, 'customProject']);
      },
      task: (target, tTask) => {
        const list = target;
        const task = clone.object.task(tTask);

        clone.prototype.task(task);
        list.task.push(task);

        idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
        idTypeCategoryIndexUpdateData([customProject, 'customProject']);
      },
      note: (target, tNote) => {
        const task = target;
        const note = clone.object.note(tNote);

        task.note.push(note);

        idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
        idTypeCategoryIndexUpdateData([customProject, 'customProject']);
      },
      lookup: {
        task: (object) => {
          const tList = get.list(object.type, object.list, object.project);
          const tagMatched = tag.lookup.list(tList);

          if (tagMatched.length > 1) {
            tagMatched.forEach((list) => {
              if (list.project !== tList.project) {
                copy.add.task(list, object);
              }
            });
          }
        },
        note: (object) => {
          const tTask = get.task(
            object.type,
            object.task,
            object.list,
            object.project
          );
          const tagMatched = tag.lookup.task(tTask);

          if (tagMatched.length > 1) {
            tagMatched.forEach((task) => {
              if (task.project !== tTask.project) {
                copy.add.note(task, object);
              }
            });
          }
        },
      },
    },
    edit: {
      objectProperties: (object) => {
        const tagMatched = tag.lookup.all(object);

        if (object.date) {
          tagMatched.forEach((tag) => {
            editUpdateProperties(
              tag,
              object.title,
              object.description,
              object.date
            );
          });
        } else {
          tagMatched.forEach((tag) => {
            editUpdateProperties(tag, object.title, object.description);
          });
        }
      },
    },
    remove: {
      project: (object) => {
        object.list.forEach((list) => {
          copy.remove.list(list);
        });

        const tagMatched = tag.lookup.all(object);

        tagMatched.forEach((tag) => {
          if (tag.project !== object.project) {
            get.storage(tag.type).splice(tag.id, 1);
          }
        });

        idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
        idTypeCategoryIndexUpdateData([customProject, 'customProject']);
      },
      list: (object) => {
        object.task.forEach((task) => {
          copy.remove.task(task);
        });

        const tagMatched = tag.lookup.all(object);

        tagMatched.forEach((tag) => {
          if (tag.project !== object.project && tag.task.length === 0) {
            get.project(tag.type, tag.project).list.splice(tag.id, 1);
          }
        });

        idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
        idTypeCategoryIndexUpdateData([customProject, 'customProject']);
      },
      task: (object) => {
        const tagMatched = tag.lookup.all(object);

        tagMatched.forEach((tag) => {
          if (tag.project !== object.project) {
            get.list(tag.type, tag.list, tag.project).task.splice(tag.id, 1);
          }
        });

        idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
        idTypeCategoryIndexUpdateData([customProject, 'customProject']);
      },
      note: (object) => {
        const tagMatched = tag.lookup.all(object);

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
      projects: (object) => {
        const tagMatched = tag.lookup.project(object);

        let cached;

        if (tagMatched.length > 1) {
          for (let index = 0; index < tagMatched.length; index++) {
            if (cached) {
              if (
                cached.tag === tagMatched[index].tag &&
                cached.type === tagMatched[index].type
              ) {
                idTypeCategoryIndexUpdateData([
                  automaticProject,
                  'automaticProject',
                ]);
                idTypeCategoryIndexUpdateData([customProject, 'customProject']);

                get
                  .storage(tagMatched[index].type)
                  .splice(tagMatched[index].id, 1);
              }
            }
            cached = tagMatched[index];
          }
        }
      },
      list: (object) => {
        const tagMatched = tag.lookup.list(object);

        let cached;

        if (tagMatched.length > 1) {
          for (let index = 0; index < tagMatched.length; index++) {
            if (cached) {
              if (
                cached.project === tagMatched[index].project &&
                cached.type === tagMatched[index].type
              ) {
                idTypeCategoryIndexUpdateData([
                  automaticProject,
                  'automaticProject',
                ]);
                idTypeCategoryIndexUpdateData([customProject, 'customProject']);

                get
                  .project(tagMatched[index].type, tagMatched[index].project)
                  .list.splice(tagMatched[index].id, 1);
              }
            }
            cached = tagMatched[index];
          }
        }
      },
      task: (object) => {
        const tagMatched = tag.lookup.task(object);

        let cached;

        if (tagMatched.length > 1) {
          for (let index = 0; index < tagMatched.length; index++) {
            if (cached) {
              if (
                cached.project === tagMatched[index].project &&
                cached.type === tagMatched[index].type
              ) {
                idTypeCategoryIndexUpdateData([
                  automaticProject,
                  'automaticProject',
                ]);
                idTypeCategoryIndexUpdateData([customProject, 'customProject']);

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
      note: (object) => {
        const tagMatched = tag.lookup.note(object);

        let cached;

        if (tagMatched.length > 1) {
          for (let index = 0; index < tagMatched.length; index++) {
            if (cached) {
              if (
                cached.project === tagMatched[index].project &&
                cached.type === tagMatched[index].type
              ) {
                idTypeCategoryIndexUpdateData([
                  automaticProject,
                  'automaticProject',
                ]);
                idTypeCategoryIndexUpdateData([customProject, 'customProject']);

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
        idTypeCategoryIndexUpdateData([automaticProject, 'automaticProject']);
        idTypeCategoryIndexUpdateData([customProject, 'customProject']);
      },
    },
    sort: () => {
      clean.today();
      clean.upcoming();
      clean.someday();
      clean.never();
      clean.logbook();
    },
    today: () => {
      const today = automaticProject[1];
      let taskMatched = [];

      today.list.forEach((list) => {
        list.task.forEach((task) => {
          if (!date.today(task.date)) {
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
          if (!date.upcoming(task.date)) {
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
          if (!date.someday(task.date)) {
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
          if (!date.never(task.date)) {
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
    logbook: () => {
      const logbook = automaticProject[5];

      clean.empty.list(logbook);
    },
  };

  //Misc Functions

  //Edit Functions
  const editUpdateProperties = (object, title, description, date) => {
    object.title = title;
    object.description = description;

    if (date) {
      object.date = date;
    }
  };

  //Project Sort
  //Date Functions
  const date = {
    today: (date) => {
      const current = new Date().toLocaleDateString();
      const tDate = new Date(date).toLocaleDateString();

      if (tDate === current) {
        return true;
      } else {
        return false;
      }
    },
    upcoming: (date) => {
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
    someday: (date) => {
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
    never: (date) => {
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
      all: (object) => {
        let storage = automaticProject;
        let tagMatched = [];

        for (let index = 0; index <= 1; index++) {
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
      project: (tProject) => {
        let storage = automaticProject;
        let tagMatched = [];

        for (let index = 0; index <= 1; index++) {
          storage.forEach((project) => {
            if (project.tag === tProject.tag) {
              tagMatched.push(project);
            }
          });
          storage = customProject;
        }
        return tagMatched;
      },
      list: (tList) => {
        let storage = automaticProject;
        let tagMatched = [];

        for (let index = 0; index <= 1; index++) {
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
      task: (tTask) => {
        let storage = automaticProject;
        let tagMatched = [];

        for (let index = 0; index <= 1; index++) {
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
      note: (tNote) => {
        let storage = automaticProject;
        let tagMatched = [];

        for (let index = 0; index <= 1; index++) {
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
      project: (project) => {
        return objectCloneProto('project', project);
      },
      list: (list) => {
        return objectCloneProto('list', list);
      },
      task: (task) => {
        return objectCloneProto('task', task);
      },
      note: (note) => {
        return objectCloneProto('note', note);
      },
    },
    prototype: {
      all: (storage) => {
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
      project: (project) => {
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
      list: (list) => {
        list.task.forEach((task) => {
          objectSetProto('task', task);
          task.note.forEach((note) => {
            objectSetProto('note', note);
          });
        });
      },
      task: (task) => {
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
        id = get.storage(type).length - 1;
      }

      const displayProject = get.storage(type)[id];

      theEventHandler.publish('displayProject', [displayProject]);

      display.check.value(displayProject);
    },
    check: {
      update: {
        project: (type, id, checkMark) => {
          const tProject = get.project(type, id);
          const projectMatched = tag.lookup.project(tProject);

          projectMatched.forEach((project) => {
            project.checkMark = checkMark;
            project.list.forEach((list) => {
              display.check.update.list(type, list.id, list.project, checkMark);
            });
          });

          display.check.value(tProject);
          display.count.value(automaticProject);
          display.count.value(customProject);
        },
        list: (type, id, idProject, checkMark) => {
          const tProject = get.project(type, idProject);
          const tList = get.list(type, id, idProject);
          const listMatched = tag.lookup.list(tList);

          if (
            tList.category === 'today' ||
            tList.category === 'upcoming' ||
            tList.category === 'someday' ||
            tList.category === 'never' ||
            tList.category === 'logbook'
          ) {
            if (checkMark === false) {
              listMatched.forEach((list) => {
                if (
                  list.category !== 'today' &&
                  list.category !== 'upcoming' &&
                  list.category !== 'someday' &&
                  list.category !== 'never' &&
                  list.category !== 'logbook'
                ) {
                  const project = get.project(list.type, list.project);

                  project.checkMark = checkMark;
                  list.checkMark = checkMark;
                }
              });
            }

            tList.checkMark = checkMark;
            tList.task.forEach((task) => {
              display.check.update.task(
                task.type,
                task.id,
                task.list,
                task.project,
                checkMark
              );
            });
          } else {
            listMatched.forEach((list) => {
              const project = get.project(list.type, list.project);

              list.checkMark = checkMark;

              display.check.update.allListComplete(project);
              list.task.forEach((task) => {
                task.checkMark = checkMark;
                task.note.forEach((note) => {
                  note.checkMark = checkMark;
                });
              });
            });
          }

          display.check.value(tProject);
          display.count.value(automaticProject);
          display.count.value(customProject);
        },
        task: (type, id, idList, idProject, checkMark) => {
          const tProject = get.project(type, idProject);
          const tTask = get.task(type, id, idList, idProject);
          const taskMatched = tag.lookup.task(tTask);

          taskMatched.forEach((task) => {
            const project = get.project(task.type, task.project);
            const list = get.list(task.type, task.list, task.project);

            task.checkMark = checkMark;

            display.check.update.allTaskComplete(list);
            display.check.update.allListComplete(project);
            task.note.forEach((note) => {
              note.checkMark = checkMark;
            });
          });

          display.check.value(tProject);
          display.count.value(automaticProject);
          display.count.value(customProject);
        },
        note: (type, id, idTask, idList, idProject, checkMark) => {
          const tProject = get.project(type, idProject);
          const tNote = get.note(type, id, idTask, idList, idProject);
          const noteMatched = tag.lookup.note(tNote);

          noteMatched.forEach((note) => {
            const project = get.project(note.type, note.project);
            const list = get.list(note.type, note.list, note.project);
            const task = get.task(
              note.type,
              note.task,
              note.list,
              note.project
            );

            note.checkMark = checkMark;

            display.check.update.allNoteComplete(task);
            display.check.update.allTaskComplete(list);
            display.check.update.allListComplete(project);
          });

          display.check.value(tProject);
          display.count.value(automaticProject);
          display.count.value(customProject);
        },
        allListComplete: (tProject) => {
          let complete = true;

          tProject.list.forEach((list) => {
            if (list.checkMark === false) {
              complete = false;
            }
          });

          if (complete === true) {
            tProject.checkMark = true;
          } else {
            tProject.checkMark = false;
          }
        },
        allTaskComplete: (tList) => {
          let complete = true;

          tList.task.forEach((task) => {
            if (task.checkMark === false) {
              complete = false;
            }
          });

          if (complete === true) {
            tList.checkMark = true;
          } else {
            tList.checkMark = false;
          }
        },
        allNoteComplete: (tTask) => {
          let complete = true;

          tTask.note.forEach((note) => {
            if (note.checkMark === false) {
              complete = false;
            }
          });

          if (complete === true) {
            tTask.checkMark = true;
          } else {
            tTask.checkMark = false;
          }
        },
      },
      value: (project) => {
        theEventHandler.publish('theCheckMark', [
          project.tag,
          project.checkMark,
        ]);

        project.list.forEach((list) => {
          theEventHandler.publish('theCheckMark', [list.tag, list.checkMark]);
          list.task.forEach((task) => {
            theEventHandler.publish('theCheckMark', [task.tag, task.checkMark]);
            task.note.forEach((note) => {
              theEventHandler.publish('theCheckMark', [
                note.tag,
                note.checkMark,
              ]);
            });
          });
        });
      },
    },
    count: {
      update: (project) => {
        let lists = 0;
        let tasks = 0;
        let notes = 0;

        project.list.forEach((list) => {
          if (list.checkMark === false) {
            lists++;
          }
          list.task.forEach((task) => {
            if (task.checkMark === false) {
              tasks++;
            }
            task.note.forEach((note) => {
              if (note.checkMark === false) {
                notes++;
              }
            });
          });
        });

        project.lists = lists;
        project.tasks = tasks;
        project.notes = notes;
      },
      value: (storage) => {
        storage.forEach((project) => {
          display.count.update(project);

          theEventHandler.publish('theCount', [
            project.type,
            project.id,
            project.tasks,
          ]);
        });
      },
    },
    form: {
      value: {
        project: ([type, id]) => {
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
const idTypeCategoryIndexUpdateData = ([storage, type]) => {
  typeUpdateData(storage, type);
  categoryUpdateData(storage);
  idUpdateDataIndex(storage);
  idUpdateData(storage);
};

const tagData = {
  project: (object, count) => {
    object.tag = `${object.type}${object.id}${count}`;
  },
  list: (object, count) => {
    object.tag = `${object.type}${object.project}${object.id}${count}`;
  },
  task: (object, count) => {
    object.tag = `${object.type}${object.project}${object.list}${object.id}${count}`;
  },
  note: (object, count) => {
    object.tag = `${object.type}${object.project}${object.list}${object.task}${object.id}${count}`;
  },
};

const idUpdateData = (storage) => {
  storage.forEach((project) => {
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

const idUpdateDataIndex = (storage) => {
  storage.forEach((project) => {
    project.id = storage.indexOf(project);
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

const typeUpdateData = (storage, type) => {
  storage.forEach((project) => {
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

const categoryUpdateData = (storage) => {
  storage.forEach((project) => {
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
const theDOMDisplaySidebar = ([storage, type, project]) => {
  let addDOMAutoCutomProject;

  if (type === 'automaticProject') {
    addDOMAutoCutomProject = 'addDOMAutomaticProject';
  } else {
    addDOMAutoCutomProject = 'addDOMCustomProject';
  }

  if (project) {
    project[addDOMAutoCutomProject](
      [project.id, project.tag],
      project.type,
      project.title,
      project.tasks
    );
  } else {
    storage.forEach((project) => {
      project[addDOMAutoCutomProject](
        [project.id, project.tag],
        project.type,
        project.title,
        project.tasks
      );
    });
  }
};

const theDOMDisplay = ([project]) => {
  project.addDOMProject(
    [project.id, project.tag],
    project.type,
    project.title,
    project.description
  );
  project.list.forEach((list) => {
    list.addDOMList(
      [list.id, project.id, list.tag],

      list.type,
      list.category,
      list.title,
      list.description
    );
    list.task.forEach((task) => {
      task.addDOMTask(
        [task.id, list.id, project.id, task.tag],
        task.type,
        task.category,
        task.title,
        task.description,
        task.date
      );
      task.note.forEach((note) => {
        note.addDOMNote(
          [note.id, task.id, list.id, project.id, note.tag],
          note.type,
          note.category,
          note.title,
          note.description
        );
      });
    });
  });
};

//Automatic Projects
const theAutomaticProject = () => {
  const automatic = 'automaticProject';
  theProjectStorage.add.project([automatic], 'Inbox', 'Inbox');
  theProjectStorage.add.project([automatic], 'Today', 'Today');
  theProjectStorage.add.project([automatic], 'Upcoming', 'Upcoming');
  theProjectStorage.add.project([automatic], 'Someday', 'Someday ');
  theProjectStorage.add.project([automatic], 'Never', 'Never');
  theProjectStorage.add.project([automatic], 'Logbook', 'Logbook');
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
  theProjectStorage.remove.project(['automaticProject']);
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
