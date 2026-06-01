const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");
const taskCount = document.getElementById("task-count");
const clearCompletedButton = document.getElementById("clear-completed");
const themeToggle = document.getElementById("theme-toggle");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function loadTasks() {

    const savedTasks =
        localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }

    renderTasks();
}

function addTask() {

    const text =
        taskInput.value.trim();

    if (!text) {
        return;
    }

    tasks.push({
        id: Date.now(),
        text,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();
}

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = [...tasks];

    const searchValue =
        searchInput.value.toLowerCase();

    filteredTasks = filteredTasks.filter(task =>
        task.text
            .toLowerCase()
            .includes(searchValue)
    );

    if (currentFilter === "pending") {

        filteredTasks =
            filteredTasks.filter(
                task => !task.completed
            );
    }

    if (currentFilter === "completed") {

        filteredTasks =
            filteredTasks.filter(
                task => task.completed
            );
    }

    taskCount.textContent =
        `Total Tasks: ${filteredTasks.length}`;

    filteredTasks.forEach(task => {

        const li =
            document.createElement("li");

        li.classList.add("task-item");

        li.innerHTML = `
            <div class="task-left">
                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                >

                <span class="${
                    task.completed
                    ? "completed"
                    : ""
                }">
                    ${task.text}
                </span>
            </div>

            <div class="task-buttons">
                <button class="edit-btn">
                    Edit
                </button>

                <button class="delete-btn">
                    Delete
                </button>
            </div>
        `;

        const checkbox =
            li.querySelector("input");

        checkbox.addEventListener(
            "change",
            () => {

                task.completed =
                    checkbox.checked;

                saveTasks();
                renderTasks();
            }
        );

        const deleteButton =
            li.querySelector(".delete-btn");

        deleteButton.addEventListener(
            "click",
            () => {

                tasks = tasks.filter(
                    item => item.id !== task.id
                );

                saveTasks();
                renderTasks();
            }
        );

        const editButton =
            li.querySelector(".edit-btn");

        editButton.addEventListener(
            "click",
            () => {

                const newText =
                    prompt(
                        "Edit Task",
                        task.text
                    );

                if (!newText) {
                    return;
                }

                task.text =
                    newText.trim();

                saveTasks();
                renderTasks();
            }
        );

        taskList.appendChild(li);
    });
}

addButton.addEventListener(
    "click",
    addTask
);

taskInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            addTask();
        }
    }
);

searchInput.addEventListener(
    "input",
    renderTasks
);

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            currentFilter =
                button.dataset.filter;

            renderTasks();
        }
    );
});

clearCompletedButton.addEventListener(
    "click",
    () => {

        tasks = tasks.filter(
            task => !task.completed
        );

        saveTasks();
        renderTasks();
    }
);

themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle("dark");
    }
);

loadTasks();