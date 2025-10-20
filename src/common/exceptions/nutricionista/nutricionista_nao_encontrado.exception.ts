import { AppException } from '../app.exception';

export class NutricionistaNaoEncontradoException extends AppException {
  constructor() {
    super('Nutricionista não encontrado!', 404);
  }
}