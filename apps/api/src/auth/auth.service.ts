import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserInput } from '../users/interfaces/create-user.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    this.logger.log(`Tentativa de login para ${email}`);

    const user = await this.usersService.findAuthByEmail(email);
    if (!user) {
      this.logger.warn(`Login falhou: usuário não encontrado para ${email}`);
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      this.logger.warn(`Login falhou: senha inválida para ${email}`);
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, email: user.email };
    this.logger.log(`Login realizado com sucesso para ${email}`);

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async signUp(createUserInput: CreateUserInput) {
    this.logger.log(`Cadastro iniciado para ${createUserInput.email}`);

    const user = await this.usersService.create(createUserInput);
    const payload = { sub: user.id, email: user.email };

    this.logger.log(`Cadastro concluído para ${createUserInput.email}`);

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
