import { AppException } from '../app.exception';

export class PacienteJaCadastradoException extends AppException {
  constructor() {
    super('CPF já cadastrado!', 409);
  }
}