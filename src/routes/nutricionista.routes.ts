import { Router } from 'express';
import { criarNutricionista, inativarNutricionista, reativarNutricionista} from '../controllers/nutricionista.controller';
import {validarJWT} from '../middleware/auth.middleware'

const router = Router();

router.post('/nutricionista', validarJWT, criarNutricionista);
router.patch('/nutricionista/:id/inativar', validarJWT, inativarNutricionista)
router.patch('/nutricionista/:id/reativar', validarJWT, reativarNutricionista)

export default router;
