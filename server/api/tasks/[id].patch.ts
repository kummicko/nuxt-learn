import { tasks } from "../../dbModels"

interface IRequestBody {
    id: string;
    name: string;
}

export default defineEventHandler(async (event) => {
  const taskId = event?.context?.params?.id;
  const { name } = await readBody<IRequestBody>(event)
  const filter = { _id: taskId }
  const update = { name: name }
  try {
      await tasks.findOneAndUpdate( filter, update, {
        returnOriginal: false
      })
  } catch (err) {
    console.dir(err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something wrong.",
    }
  }
  return {message: "Successfully updated"}
})