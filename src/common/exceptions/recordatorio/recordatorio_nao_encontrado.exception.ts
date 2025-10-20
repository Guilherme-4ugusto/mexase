import { AppException } from '../app.exception';

export class RecordatorioNaoEncontradoException extends AppException {
  constructor() {
    super('Recordatorio não encontrado!', 404);
  }
}