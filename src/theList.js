import { objectTools } from './theListTools';
import { theEventHandler } from './theHandler';

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
      objectTools.template.project(storage, title, description);

      //Events
      projects++;

      update.data.all([get.storage(type), type]);

      update.data['sort-id'](get.storage(type).at(-1));

      tag.data.project(get.storage(type).at(-1), projects);

      clean.duplicate.projects(get.storage(type).at(-1));

      theEventHandler.publish(type, [storage, type, storage.at(-1)]);

      local.storage.add.local('automaticProject', automaticProject);
      local.storage.add.local('customProject', customProject);
    },
    list: ([type, idProject], title, description) => {
      const tProject = get.project(type, idProject);

      tProject.addList(tProject.list, title, description);

      //Events
      lists++;

      update.data.all([get.storage(type), type]);

      update.data['sort-id'](tProject.list.at(-1));

      tag.data.list(tProject.list.at(-1), lists);

      clean.duplicate.list(tProject.list.at(-1));

      copy.add.target.inbox(tProject.list.at(-1));

      display.checkMark.update.allListComplete(get.project(type, idProject));

      sort.note();

      sort.task();

      sort.list();

      update.data.all([get.storage(type), type]);

      local.storage.add.local('automaticProject', automaticProject);
      local.storage.add.local('customProject', customProject);
    },
    task: ([type, idList, idProject], title, description, tdate) => {
      const tList = get.list(type, idList, idProject);

      tList.addTask(tList.task, title, description, tdate);

      //Events
      tasks++;

      update.data.all([get.storage(type), type]);

      update.data['sort-id'](tList.task.at(-1));

      tag.data.task(tList.task.at(-1), tasks);

      date.sort(tList, tList.task.at(-1));

      copy.add.lookup.task(tList.task.at(-1));

      copy.add.target.inbox(tList);

      update.data.all([get.storage(type), type]);

      clean.duplicate.list(tList);

      clean.duplicate.task(tList.task.at(-1));

      clean.sort();

      display.checkMark.update.allTaskComplete(tList);

      display.checkMark.update.allListComplete(get.project(type, idProject));

      sort.note();

      sort.task();

      sort.list();

      display.taskCount.value(automaticProject);

      display.taskCount.value(customProject);

      update.data.all([get.storage(type), type]);

      local.storage.add.local('automaticProject', automaticProject);
      local.storage.add.local('customProject', customProject);
    },
    note: ([type, idTask, idList, idProject], title, description) => {
      const tTask = get.task(type, idTask, idList, idProject);

      tTask.addNote(tTask.note, title, description);

      //Events
      notes++;

      update.data.all([get.storage(type), type]);

      update.data['sort-id'](tTask.note.at(-1));

      tag.data.note(tTask.note.at(-1), notes);

      copy.add.lookup.note(tTask.note.at(-1));

      clean.duplicate.note(tTask.note.at(-1));

      display.checkMark.update.allNoteComplete(tTask);

      display.checkMark.update.allTaskComplete(
        get.list(type, idList, idProject)
      );

      display.checkMark.update.allListComplete(get.project(type, idProject));

      sort.note();

      sort.task();

      sort.list();

      display.taskCount.value(automaticProject);

      display.taskCount.value(customProject);

      update.data.all([get.storage(type), type]);

      local.storage.add.local('automaticProject', automaticProject);
      local.storage.add.local('customProject', customProject);
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

      local.storage.add.local('automaticProject', automaticProject);
      local.storage.add.local('customProject', customProject);
    },
    list: ([type, id, idProject], title, description) => {
      const tList = get.list(type, id, idProject);

      editUpdateProperties(tList, title, description);

      copy.edit.objectProperties(tList);

      //Events
      theEventHandler.publish('theDisplayUpdate', [type, idProject]);

      local.storage.add.local('automaticProject', automaticProject);
      local.storage.add.local('customProject', customProject);
    },
    task: ([type, id, idList, idProject], title, description, date) => {
      const tTask = get.task(type, id, idList, idProject);

      editUpdateProperties(tTask, title, description, date);

      copy.edit.objectProperties(tTask);

      //Events
      theEventHandler.publish('theDisplayUpdate', [type, idProject]);

      local.storage.add.local('automaticProject', automaticProject);
      local.storage.add.local('customProject', customProject);
    },
    note: ([type, id, idTask, idList, idProject], title, description) => {
      const tNote = get.note(type, id, idTask, idList, idProject);

      editUpdateProperties(tNote, title, description);

      copy.edit.objectProperties(tNote);

      //Events
      theEventHandler.publish('theDisplayUpdate', [type, idProject]);

      local.storage.add.local('automaticProject', automaticProject);
      local.storage.add.local('customProject', customProject);
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

  //Remove
  const remove = {
    project: ([type, id]) => {
      if (id) {
        copy.remove.project(get.project(type, id));

        log.add.project(get.project(type, id));

        get.storage(type).splice(id, 1);
      } else {
        //Server HMR
        get.storage(type).splice(0);
      }

      //Events
      update.data.all([get.storage(type), type]);

      theEventHandler.publish(type, [get.storage(type), type]);

      display.taskCount.value(automaticProject);

      display.taskCount.value(customProject);

      local.storage.add.local('automaticProject', automaticProject);
      local.storage.add.local('customProject', customProject);
    },
    list: ([type, id, idProject]) => {
      const tProject = get.project(type, idProject);

      copy.remove.list(get.list(type, id, idProject));

      log.add.list(get.list(type, id, idProject));

      tProject.list.splice(id, 1);

      //Events
      update.data.index(get.storage(type));

      display.taskCount.value(automaticProject);

      display.taskCount.value(customProject);

      theEventHandler.publish('theDisplayUpdate', [type, idProject]);

      local.storage.add.local('automaticProject', automaticProject);
      local.storage.add.local('customProject', customProject);
    },
    task: ([type, id, idList, idProject]) => {
      const tList = get.list(type, idList, idProject);

      copy.remove.task(get.task(type, id, idList, idProject));

      log.add.task(get.task(type, id, idList, idProject));

      tList.task.splice(id, 1);

      //Events
      update.data.index(get.storage(type));

      display.taskCount.value(automaticProject);

      display.taskCount.value(customProject);

      theEventHandler.publish('theDisplayUpdate', [type, idProject]);

      local.storage.add.local('automaticProject', automaticProject);
      local.storage.add.local('customProject', customProject);
    },
    note: ([type, id, idTask, idList, idProject]) => {
      const tTask = get.task(type, idTask, idList, idProject);

      copy.remove.note(get.note(type, id, idTask, idList, idProject));

      tTask.note.splice(id, 1);

      //Events
      update.data.index(get.storage(type));

      theEventHandler.publish('theDisplayUpdate', [type, idProject]);

      local.storage.add.local('automaticProject', automaticProject);
      local.storage.add.local('customProject', customProject);
    },
  };

  //Misc Functions
  //Logbook Functions
  const log = {
    add: {
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

        log.complete.project();
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

        log.complete.project();
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

          log.complete.project();
        }
      },
    },
    complete: {
      project: () => {
        let logbook = automaticProject[5];

        logbook.list.forEach((list) => {
          list.checkMark = true;
          list.task.forEach((task) => {
            task.checkMark = true;
            task.note.forEach((note) => {
              note.checkMark = true;
            });
          });
        });
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
    list: () => {
      let storage = automaticProject;

      for (let index = 0; index <= 1; index++) {
        storage.forEach((project) => {
          project.list.forEach((list) => {
            if (list.task[0]) {
              list.date = list.task[0].date;
            } else {
              list.date = '???';
            }
          });

          project.list.sort((firstList, secondList) => {
            let firstDate = new Date(firstList.date);
            let secondDate = new Date(secondList.date);

            if (isNaN(firstDate)) {
              firstDate = Infinity;
            }
            if (isNaN(secondDate)) {
              secondDate = Infinity;
            }

            if (firstDate < secondDate) {
              if (firstList.checkMark === secondList.checkMark) {
                return -1;
              } else {
                if (firstList.checkMark) {
                  return 1;
                } else {
                  return -1;
                }
              }
            } else if (firstDate > secondDate) {
              if (firstList.checkMark === secondList.checkMark) {
                return 1;
              } else {
                if (firstList.checkMark) {
                  return 1;
                } else {
                  return -1;
                }
              }
            } else {
              if (firstList.checkMark === secondList.checkMark) {
                return 0;
              } else {
                if (firstList.checkMark) {
                  1;
                } else {
                  return -1;
                }
              }
            }
          });
        });
        storage = customProject;
      }
    },
    task: () => {
      let storage = automaticProject;

      for (let index = 0; index <= 1; index++) {
        storage.forEach((project) => {
          project.list.forEach((list) => {
            list.task.sort((firstTask, secondTask) => {
              let firstDate = new Date(firstTask.date);
              let secondDate = new Date(secondTask.date);

              if (isNaN(firstDate)) {
                firstDate = Infinity;
              }
              if (isNaN(secondDate)) {
                secondDate = Infinity;
              }

              if (firstDate < secondDate) {
                if (firstTask.checkMark === secondTask.checkMark) {
                  return -1;
                } else {
                  if (firstTask.checkMark) {
                    return 1;
                  } else {
                    return -1;
                  }
                }
              } else if (firstDate > secondDate) {
                if (firstTask.checkMark === secondTask.checkMark) {
                  return 1;
                } else {
                  if (firstTask.checkMark) {
                    return 1;
                  } else {
                    return -1;
                  }
                }
              } else {
                if (firstTask.checkMark === secondTask.checkMark) {
                  return 0;
                } else {
                  if (firstTask.checkMark) {
                    1;
                  } else {
                    return -1;
                  }
                }
              }
            });
          });
        });
        storage = customProject;
      }
    },
    note: () => {
      let storage = automaticProject;

      for (let index = 0; index <= 1; index++) {
        storage.forEach((project) => {
          project.list.forEach((list) => {
            list.task.forEach((task) => {
              task.note.sort((firstNote, secondNote) => {
                console.log(firstNote);
                if (firstNote['sort-id'] < secondNote['sort-id']) {
                  if (firstNote.checkMark === secondNote.checkMark) {
                    return -1;
                  } else {
                    if (firstNote.checkMark) {
                      return 1;
                    } else {
                      return -1;
                    }
                  }
                } else if (firstNote['sort-id'] > secondNote['sort-id']) {
                  if (firstNote.checkMark === secondNote.checkMark) {
                    return 1;
                  } else {
                    if (firstNote.checkMark) {
                      return 1;
                    } else {
                      return -1;
                    }
                  }
                } else {
                  if (firstNote.checkMark === secondNote.checkMark) {
                    return 0;
                  } else {
                    if (firstNote.checkMark) {
                      1;
                    } else {
                      return -1;
                    }
                  }
                }
              });
            });
          });
        });
        storage = customProject;
      }
    },
    update: {
      display: ([type, id]) => {
        sort.note();

        sort.task();

        sort.list();

        update.data.all([automaticProject, 'automaticProject']);
        update.data.all([customProject, 'customProject']);

        theEventHandler.publish('theDisplayUpdate', [type, id]);
      },
    },
  };

  //Date Functions
  const date = {
    sort: (tList, tTask) => {
      if (date.today(tTask.date)) {
        copy.add.target.today(tList);
      } else if (date.upcoming(tTask.date)) {
        copy.add.target.upcoming(tList);
      } else if (date.someday(tTask.date)) {
        copy.add.target.someday(tList);
      } else if (date.never(tTask.date)) {
        copy.add.target.never(tList);
      } else {
        return;
      }
    },
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

  //Copy Functions
  const copy = {
    add: {
      list: (target, tList) => {
        const project = target;
        const list = clone.object.list(tList);

        clone.prototype.list(list);
        project.list.push(list);

        update.data.all([automaticProject, 'automaticProject']);
        update.data.all([customProject, 'customProject']);
      },
      task: (target, tTask) => {
        const list = target;
        const task = clone.object.task(tTask);

        clone.prototype.task(task);
        list.task.push(task);

        update.data.all([automaticProject, 'automaticProject']);
        update.data.all([customProject, 'customProject']);
      },
      note: (target, tNote) => {
        const task = target;
        const note = clone.object.note(tNote);

        task.note.push(note);

        update.data.all([automaticProject, 'automaticProject']);
        update.data.all([customProject, 'customProject']);
      },
      target: {
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

        update.data.all([automaticProject, 'automaticProject']);
        update.data.all([customProject, 'customProject']);
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

        update.data.all([automaticProject, 'automaticProject']);
        update.data.all([customProject, 'customProject']);
      },
      task: (object) => {
        const tagMatched = tag.lookup.all(object);

        tagMatched.forEach((tag) => {
          if (tag.project !== object.project) {
            get.list(tag.type, tag.list, tag.project).task.splice(tag.id, 1);
          }
        });

        update.data.all([automaticProject, 'automaticProject']);
        update.data.all([customProject, 'customProject']);
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

        update.data.all([automaticProject, 'automaticProject']);
        update.data.all([customProject, 'customProject']);
      },
    },
  };

  //Clone Functions
  const clone = {
    object: {
      project: (project) => {
        return objectTools.clone.proto('project', project);
      },
      list: (list) => {
        return objectTools.clone.proto('list', list);
      },
      task: (task) => {
        return objectTools.clone.proto('task', task);
      },
      note: (note) => {
        return objectTools.clone.proto('note', note);
      },
    },
    prototype: {
      all: (storage) => {
        storage.forEach((project) => {
          objectTools.set.proto('project', project);
          project.list.forEach((list) => {
            objectTools.set.proto('list', list);
            list.task.forEach((task) => {
              objectTools.set.proto('task', task);
              task.note.forEach((note) => {
                objectTools.set.proto('note', note);
              });
            });
          });
        });
      },
      project: (project) => {
        project.list.forEach((list) => {
          objectTools.set.proto('list', list);
          list.task.forEach((task) => {
            objectTools.set.proto('task', task);
            task.note.forEach((note) => {
              objectTools.set.proto('note', note);
            });
          });
        });
      },
      list: (list) => {
        list.task.forEach((task) => {
          objectTools.set.proto('task', task);
          task.note.forEach((note) => {
            objectTools.set.proto('note', note);
          });
        });
      },
      task: (task) => {
        task.note.forEach((note) => {
          objectTools.set.proto('note', note);
        });
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
                update.data.all([automaticProject, 'automaticProject']);
                update.data.all([customProject, 'customProject']);

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
                update.data.all([automaticProject, 'automaticProject']);
                update.data.all([customProject, 'customProject']);

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
                update.data.all([automaticProject, 'automaticProject']);
                update.data.all([customProject, 'customProject']);

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
                update.data.all([automaticProject, 'automaticProject']);
                update.data.all([customProject, 'customProject']);

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
        update.data.all([automaticProject, 'automaticProject']);
        update.data.all([customProject, 'customProject']);
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
        update.data.all([automaticProject, 'automaticProject']);
        update.data.all([customProject, 'customProject']);
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
        update.data.all([automaticProject, 'automaticProject']);
        update.data.all([customProject, 'customProject']);
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
        update.data.all([automaticProject, 'automaticProject']);
        update.data.all([customProject, 'customProject']);
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
        update.data.all([automaticProject, 'automaticProject']);
        update.data.all([customProject, 'customProject']);
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

  //Data Functions
  //Update Functions
  const update = {
    data: {
      all: ([storage, type]) => {
        update.data.type(storage, type);
        update.data.category(storage);
        update.data.index(storage);
        update.data.id(storage);
      },
      id: (storage) => {
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
      },
      index: (storage) => {
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
      },
      ['sort-id']: (object) => {
        object['sort-id'] = object.id;
      },
      type: (storage, type) => {
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
      },
      category: (storage) => {
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
      },
    },
  };

  //Tag Functions
  const tag = {
    data: {
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
    },
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

  //Display
  //Display Functions
  const display = {
    project: (type, id) => {
      if (!id) {
        id = get.storage(type).length - 1;
      }

      const displayProject = get.storage(type)[id];

      theDOMDisplay(displayProject);

      display.taskCount.value(automaticProject);

      display.taskCount.value(customProject);

      display.checkMark.value(displayProject);
    },
    checkMark: {
      update: {
        project: (type, id, checkMark) => {
          const tProject = get.project(type, id);
          const projectMatched = tag.lookup.project(tProject);

          projectMatched.forEach((project) => {
            project.checkMark = checkMark;
            project.list.forEach((list) => {
              display.checkMark.update.list(
                type,
                list.id,
                list.project,
                checkMark
              );
            });
          });

          display.checkMark.value(tProject);

          display.taskCount.value(automaticProject);
          display.taskCount.value(customProject);
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
              display.checkMark.update.task(
                task.type,
                task.id,
                task.list,
                task.project,
                checkMark
              );
            });
          } else {
            listMatched.forEach((list) => {
              if (list.category === 'logbook') {
                return;
              }

              const project = get.project(list.type, list.project);

              list.checkMark = checkMark;

              display.checkMark.update.allListComplete(project);
              list.task.forEach((task) => {
                task.checkMark = checkMark;
                task.note.forEach((note) => {
                  note.checkMark = checkMark;
                });
              });
            });
          }

          display.checkMark.value(tProject);

          display.taskCount.value(automaticProject);
          display.taskCount.value(customProject);
        },
        task: (type, id, idList, idProject, checkMark) => {
          const tProject = get.project(type, idProject);
          const tTask = get.task(type, id, idList, idProject);
          const taskMatched = tag.lookup.task(tTask);

          taskMatched.forEach((task) => {
            const project = get.project(task.type, task.project);
            const list = get.list(task.type, task.list, task.project);

            task.checkMark = checkMark;

            display.checkMark.update.allTaskComplete(list);
            display.checkMark.update.allListComplete(project);
            task.note.forEach((note) => {
              note.checkMark = checkMark;
            });
          });

          display.checkMark.value(tProject);

          display.taskCount.value(automaticProject);
          display.taskCount.value(customProject);
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

            display.checkMark.update.allNoteComplete(task);
            display.checkMark.update.allTaskComplete(list);
            display.checkMark.update.allListComplete(project);
          });

          display.checkMark.value(tProject);

          display.taskCount.value(automaticProject);
          display.taskCount.value(customProject);
        },
        allListComplete: (tProject) => {
          const projectMatched = tag.lookup.project(tProject);

          projectMatched.forEach((project) => {
            let complete = true;

            project.list.forEach((list) => {
              if (list.checkMark === false) {
                complete = false;
              }
            });

            project.checkMark = complete;
          });
        },
        allTaskComplete: (tList) => {
          const listMatched = tag.lookup.list(tList);

          listMatched.forEach((list) => {
            let complete = true;

            list.task.forEach((task) => {
              if (task.checkMark === false) {
                complete = false;
              }
            });

            list.checkMark = complete;
          });
        },
        allNoteComplete: (tTask) => {
          const taskMatched = tag.lookup.task(tTask);

          taskMatched.forEach((task) => {
            let complete = true;

            task.note.forEach((note) => {
              if (note.checkMark === false) {
                complete = false;
              }
            });

            task.checkMark = complete;
          });
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

        local.storage.add.local('automaticProject', automaticProject);
        local.storage.add.local('customProject', customProject);
      },
    },
    taskCount: {
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
          display.taskCount.update(project);

          theEventHandler.publish('theCount', [
            project.type,
            project.id,
            project.tasks,
          ]);
        });

        local.storage.add.local('automaticProject', automaticProject);
        local.storage.add.local('customProject', customProject);
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

  //DOM Functions
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

  const theDOMDisplay = (project) => {
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

  //Local Storage
  const local = {
    storage: {
      available: (type) => {
        let storage;

        try {
          let test = 'Hope';

          storage = window[type];

          storage.setItem(test, test);

          storage.removeItem(test);
          return true;
        } catch (error) {
          return (
            error instanceof DOMException &&
            (error.code === 22 ||
              error.code === 1014 ||
              error.name === 'QuotaExceededError' ||
              error.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            storage &&
            storage.length !== 0
          );
        }
      },
      add: {
        local: (name, value) => {
          if (local.storage.available('localStorage')) {
            localStorage.setItem(name, JSON.stringify(value));
          } else {
            console.log('No Local Storage');
          }
        },
      },
      get: {
        local: (name) => {
          return localStorage.getItem(name);
        },
      },
    },
  };

  //Local Storage Project
  const theLocalStorageProject = () => {
    let automatic = JSON.parse(local.storage.get.local('automaticProject'));
    let custom = JSON.parse(local.storage.get.local('customProject'));

    clone.prototype.all(automatic);
    clone.prototype.all(custom);

    automaticProject = automatic;
    customProject = custom;

    update.data.all([automaticProject, 'automaticProject']);
    update.data.all([customProject, 'customProject']);

    theDOMDisplaySidebar([automaticProject, 'automaticProject']);
    theDOMDisplaySidebar([customProject, 'customProject']);

    theDefaultProjectDisplay();
  };

  //Default Project
  const theDefaultProjectDisplay = () => {
    theProjectStorage.display.project('automaticProject', '0');

    //Events
    theEventHandler.publish('theDefaultProjectStyle', true);
  };

  //Automatic Projects
  const theDefaultProject = () => {
    const automatic = 'automaticProject';

    theProjectStorage.remove.project(['automaticProject']);

    theProjectStorage.add.project([automatic], 'Inbox', 'Inbox');
    theProjectStorage.add.project([automatic], 'Today', 'Today');
    theProjectStorage.add.project([automatic], 'Upcoming', 'Upcoming');
    theProjectStorage.add.project([automatic], 'Someday', 'Someday ');
    theProjectStorage.add.project([automatic], 'Never', 'Never');
    theProjectStorage.add.project([automatic], 'Logbook', 'Logbook');

    theDefaultProjectDisplay();
  };

  const theProjectStart = () => {
    let automatic = JSON.parse(local.storage.get.local('automaticProject'));

    if (automatic.length === 6) {
      theLocalStorageProject();
    } else {
      theDefaultProject();
    }
  };

  //Events
  theEventHandler.subscribe('automaticProject', update.data.all);
  theEventHandler.subscribe('automaticProject', theDOMDisplaySidebar);
  theEventHandler.subscribe('customProject', update.data.all);
  theEventHandler.subscribe('customProject', theDOMDisplaySidebar);
  theEventHandler.subscribe('theTaskSort', sort.update.display);
  theEventHandler.subscribe('theDefaultProject', theDefaultProject);

  return {
    add,
    edit,
    remove,
    display,
    theProjectStart,
  };
})();

export { theProjectStorage };
