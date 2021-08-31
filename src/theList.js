const theProjectArray = (() => {
  let project = [];

  return { project };
})();

const objectCreate = {
  project: (title, description) => {
    return {
      title,
      description,
      list: [],
    };
  },

  list: (title, description) => {
    return {
      title,
      description,
      task: [],
    };
  },

  task: (title, description, category, date) => {
    return {
      title,
      description,
      category,
      date,
      notes: [],
    };
  },

  note: (title, description, tag) => {
    return {
      title,
      description,
      tag,
    };
  },
};

const objectAdd = {
  project: (object) => {
    theProjectArray.project.push(object);
    object['#'] = theProjectArray.project.indexOf(object);
  },

  to: (project, array, object) => {
    project[array].push(object);
    object['#'] = project[array].indexOf(object);
  },
};

const objectTemplate = {
  project: (title, description) => {
    const project = Object.assign(
      {},
      {
        addList: objectTemplate.list,
        addTask: objectTemplate.task,
        addNote: objectTemplate.note,
      }
    );

    objectAdd.project(
      Object.assign(
        Object.create(project),
        objectCreate.project(title, description)
      )
    );
  },

  list: (project, title, description) => {
    let list = objectCreate.list(title, description);
    objectAdd.to(project, 'list', list);
  },

  task: (project, title, description, category, date) => {
    let task = objectCreate.task(title, description, category, date);
    objectAdd.to(project, 'task', task);
  },

  note: (project, title, description) => {
    let note = objectCreate.note(title, description);
    objectAdd.to(project, 'note', note);
  },
};

// const theInheritProto = (proto, object) => {
//   return Object.assign(Object.create({ proto }), object);
// };

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
