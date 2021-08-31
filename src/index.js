import './css/styles.css';
import './theList';
import { theApplication } from './theDom';

theApplication();

//Server HMR
if (module.hot) {
  module.hot.accept();

  // const content = document.querySelector('.content');

  // while (content.firstChild) {
  //   content.removeChild(content.lastChild);
  // }
}
