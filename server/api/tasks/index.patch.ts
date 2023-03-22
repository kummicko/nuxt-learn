import { tasks } from "../../dbModels"

interface IRequestBody {
    id: string;
    name: string;
    completed: string
}

export default defineEventHandler(async (event) => {
  console.log("PATCH /api/tasks");
  const { id, name, completed } = await readBody<IRequestBody>(event)
  const filter = { _id: id }
  const update = { name: name, completed: completed }
  console.log(filter._id)
  console.log(update)
  try {
      await tasks.findOneAndUpdate( filter, update, {
        new: true
      })
  } catch (err) {
    console.dir(err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something wrong.",
    }
  }
})