import mongoose, { Document, Schema } from "mongoose";

export interface ITextureErrorLogs extends Document {
    timestamp: string;
    level: "error";
    message: string;
    stack: string | null;
    name: string | null;
    fileName: string;
    lineNumber: string;
}

const textureErrorLogsSchema = new Schema<ITextureErrorLogs>({
    timestamp: { type: String, required: true },
    level: { type: String, required: true },
    message: { type: String, required: true },
    stack: { type: String, required: false },
    name: { type: String, required: false },
    fileName: { type: String, required: true },
    lineNumber: { type: String, required: true },
});

export default mongoose.model<ITextureErrorLogs>("texture_error_log", textureErrorLogsSchema);
