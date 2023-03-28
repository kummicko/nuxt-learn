import { projects } from "../../dbModels"

export default defineEventHandler(async (event) => {
    console.log("GET /api/projects")
    try {
        const projectsData = await projects.find()
        return projectsData.map(project => ({
            name: project.name,
            id: project._id
        }))
    } catch (err) {
        console.dir(err)
        event.node.res.statusCode = 500
        return {
            code: "ERROR",
            message: "Something went wrong"
        }
    }
})