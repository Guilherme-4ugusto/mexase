import { AppException } from '../app.exception';

export class PacienteJaAtivadoException extends AppException {
  constructor() {
    super('Paciente já está ativado!', 409);
  }
}