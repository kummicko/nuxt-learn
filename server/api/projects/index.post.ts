import { projects } from "../../dbModels"

interface IRequestBody {
    name: string,
    startDate: Date,
    endDate: Date
}

export default defineEventHandler(async (event) => {
    console.log("POST /api/projects/")
    const { name, startDate, endDate } = await readBody<IRequestBody>(event)
    try {
        const newProjectData = await projects.create({ name, startDate, endDate })
        return {
            id: newProjectData.id,
            name: newProjectData.name,
            startDate: newProjectData.startDate,
            endDate: newProjectData.endDate
        }
    } catch (err) {
        console.dir(err)
        event.node.res.statusCode = 500
        return {
            code: "ERROR",
            message: "Something went wrong"
        }
    }
})