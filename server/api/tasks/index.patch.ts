import { tasks } from "../../dbModels"

interface IRequestBody {
    id: string;
}

export default defineEventHandler(async (event) => {
  console.log("PATCH /api/tasks");
  const { id } = await readBody<IRequestBody>(event)
  const filter = { _id: id }
  // const update = { name: newName, completed: isCompleted }
  console.log(filter)
  // console.log(update)
  try {
      // await tasks.findOneAndUpdate( filter, update, {
      //   returnOriginal: false
      // })
  } catch (err) {
    console.dir(err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something wrong.",
    }
  }
})