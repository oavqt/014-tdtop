import { theElement } from './theElement';
import logo from './images/myLogo.png';
import github from './images/myGithub.png';

//DOM Tools
//Create DOM Template
const theDOMTemplate = {
  automaticProject: (title, id) => {
    theDOMAppendTo.theSidebarAutomatic(
      theDOMCreate.automaticProject(title, id)
    );
  },
  project: (title, description, id) => {
    theDOMAppendTo.theDisplayBody(theDOMCreate.project(title, description, id));
  },
  list: (idProject, title, description, id) => {
    theDOMAppendTo.theProject(
      idProject,
      theDOMCreate.list(title, description, id, idProject)
    );
  },
  task: (idList, title, description, category, date = '', id, idProject) => {
    theDOMAppendTo.theList(
      idList,
      idProject,
      theDOMCreate.task(
        title,
        description,
        category,
        date,
        id,
        idProject,
        idList
      )
    );
  },
  note: (idTask, title, description, id, idProject, idList) => {
    theDOMAppendTo.theTask(
      idTask,
      idProject,
      idList,
      theDOMCreate.note(title, description, id, idProject, idList, idTask)
    );
  },
};

//Create DOM Element
const theDOMCreate = {
  automaticProject: (title, id, count = '') => {
    const element = theElement.create(
      'div',
      { class: `automatic__${title}`, ['data-id']: id },
      theElement.create(
        'button',
        { class: `btn--${title}`, ['data-id']: id },
        theElement.create(
          'span',
          { class: `${title}__title` },
          `${title[0].toUpperCase() + title.slice(1)}`
        ),
        theElement.create('span', { class: `${title}__count` }, count)
      )
    );
    return element;
  },
  customProject: () => {},
  project: (title, description, id) => {
    const element = theElement.create(
      'div',
      { class: 'body__project', ['data-id']: id },
      theElement.create(
        'div',
        { class: 'project__title' },
        theElement.create('h1', { class: 'title__text' }, title)
      ),
      theElement.create(
        'div',
        { class: 'project__description' },
        theElement.create('p', { class: 'description__text' }, description)
      )
    );
    return element;
  },

  list: (title, description, id, idProject) => {
    const element = theElement.create(
      'div',
      { class: 'project__list', ['data-id']: id, ['data-project']: idProject },
      theElement.create(
        'div',
        { class: 'list__title' },
        theElement.create('h1', { class: 'title__text' }, title)
      ),
      theElement.create(
        'div',
        { class: 'list__description' },
        theElement.create('p', { class: 'description__text' }, description)
      )
    );
    return element;
  },
  task: (title, description, category, date, id, idProject, idList) => {
    const element = theElement.create(
      'div',
      {
        class: 'list__task',
        ['data-id']: id,
        ['data-project']: idProject,
        ['data-list']: idList,
      },
      theElement.create(
        'div',
        { class: 'task__title' },
        theElement.create('h2', { class: 'title__text' }, title)
      ),
      theElement.create(
        'div',
        { class: 'task__body' },
        theElement.create(
          'div',
          { class: 'body__description' },
          theElement.create('p', { class: 'description__text' }, description)
        ),
        theElement.create(
          'div',
          { class: 'body__misc' },
          theElement.create(
            'div',
            { class: 'misc__information' },
            theElement.create(
              'div',
              { class: 'information__category' },
              theElement.create('p', { class: 'category__text' }, category)
            ),
            theElement.create(
              'div',
              { class: 'information__date' },
              theElement.create('p', { class: 'date__text' }, date)
            )
          ),
          theElement.create(
            'div',
            { class: 'misc__button' },
            theElement.create('button', { class: 'btn--edit' }),
            theElement.create('button', { class: 'btn--delete' })
          )
        )
      )
    );
    return element;
  },
  note: (title, description, id, idProject, idList, idTask) => {
    const element = theElement.create(
      'div',
      {
        class: 'task__note',
        ['data-id']: id,
        ['data-project']: idProject,
        ['data-list']: idList,
        ['data-task']: idTask,
      },
      theElement.create(
        'div',
        { class: 'note__title' },
        theElement.create('h3', { class: 'title__text' }, title)
      ),
      theElement.create(
        'div',
        { class: 'note__description' },
        theElement.create('p', { class: 'description__text' }, description)
      )
    );
    return element;
  },
};

//Append DOM Elements
const theDOMAppendTo = {
  theContent: (element) => {
    theDOMGet.theContent().appendChild(element);
  },
  theDemo: (element) => {
    theDOMGet.theDemo().appendChild(element);
  },
  theMisc: (element) => {
    theDOMGet.theMisc().appendChild(element);
  },
  theSidebar: (element) => {
    theDOMGet.theSidebar().appendChild(element);
  },
  theSidebarAutomatic: (element) => {
    theDOMGet.theSidebarAutomatic().appendChild(element);
  },
  theSidebarCustom: (element) => {
    theDOMGet.theSidebarCustom().appendChild(element);
  },
  theDisplayBody: (element) => {
    theDOMGet.theDisplayBody().appendChild(element);
  },
  theProject: (idProject, element) => {
    theDOMGet.theProject(idProject).appendChild(element);
  },
  theList: (idList, idProject, element) => {
    theDOMGet.theList(idList, idProject).appendChild(element);
  },
  theTask: (idTask, idProject, idList, element) => {
    theDOMGet.theTask(idTask, idProject, idList).appendChild(element);
  },
};

