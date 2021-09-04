import './css/styles.css';
import { theBuild } from './theBuild';
import { theEvents } from './theController';

theBuild();
theEvents();

//Server HMR
if (module.hot) {
  module.hot.accept();

  const content = document.querySelector('.content');
  while (content.firstChild) {
    content.removeChild(content.lastChild);
  }

  theBuild();
  theEvents();
}
