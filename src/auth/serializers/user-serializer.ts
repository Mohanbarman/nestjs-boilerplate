import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
import { User } from 'src/user/entities/user.schema';

export class UserEntity {
  id: string;
  fullName: string;
  email: string;
  accessToken?: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  static fromDocument(doc: User & Document) {
    return new UserEntity({
      id: doc.id,
      email: doc.email,
      fullName: doc.fullName,
      password: doc.password,
    });
  }

  addAccessToken(token: string) {
    this.accessToken = token;
    return this;
  }
}
