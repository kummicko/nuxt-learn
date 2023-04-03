import { tasks } from "../../dbModels";

export default defineEventHandler(async (event) => {
    console.log("GET /api/tasks");
    try {
        const tasksData = await tasks.find().populate('project');
        return tasksData.map((task) => ({
            name: task.name,
            completed: task.completed,
            created: task.createdAt,
            id: task._id,
            project: task.project
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