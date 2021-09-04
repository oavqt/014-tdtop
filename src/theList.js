import { theDOMTemplate } from './theDOMTools';

//Application Tools
const objectTemplate = {
  project: (projectStorage, title, description) => {
    const proto = {
      addList: objectTemplate.list,
      addDOMAutomaticProject: theDOMTemplate.sidebarAProject,
      addDOMProject: theDOMTemplate.aProject,
      addDOMTask: theDOMTemplate.task,
    };

    objectAdd(
      projectStorage,
      Object.assign(
        Object.create(proto),
        objectCreate.projectListNote(title, description),
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
        Object.create(proto),
        objectCreate.projectListNote(title, description),
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
        Object.create(proto),
        objectCreate.task(title, description, category, date),
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
        Object.create(proto),
        objectCreate.projectListNote(title, description)
      )
    );
  },
};

const objectAdd = (project, object) => {
  project.push(object);
  object.id = project.indexOf(object);
};

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

  return { automaticProject, customProject };
})();

//Automatic Projects
const theAutomaticProject = () => {
  theProjectStorage.automaticProject = []; //Temporary Server HMR

  const automatic = theProjectStorage.automaticProject;
  objectTemplate.project(automatic, 'Inbox', 'Inbox');
  objectTemplate.project(automatic, 'Today', 'Today');
  objectTemplate.project(automatic, 'Upcoming ', 'Upcoming ');
  objectTemplate.project(automatic, 'Someday', 'Someday ');
  objectTemplate.project(automatic, 'Never', 'Never');
  objectTemplate.project(automatic, 'Logbook', 'Logbook');
};

//Temporary Demos
const theAutomaticListDemo = () => {
  theProjectStorage.automaticProject[1].addList(
    theProjectStorage.automaticProject[1].list,
    'title',
    'description'
  );
  theProjectStorage.automaticProject[1].addList(
    theProjectStorage.automaticProject[1].list,
    'title2',
    'description2'
  );
  theProjectStorage.automaticProject[4].addList(
    theProjectStorage.automaticProject[4].list,
    'title',
    'description'
  );
  theProjectStorage.automaticProject[5].history =
    theProjectStorage.automaticProject;
};

const theAutomaticTaskDemo = () => {
  theProjectStorage.automaticProject[1].list[0].addTask(
    theProjectStorage.automaticProject[1].list[0].task,
    'title',
    'description',
    'category',
    'date'
  );
};

const theAutomaticNoteDemo = () => {
  theProjectStorage.automaticProject[1].list[0].task[0].addNote(
    theProjectStorage.automaticProject[1].list[0].task[0].note,
    'title',
    'description'
  );
};

//Application DOM Data
const theUpdateIDData = (projectStorage) => {
  theProjectStorage[projectStorage].forEach((project) => {
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

const theDOMProjectData = (projectStorage) => {
  theProjectStorage[projectStorage].forEach((project) => {
    project.addDOMAutomaticProject(project.title.toLowerCase(), project.id);
    project.addDOMProject(project.title, project.description, project.id);
  });
};

const theDOMListData = (projectStorage) => {
  theProjectStorage[projectStorage].forEach((project) => {
    project.list.forEach((list) => {
      list.addDOMList(project.id, list.title, list.description, list.id);
    });
  });
};

const theDOMTaskData = (projectStorage) => {
  theProjectStorage[projectStorage].forEach((project) => {
    project.list.forEach((list) => {
      list.task.forEach((task) => {
        task.addDOMTask(
          list.id,
          task.title,
          task.description,
          task.category,
          task.date,
          task.id,
          project.id
        );
      });
    });
  });
};

const theDOMNoteData = (projectStorage) => {
  theProjectStorage[projectStorage].forEach((project) => {
    project.list.forEach((list) => {
      list.task.forEach((task) => {
        task.note.forEach((note) => {
          note.addDOMNote(
            task.id,
            note.title,
            note.description,
            note.id,
            project.id,
            list.id
          );
        });
      });
    });
  });
};

const theAutomaticApplication = () => {
  theAutomaticProject();
  theUpdateIDData('automaticProject');
  theDOMProjectData('automaticProject');
  theAutomaticListDemo();
  theUpdateIDData('automaticProject');
  theDOMListData('automaticProject');
  theAutomaticTaskDemo();
  theUpdateIDData('automaticProject');
  theDOMTaskData('automaticProject');
  theAutomaticNoteDemo();
  theUpdateIDData('automaticProject');
  theDOMNoteData('automaticProject');
};

export { theAutomaticApplication };
