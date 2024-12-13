import mongoose from "mongoose";
import Mesh, { IMesh } from "../models/meshModel";

class MeshRepository {
  async createMesh(data: IMesh): Promise<IMesh> {
    const mesh = new Mesh(data);
    return await mesh.save();
  }

  async getMeshById(id: mongoose.Types.ObjectId): Promise<IMesh | null> {
    return await Mesh.findById(id);
  }

  async getAllMeshes(): Promise<IMesh[]> {
    return await Mesh.find();
  }

  async getMeshesByType(meshType: string): Promise<IMesh[]> {
    return await Mesh.find({ meshType });
  }

  async deleteMeshById(id: mongoose.Types.ObjectId): Promise<IMesh | null> {
    return await Mesh.findByIdAndDelete(id);
  }
}

export default new MeshRepository();
