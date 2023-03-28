import mongoose, { Date } from "mongoose";

const schema = new mongoose.Schema(
    {
        name: { type: String },
        startDate: { type: Date },
        endDate: { type: Date } 
    },
    { timestamps: true, strict: true, strictQuery: true }
);

export default mongoose.model("Project", schema, "project");