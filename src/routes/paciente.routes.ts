import { Router } from 'express';
import { criarPaciente, inativarPaciente, listarPacientes, buscarPacientePorId, atualizarDadosPaciente, ativarPaciente} from '../controllers/paciente.controller';
import { criarDadosDietetico, atualizarDadosDieteticosPaciente, buscarDieteticosPorPacienteId} from '../controllers/dietetico.controller';
import {validarJWT} from '../middleware/auth.middleware'

const router = Router();

router.post('/paciente', validarJWT, criarPaciente);
router.post('/paciente/:id/inativar', validarJWT, inativarPaciente);
router.post('/paciente/:id/ativar', validarJWT, ativarPaciente);
router.put('/paciente/:id', validarJWT, atualizarDadosPaciente);
router.get('/pacientes', validarJWT, listarPacientes);
router.get('/paciente/:id', validarJWT, buscarPacientePorId);

router.post('/paciente/:paciente_id/dados-dieteticos', criarDadosDietetico);
router.put('/paciente/:paciente_id/dados-dieteticos', atualizarDadosDieteticosPaciente);
router.get('/paciente/:paciente_id/dados-dieteticos', buscarDieteticosPorPacienteId);

export default router;
