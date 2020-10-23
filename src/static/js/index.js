function createTODO(title, content) {
  const url = '/todo';
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title, content})
  });
}

function getTODOs() {
  const url = '/todo';
  return fetch(url, {
    method: 'GET',
  });
}

function deleteTODO(id) {
  const url = `/todo/${id}`;
  return fetch(url, {
    method: 'DELETE',
  });
}

function fetchInfo() {
  return fetch('/info', {
    method: 'GET'
  });
}

function generateTR(title, content) {
  const tr = document.createElement('tr');
  const td1 = document.createElement('td');
  td1.innerText = title;
  const td2 = document.createElement('td');
  td2.innerText = content;
  tr.appendChild(td1);
  tr.appendChild(td2);
  return tr;
}

function appendInfo() {
  fetchInfo()
    .then(res => res.json())
    .then(info => {
      const table = document.getElementById('todo-info');
      const tbody = table.getElementsByTagName('tbody')[0];
      for (let key in info) {
        if (key === 'connectionStatus') {
          tbody.appendChild(generateTR('Postgres connection stat', info[key]));
        } else {
          tbody.appendChild(generateTR(key, info[key]));
        }
      }
    })
    .catch(err => {
      console.error(err);
    })
}

function initTODOList() {
  document.getElementById('todo-list').innerHTML = '';
  getTODOs()
    .then(res => res.json())
    .then(todoList => {
      todoList['rows'].forEach(todo => {
        const todoElement = generateTODO(todo);
        document.getElementById('todo-list').appendChild(todoElement);
      })
    })
    .catch(err => {
      console.error(err);
    })
}

function generateTODO(todo) {
  const id = `todo-${todo.id}`;
  const rootDiv = document.createElement("div");
  const contentDiv = document.createElement("div");
  const todoTitle = document.createElement("h3");
  const todoContent = document.createElement("p");
  const todoCompleteButton = document.createElement("button");

  rootDiv.id = id;
  todoTitle.innerText = todo.title;
  todoTitle.classList.add('card-title');
  todoContent.innerText = todo.content;
  todoContent.classList.add('card-text');
  todoCompleteButton.innerText = 'complete';
  todoCompleteButton.classList.add('btn', 'btn-danger');

  rootDiv.classList.add('card');
  rootDiv.style = "width: 17rem; display: inline-block; margin: 1rem;";
  contentDiv.classList.add('card-body');

  contentDiv.appendChild(todoTitle);
  contentDiv.appendChild(todoContent);
  contentDiv.appendChild(todoCompleteButton);

  rootDiv.appendChild(contentDiv);
  todoCompleteButton.onclick = () => {
    deleteTODO(todo.id)
      .then(() => {
        return initTODOList()
      })
      .catch(err => {
        console.error(err);
      })
  }
  return rootDiv;
}

document.getElementById('todo-form-submit').addEventListener('click', (e) => {
  e.preventDefault();
  const form = document.querySelector('#todo-form');
  const formData = new FormData(form);
  const title = formData.get('title');
  const content = formData.get('content');
  createTODO(title, content)
    .then(res => {
      return res.json()
    })
    .then((todoId) => {
      form.reset();
      return initTODOList();
    })
    .catch(err => {
      console.error(err);
    }) 
})

appendInfo();
initTODOList();