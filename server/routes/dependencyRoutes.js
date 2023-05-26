import  { Router } from 'express';
import { getAllDependencies, getDependency, createDependency, updateDependency, deleteDependency} from '../controllers/dependencyControllers.js';
import { verifyUser } from "../middlewares/authUser.js";
const router = Router();

router.get('/Dependencies', getAllDependencies);
router.get('/Dependency/:id', getDependency);
router.post('/Dependency/create',verifyUser, createDependency);
router.put('/Dependency/update/:id',verifyUser, updateDependency); 
router.delete('/Dependency/delete/:id',verifyUser, deleteDependency);


export default router;