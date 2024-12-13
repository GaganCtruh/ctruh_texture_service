import { BlobServiceClient } from '@azure/storage-blob';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.AZURE_BLOB_CONNECTION_STRING);
console.log(process.env.AZURE_CONTAINER_NAME);
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_CONNECTION_STRING!);
const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME!);

export async function uploadToBlob(file:any): Promise<string> {
  const blobName = path.basename(file.path);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const uploadBlobResponse = await blockBlobClient.uploadFile(file.path);
  return blockBlobClient.url; // Return the URL of the uploaded blob
}

export async function deleteBlobFromAzure(blobUrl: string): Promise<void> {
  const blobName = path.basename(blobUrl);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.delete();
}
