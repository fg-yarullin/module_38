import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/style.css";
import svgIconsTemplate from "./templates/svgIcons.html";
import initialTemplate from "./templates/signIn.html";
import taskFieldTemplate from "./templates/taskField.html";
import noAccessTemplate from "./templates/noAccess.html";
import adminPageTemplate from "./templates/adminPage.html"
import { User } from "./models/User";
import { Task } from "./models/Task";
import { generateUsers, generateTestTasks, getFromStorage, renderTasks, addTask, appendDropDownMenuItems, renderAdminMenuItems, removeAdminMenuItems, changeTaskStatus} from "./utils";
import { State } from "./state";
import { authUser, logout } from "./services/auth";
// import { tasks } from "./data/tasks";

export const appState = new State();

const loginForm = document.querySelector("#app-login-form");
const logoutForm = document.querySelector("#app-logout-form");
// const cardsContainer = document.querySelector(".cards-container");
// const loginButton = document.querySelector("#app-login-btn");
// const logoutButton = document.querySelector("#app-logout-btn");
const fieldHTMLContent = document.querySelector("#content");
// let authState = false;
document.querySelector('.svg-icons').innerHTML = svgIconsTemplate;
fieldHTMLContent.innerHTML = initialTemplate;
generateUsers();
// addTask();

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");
  const isLogedIn = authUser(login, password);

  if (isLogedIn) {
    appState.currentUser.login === "test" ? generateTestTasks(appState.currentUser.id) : false;
    const task = new Task();
    appState.tasks = task.tasks;
    // tasks.forEach(task => task.userId = appState.currentUser.id);
    // cardsContainer.classList.remove("d-none");
    console.log(appState);
    fieldHTMLContent.innerHTML = taskFieldTemplate;
    renderTasks(appState.currentUserTasks);
    appendDropDownMenuItems(appState.currentUserTasks);
    if (appState.currentUser.role === "admin") {
      renderAdminMenuItems();
      fieldHTMLContent.innerHTML += adminPageTemplate;
    }
    loginForm.classList.add('d-none');
    logoutForm.classList.remove('d-none');
    loginForm.childNodes[1].value = '';
    loginForm.childNodes[3].value = '';
  } else {
    fieldHTMLContent.innerHTML = noAccessTemplate;
    fieldHTMLContent.innerHTML += initialTemplate;
  }
  addTask();
  changeTaskStatus();
});

logoutForm.addEventListener("submit", function(e) {
  e.preventDefault();
  removeAdminMenuItems();
  logout();
  fieldHTMLContent.innerHTML = initialTemplate;
  loginForm.classList.remove('d-none');
  logoutForm.classList.add('d-none');
  // cardsContainer.classList.add("d-none");
});


