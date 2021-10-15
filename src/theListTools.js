import { theDOMTemplate } from './theDOMTools';

//Application Tools
const objectTools = {
  //Object Templates
  template: {
    project: (storage, title, description) => {
      const proto = {
        addList: objectTools.template.list,
        addDOMAutomaticProject: theDOMTemplate.sidebarAutomaticProject,
        addDOMCustomProject: theDOMTemplate.sidebarCustomProject,
        addDOMProject: theDOMTemplate.project,
        addDOMTask: theDOMTemplate.task,
      };

      objectTools.add(
        storage,
        Object.assign(
          Object.create(
            Object.assign(
              objectProperties.get.protoProperties('proto', 'project'),
              proto
            )
          ),
          objectTools.create.projectListNote(title, description),
          objectProperties.get.objectProperties('object', 'project'),
          { list: [] }
        )
      );
    },
    list: (storage, title, description) => {
      const proto = {
        addDOMList: theDOMTemplate.list,
        addTask: objectTools.template.task,
      };

      objectTools.add(
        storage,
        Object.assign(
          Object.create(
            Object.assign(
              objectProperties.get.protoProperties('proto', 'list'),
              proto
            )
          ),
          objectTools.create.projectListNote(title, description),
          objectProperties.get.objectProperties('object', 'list'),
          { task: [] }
        )
      );
    },
    task: (storage, title, description, date) => {
      const proto = {
        addDOMTask: theDOMTemplate.task,
        addNote: objectTools.template.note,
      };

      objectTools.add(
        storage,
        Object.assign(
          Object.create(
            Object.assign(
              objectProperties.get.protoProperties('proto', 'task'),
              proto
            )
          ),
          objectTools.create.task(title, description, date),
          objectProperties.get.objectProperties('object', 'task'),
          { note: [] }
        )
      );
    },
    note: (storage, title, description) => {
      const proto = {
        addDOMNote: theDOMTemplate.note,
      };

      objectTools.add(
        storage,
        Object.assign(
          Object.create(
            Object.assign(
              objectProperties.get.protoProperties('proto', 'note'),
              proto
            )
          ),
          objectTools.create.projectListNote(title, description),
          objectProperties.get.objectProperties('object', 'note')
        )
      );
    },
  },
  //Project Data//Add Objects
  add: (project, object) => {
    project.push(object);
    object.id = project.indexOf(object);
  },

  //Create Objects
  create: {
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
  },

  //Set Objects Proto
  set: {
    proto: (type, object) => {
      return Object.setPrototypeOf(
        object,
        objectProperties.get.protoProperties('proto', type)
      );
    },
  },

  //Clone Objects
  clone: {
    proto: (type, object) => {
      return Object.assign(
        Object.create(objectProperties.get.protoProperties('proto', type)),
        JSON.parse(JSON.stringify(object))
      );
    },
  },
};

//Object Properties Options
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
      addList: objectTools.template.list,
      addDOMAutomaticProject: theDOMTemplate.sidebarAutomaticProject,
      addDOMCustomProject: theDOMTemplate.sidebarCustomProject,
      addDOMProject: theDOMTemplate.project,
      addDOMTask: theDOMTemplate.task,
    },
    list: {
      addDOMList: theDOMTemplate.list,
      addTask: objectTools.template.task,
    },
    task: {
      addDOMTask: theDOMTemplate.task,
      addNote: objectTools.template.note,
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

export { objectTools };
