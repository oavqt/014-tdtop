import { theEvents } from './theController';
import { theDOMApplication } from './theDOMApp';
import { theProjectStorage } from './theList';

const theProjectBuild = () => {
  theDOMApplication();
  theProjectStorage.theProjectStart();
  theEvents();
};

export { theProjectBuild };
