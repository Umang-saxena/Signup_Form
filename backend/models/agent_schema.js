import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
    tasks: [
        {
            FirstName: { type: String, required: true },
            Phone: { type: String, required: true },
            Notes: { type: String, required: true },
        }
    ]
});

export const Agent = mongoose.model("Agent", agentSchema);

