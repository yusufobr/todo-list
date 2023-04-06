import './style.css';

const list = [
  {
    description: 'water the plants',
    completed: false,
    index: 0,
  },
  {
    description: 'go to gym',
    completed: false,
    index: 1,
  },
  {
    description: 'visit the parents',
    completed: false,
    index: 2,
  },
];

const renderTasks = () => {
  const todoList = document.getElementById('to-do-list');

  let tasks = '';
  list.forEach((task) => {
    tasks += `
    <li class="flex-col-btw">
    <div class="flex-col-start">
      <div>
        <input type="checkbox" />
      </div>
      <p>${task.description}</p>
    </div>
    <span>&#8942;</span>
  </li>`;
  });
  todoList.innerHTML = tasks;
};
renderTasks();