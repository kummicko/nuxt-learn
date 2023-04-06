import { users } from "../../dbModels";

interface IRequestBody {
    email: string;
    password: string;
    firstName: string;
    lastName: string,
  }
  
  export default defineEventHandler(async (event) => {
    console.log("POST /api/users");
    const { email, password, firstName, lastName } = await readBody<IRequestBody>(event);
    console.log(firstName, lastName, email, password)
    try {
      const userData = await users.findOne({
        email,
      });
      if (userData) {
        console.log(`User with email ${email} already exists`);
        event.node.res.statusCode = 409;
        return {
          code: "USER_EXISTS",
          message: "User with given email already exists.",
        };
      } else {
        console.log("Create user");
        // const newUserData = await users.create({
        //   email,
        //   password,
        //   firstName,
        //   lastName
        // });
        return {
          // id: newUserData._id,
          // firstName: newUserData.firstName,
          // lastName: newUserData.lastName,
          // email: newUserData.email
          message: "ok"
        };
      }
    } catch (err) {
      console.dir(err);
      event.node.res.statusCode = 500;
      return {
        code: "ERROR",
        message: "Something wrong.",
      };
    }
  });