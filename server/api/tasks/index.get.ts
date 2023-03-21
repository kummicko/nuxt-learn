import { tasks } from "../../dbModels";

export default defineEventHandler(async (event) => {
    console.log("GET /api/tasks");
    try {
        console.log("Find tasks");
        const tasksData = await tasks.find();
        return tasksData.map((task) => ({
            name: task.name,
            completed: task.completed,
            created: task.createdAt
        }));
    } catch (err) {
        console.dir(err);
        event.node.res.statusCode = 500;
        return {
            code: "ERROR",
            message: "Something went wrong.",
        };
    }
});