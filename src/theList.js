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
  object.id = project.indexOf(object);
};

const objectTemplate = {
  project: (project, title, description) => {
    const proto = {
      addList: objectTemplate.list,
      addDOMAutomaticProject: theDOMTemplate.automaticProject,
      addDOMProject: theDOMTemplate.project,
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
const theProjectData = (() => {
  let automaticProject = [];
  let customProject = [];

  return { automaticProject, customProject };
})();

//Automatic Projects
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

//Temporary Demos
const theAutomaticListDemo = () => {
  theProjectData.automaticProject[1].addList(
    theProjectData.automaticProject[1].list,
    'title',
    'description'
  );
  theProjectData.automaticProject[1].addList(
    theProjectData.automaticProject[1].list,
    'title2',
    'description2'
  );
  theProjectData.automaticProject[4].addList(
    theProjectData.automaticProject[4].list,
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
  theProjectData.automaticProject[1].list[0].task[0].addNote(
    theProjectData.automaticProject[1].list[0].task[0].note,
    'title',
    'description'
  );
};

//Application DOM Data
const theUpdateIDData = (projectData) => {
  theProjectData[projectData].forEach((project) => {
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

const theDOMProjectData = (projectData) => {
  theProjectData[projectData].forEach((project) => {
    project.addDOMAutomaticProject(project.title.toLowerCase());
    project.addDOMProject(project.title, project.description, project.id);
  });
};

const theDOMListData = (projectData) => {
  theProjectData[projectData].forEach((project) => {
    project.list.forEach((list) => {
      list.addDOMList(project.id, list.title, list.description, list.id);
    });
  });
};

const theDOMTaskData = (projectData) => {
  theProjectData[projectData].forEach((project) => {
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

const theDOMNoteData = (projectData) => {
  theProjectData[projectData].forEach((project) => {
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
