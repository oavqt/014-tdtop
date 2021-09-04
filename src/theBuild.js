import { theDOMApplication } from './theDOMApp';
import { theAutomaticApplication } from './theList';

const theBuild = () => {
  theDOMApplication();
  theAutomaticApplication();
};

export { theBuild };
