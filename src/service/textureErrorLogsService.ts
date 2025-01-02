import TexrureErrorLogsRepository from "../repository/textureErrorLogsRepository";
import { ITextureErrorLogs } from "../db/models/textureErrorLogsModel";

class ErrorLogService {
    async createErrorLog(data: ITextureErrorLogs): Promise<ITextureErrorLogs> {
        return await TexrureErrorLogsRepository.createErrorLog(data);
    }
}

export default new ErrorLogService();
