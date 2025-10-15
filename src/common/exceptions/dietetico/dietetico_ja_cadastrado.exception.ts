import { AppException } from '../app.exception';

export class DieteticoJaCadastradoException extends AppException {
  constructor() {
    super('Dados dieteticos já estão cadastrado!', 409);
  }
}