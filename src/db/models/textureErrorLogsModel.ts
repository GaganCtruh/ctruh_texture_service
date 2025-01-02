import mongoose, { Document, Schema } from "mongoose";

export interface ITextureErrorLogs extends Document {
    id: mongoose.Types.ObjectId;
    timestamp: string;
    level: string;
    message: string;
    stack: string | null;
    name: string | null;
    fileName: string;
    lineNumber: string;
}

const textureErrorLogsSchema = new Schema<ITextureErrorLogs>(
    {
        timestamp: { type: String, required: true },
        level: { type: String, required: true },
        message: { type: String, required: true },
        stack: { type: String, required: true },
        name: { type: String, required: true },
        fileName: { type: String, required: true },
        lineNumber: { type: String, required: true },
    },
    { timestamps: true },
);

export default mongoose.model<ITextureErrorLogs>("texture_error_log", textureErrorLogsSchema);
