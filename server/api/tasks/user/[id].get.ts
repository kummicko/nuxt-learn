import { tasks } from "../../../dbModels";

export default defineEventHandler(async (event) => {
    console.log('GET /api/tasks/user')
    const userId = event?.context?.params?.id;
    try {
        const tasksData = await tasks.find({ userId: userId })
        return tasksData.map((task) => ({
            name: task.name,
            completed: task.completed,
            created: task.createdAt,
            id: task._id,
            project: task.project
        }));
    } catch (err) {
        console.dir(err)
        event.node.res.statusCode = 500
    }
})