import { theDOMTemplate } from './theDom';

//Application Tools
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
      note: [],
    };
  },

  note: (title, description) => {
    return {
      title,
      description,
    };
  },
};

const objectAdd = (project, object) => {
  project.push(object);
  object['#'] = project.indexOf(object);
};

const objectTemplate = {
  project: (project, title, description) => {
    const proto = {
      addList: objectTemplate.list,
      addDOMAutomaticProject: theDOMTemplate.automaticProject,
      addDOMTask: theDOMTemplate.task,
    };

    objectAdd(
      project,
      Object.assign(
        Object.create(proto),
        objectCreate.project(title, description)
      )
    );
  },

  list: (project, title, description) => {
    const proto = {
      addDOMList: theDOMTemplate.list,
      addTask: objectTemplate.task,
    };

    objectAdd(
      project,
      Object.assign(Object.create(proto), objectCreate.list(title, description))
    );
  },

  task: (project, title, description, category, date) => {
    const proto = {
      addDOMTask: theDOMTemplate.task,
      addNote: objectTemplate.note,
    };

    objectAdd(
      project,
      Object.assign(
        Object.create(proto),
        objectCreate.task(title, description, category, date)
      )
    );
  },

  note: (project, title, description) => {
    const proto = {
      addDOMNote: theDOMTemplate.note,
    };

    objectAdd(
      project,
      Object.assign(Object.create(proto), objectCreate.note(title, description))
    );
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

//Create Application
const theProjectData = (() => {
  let automaticProject = [];
  let customProject = [];

  return { automaticProject, customProject };
})();

const theAutomaticProject = () => {
  theProjectData.automaticProject = []; //Temporary Server HMR

  const automatic = theProjectData.automaticProject;
  objectTemplate.project(automatic, 'Inbox', 'Inbox');
  objectTemplate.project(automatic, 'Today', 'Today');
  objectTemplate.project(automatic, 'Upcoming ', 'Upcoming ');
  objectTemplate.project(automatic, 'Someday', 'Someday ');
  objectTemplate.project(automatic, 'Never', 'Never');
  objectTemplate.project(automatic, 'Logbook', 'Logbook');
};

const theAutomaticListDemo = () => {
  theProjectData.automaticProject[1].addList(
    theProjectData.automaticProject[1].list,
    'title',
    'description'
  );
};

const theAutomaticTaskDemo = () => {
  theProjectData.automaticProject[1].list[0].addTask(
    theProjectData.automaticProject[1].list[0].task,
    'title',
    'description',
    'category',
    'date'
  );
};

const theAutomaticNoteDemo = () => {
  console.log(theProjectData.automaticProject[1].list[0].task[0]);
  theProjectData.automaticProject[1].list[0].task[0].addNote(
    theProjectData.automaticProject[1].list[0].task[0].note,
    'title',
    'description'
  );
};

const theProjectDOM = (projectData) => {
  theProjectData[projectData].forEach((project) => {
    project.addDOMAutomaticProject(project.title.toLowerCase());
  });
};

const theListDOM = (projectData) => {
  theProjectData[projectData].forEach((project) => {
    project.list.forEach((list) => {
      list.addDOMList(list.title, list.description);
    });
  });
};

const theTaskDOM = (projectData) => {
  theProjectData[projectData].forEach((project) => {
    project.list.forEach((list) => {
      list.task.forEach((task) => {
        task.addDOMTask(task.title, task.description, task.category, task.date);
      });
    });
  });
};

const theNoteDOM = (projectData) => {
  theProjectData[projectData].forEach((project) => {
    project.list.forEach((list) => {
      list.task.forEach((task) => {
        task.note.forEach((note) => {
          note.addDOMNote(note.title, note.description);
        });
      });
    });
  });
};

const theAutomaticApplication = () => {
  theAutomaticProject();
  theProjectDOM('automaticProject');
  theAutomaticListDemo();
  theListDOM('automaticProject');
  theAutomaticTaskDemo();
  theTaskDOM('automaticProject');
  theAutomaticNoteDemo();
  theNoteDOM('automaticProject');
};

export { theAutomaticApplication };
