import { Request, Response } from "express";
import MeshService from "../service/meshService";
import mongoose from "mongoose";

// Get all meshes
export async function getAllMeshes(req: Request, res: Response): Promise<Response> {
    try {
        const meshes = await MeshService.getAllMeshes();
        return res.status(200).json(meshes);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

// Get mesh by ID
export async function getMeshById(req: Request, res: Response): Promise<Response> {
    try {
        const mesh = await MeshService.getMeshById(new mongoose.Types.ObjectId(req.params.id));
        if (!mesh) return res.status(404).json({ message: "Mesh not found" });
        return res.status(200).json(mesh);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

// Get meshes by type
export async function getMeshesByType(req: Request, res: Response): Promise<Response> {
    try {
        const meshes = await MeshService.getMeshesByType(req.params.meshType);
        return res.status(200).json(meshes);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

// Upload mesh (texture and screenshot)
export async function uploadMesh(req: Request, res: Response): Promise<Response> {
    try {
        const { textureImg, screenShot } = req.files as any;
        const meshType = req.body.meshType;
        if (!textureImg || !screenShot) {
            return res.status(400).json({ message: "Both texture image and screenshot are required." });
        }
        const mesh = await MeshService.uploadMesh(textureImg[0], screenShot[0], meshType);
        return res.status(201).json(mesh);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

// Delete mesh
export async function deleteMesh(req: Request, res: Response): Promise<Response> {
    try {
        await MeshService.deleteMesh(new mongoose.Types.ObjectId(req.params.id));
        return res.status(200).json({ message: "Mesh deleted" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export default {
    getAllMeshes,
    getMeshById,
    getMeshesByType,
    uploadMesh,
    deleteMesh,
};
