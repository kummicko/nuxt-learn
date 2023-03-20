import mongoose from "mongoose";
import bcrypt from "mongoose-bcrypt";

const schema = new mongoose.Schema(
    {
        name: { type: String },
        completed: { type: Boolean },
    },
    { timestamps: true, strict: true, strictQuery: true }
);

schema.plugin(bcrypt);

export default mongoose.model("Task", schema, "task");