import MeshRepository from "../repository/meshRepository";
import { uploadToBlob, deleteBlobFromAzure } from "../utils/blobService";
import { IMesh } from "../db/models/meshModel";
import path from "path";
import mongoose from "mongoose";

class MeshService {
  async getAllMeshes(): Promise<IMesh[]> {
    return await MeshRepository.getAllMeshes();
  }

  async getMeshById(id: any): Promise<IMesh | null> {
    return await MeshRepository.getMeshById(id);
  }

  async getMeshesByType(meshType: string): Promise<IMesh[]> {
    return await MeshRepository.getMeshesByType(meshType);
  }

  async uploadMesh(textureImg: any, screenShot: any, meshType): Promise<IMesh> {
    // Upload images to Azure Blob Storage
    const screenShotUrl = await uploadToBlob(screenShot);
    const textureUrl = await uploadToBlob(textureImg);

    const meshData: any = {
      meshType,
      name: textureImg.originalname.split(".")[0], // Extract the name from the texture file
      screenShot: screenShotUrl,
      texture: textureUrl,
      id: new mongoose.Types.ObjectId(), // Generate a new ObjectId for the mesh
    };

    return await MeshRepository.createMesh(meshData);
  }

  async deleteMesh(id: mongoose.Types.ObjectId): Promise<IMesh | null> {
    const mesh = await MeshRepository.getMeshById(id);
    if (mesh) {
      // Delete images from Blob Storage
      await deleteBlobFromAzure(mesh.texture);
      await deleteBlobFromAzure(mesh.screenShot);
      return await MeshRepository.deleteMeshById(id);
    }
    throw new Error("Mesh not found");
  }
}

export default new MeshService();
