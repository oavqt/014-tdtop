import { theDOMApplication } from './theDom';
import { theAutomaticApplication } from './theList';

const theBuild = () => {
  theDOMApplication();
  theAutomaticApplication();
};

export { theBuild };
