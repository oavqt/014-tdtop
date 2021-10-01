import { theElement } from './theElement';
import add from './images/myAdd.png';
import edit from './images/myEdit.png';
import trash from './images/myTrash.png';

//DOM Tools
//Create DOM Template
const theDOMTemplate = {
  sidebarAutomaticProject: (title, type, id) => {
    theDOMAppendTo.theSidebarAutomatic(
      theDOMCreate.sidebarAutomaticProject(title, type, id)
    );
  },
  sidebarCustomProject: (title, type, id) => {
    theDOMAppendTo.theSidebarCustom(
      theDOMCreate.sidebarCustomProject(title, type, id)
    );
  },
  project: (title, description, type, id) => {
    theDOMAppendTo.theDisplayBody(
      theDOMCreate.project(title, description, type, id)
    );
  },
  list: (idProject, title, description, type, id) => {
    theDOMAppendTo.theProject(
      idProject,
      theDOMCreate.list(title, description, type, id, idProject)
    );
  },
  task: (
    idList,
    title,
    description,
    category,
    date = '',
    type,
    id,
    idProject
  ) => {
    theDOMAppendTo.theList(
      idList,
      idProject,
      theDOMCreate.task(
        title,
        description,
        category,
        date,
        type,
        id,
        idProject,
        idList
      )
    );
  },
  note: (idTask, title, description, type, id, idProject, idList) => {
    theDOMAppendTo.theTask(
      idTask,
      idProject,
      idList,
      theDOMCreate.note(title, description, type, id, idProject, idList, idTask)
    );
  },
  form: (projectListTaskNote) => {
    if (projectListTaskNote === 'Task') {
      theDOMAppendTo.theDemo(theDOMCreate.taskForm(projectListTaskNote));
    } else {
      theDOMAppendTo.theDemo(
        theDOMCreate.projectListNoteForm(projectListTaskNote)
      );
    }
  },
};

//Append DOM Elements
const theDOMAppendTo = {
  theContent: (element) => {
    theDOMGet.theContent().appendChild(element);
  },
  theDemo: (element) => {
    theDOMGet.theDemo().appendChild(element);
  },
  theMisc: (element) => {
    theDOMGet.theMisc().appendChild(element);
  },
  theSidebar: (element) => {
    theDOMGet.theSidebar().appendChild(element);
  },
  theSidebarAutomatic: (element) => {
    theDOMGet.theSidebarAutomatic().appendChild(element);
  },
  theSidebarCustom: (element) => {
    theDOMGet.theSidebarCustom().appendChild(element);
  },
  theDisplayBody: (element) => {
    theDOMGet.theDisplayBody().appendChild(element);
  },
  theProject: (idProject, element) => {
    theDOMGet.theProject(idProject).appendChild(element);
  },
  theList: (idList, idProject, element) => {
    theDOMGet.theList(idList, idProject).appendChild(element);
  },
  theTask: (idTask, idProject, idList, element) => {
    theDOMGet.theTask(idTask, idProject, idList).appendChild(element);
  },
};

