import { Router } from 'express';
import multer from 'multer';
import { deleteMesh, getAllMeshes, getMeshById, getMeshesByType, uploadMesh } from '../controller/meshController';

const upload = multer({ dest: 'uploads/' }); // Temporary file storage for images

const router = Router();

// Get all meshes
router.get('/', getAllMeshes);

// Get mesh by ID
router.get('/:id', getMeshById);

// Get meshes by type
router.get('/type/:meshType', getMeshesByType);

// Upload mesh (texture and screenshot)
router.post('/', upload.fields([{ name: 'textureImg' }, { name: 'screenShot' }]), uploadMesh);

// Delete mesh
router.delete('/:id', deleteMesh);

export default router;
