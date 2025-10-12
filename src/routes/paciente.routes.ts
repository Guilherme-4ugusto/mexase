import { Router } from 'express';
import { criarPaciente, inativarPaciente, listarPacientes, buscarPacientePorId, atualizarDadosPaciente, ativarPaciente} from '../controllers/paciente.controller';
import {validarJWT} from '../middleware/auth.middleware'

const router = Router();

router.post('/paciente', validarJWT, criarPaciente);
router.post('/paciente/:id/inativar', validarJWT, inativarPaciente);
router.post('/paciente/:id/ativar', validarJWT, ativarPaciente);
router.put('/paciente/:id', validarJWT, atualizarDadosPaciente);
router.get('/pacientes', validarJWT, listarPacientes);
router.get('/paciente/:id', validarJWT, buscarPacientePorId);

export default router;