//Get DOM Elements
const theDOMGet = {
  theContent: () => {
    return document.querySelector('.content');
  },
  theDemo: () => {
    return document.querySelector('.application__demo');
  },
  theMisc: () => {
    return document.querySelector('.application__misc');
  },
  theSidebar: () => {
    return document.querySelector('.demo__sidebar');
  },
  theSidebarAutomatic: () => {
    return document.querySelector('.sidebar__automatic');
  },
  theSidebarCustom: () => {
    return document.querySelector('.sidebar__custom');
  },
  theDisplayBody: () => {
    return document.querySelector('.display__body');
  },
  theDisplayProject: () => {
    return document.querySelector('.body__project');
  },
  theDisplayProjectCheckbox: () => {
    return document.querySelector('.body__project .body__checkbox');
  },
  theDisplayProjectEdit: () => {
    return document.querySelector('.body__project .button--edit');
  },
  theDisplayProjectDelete: () => {
    return document.querySelector('.body__project .button--delete');
  },
  theAddProject: () => {
    return document.querySelector('.sidebar__add .button--add');
  },
  theAddList: () => {
    return document.querySelector('.display__misc .button--add');
  },
  theAddTask: () => {
    return document.querySelectorAll('.project__list .button--add');
  },
  theAddNote: () => {
    return document.querySelectorAll('.list__task .button--add');
  },
  theProject: (idProject) => {
    const projects = [...document.querySelectorAll('.body__project')];
    return projects.filter(
      (project) => project.dataset.id === idProject.toString()
    )[0];
  },
  theList: (idList, idProject) => {
    const lists = [...document.querySelectorAll('.project__list')];
    return lists.filter(
      (list) =>
        list.dataset.id === idList.toString() &&
        list.dataset.project === idProject.toString()
    )[0];
  },
  theTask: (idTask, idProject, idList) => {
    const tasks = [...document.querySelectorAll('.list__task')];
    return tasks.filter(
      (task) =>
        task.dataset.id === idTask.toString() &&
        task.dataset.project === idProject.toString() &&
        task.dataset.list === idList.toString()
    )[0];
  },
  theNote: (idNote, idTask, idProject, idList) => {
    const notes = [...document.querySelectorAll('.task__note')];
    return notes.filter(
      (note) =>
        note.dataset.id === idNote.toString() &&
        note.dataset.task === idTask.toString() &&
        note.dataset.project === idProject.toString() &&
        note.dataset.list === idList.toString()
    )[0];
  },
  theSidebarAutomaticButtons: () => {
    return document.querySelectorAll('.sidebar__automatic button');
  },
  theSidebarCustomButtons: () => {
    return document.querySelectorAll('.sidebar__custom button');
  },
  theProjectButton: (idProject) => {
    const buttons = document.querySelectorAll('.demo__sidebar button');
    return buttons.filter((button) => button.id === idProject.toString())[0];
  },
  theForm: () => {
    return document.querySelector('.display__form');
  },
  theFormTitle: () => {
    return document.querySelector('.input--title');
  },
  theFormDescription: () => {
    return document.querySelector('.textarea--description');
  },
  theFormButtonCancel: () => {
    return document.querySelector('.form__button .button--cancel');
  },
  theFormButtonAdd: () => {
    return document.querySelector('.form__button .button--add');
  },
};

const theDOMGetValue = {
  id: {
    project: () => {
      return theDOMGet.theDisplayProject().dataset.id;
    },
    list: (idList, idProject) => {
      return theDOMGet.theList(idList, idProject);
    },
    task: (idTask, idList, idProject) => {
      return theDOMGet.theTask(idTask, idList, idProject);
    },
    note: (idNote, idTask, idList, idProject) => {
      return theDOMGet.theNote(idNote, idTask, idList, idProject);
    },
  },
  type: {
    project: () => {
      return theDOMGet.theDisplayProject().dataset.type;
    },
  },
  input: {
    title: () => {
      return theDOMGet.theFormTitle().value;
    },
    description: () => {
      return theDOMGet.theFormDescription().value;
    },
  },
};

