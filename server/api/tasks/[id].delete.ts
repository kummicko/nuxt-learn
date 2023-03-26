import { tasks } from "../../dbModels"

export default defineEventHandler(async (event) => {
   const taskId = event?.context?.params?.id;
   try {
      await tasks.findOneAndDelete({ _id: taskId })
   } catch (err) {
      console.dir(err)
      event.node.res.statusCode = 500
   }
   return {message: "Successfully deleted"}
})