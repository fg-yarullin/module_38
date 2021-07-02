import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/style.css";
import svgIconsTemplate from "./templates/svgIcons.html";
import initialTemplate from "./templates/signIn.html";
import taskFieldTemplate from "./templates/taskField.html";
import noAccessTemplate from "./templates/noAccess.html";
import { User } from "./models/User";
import { generateTestUser,  getFromStorage, addTask} from "./utils";
import { State } from "./state";
import { authUser, logout } from "./services/auth";
import { tasks } from "./data/tasks";
import { renderTasks } from "./utils";

export const appState = new State();

const loginForm = document.querySelector("#app-login-form");
const loginButton = document.querySelector("#app-login-btn");
const logoutButton = document.querySelector("#app-logout-btn");
const fieldHTMLContent = document.querySelector("#content");
let togglerState = false;

console.log(loginForm);

document.querySelector('.svg-icons').innerHTML = svgIconsTemplate;
fieldHTMLContent.innerHTML = initialTemplate;

generateTestUser(User);

renderTasks('', tasks);

addTask();

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");
  const isLogedIn = authUser(login, password);

  togglerState = !togglerState;

  if (togglerState && isLogedIn) {
    fieldHTMLContent.innerHTML = taskFieldTemplate;
    loginButton.classList.add('d-none');
    logoutButton.classList.remove('d-none');
  }

  if (!isLogedIn) {
    fieldHTMLContent.innerHTML = noAccessTemplate;
  }

  if (!togglerState) {
    if (isLogedIn) {
      logout();
      fieldHTMLContent.innerHTML = initialTemplate;
    }
    loginButton.classList.remove('d-none');
    logoutButton.classList.add('d-none')
    return;
  }
});

