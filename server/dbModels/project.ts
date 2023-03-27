import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        name: { type: String },
    },
    { timestamps: true, strict: true, strictQuery: true }
);

export default mongoose.model("Project", schema, "project");