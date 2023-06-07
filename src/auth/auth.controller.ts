import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterDTO, LoginDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { User } from 'src/user/entities/user.schema';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(
    @Body() body: RegisterDTO,
    @I18n() i18n: I18nContext,
  ): Promise<User> {
    const user = await this.authService.register(body, i18n);
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() body: LoginDTO, @I18n() i18n: I18nContext) {
    const res = await this.authService.login(body, i18n);
    return res;
  }
}
