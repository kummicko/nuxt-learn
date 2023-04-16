import { tasks } from "../../dbModels";

interface IRequestBody {
    name: string,
    userId: string
  }

export default defineEventHandler(async (event) => {
  console.log("POST /api/tasks");
  const { name, userId } = await readBody<IRequestBody>(event);
  try {
      const newTaskData = await tasks.create({ name, userId });
      return {
          id: newTaskData._id,
          name: newTaskData.name,
          completed: newTaskData.completed,
          created: newTaskData.createdAt
      }
  } catch (err) {
    console.dir(err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});

      //   const taskData = await users.findOne({
    //     email,
    //   });
    //   if (userData) {
    //     console.log(`User with email ${email} already exists`);
    //     event.res.statusCode = 409;
    //     return {
    //       code: "USER_EXISTS",
    //       message: "User with given email already exists.",
    //     };
    //   } else {
    //     console.log("Create user");
    //     const newUserData = await users.create({
    //       email,
    //       password,
    //       firstName,
    //       lastName
    //     });
    //     return {
    //       id: newUserData._id,
    //       firstName: newUserData.firstName,
    //       lastName: newUserData.lastName,
    //       email: newUserData.email
    //     };
    //   }