import { theElement } from './theElement';
import add from './images/myAdd.png';
import edit from './images/myEdit.png';
import trash from './images/myTrash.png';

//DOM Tools
//Create DOM Template
const theDOMTemplate = {
  sidebarAutomaticProject: ([id, tag], type, title, tasks) => {
    let count;

    if (tasks === 0) {
      count = '';
    }

    theDOMAppendTo.theSidebarAutomatic(
      theDOMCreate.sidebarAutomaticProject([id, tag], type, title, count)
    );
  },
  sidebarCustomProject: ([id, tag], type, title, tasks) => {
    let count;

    if (tasks === 0) {
      count = '';
    }

    theDOMAppendTo.theSidebarCustom(
      theDOMCreate.sidebarCustomProject([id, tag], type, title, count)
    );
  },
  project: ([id, tag], type, title, description) => {
    theDOMAppendTo.theDisplayBody(
      theDOMCreate.project([id, tag], type, title, description)
    );
  },
  list: ([id, idProject, tag], type, category, title, description) => {
    theDOMAppendTo.theProject(
      idProject,
      theDOMCreate.list(
        [id, idProject, tag],
        type,
        category,
        title,
        description
      )
    );
  },
  task: (
    [id, idList, idProject, tag],
    type,
    category,
    title,
    description,
    date
  ) => {
    theDOMAppendTo.theList(
      idList,
      idProject,
      theDOMCreate.task(
        [id, idList, idProject, tag],
        type,
        category,
        title,
        description,
        date
      )
    );
  },
  note: (
    [id, idTask, idList, idProject, tag],
    type,
    category,
    title,
    description
  ) => {
    theDOMAppendTo.theTask(
      idTask,
      idProject,
      idList,
      theDOMCreate.note(
        [id, idTask, idList, idProject, tag],
        type,
        category,
        title,
        description
      )
    );
  },
  addForm: (type) => {
    if (type === 'Task') {
      theDOMAppendTo.theDemo(theDOMCreate.taskForm(type, 'Add'));
    } else {
      theDOMAppendTo.theDemo(theDOMCreate.projectListNoteForm(type, 'Add'));
    }
  },
  editForm: (type) => {
    if (type === 'Task') {
      theDOMAppendTo.theDemo(theDOMCreate.taskForm(type, 'Edit'));
    } else {
      theDOMAppendTo.theDemo(theDOMCreate.projectListNoteForm(type, 'Edit'));
    }
  },

  removeForm: (type) => {
    theDOMAppendTo.theDemo(theDOMCreate.removeForm(type));
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
  theSidebar: () => {
    return document.querySelector('.demo__sidebar');
  },
  theSidebarAutomatic: () => {
    return document.querySelector('.sidebar__automatic');
  },
  theSidebarAutomaticButton: (idProject) => {
    const button = [...document.querySelectorAll('.sidebar__automatic button')];
    return button.filter(
      (project) => button.dataset.id === idProject.toString()
    )[0];
  },
  theSidebarAutomaticButtons: () => {
    return document.querySelectorAll('.sidebar__automatic button');
  },
  theSidebarAutomaticCount: (idProject) => {
    const count = [
      ...document.querySelectorAll('.sidebar__automatic .--count'),
    ];

    return count.filter(
      (count) => count.dataset.id === idProject.toString()
    )[0];
  },
  theSidebarDefaultProject: () => {
    return document.querySelector('.button--inbox');
  },
  theSidebarAdd: () => {
    return document.querySelector('.sidebar__add');
  },
  theAddProject: () => {
    return document.querySelector('.sidebar__add .button--add');
  },
  theSidebarCustom: () => {
    return document.querySelector('.sidebar__custom');
  },
  theSidebarCustomButton: (idProject) => {
    const button = [...document.querySelectorAll('.sidebar__custom button')];

    return button.filter(
      (button) => button.dataset.id === idProject.toString()
    )[0];
  },
  theSidebarCustomButtons: () => {
    return document.querySelectorAll('.sidebar__custom button');
  },
  theSidebarCustomCount: (idProject) => {
    const count = [...document.querySelectorAll('.sidebar__custom .--count')];

    return count.filter(
      (count) => count.dataset.id === idProject.toString()
    )[0];
  },
  theDisplay: () => {
    return document.querySelector('.demo__display');
  },
  theLogo: () => {
    return document.querySelector('.button--logo');
  },
  theDisplayBody: () => {
    return document.querySelector('.display__body');
  },
  theProject: (idProject) => {
    const projects = [...document.querySelectorAll('.body__project')];
    return projects.filter(
      (project) => project.dataset.id === idProject.toString()
    )[0];
  },
  theCurrentProject: () => {
    return document.querySelector('.body__project');
  },
  theCurrentProjectListTaskNote: (tag) => {
    const element = [
      ...document.querySelectorAll(
        '.project__title, .project__list, .list__task, .task__note'
      ),
    ];

    return element.filter((element) => element.dataset.tag === tag)[0];
  },
  theCurrentProjectCheckMark: () => {
    return document.querySelector('.body__project .body__checkbox');
  },
  theCurrentProjectEdit: () => {
    return document.querySelector('.body__project .button--edit');
  },
  theCurrentProjectRemove: () => {
    return document.querySelector('.body__project .button--remove');
  },
  theCheckMarks: (tag) => {
    const checkMark = [...document.querySelectorAll('.input--checkbox')];

    return checkMark.filter((checkMark) => checkMark.dataset.tag === tag)[0];
  },
  theCheckMarkProject: (idProject) => {
    const checkMark = [
      ...document.querySelector('.project__title .input--checkbox'),
    ];

    return checkMark.filter(
      (checkMark) => checkMark.dataset.tag === idProject.tag
    )[0];
  },
  theCheckMarkProjects: () => {
    return document.querySelectorAll('.project__title .input--checkbox');
  },
  theEditProject: () => {
    return document.querySelectorAll('.project__title .button-edit');
  },
  theRemoveProject: () => {
    return document.querySelectorAll('.project__title .button--remove');
  },
  theList: (idList, idProject) => {
    const lists = [...document.querySelectorAll('.project__list')];
    return lists.filter(
      (list) =>
        list.dataset.id === idList.toString() &&
        list.dataset.project === idProject.toString()
    )[0];
  },
  theCheckMarkList: (idList) => {
    const checkMark = [
      ...document.querySelector('.list__title .input--checkbox'),
    ];

    return checkMark.filter(
      (checkMark) => checkMark.dataset.tag === idList.tag
    )[0];
  },
  theCheckMarkLists: () => {
    return document.querySelectorAll('.list__title .input--checkbox');
  },
  theAddTask: () => {
    return document.querySelectorAll('.list__title .button--add');
  },
  theEditList: () => {
    return document.querySelectorAll('.list__title .button--edit');
  },
  theRemoveList: () => {
    return document.querySelectorAll('.list__title .button--remove');
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
  theCheckMarkTask: (idTask) => {
    const checkMark = [
      ...document.querySelector('.task__title .input--checkbox'),
    ];

    return checkMark.filter(
      (checkMark) => checkMark.dataset.tag === idTask.tag
    )[0];
  },
  theCheckMarkTasks: () => {
    return document.querySelectorAll('.task__title .input--checkbox');
  },
  theAddNote: () => {
    return document.querySelectorAll('.task__title .button--add');
  },
  theEditTask: () => {
    return document.querySelectorAll('.task__title .button--edit');
  },
  theRemoveTask: () => {
    return document.querySelectorAll('.task__title .button--remove');
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
  theCheckMarkNote: (idNote) => {
    const checkMark = [
      ...document.querySelector('.note__title .input--checkbox'),
    ];

    return checkMark.filter(
      (checkMark) => checkMark.dataset.tag === idNote.tag
    )[0];
  },
  theCheckMarkNotes: () => {
    return document.querySelectorAll('.note__title .input--checkbox');
  },
  theEditNote: () => {
    return document.querySelectorAll('.note__title .button--edit');
  },
  theRemoveNote: () => {
    return document.querySelectorAll('.note__title .button--remove');
  },
  theAddList: () => {
    return document.querySelector('.display__misc .button--add');
  },
  theForm: () => {
    return document.querySelector('.display__form');
  },
  theFormTitle: () => {
    return document.querySelector('.input--title');
  },
  theFormDate: () => {
    return document.querySelector('.input--date');
  },
  theFormDescription: () => {
    return document.querySelector('.textarea--description');
  },
  theFormCancel: () => {
    return document.querySelector('.form__button .button--cancel');
  },
  theFormAdd: () => {
    return document.querySelector('.form__button .button--add');
  },
  theFormEdit: () => {
    return document.querySelector('.form__button .button--edit');
  },
  theFormRemove: () => {
    return document.querySelector('.form__button .button--remove');
  },
  theMisc: () => {
    return document.querySelector('.application__misc');
  },
};

const theDOMGetValue = {
  cached: (() => {
    let element = {};

    const add = function () {
      Object.assign(element, this.dataset);
    };

    return { element, add };
  })(),
  current: {
    type: {
      project: () => {
        return theDOMGet.theCurrentProject().dataset.type;
      },
    },
    id: {
      project: () => {
        return theDOMGet.theCurrentProject().dataset.id;
      },
    },
  },
  category: {
    task: () => {
      return theDOMGetValue.cached.element.category;
    },
  },
  id: {
    project: () => {
      return [
        theDOMGetValue.cached.element.type,
        theDOMGetValue.cached.element.id,
      ];
    },
    list: () => {
      return [
        theDOMGetValue.cached.element.type,
        theDOMGetValue.cached.element.id,
        theDOMGetValue.cached.element.project,
      ];
    },
    task: () => {
      return [
        theDOMGetValue.cached.element.type,
        theDOMGetValue.cached.element.id,
        theDOMGetValue.cached.element.list,
        theDOMGetValue.cached.element.project,
      ];
    },
    note: () => {
      return [
        theDOMGetValue.cached.element.type,
        theDOMGetValue.cached.element.id,
        theDOMGetValue.cached.element.task,
        theDOMGetValue.cached.element.list,
        theDOMGetValue.cached.element.project,
      ];
    },
  },
  input: {
    title: () => {
      return theDOMGet.theFormTitle().value;
    },
    description: () => {
      return theDOMGet.theFormDescription().value;
    },
    date: () => {
      if (theDOMGet.theFormDate().value === '') {
        return '???';
      } else {
        return theDOMGet.theFormDate().value.replaceAll('-', '/');
      }
    },
  },
};

//Create DOM Element
const theDOMCreate = {
  sidebarAutomaticProject: ([id, tag], type, title, count = '') => {
    const element = theElement.create(
      'div',
      {
        class: `automatic__${title.toLowerCase()}`,
        ['data-id']: id,
        ['data-tag']: tag,
        ['data-type']: type,
      },
      theElement.create(
        'button',
        {
          class: `button--${title.toLowerCase()}`,
          ['data-id']: id,
          ['data-tag']: tag,
          ['data-type']: type,
        },
        theElement.create(
          'span',
          { class: `${title}__title` },
          `${title[0].toUpperCase() + title.slice(1)}`
        ),
        theElement.create(
          'span',
          {
            class: `${title}__count --count`,
            ['data-id']: id,
            ['data-tag']: tag,
            ['data-type']: type,
          },
          count.toString()
        )
      )
    );
    return element;
  },
  sidebarCustomProject: ([id, tag], type, title, count = '') => {
    const element = theElement.create(
      'div',
      {
        class: `custom__${title.toLowerCase()}`,
        ['data-id']: id,
        ['data-tag']: tag,
        ['data-type']: type,
      },
      theElement.create(
        'button',
        {
          class: `button--${title.toLowerCase()}`,
          ['data-id']: id,
          ['data-tag']: tag,
          ['data-type']: type,
        },
        theElement.create('span', { class: `${title}__title` }, title),
        theElement.create(
          'span',
          {
            class: `${title}__count --count`,
            ['data-id']: id,
            ['data-tag']: tag,
            ['data-type']: type,
          },
          count.toString()
        )
      )
    );
    return element;
  },
  project: ([id, tag], type, title, description) => {
    const element = theElement.create(
      'div',
      {
        class: 'body__project',
        ['data-id']: id,
        ['data-tag']: tag,
        ['data-type']: type,
      },
      theElement.create(
        'div',
        {
          class: 'project__title',
          ['data-id']: id,
          ['data-tag']: tag,
          ['data-type']: type,
        },
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
                ['data-id']: id,
                ['data-tag']: tag,
                ['data-type']: type,
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
              ['data-id']: id,
              ['data-tag']: tag,
              ['data-type']: type,
            },
            theElement.create('img', { class: 'img--edit', src: edit })
          ),
          theElement.create(
            'button',
            {
              class: 'button--remove',
              ['data-id']: id,
              ['data-tag']: tag,
              ['data-type']: type,
            },
            theElement.create('img', { class: 'img--remove', src: trash })
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
  list: ([id, idProject, tag], type, category, title, description) => {
    const element = theElement.create(
      'div',
      {
        class: 'project__list',
        ['data-id']: id,
        ['data-project']: idProject,
        ['data-tag']: tag,
        ['data-type']: type,
        ['data-category']: category,
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
                ['data-id']: id,
                ['data-project']: idProject,
                ['data-tag']: tag,
                ['data-type']: type,
                ['data-category']: category,
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
                ['data-id']: id,
                ['data-project']: idProject,
                ['data-tag']: tag,
                ['data-type']: type,
                ['data-category']: category,
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
              ['data-id']: id,
              ['data-project']: idProject,
              ['data-tag']: tag,
              ['data-type']: type,
              ['data-category']: category,
            },
            theElement.create('img', { class: 'img--edit', src: edit })
          ),
          theElement.create(
            'button',
            {
              class: 'button--remove',
              ['data-id']: id,
              ['data-project']: idProject,
              ['data-tag']: tag,
              ['data-type']: type,
              ['data-category']: category,
            },
            theElement.create('img', { class: 'img--remove', src: trash })
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
  task: (
    [id, idList, idProject, tag],
    type,
    category,
    title,
    description,
    date
  ) => {
    const element = theElement.create(
      'div',
      {
        class: 'list__task',
        ['data-id']: id,
        ['data-list']: idList,
        ['data-project']: idProject,
        ['data-tag']: tag,
        ['data-type']: type,
        ['data-category']: category,
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
                ['data-id']: id,
                ['data-list']: idList,
                ['data-project']: idProject,
                ['data-tag']: tag,
                ['data-type']: type,
                ['data-category']: category,
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
                ['data-id']: id,
                ['data-list']: idList,
                ['data-project']: idProject,
                ['data-tag']: tag,
                ['data-type']: type,
                ['data-category']: category,
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
              ['data-id']: id,
              ['data-list']: idList,
              ['data-project']: idProject,
              ['data-tag']: tag,
              ['data-type']: type,
              ['data-category']: category,
            },
            theElement.create('img', { class: 'img--edit', src: edit })
          ),
          theElement.create(
            'button',
            {
              class: 'button--remove',
              ['data-id']: id,
              ['data-list']: idList,
              ['data-project']: idProject,
              ['data-tag']: tag,
              ['data-type']: type,
              ['data-category']: category,
            },
            theElement.create('img', { class: 'img--remove', src: trash })
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
            theElement.create(
              'span',
              { class: 'category__text' },
              `Category: ${category}`
            )
          ),
          theElement.create(
            'div',
            { class: 'misc__date' },
            theElement.create('span', { class: 'date__text' }, `Date: ${date}`)
          )
        )
      )
    );
    return element;
  },
  note: (
    [id, idTask, idList, idProject, tag],
    type,
    category,
    title,
    description
  ) => {
    const element = theElement.create(
      'div',
      {
        class: 'task__note',
        ['data-id']: id,
        ['data-task']: idTask,
        ['data-list']: idList,
        ['data-project']: idProject,
        ['data-tag']: tag,
        ['data-type']: type,
        ['data-category']: category,
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
                ['data-id']: id,
                ['data-task']: idTask,
                ['data-list']: idList,
                ['data-project']: idProject,
                ['data-tag']: tag,
                ['data-type']: type,
                ['data-category']: category,
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
              ['data-id']: id,
              ['data-task']: idTask,
              ['data-list']: idList,
              ['data-project']: idProject,
              ['data-tag']: tag,
              ['data-type']: type,
              ['data-category']: category,
            },
            theElement.create('img', { class: 'img--edit', src: edit })
          ),
          theElement.create(
            'button',
            {
              class: 'button--remove',
              ['data-id']: id,
              ['data-task']: idTask,
              ['data-list']: idList,
              ['data-project']: idProject,
              ['data-tag']: tag,
              ['data-type']: type,
              ['data-category']: category,
            },
            theElement.create('img', { class: 'img--remove', src: trash })
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
  projectListNoteForm: (projectListNote, form) => {
    const element = theElement.create(
      'div',
      { class: 'display__form' },
      theElement.create(
        'div',
        { class: 'form__title' },
        theElement.create(
          'h1',
          { class: 'title__text' },
          `${form} ${projectListNote}`
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
            class: `button--${form.toLowerCase()}`,
            ['data-type']: projectListNote.toLowerCase(),
          },
          `${form}`
        )
      )
    );
    return element;
  },
  taskForm: (projectListNote, form) => {
    const element = theElement.create(
      'div',
      { class: 'display__form' },
      theElement.create(
        'div',
        { class: 'form__title' },
        theElement.create(
          'h1',
          { class: 'title__text' },
          `${form} ${projectListNote}`
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
            { class: '--display-flex' },
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
              'lable',
              { class: 'label--date' },
              theElement.create('span', { class: 'body__date' }, 'Date'),
              theElement.create('input', {
                class: 'input--date',
                type: 'date',
              })
            )
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
            class: `button--${form.toLowerCase()}`,
            ['data-type']: projectListNote.toLowerCase(),
          },
          `${form}`
        )
      )
    );
    return element;
  },
  removeForm: (projectListNoteTask) => {
    const element = theElement.create(
      'div',
      { class: 'display__form' },
      theElement.create(
        'div',
        { class: 'form__title' },
        theElement.create(
          'h1',
          { class: 'title__text' },
          `Are you sure you want to remove this ${projectListNoteTask}?`
        )
      ),
      theElement.create(
        'div',
        { class: 'form__button' },
        theElement.create('button', { class: 'button--cancel' }, 'Cancel'),
        theElement.create('button', { class: 'button--remove' }, 'Remove')
      )
    );
    return element;
  },
};

export { theDOMTemplate, theDOMAppendTo, theDOMGet, theDOMGetValue };