//Get DOM Elements
const theDOMGet = {
  theContent: () => {
    return document.querySelector('.content');
  },
  theDemo: () => {
    return document.querySelector('.application__demo');
  },
  theMisc: () => {
    return document.querySelector('.application__misc');
  },
  theSidebar: () => {
    return document.querySelector('.demo__sidebar');
  },
  theSidebarAutomatic: () => {
    return document.querySelector('.sidebar__automatic');
  },
  theSidebarCustom: () => {
    return document.querySelector('.sidebar__custom');
  },
  theDisplayBody: () => {
    return document.querySelector('.display__body');
  },
  theDisplayProject: () => {
    return document.querySelectorAll('.body__project');
  },
  theProject: (idProject) => {
    const projects = [...document.querySelectorAll('.body__project')];
    return projects.filter(
      (project) => project.dataset.id === idProject.toString()
    )[0];
  },
  theList: (idList, idProject) => {
    const lists = [...document.querySelectorAll('.project__list')];
    return lists.filter(
      (list) =>
        list.dataset.id === idList.toString() &&
        list.dataset.project === idProject.toString()
    )[0];
  },
  theTask: (idTask, idProject, idList) => {
    const tasks = [...document.querySelectorAll('.list__task')];
    return tasks.filter(
      (task) =>
        task.dataset.id === idTask.toString() &&
        task.dataset.project === idProject.toString() &&
        task.dataset.list === idList.toString()
    )[0];
  },
  theSidebarButtons: () => {
    return document.querySelectorAll('.demo__sidebar button');
  },
  theProjectButton: (idProject) => {
    const buttons = document.querySelectorAll('.demo__sidebar button');
    return buttons.filter((button) => button.id === idProject.toString())[0];
  },
};

//Application
//Create Application Skeleton
const theApplicationSkeleton = () => {
  const skeleton = theElement.create(
    'div',
    { class: 'content__application' },
    theElement.create('div', { class: 'application__demo' }),
    theElement.create('div', { class: 'application__misc' })
  );
  return skeleton;
};

//Create Application Sidebar
const theApplicationSidebar = () => {
  const sidebar = theElement.create(
    'div',
    { class: 'demo__sidebar' },
    theElement.create('div', { class: 'sidebar__automatic' }),
    theElement.create('div', { class: 'sidebar__custom' })
  );
  return sidebar;
};

//Create Application Display
const theApplicationDisplay = () => {
  const display = theElement.create(
    'div',
    { class: 'demo__display' },
    theElement.create(
      'div',
      { class: 'display__title' },
      theElement.create(
        'button',
        { class: 'btn--logo' },
        theElement.create('img', { class: 'img--logo', src: logo })
      ),
      theElement.create('h1', { class: 'title__text' }, 'Tudoui Le Daq')
    ),
    theElement.create('div', { class: 'display__body' }),
    theElement.create('div', { class: 'display__misc' })
  );
  return display;
};

//Create Application Information
const theApplicationInformation = () => {
  const information = theElement.create(
    'div',
    { class: 'misc__information' },
    theElement.create(
      'div',
      { class: 'information__title' },
      theElement.create('h1', { class: 'title__text' }, 'Tudoui Le Daq ')
    ),
    theElement.create(
      'div',
      { class: 'information__description' },
      theElement.create(
        'p',
        { class: 'description__text' },
        'Ut convallis varius purus vel commodo. Ut vitae consequat tellus, non hendrerit dolor. Fusce sollicitudin sed magna eu dictum. Nunc consectetur mauris mi, ut iaculis libero laoreet et. Curabitur nec.'
      )
    ),
    theElement.create(
      'div',
      { class: 'information__tags' },
      theElement.create(
        'a',
        {
          class: 'a--github',
          href: 'https://github.com/oavqt',
          target: '_blank',
        },
        theElement.create('img', { class: 'img--github', src: github }),
        theElement.create('span', {}, 'Oav')
      )
    )
  );
  return information;
};

//Create Application
const theDOMApplication = () => {
  theDOMAppendTo.theContent(theApplicationSkeleton());
  theDOMAppendTo.theDemo(theApplicationSidebar());
  theDOMAppendTo.theDemo(theApplicationDisplay());
  theDOMAppendTo.theMisc(theApplicationInformation());
};

export { theDOMApplication, theDOMTemplate, theDOMGet };
