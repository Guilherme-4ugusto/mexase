import { AppException } from '../app.exception';

export class GrupoAlimentarNaoEncontradoException extends AppException {
  constructor() {
    super('Grupo alimentar não encontrado!', 404);
  }
}