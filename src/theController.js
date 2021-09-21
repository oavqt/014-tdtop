import { theDOMGet } from './theDOMTools';
import { theDOMDisplay } from './theList';

const theEvents = () => {
  addEventSideBar();
};

const addEventSideBar = () => {
  theDOMGet.theSidebarAutomaticButtons().forEach((button) => {
    button.addEventListener('click', theDisplayProjectEvent);
  });
};

const theDisplayProjectEvent = function () {
  theButtonClear();
  theDisplayClear();
  theButtonActive(this);
  theDisplayShow(this.dataset.type, this.dataset.id);
};

const theButtonActive = (button) => {
  button.classList.add('button--active');
};

const theButtonClear = () => {
  while (theDOMGet.theDisplayBody().firstChild) {
    theDOMGet
      .theDisplayBody()
      .removeChild(theDOMGet.theDisplayBody().lastChild);
  }

  theDOMGet.theSidebarAutomaticButtons().forEach((button) => {
    button.classList.remove('button--active');
  });
};

const theDisplayClear = () => {
  theDOMGet.theDisplayProject().forEach((project) => {
    project.classList.remove('body__project--active');
  });
};

const theDisplayShow = (type, id) => {
  theDOMDisplay(type, id);
};

export { theEvents };
