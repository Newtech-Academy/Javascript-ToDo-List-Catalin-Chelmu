const curList = [];
const output = document.querySelector(".output");

function createMyElement(parent, elType, classAdd) {
  const ele = document.createElement(elType);
  parent.append(ele);
  ele.classList.add(classAdd);
  return ele;
}

const myInput = createMyElement(output, "input", "main"); //createMyElement(parent:"output", elType:"input", classAdd:"main");
myInput.setAttribute("type", "text");
const myBtn = createMyElement(output, "button", "btn");
myBtn.textContent = "Add New task";
const myList = createMyElement(output, "ul", "myList");

let getData = localStorage.getItem("curList");

window.addEventListener("DOMContentLoaded", (e) => {
  if (getData) {
    const tempArr = JSON.parse(getData);
    tempArr.forEach((task) => {
      addNewTask(task);
    });
  }
});
myBtn.addEventListener("click", (e) => {
  console.log("click");
  let taskName = myInput.value;
  if (taskName.length > 3) {
    const li = addNewTask(taskName);
    myInput.value = "";
  }
});
function updater() {
  const myListItems = document.querySelectorAll(".info");
  curList.length = 0;
  myListItems.forEach((el) => {
    curList.push(el.textContent);
  });
  localStorage.setItem("curList", JSON.stringify(curList));
}
function addNewTask(taskName) {
  curList.push(taskName);
  const li = createMyElement(myList, "li", "myList");
  const div = createMyElement(li, "div", "container");
  const span1 = createMyElement(div, "span", "info");
  span1.textContent = taskName;
  const span2 = createMyElement(div, "span", "editer");
  span2.textContent = "Edit";
  const span3 = createMyElement(div, "span", "del");
  span3.textContent = "Delete";
  const span4 = createMyElement(div, "span", "status");
  span4.textContent = "Status";

  span2.addEventListener("click", (e) => {
    if (span2.textContent === "Edit") {
      span1.style.backgroundColor = "yellow";
      span1.setAttribute("contenteditable", true);
      span2.textContent = "Save";
    } else {
      span1.style.backgroundColor = "white";
      span1.setAttribute("contenteditable", false);
      span2.textContent = "Edit";
      updater();
    }
  });
  span3.addEventListener("click", (e) => {
    li.remove();
    console.log("del");
    updater();
  });

  span4.addEventListener("click", (e) => {
    span1.style.backgroundColor = "green"; // text decoration line-through
    span1.style.color = "white";
    span4.textContent = "Complet";
    console.log("status");
    updater();
  });

  updater();
  return li;
}
