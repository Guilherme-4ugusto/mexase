import { AppException } from '../app.exception';

export class EstiloVidaJaCadastradoException extends AppException {
  constructor() {
    super('Estilo de vida já estão cadastrado!', 409);
  }
}