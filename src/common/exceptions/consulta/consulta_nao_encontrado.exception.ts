import { AppException } from '../app.exception';

export class ConsultaNaoEncontradoException extends AppException {
  constructor() {
    super('Consulta não encontrado!', 404);
  }
}