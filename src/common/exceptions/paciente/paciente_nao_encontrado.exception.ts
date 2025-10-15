import { AppException } from '../app.exception';

export class PacienteNaoEncontradoException extends AppException {
  constructor() {
    super('Paciente não encontrado!', 404);
  }
}