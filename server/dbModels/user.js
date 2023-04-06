import mongoose from "mongoose";
import bcrypt from "mongoose-bcrypt";

const schema = new mongoose.Schema(
    {
        email: {  type: String, unique: true },
        password: { type: String, bcrypt: true },
        firstName: String,
        lastName: String,
    },
    { timestamps: true, strict: true, strictQuery: true }
);

schema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });

schema.plugin(bcrypt);

export default mongoose.model("User", schema, "user");