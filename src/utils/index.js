function storeTasksInLocalStorage(varName, value) {
  localStorage.setItem(varName, JSON.stringify(value));
}

function getTasksFromLocalStorage(varName) {
  const tasks = localStorage.getItem(varName);
  return JSON.parse(tasks);
}

export { storeTasksInLocalStorage, getTasksFromLocalStorage };
