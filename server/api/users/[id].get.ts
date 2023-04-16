import { users } from "../../dbModels";

export default defineEventHandler(async (event) => {
  const userId = event?.context?.params?.id;
  try {
    console.log("Find user");
    const userData = await users.findOne({
      "_id": userId,
    });
    if(userData) {
      console.log("User found");
      return {
        id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
      };
    } else {
      console.log("User not found");
      event.node.res.statusCode = 404;
      return {
        code: "UserNotFound",
        message: `User with id ${userId} not found`
      };
    }
  } catch (err) {
    console.dir(err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    }
  }
})