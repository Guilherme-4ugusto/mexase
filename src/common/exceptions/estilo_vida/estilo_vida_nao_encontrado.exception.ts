import { AppException } from '../app.exception';

export class EstiloVidaNaoEncontradoException extends AppException {
  constructor() {
    super('Estilo de vida não encontrado!', 409);
  }
}