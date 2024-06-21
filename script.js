const form = document.querySelector("form");
let inputElem = document.querySelector("#input_box");
const body = document.body;

let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

const createTask = () => {
    removeTask();

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const taskList = document.createElement("ul");
    taskList.classList.add("allTask");

    tasks.forEach((item, i) => {
        const listItem = document.createElement("li");
        listItem.textContent = ` ${i + 1}. ${item.task}`;
        listItem.classList.add("items");

        if(item.completed){
            listItem.classList.add("complete");
        }

        const contollers = document.createElement("div");
        contollers.classList.add("controllers");

        const deleteBtn = document.createElement("i");
        deleteBtn.classList.add("bi", "bi-trash");

        deleteBtn.addEventListener("click", () => {
            deleteTask(i);
        })
        const checkBtn = document.createElement("i");
        checkBtn.classList.add("bi", "bi-circle");

        checkBtn.addEventListener("click", () => {
            completeTask(i);
        })
        contollers.appendChild(checkBtn);
        contollers.appendChild(deleteBtn);
        listItem.appendChild(contollers);

        taskList.appendChild(listItem);
    });

    taskContainer.appendChild(taskList);
    body.appendChild(taskContainer);
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    createTask();
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const completeTask = (index) => {
    const allItems = document.querySelectorAll(".items");

    if (index >= 0 && index < tasks.length) {

        tasks[index].completed = !tasks[index].completed;
        allItems[index].classList.toggle('complete');
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }
};

const check = () => {
    const taskList = document.querySelector(".allTask");
    if (tasks.length === 0) {
        if (taskList) {
            const warn = document.createElement("h2");
            warn.textContent = `There is No Task! Add One`;
            warn.style.color = "red";
            taskList.appendChild(warn);
        }
    } else {
        if (taskList) {
            taskList.style.display = "block";
        }
    }
};

const removeTask = () => {
    const divs = document.querySelectorAll(".task-container");
    divs.forEach((item) => {
        item.remove();
    });
};
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputVal = inputElem.value.trim();

    if (inputVal) {
        tasks.push({ task: inputVal });
        inputElem.value = "";
        createTask();
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
});
const greet = ()=>{
    const taskContainer = document.querySelector(".task-container");
    
    const greetText = document.createElement("h5");
    greetText.textContent = `Congrats you've completed ${tasks.length} Tasks 👍👍 go ahead and do more 💪💪 brave boy`;
    greetText.classList.add("greet_text");

    if(tasks.length === 5){
        return(
            tasks.forEach((item)=>{
                if(item.completed === true){
                     taskContainer.appendChild(greetText);
                     setTimeout(()=>{
                        greetText.style.display = "none"
                     },7000);
                }
            })
        )
    }
}
createTask();
check();
greet();