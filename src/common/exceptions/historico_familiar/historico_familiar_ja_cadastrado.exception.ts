import { AppException } from '../app.exception';

export class HistoricoFamiliarJaCadastradoException extends AppException {
  constructor() {
    super('Historico familiar já estão cadastrado!', 409);
  }
}