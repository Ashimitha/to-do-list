// 🗓 Get selected date
function getSelectedDate() {
  const taskDate = document.getElementById("taskDate");
  return taskDate.value || new Date().toISOString().split("T")[0];
}

// 🟢 Render saved tasks to the visible list (optional visual summary)
function renderTasks() {
  const taskList = document.getElementById("taskList");
  const selectedDate = getSelectedDate();
  const savedTasks = JSON.parse(localStorage.getItem(selectedDate)) || [];

  taskList.innerHTML = ""; // Clear current list

  savedTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.onclick = () => {
      savedTasks[index].completed = !savedTasks[index].completed;
      localStorage.setItem(selectedDate, JSON.stringify(savedTasks));
      renderTasks();
    };

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.onclick = () => {
      savedTasks.splice(index, 1);
      localStorage.setItem(selectedDate, JSON.stringify(savedTasks));
      renderTasks();
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  });

  // Update date display
  const dateDisplay = document.getElementById("dateDisplay");
  dateDisplay.textContent = selectedDate;
}

// 💾 Save dropdown selections
const saveBtn = document.getElementById("saveTasks");
saveBtn.onclick = () => {
  const selectedDate = getSelectedDate();
  const dailyTasks = [];

  for (let i = 1; i <= 5; i++) {
    const dropdown = document.getElementById(`task${i}`);
    const taskText = dropdown.value;
    if (taskText) {
      dailyTasks.push({ text: taskText, completed: false });
    }
  }

  localStorage.setItem(selectedDate, JSON.stringify(dailyTasks));
  renderTasks();

  // ✅ Show confirmation message
  const message = document.getElementById("statusMessage");
  message.style.display = "block";
  message.textContent = `✔️ Tasks for ${selectedDate} saved!`;
  setTimeout(() => {
    message.style.display = "none";
  }, 3000);
};

// 🔽 Load dropdown selections on date change
function loadDropdowns() {
  const selectedDate = getSelectedDate();
  const savedTasks = JSON.parse(localStorage.getItem(selectedDate)) || [];

  savedTasks.forEach((task, index) => {
    const dropdown = document.getElementById(`task${index + 1}`);
    if (dropdown) dropdown.value = task.text;
  });
}

// 🔁 Re-load when date changes
const taskDateInput = document.getElementById("taskDate");
taskDateInput.onchange = () => {
  loadDropdowns();
  renderTasks();
};

// 🚀 Initialize on page load
window.onload = () => {
  loadDropdowns();
  renderTasks();
};