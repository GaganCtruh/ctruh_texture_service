import { BlobServiceClient } from "@azure/storage-blob";
import path from "path";
import { AZURE_BLOB_CONNECTION_STRING, AZURE_CONTAINER_NAME } from "../../config";
import { v6 as uuidv7 } from "uuid";
import { Readable } from "stream";

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_BLOB_CONNECTION_STRING!);
const containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER_NAME!);

export async function uploadToBlob(file: any): Promise<string> {
    const blobName = uuidv7();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const fileStream = Readable.from(file?.buffer);
    await blockBlobClient.uploadStream(fileStream);
    return blockBlobClient.url; // Return the URL of the uploaded blob
}

export async function deleteBlobFromAzure(blobUrl: string): Promise<void> {
    const blobName = path.basename(blobUrl);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.delete();
}

export const removeFileExtension = async (name: string) => {
    return name.replace(/\.[^/.]+$/, "");
};
