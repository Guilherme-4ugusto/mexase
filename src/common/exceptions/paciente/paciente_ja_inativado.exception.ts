import { AppException } from '../app.exception';

export class PacienteJaInativadoException extends AppException {
  constructor() {
    super('Paciente já está inativado!', 409);
  }
}