import { Schema, model } from "mongoose";

const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        recipient: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now       
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

messageSchema.methods.toJSON = function () {
    const { __v, ...object } = this.toObject();
    return object;
};

const Message = model("Message", messageSchema);

export default Message;