//Create DOM Element
const theDOMCreate = {
  sidebarAutomaticProject: (title, type, id, count = '') => {
    const element = theElement.create(
      'div',
      {
        class: `automatic__${title.toLowerCase()}`,
        ['data-type']: type,
        ['data-id']: id,
      },
      theElement.create(
        'button',
        {
          class: `button--${title.toLowerCase()}`,
          ['data-type']: type,
          ['data-id']: id,
        },
        theElement.create(
          'span',
          { class: `${title}__title` },
          `${title[0].toUpperCase() + title.slice(1)}`
        ),
        theElement.create('span', { class: `${title}__count` }, count)
      )
    );
    return element;
  },
  sidebarCustomProject: (title, type, id, count = '') => {
    const element = theElement.create(
      'div',
      {
        class: `custom__${title.toLowerCase()}`,
        ['data-type']: type,
        ['data-id']: id,
      },
      theElement.create(
        'button',
        {
          class: `button--${title.toLowerCase()}`,
          ['data-type']: type,
          ['data-id']: id,
        },
        theElement.create('span', { class: `${title}__title` }, title),
        theElement.create('span', { class: `${title}__count` }, count)
      )
    );
    return element;
  },
  project: (title, description, type, id) => {
    const element = theElement.create(
      'div',
      { class: 'body__project', ['data-type']: type, ['data-id']: id },
      theElement.create(
        'div',
        { class: 'project__title' },
        theElement.create(
          'div',
          { class: 'title__body' },
          theElement.create(
            'div',
            { class: 'body__checkbox' },
            theElement.create(
              'label',
              { class: 'label--checkbox' },
              theElement.create('input', {
                class: 'input--checkbox',
                type: 'checkbox',
                ['data-type']: type,
                ['data-id']: id,
              }),
              theElement.create('span', { class: 'checkbox__custom' })
            )
          ),
          theElement.create(
            'div',
            { class: 'body__title' },
            theElement.create('h1', { class: 'title__text' }, title)
          )
        ),
        theElement.create(
          'div',
          { class: 'title__misc' },
          theElement.create(
            'button',
            { class: 'button--edit', ['data-type']: type, ['data-id']: id },
            theElement.create('img', { class: 'img--edit', src: edit })
          ),
          theElement.create(
            'button',
            { class: 'button--delete', ['data-type']: type, ['data-id']: id },
            theElement.create('img', { class: 'img--delete', src: trash })
          )
        )
      ),
      theElement.create(
        'div',
        { class: 'project__description' },
        theElement.create('p', { class: 'description__text' }, description)
      )
    );
    return element;
  },
  list: (title, description, type, id, idProject) => {
    const element = theElement.create(
      'div',
      {
        class: 'project__list',
        ['data-type']: type,
        ['data-id']: id,
        ['data-project']: idProject,
      },
      theElement.create(
        'div',
        { class: 'list__title' },
        theElement.create(
          'div',
          { class: 'title__body' },
          theElement.create(
            'div',
            { class: 'body__checkbox' },
            theElement.create(
              'label',
              { class: 'label--checkbox' },
              theElement.create('input', {
                class: 'input--checkbox',
                type: 'checkbox',
                ['data-type']: type,
                ['data-id']: id,
                ['data-project']: idProject,
              }),
              theElement.create('span', { class: 'checkbox__custom' })
            )
          ),
          theElement.create(
            'div',
            { class: 'body__title' },
            theElement.create('h1', { class: 'title__text' }, title)
          ),
          theElement.create(
            'div',
            { class: 'body__add' },
            theElement.create(
              'button',
              {
                class: 'button--add',
                ['data-type']: type,
                ['data-id']: id,
                ['data-project']: idProject,
              },
              theElement.create('img', { class: 'img--add', src: add }),
              theElement.create('span', { class: 'add__text' }, 'Add Task')
            )
          )
        ),
        theElement.create(
          'div',
          { class: 'title__misc' },
          theElement.create(
            'button',
            {
              class: 'button--edit',
              ['data-type']: type,
              ['data-id']: id,
              ['data-project']: idProject,
            },
            theElement.create('img', { class: 'img--edit', src: edit })
          ),
          theElement.create(
            'button',
            {
              class: 'button--delete',
              ['data-type']: type,
              ['data-id']: id,
              ['data-project']: idProject,
            },
            theElement.create('img', { class: 'img--delete', src: trash })
          )
        )
      ),
      theElement.create(
        'div',
        { class: 'list__description' },
        theElement.create('p', { class: 'description__text' }, description)
      )
    );
    return element;
  },
  task: (title, description, category, date, type, id, idProject, idList) => {
    const element = theElement.create(
      'div',
      {
        class: 'list__task',
        ['data-type']: type,
        ['data-id']: id,
        ['data-project']: idProject,
        ['data-list']: idList,
      },
      theElement.create(
        'div',
        { class: 'task__title' },
        theElement.create(
          'div',
          { class: 'title__body' },
          theElement.create(
            'div',
            { class: 'body__checkbox' },
            theElement.create(
              'label',
              { class: 'label--checkbox' },
              theElement.create('input', {
                class: 'input--checkbox',
                type: 'checkbox',
                ['data-type']: type,
                ['data-id']: id,
                ['data-project']: idProject,
                ['data-list']: idList,
              }),
              theElement.create('span', { class: 'checkbox__custom' })
            )
          ),
          theElement.create(
            'div',
            { class: 'body__title' },
            theElement.create('h1', { class: 'title__text' }, title)
          ),
          theElement.create(
            'div',
            { class: 'body__add' },
            theElement.create(
              'button',
              {
                class: 'button--add',
                ['data-type']: type,
                ['data-id']: id,
                ['data-project']: idProject,
                ['data-list']: idList,
              },
              theElement.create('img', { class: 'img--add', src: add }),
              theElement.create('span', { class: 'add__text' }, 'Add Note')
            )
          )
        ),
        theElement.create(
          'div',
          { class: 'title__misc' },
          theElement.create(
            'button',
            {
              class: 'button--edit',
              ['data-type']: type,
              ['data-id']: id,
              ['data-project']: idProject,
              ['data-list']: idList,
            },
            theElement.create('img', { class: 'img--edit', src: edit })
          ),
          theElement.create(
            'button',
            {
              class: 'button--delete',
              ['data-type']: type,
              ['data-id']: id,
              ['data-project']: idProject,
              ['data-list']: idList,
            },
            theElement.create('img', { class: 'img--delete', src: trash })
          )
        )
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
            { class: 'misc__category' },
            theElement.create('span', { class: 'category__text' }, category)
          ),
          theElement.create(
            'div',
            { class: 'misc__date' },
            theElement.create('span', { class: 'date__text' }, date)
          )
        )
      )
    );
    return element;
  },
  note: (title, description, type, id, idProject, idList, idTask) => {
    const element = theElement.create(
      'div',
      {
        class: 'task__note',
        ['data-type']: type,
        ['data-id']: id,
        ['data-project']: idProject,
        ['data-list']: idList,
        ['data-task']: idTask,
      },
      theElement.create(
        'div',
        { class: 'note__title' },
        theElement.create(
          'div',
          { class: 'title__body' },
          theElement.create(
            'div',
            { class: 'body__checkbox' },
            theElement.create(
              'label',
              { class: 'label--checkbox' },
              theElement.create('input', {
                class: 'input--checkbox',
                type: 'checkbox',
                ['data-type']: type,
                ['data-id']: id,
                ['data-project']: idProject,
                ['data-list']: idList,
                ['data-task']: idTask,
              }),
              theElement.create('span', { class: 'checkbox__custom' })
            )
          ),
          theElement.create(
            'div',
            { class: 'body__title' },
            theElement.create('h1', { class: 'title__text' }, title)
          )
        ),
        theElement.create(
          'div',
          { class: 'title__misc' },
          theElement.create(
            'button',
            {
              class: 'button--edit',
              ['data-type']: type,
              ['data-id']: id,
              ['data-project']: idProject,
              ['data-list']: idList,
              ['data-task']: idTask,
            },
            theElement.create('img', { class: 'img--edit', src: edit })
          ),
          theElement.create(
            'button',
            {
              class: 'button--delete',
              ['data-type']: type,
              ['data-id']: id,
              ['data-project']: idProject,
              ['data-list']: idList,
              ['data-task']: idTask,
            },
            theElement.create('img', { class: 'img--delete', src: trash })
          )
        )
      ),
      theElement.create(
        'div',
        { class: 'note__description' },
        theElement.create('p', { class: 'description__text' }, description)
      )
    );
    return element;
  },
  projectListNoteForm: (projectListNote) => {
    const element = theElement.create(
      'div',
      { class: 'display__form' },
      theElement.create(
        'div',
        { class: 'form__title' },
        theElement.create(
          'h1',
          { class: 'title__text' },
          `Add ${projectListNote}`
        )
      ),
      theElement.create(
        'div',
        { class: 'form__body' },
        theElement.create(
          'form',
          { class: 'form--body' },
          theElement.create(
            'label',
            { class: 'label--title' },
            theElement.create('span', { class: 'body__title' }, 'Title'),
            theElement.create('input', {
              class: 'input--title',
              type: 'text',
            })
          ),
          theElement.create(
            'label',
            { class: 'label--description' },
            theElement.create(
              'span',
              { class: 'body__description' },
              'Description'
            ),
            theElement.create('textarea', {
              class: 'textarea--description',
            })
          )
        )
      ),
      theElement.create(
        'div',
        { class: 'form__button' },
        theElement.create('button', { class: 'button--cancel' }, 'Cancel'),
        theElement.create(
          'button',
          {
            class: 'button--add',
            ['data-type']: projectListNote.toLowerCase(),
          },
          'Add'
        )
      )
    );
    return element;
  },
  taskForm: () => {},
};

export { theDOMTemplate, theDOMAppendTo, theDOMGet, theDOMGetValue };
