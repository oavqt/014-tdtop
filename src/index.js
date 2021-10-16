import './css/styles.css';
import { theProjectBuild } from './theBuild';

theProjectBuild();

//Server HMR
if (module.hot) {
  module.hot.accept();

  const content = document.querySelector('.content');
  while (content.firstChild) {
    content.removeChild(content.lastChild);
  }

  theProjectBuild();
}
