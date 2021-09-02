import { theElement } from './theElement';
import logo from './images/myLogo.png';
import github from './images/myGithub.png';

//DOM Tools
//Create DOM Template
const theDOMTemplate = {
  automaticProject: (title) => {
    theDOMAppendTo.theSidebarAutomatic(theDOMCreate.automaticProject(title));
  },
  list: (title, description) => {
    theDOMAppendTo.theDisplayBody(theDOMCreate.list(title, description));
  },
  task: (title, description, category, date = '') => {
    theDOMAppendTo.theDisplayBody(
      theDOMCreate.task(title, description, category, date)
    );
  },
  note: (title, description) => {
    theDOMAppendTo.theDisplayBody(theDOMCreate.note(title, description));
  },
};

//Create DOM Element
const theDOMCreate = {
  automaticProject: (title, count = '') => {
    const element = theElement.create(
      'div',
      { class: `automatic__${title}` },
      theElement.create(
        'button',
        { class: `btn--${title}` },
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
  list: (title, description) => {
    const element = theElement.create(
      'div',
      { class: 'body__list' },
      theElement.create('h1', { class: 'list__title' }, title),
      theElement.create('p', { class: 'list__description' }, description)
    );
    return element;
  },
  task: (title, description, category, date) => {
    const element = theElement.create(
      'div',
      { class: 'list__task' },
      theElement.create(
        'div',
        { class: 'task__title' },
        theElement.create('h3', { class: 'title__text' }, title)
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
  note: (title, description) => {
    const element = theElement.create(
      'div',
      { class: 'task__note' },
      theElement.create('h1', { class: 'note__title' }, title),
      theElement.create('p', { class: 'note__description' }, description)
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
  theButton: (className) => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      if (button.className === className) {
        return button;
      }
    });
  },
};

//Application
//Create Application Skeleton
const theSkeleton = () => {
  const skeleton = theElement.create(
    'div',
    { class: 'content__application' },
    theElement.create('div', { class: 'application__demo' }),
    theElement.create('div', { class: 'application__misc' })
  );
  return skeleton;
};

//Create Application Sidebar
const theSidebar = () => {
  const sidebar = theElement.create(
    'div',
    { class: 'demo__sidebar' },
    theElement.create('div', { class: 'sidebar__automatic' }),
    theElement.create('div', { class: 'sidebar__custom' })
  );
  return sidebar;
};

//Create Application Display
const theDisplay = () => {
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
const theInformation = () => {
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
  theDOMAppendTo.theContent(theSkeleton());
  theDOMAppendTo.theDemo(theSidebar());
  theDOMAppendTo.theDemo(theDisplay());
  theDOMAppendTo.theMisc(theInformation());
};

export { theDOMApplication, theDOMTemplate };
