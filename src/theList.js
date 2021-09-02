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

const objectAdd = (project, object) => {
  project.push(object);
  object['#'] = project.indexOf(object);
};

const objectTemplate = {
  project: (project, title, description) => {
    const tProject = Object.assign(
      {},
      {
        addList: objectTemplate.list,
        addTask: objectTemplate.task,
        addNote: objectTemplate.note,
        addDOMAutomaticProject: theDOMTemplate.automaticProject,
        addDOMTask: theDOMTemplate.task,
      }
    );

    objectAdd(
      project,
      Object.assign(
        Object.create(tProject),
        objectCreate.project(title, description)
      )
    );
  },

  list: (project, title, description) => {
    let list = objectCreate.list(title, description);
    objectAdd(project, list);
  },

  task: (project, title, description, category, date) => {
    let task = objectCreate.task(title, description, category, date);
    objectAdd(project, task);
  },

  note: (project, title, description) => {
    let note = objectCreate.note(title, description);
    objectAdd(project, note);
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

const theAutomaticProjectDOM = () => {
  theProjectData.automaticProject.forEach((project) => {
    project.addDOMAutomaticProject(project.title.toLowerCase());
  });
};

const theAutomaticApplication = () => {
  theAutomaticProject();
  theAutomaticProjectDOM();
};

export { theAutomaticApplication };
