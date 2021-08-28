import theElement from './element';

const theTaskElement = (title, description, category, date) => {
  const task = theElement.create(
    'div',
    { class: 'task' },
    theElement.create(
      'div',
      { class: 'task__title' },
      theElement.create('h3', { class: 'title__text' }, title)
    ),
    theElement.create(
      'div',
      { class: 'task__body' },
      theElement.create(
        'div',
        { class: 'body__description' },
        theElement.create('p', { class: 'description__text' }, description)
      ),
      theElement.create(
        'div',
        { class: 'body__misc' },
        theElement.create(
          'div',
          { class: 'misc__information' },
          theElement.create(
            'div',
            { class: 'information__category' },
            theElement.create('p', { class: 'category__text' }, category)
          ),
          theElement.create(
            'div',
            { class: 'information__date' },
            theElement.create('p', { class: 'date__text' }, date)
          )
        ),
        theElement.create(
          'div',
          { class: 'misc__button' },
          theElement.create('button', { class: 'btn--edit' }),
          theElement.create('button', { class: 'btn--delete' })
        )
      )
    )
  );

  return task;
};
