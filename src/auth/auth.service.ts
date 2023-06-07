import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { I18nContext } from 'nestjs-i18n';
import { User } from 'src/user/entities/user.schema';
import { CustomHttpException } from 'src/utils/exceptions';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { UserEntity } from './serializers';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string) {
    const hashingRounds = this.configService.get<number>(
      'app.passwordHashingRounds',
    );
    const hashedPassword = await bcrypt.hash(password, hashingRounds);
    return hashedPassword;
  }

  private async comparePassword(password: string, hash: string) {
    const isMatched = await bcrypt.compare(password, hash);
    return isMatched;
  }

  async register(dto: RegisterDTO, i18n: I18nContext) {
    const existingUser = await this.userModel.findOne({ email: dto.email });

    if (existingUser)
      throw new CustomHttpException({
        errors: { email: i18n.t('errors.emailAlreadyExists') },
        status: HttpStatus.BAD_REQUEST,
      });

    const hashedPassword = await this.hashPassword(dto.password);

    const user = new this.userModel({
      password: hashedPassword,
      email: dto.email,
      fullName: dto.fullName,
    });
    await user.save();

    const userEntity = UserEntity.fromDocument(user);
    return userEntity;
  }

  async login(dto: LoginDTO, i18n: I18nContext) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) {
      throw new CustomHttpException({
        errors: { email: i18n.t('errors.wrongEmailOrPassword') },
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const isPassworCorrect = await this.comparePassword(
      dto.password,
      user.password,
    );

    if (!isPassworCorrect) {
      throw new CustomHttpException({
        errors: { email: i18n.t('errors.wrongEmailOrPassword') },
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const payload = { sub: user._id.toString() };
    const token = await this.jwtService.signAsync(payload);
    const userEntity = UserEntity.fromDocument(user).addAccessToken(token);

    return userEntity;
  }
}
