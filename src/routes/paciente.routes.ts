import { Router } from 'express';
import { criarPaciente} from '../controllers/paciente.controller';
import {validarJWT} from '../middleware/auth.middleware'

const router = Router();

router.post('/paciente', validarJWT, criarPaciente);

export default router;
