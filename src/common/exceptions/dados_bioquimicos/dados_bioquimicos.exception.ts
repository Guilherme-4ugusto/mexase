import { AppException } from '../app.exception';

export class DadosBioquimicosNaoEncontradosException extends AppException {
  constructor() {
    super('Dados Bioquimicos não encontrados!', 404);
  }
}