export function deleteCompleted(e) {
  return e.filter((task) => !task.completed);
}

export function isCompleted(task) {
  task.completed = !task.completed;
}
