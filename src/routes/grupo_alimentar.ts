import { Router } from 'express';
import {validarJWT} from '../middleware/auth.middleware'
import { listarGrupoAlimentar } from '../controllers/grupo_alimentar.controller';

const router = Router();

router.get('/grupo-alimentar', validarJWT, listarGrupoAlimentar)

export default router;