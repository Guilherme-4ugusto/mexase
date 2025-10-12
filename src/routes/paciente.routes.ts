import { Router } from 'express';
import { criarPaciente, inativarPaciente, listarPacientes, buscarPacientePorId, atualizarDadosPaciente, ativarPaciente} from '../controllers/paciente.controller';
import { criarDadosDietetico, atualizarDadosDieteticosPaciente, buscarDieteticosPorPacienteId} from '../controllers/dietetico.controller';
import {validarJWT} from '../middleware/auth.middleware'
import { atualizarDadosEstiloVidaPaciente, buscarEstiloVidaPorPacienteId, criarEstiloVida } from '../controllers/estilo_vida.controller';

const router = Router();

router.post('/paciente', validarJWT, criarPaciente);
router.post('/paciente/:id/inativar', validarJWT, inativarPaciente);
router.post('/paciente/:id/ativar', validarJWT, ativarPaciente);
router.put('/paciente/:id', validarJWT, atualizarDadosPaciente);
router.get('/pacientes', validarJWT, listarPacientes);
router.get('/paciente/:id', validarJWT, buscarPacientePorId);

router.post('/paciente/:paciente_id/dados-dieteticos',validarJWT, criarDadosDietetico);
router.put('/paciente/:paciente_id/dados-dieteticos',validarJWT, atualizarDadosDieteticosPaciente);
router.get('/paciente/:paciente_id/dados-dieteticos',validarJWT, buscarDieteticosPorPacienteId);

router.post('/paciente/:paciente_id/estilo-vida',validarJWT, criarEstiloVida);
router.put('/paciente/:paciente_id/estilo-vida',validarJWT, atualizarDadosEstiloVidaPaciente);
router.get('/paciente/:paciente_id/estilo-vida',validarJWT, buscarEstiloVidaPorPacienteId);

export default router;
