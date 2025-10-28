import { Router } from 'express';
import {validarJWT} from '../middleware/auth.middleware'
import { listarSetores } from '../controllers/setor.controller';

const router = Router();

router.get('/setores', validarJWT, listarSetores)

export default router;