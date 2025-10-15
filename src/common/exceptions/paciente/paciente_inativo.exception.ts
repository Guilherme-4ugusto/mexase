import { AppException } from '../app.exception';

export class PacienteInativoException extends AppException {
  constructor() {
    super('Paciente está inativo!', 409);
  }
}