import './css/styles.css';
import { theBuild } from './theBuild';

theBuild();

//Server HMR
if (module.hot) {
  module.hot.accept();

  const content = document.querySelector('.content');
  while (content.firstChild) {
    content.removeChild(content.lastChild);
  }

  theBuild();
}
