import { AppException } from '../app.exception';

export class DiagnosticoNaoEncontradoException extends AppException {
  constructor() {
    super('Diagnostico não encontrado!', 404);
  }
}