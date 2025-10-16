import { AppException } from '../app.exception';

export class HistoricoFamiliarNaoEncontradoException extends AppException {
  constructor() {
    super('Historico familiar não encontrado!', 409);
  }
}