
import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoUser, UserDocument } from './users.schema';
import { CreateUserDto } from './create-user.dto';
import { User } from '../graphql.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel(MongoUser.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    const mongoUser = await createdUser.save();

    return {
      id: mongoUser._id.toString(),
      email: mongoUser.email
    }
  }

  async findOne(id: string): Promise<User> {
    const mongoUser = await this.userModel.findOne({ _id: id });

    return {
      id: mongoUser._id.toString(),
      email: mongoUser.email
    }
  }
}


