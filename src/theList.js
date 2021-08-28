import { theCreateElement, theAppendElement } from './theDom';

const theTaskObject = (title, description, category, date) => {
  const proto = {
    theCreateElement,
    theAppendElement,
  };

  return Object.assign(Object.create(proto), {
    title,
    description,
    category,
    date,
  });
};
