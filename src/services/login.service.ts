import { prisma } from '../prisma/client';
import bcrypt from 'bcryptjs';
import { RealizarLoginDTO } from '../dtos/login.dto';
import jwt from 'jsonwebtoken';

export class AuthService {
    async realizarLogin({email, senha} : RealizarLoginDTO)  {
        const nutricionista = await prisma.nutricionista.findFirst({
            where: { email }
        })

        if ( nutricionista == null ) {
            throw new Error('Email ou senha incorretos. Tente novamente.');
        }

        const senhaValida = await bcrypt.compare(senha, nutricionista.senha);
        if(nutricionista.email !== email || !senhaValida || nutricionista.desativadoEm !== null){
            throw new Error('Email ou senha incorretos. Tente novamente.');
        }

        const token = jwt.sign({ id : nutricionista.id}, process.env.JWT_SECRET as string, {expiresIn: parseInt(process.env.JWT_EXPIRES || '3600')});
        
        return {token : token};
    }
}