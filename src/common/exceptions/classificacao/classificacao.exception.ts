import { AppException } from '../app.exception';

export class ClassificacaoNaoEncontradaException extends AppException {
  constructor() {
    super('Classificacao não encontrada!', 404);
  }
}