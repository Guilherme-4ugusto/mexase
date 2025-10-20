import { Router } from 'express';
import { atualizarRecordatorio, buscarRecordatorioPorConsultaId, criarRecordatorio } from '../controllers/recordatorio.service';
import { validarJWT } from '../middleware/auth.middleware';

const router = Router();


router.post('/consulta/:consulta_id/recordatorio', validarJWT, criarRecordatorio);
router.put('/consulta/:consulta_id/recordatorio', validarJWT, atualizarRecordatorio);
router.get('/consulta/:consulta_id/recordatorio', validarJWT, buscarRecordatorioPorConsultaId);

export default router;