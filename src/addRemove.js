// Variable initialization
let lists = JSON.parse(localStorage.getItem('lists') ?? '[]');

// index and local storage update
function updateIndex() {
  lists.forEach((list, index) => {
    list.index = index + 1;
  });
  localStorage.setItem('lists', JSON.stringify(lists));
}

// create list
export default function showTasks() {
  const container = document.getElementById('list-container');
  container.innerHTML = '';

  const theHeader = document.createElement('div');
  theHeader.innerHTML = `
    <h1>Today's To Do<span class="refresh">&#8635;</span></h1>
  `;
  const refreshIcon = theHeader.querySelector('.refresh');

  // reload page event listener
  refreshIcon.addEventListener('click', () => {
    window.location.reload();
  });

  const formInput = document.createElement('form');
  formInput.innerHTML = `
    <input placeholder="Add to your list..." type="text" class="text italic">
    <button type="submit" class="add">&#8629;</button>
  `;

  const input = formInput.querySelector('input');
  const taskList = document.createElement('div');
  taskList.className = 'to-do-lists';

  // display to-do-list
  lists.forEach((task) => {
    const box = document.createElement('div');
    box.className = 'to-do-list';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    // checkbox event listener
    checkbox.addEventListener('click', () => {
      task.completed = checkbox.checked;
      box.classList.toggle('complete');
      localStorage.setItem('lists', JSON.stringify(lists));
    });

    const description = document.createElement('input');
    description.value = task.description;
    description.setAttribute('contenteditable', true);
    description.className = 'w-full';

    // description update and local storage
    description.addEventListener('input', () => {
      task.description = description.value;
      localStorage.setItem('lists', JSON.stringify(lists));
    });

    const listIcon = document.createElement('span');
    listIcon.className = 'update red';
    listIcon.innerHTML = '&#128465;';

    listIcon.addEventListener('click', () => {
      const index = lists.indexOf(task);
      lists.splice(index, 1);
      localStorage.setItem('lists', JSON.stringify(lists));
      box.remove();
      updateIndex();
    });

    box.appendChild(checkbox);
    box.appendChild(description);
    box.appendChild(listIcon);

    if (task.completed) {
      box.classList.add('complete');
    }

    taskList.appendChild(box);
  });

  container.appendChild(theHeader);
  container.appendChild(formInput);
  container.appendChild(taskList);

  const clearBtn = document.createElement('button');
  clearBtn.className = 'clear';
  clearBtn.type = 'button';
  clearBtn.textContent = 'Clear all completed';

  // clearBtn event listener
  clearBtn.addEventListener('click', () => {
    lists = lists.filter((task) => !task.completed);
    localStorage.setItem('lists', JSON.stringify(lists));
    updateIndex();
    showTasks();
  });

  container.appendChild(clearBtn);

  // input form event listener
  formInput.addEventListener('submit', (e) => {
    e.preventDefault();

    const { value } = input;

    if (value) {
      const task = {
        description: value,
        completed: false,
        index: lists.length,
      };

      lists.push(task);
      localStorage.setItem('lists', JSON.stringify(lists));
      input.value = '';
      updateIndex();
      showTasks();
    }
  });
}
