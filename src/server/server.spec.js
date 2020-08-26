import { addNewTask, updateTask } from "./server";

(async function myFunc() {
    await addNewTask({
        name: "my task",
        id: "12345"
    });

    await updateTask({
        id: "12345",
        name: "This is a task"
    });
})();
