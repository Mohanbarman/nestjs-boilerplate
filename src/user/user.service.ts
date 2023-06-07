import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(fields: User) {
    const newUser = new this.userModel(fields);
    return newUser.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }
}
