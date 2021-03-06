var myNodelist = document.getElementsByTagName("LI");
var list = document.querySelector("ul");
var close = document.getElementsByClassName("close");
const button = document.querySelector(".button");
const container = document.querySelector(".container");
let closeBtn;
let checkeboxes;

const addHTML = (todo) => {
  const todo_ul = document.createElement("ul");
  todo_ul.classList.add("todo_ul");

  const todo_li = document.createElement("li");
  todo_li.classList.add("todo_li");
  todo_li.textContent = todo.text;

  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  todo_li.appendChild(span);

  todo_ul.appendChild(todo_li);
  container.appendChild(todo_ul);
};
const starConf = () => {
  // başlangıçda çalışcak
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (!todos) {
    localStorage.setItem("todos", JSON.stringify([]));
  } else {
    todos.forEach((todo) => {
      addHTML(todo);
    });
    closeBtn = document.querySelectorAll(".close");
  }
};
starConf();

function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("task").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "" || inputValue.replace(/^\s+|\s+$/g, "").length == 0) {
    $(".error").toast("show");
  } else {
    $(".success").toast("show");
    const todo = {
      text: inputValue,
      isCompleted: false,
    };
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    addHTML(todo);
  }
  document.getElementById("task").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}
const closeTodo = (e) => {
  const todo = e.target.parentElement;
  const text = todo.firstChild.textContent;
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos.filter((td) => td.text != text);
  localStorage.setItem("todos", JSON.stringify(todos));
  todo.remove();
};

button.addEventListener("submit", newElement);
closeBtn.forEach((btn) => btn.addEventListener("click", closeTodo));
