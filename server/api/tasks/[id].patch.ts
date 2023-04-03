import { ObjectId } from "mongoose";
import { tasks } from "../../dbModels"

interface IRequestBody {
    id: string;
    name: string;
    completed: boolean;
    projectId: any;
}

export default defineEventHandler(async (event) => {
  const taskId = event?.context?.params?.id;
  const { name, completed, projectId } = await readBody<IRequestBody>(event)
  try {
    const task = await tasks.findById(taskId)
    if(task) {
      task.name = name
      task.completed = completed
      if(projectId) {
        task.project = projectId
      }
      await task.save()
      const newtask = await tasks.findById(taskId).populate('project')
      return newtask
    }
  } catch (err) {
    console.log(err)
  }
})