import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        name: { type: String },
        completed: { type: Boolean, default: false },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true, strict: true, strictQuery: true }
);

export default mongoose.model("Task", schema, "task");