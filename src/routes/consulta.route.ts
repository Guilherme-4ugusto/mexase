import { Router } from 'express';
import { atualizarRecordatorio, buscarRecordatorioPorConsultaId, criarRecordatorio } from '../controllers/recordatorio.service';
import { validarJWT } from '../middleware/auth.middleware';
import { atualizarConsultaPorIdConsulta, buscarConsultaPorIdConsulta, criarConsulta } from '../controllers/consulta.controller';
import { atualizarDiagnostico, buscarDiagnosticoPorConsultaId, criarDiagnostico } from '../controllers/diagnostico.controller';

const router = Router();


router.post('/consulta/:consulta_id/recordatorio', validarJWT, criarRecordatorio);
router.put('/consulta/:consulta_id/recordatorio', validarJWT, atualizarRecordatorio);
router.get('/consulta/:consulta_id/recordatorio', validarJWT, buscarRecordatorioPorConsultaId);


router.post('/consulta/:consulta_id/diagnostico', validarJWT, criarDiagnostico);
router.put('/consulta/:consulta_id/diagnostico', validarJWT, atualizarDiagnostico);
router.get('/consulta/:consulta_id/diagnostico', validarJWT, buscarDiagnosticoPorConsultaId);

router.post('/consulta', validarJWT, criarConsulta);
router.put('/consulta/:consulta_id', validarJWT, atualizarConsultaPorIdConsulta);
router.get('/consulta/:consulta_id', validarJWT, buscarConsultaPorIdConsulta);


export default router;