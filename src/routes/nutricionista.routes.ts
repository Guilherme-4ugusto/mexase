import { Router } from 'express';
import * as nutricionistaController from '../controllers/nutricionista.controller';
import {validarJWT} from '../middleware/auth.middleware'
import { buscarConsultasPorIdNutri } from '../controllers/consulta.controller';

const router = Router();

router.post('/nutricionista', validarJWT, nutricionistaController.criarNutricionista);
router.put('/nutricionista/:id', validarJWT, nutricionistaController.atualizarDadosNutricionista);
router.patch('/nutricionista/:id/inativar', validarJWT, nutricionistaController.inativarNutricionista);
router.patch('/nutricionista/:id/reativar', validarJWT, nutricionistaController.reativarNutricionista);
router.get('/nutricionista/:id?', validarJWT, nutricionistaController.buscarNutricionista);
router.get('/nutricionista/:id/consultas', validarJWT, buscarConsultasPorIdNutri)
export default router;