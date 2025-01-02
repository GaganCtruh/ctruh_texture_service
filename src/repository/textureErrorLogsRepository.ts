import TextureErrorLog, { ITextureErrorLogs } from "../db/models/textureErrorLogsModel";

class TextureErrorLogRepository {
    async createErrorLog(data: ITextureErrorLogs): Promise<ITextureErrorLogs> {
        const errorLogs = new TextureErrorLog(data);
        return await errorLogs.save();
    }
}

export default new TextureErrorLogRepository();
