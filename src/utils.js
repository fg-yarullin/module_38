const cards = document.querySelectorAll('.card-body');

export const getFromStorage = function(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const addToStorage = function(obj, key) {
  const storageData = getFromStorage(key);
  storageData.push(obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const generateTestUser = function(User) {
  localStorage.clear();
  const testUser = new User("test", "qwerty123", 10);
  User.save(testUser);
};

export const renderTasks = function(user = null, tasks) {
  if (tasks.length === 0) return;
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < tasks.length; j++) { {
        console.log(tasks[i].text);
        if (!user && tasks[j].state_id == i + 11) {
          appendTask(cards[i], tasks[j])
        }
      }
    }
  }
};

function appendTask(taskParentNode, taskObj) {
  const paragraph = document.createElement('p');
  paragraph.className = 'card-text';
  paragraph.id = 'task-'+taskObj.id;
  paragraph.innerText =  taskObj.text;
  taskParentNode.appendChild(paragraph);
}

export const addTask = function() {
  let listener;
  const buttons = document.querySelectorAll('.add-task');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', listener = () => {
      appendTaskTextArea(cards[i], {text: 'new task ' + i + 1});
      buttons[i].removeEventListener('click',listener, false);
    });
  }
};

function appendTaskTextArea(taskParentNode, taskObj) {
  const textBox = document.createElement('textarea');
  textBox.classList.add('card-text', 'text-box');
  textBox.innerText =  taskObj.text;
  taskParentNode.appendChild(textBox);
}


// let id =3; let status = tasks.find(
//     task => task.id == id)
//     .status;console.log(status);
