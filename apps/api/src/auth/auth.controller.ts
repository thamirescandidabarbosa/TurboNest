import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import type { LoginResponse } from '@turbonest/contracts';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { Public } from './decorators/public.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Realiza login e retorna JWT' })
  @ApiOkResponse({ description: 'Token JWT e dados básicos do usuário' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto): Promise<LoginResponse> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @ApiOperation({ summary: 'Cria uma conta e retorna JWT' })
  @ApiOkResponse({ description: 'Token JWT e dados básicos do usuário' })
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<LoginResponse> {
    return this.authService.signUp({
      email: signUpDto.email,
      name: signUpDto.name,
      password: signUpDto.password,
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna o usuário autenticado a partir do JWT' })
  @ApiOkResponse({ description: 'Payload do usuário autenticado' })
  @Get('me')
  me(@GetUser() user: { sub: string; email: string; name?: string | null }) {
    return user;
  }
}
