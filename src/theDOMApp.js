import { theElement } from './theElement';
import { theDOMAppendTo } from './theDOMTools';
import logo from './images/myLogo.png';
import search from './images/mySearch.png';
import add from './images/myAdd.png';
import github from './images/myGithub.png';

//Application
//Create Application
const theDOMApplication = () => {
  theDOMAppendTo.theContent(theApplicationSkeleton());
  theDOMAppendTo.theDemo(theApplicationSidebar());
  theDOMAppendTo.theDemo(theApplicationDisplay());
  theDOMAppendTo.theMisc(theApplicationInformation());
};

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
    theElement.create(
      'div',
      { class: 'sidebar__add' },
      theElement.create(
        'button',
        { class: 'button--add' },
        theElement.create('span', { class: 'add__text' }, 'Add Project'),
        theElement.create('img', { class: 'img--custom', src: add })
      )
    ),
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
        'div',
        { class: 'title__logo' },
        theElement.create(
          'div',
          { class: 'logo__button' },
          theElement.create(
            'button',
            { class: 'button--logo' },
            theElement.create('img', { class: 'img--logo', src: logo })
          )
        )
      ),
      theElement.create(
        'div',
        { class: 'title__misc' },
        theElement.create(
          'div',
          { class: 'misc__search' },
          theElement.create(
            'label',
            { class: 'label--search' },
            theElement.create('input', {
              class: 'input--search',
              type: 'text',
              placeholder: 'Quick Search...',
            })
          )
        ),
        theElement.create(
          'div',
          { class: 'misc__button' },
          theElement.create(
            'button',
            { class: 'button--search' },
            theElement.create('img', { class: 'img--search', src: search })
          )
        )
      )
    ),
    theElement.create('div', { class: 'display__body' }),
    theElement.create(
      'div',
      { class: 'display__misc' },

      theElement.create(
        'div',
        { class: 'misc__add' },
        theElement.create(
          'div',
          { class: 'add__button' },
          theElement.create(
            'button',
            { class: 'button--add' },
            theElement.create('img', { class: 'img--add', src: add }),
            theElement.create('span', { class: 'add__text' }, 'Add List')
          )
        )
      )
    )
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
      { class: 'information__tag' },
      theElement.create(
        'a',
        {
          class: 'a--github',
          href: 'https://github.com/oavqt',
          target: '_blank',
        },
        theElement.create('img', { class: 'img--github', src: github }),
        theElement.create('span', { class: 'tag__title' }, 'Oav')
      )
    )
  );
  return information;
};

export { theDOMApplication };
