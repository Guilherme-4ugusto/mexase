import { AppException } from '../app.exception';

export class DieteticoNaoEncontradoException extends AppException {
  constructor() {
    super('Dados dietetico não encontrado!', 404);
  }
}