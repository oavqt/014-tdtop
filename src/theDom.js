import { theElement } from './theElement';
import logo from './images/myLogo.png';
import github from './images/myGithub.png';

//DOM Tools
//Create DOM Elements
const theCreate = {
  theTask: (title, description, category, date) => {
    const task = theElement.create(
      'div',
      { class: 'task' },
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
    return task;
  },
};

//Append DOM Elements
const theAppendTo = {
  theContent: (element) => {
    theGet.theContent().appendChild(element);
  },
  theDemo: (element) => {
    theGet.theDemo().appendChild(element);
  },
  theMisc: (element) => {
    theGet.theMisc().appendChild(element);
  },
};

//Get DOM Elements
const theGet = {
  theContent: () => {
    return document.querySelector('.content');
  },
  theDemo: () => {
    return document.querySelector('.application__demo');
  },
  theMisc: () => {
    return document.querySelector('.application__misc');
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
//Create Application
const theApplication = () => {
  theAppendTo.theContent(theSkeleton());
  theAppendTo.theDemo(theSidebar());
  theAppendTo.theDemo(theDisplay());
  theAppendTo.theMisc(theInformation());
};

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
    theElement.create(
      'div',
      { class: 'sidebar__inbox' },
      theElement.create(
        'button',
        { class: 'btn--inbox' },
        theElement.create('span', { class: 'inbox__text' }, 'Inbox')
      )
    ),
    theElement.create(
      'div',
      { class: 'sidebar__today' },
      theElement.create(
        'button',
        { class: 'btn--today' },
        theElement.create('span', { class: 'today__text' }, 'Today'),
        theElement.create('span', { class: 'today__count' }, '3')
      )
    ),
    theElement.create(
      'div',
      { class: 'sidebar__upcoming' },
      theElement.create(
        'button',
        { class: 'btn--upcoming' },
        theElement.create('span', { class: 'upcoming__text' }, 'Upcoming')
      )
    ),
    theElement.create(
      'div',
      { class: 'sidebar__someday' },
      theElement.create(
        'button',
        { class: 'btn--someday' },
        theElement.create('span', { class: 'someday__text' }, 'Someday')
      )
    ),
    theElement.create(
      'div',
      { class: 'sidebar__never' },
      theElement.create(
        'button',
        { class: 'btn--never' },
        theElement.create('span', { class: 'never__text' }, 'Never')
      )
    ),
    theElement.create(
      'div',
      { class: 'sidebar__logbook' },
      theElement.create(
        'button',
        { class: 'btn--logbook' },
        theElement.create('span', { class: 'logbook__text' }, 'Logbook')
      )
    ),
    theElement.create('div', { class: 'sidebar__project' })
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
    )
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

export { theApplication };
