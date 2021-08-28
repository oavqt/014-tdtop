const theElement = {
  //Create DOM Elements
  create: (tagName, attributes, ...children) => {
    let element = document.createElement(tagName);

    for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }

    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });

    return element;
  },
};

export default theElement;
